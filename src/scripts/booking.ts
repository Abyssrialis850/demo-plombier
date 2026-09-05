type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Entirely local demo: no requests, cookies, analytics or persistent storage. */
export function setupBooking(card: HTMLElement) {
  const form = card.querySelector<HTMLFormElement>('[data-contact-form]')!;
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-step]')];
  const rdvFields = form.querySelector<HTMLElement>('[data-rdv-fields]')!;
  const devisFields = form.querySelector<HTMLElement>('[data-devis-fields]')!;
  const success = card.querySelector<HTMLElement>('[data-success]')!;
  const progress = card.querySelector<HTMLElement>('.booking-progress')!;
  const modeInput = form.elements.namedItem('mode') as HTMLInputElement;
  const serviceInput = form.elements.namedItem('service') as HTMLSelectElement;
  const photos = form.elements.namedItem('photos') as HTMLInputElement;
  const dateContainer = form.querySelector<HTMLElement>('[data-dates]')!;
  const photoStatus = form.querySelector<HTMLElement>('[data-photo-status]')!;
  const photoHint = photoStatus.textContent || '';
  const clearPhotos = card.querySelector<HTMLButtonElement>('[data-photo-clear]')!;
  photoStatus.setAttribute('aria-live', 'polite');
  let mode: 'rdv' | 'devis' = 'rdv';

  // Five genuinely upcoming weekdays, recalculated at every page load.
  const today = new Date();
  for (let offset = 1, count = 0; count < 5; offset++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset, 12);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const label = document.createElement('label');
    label.className = 'date-option';
    const input = document.createElement('input');
    input.type = 'radio'; input.name = 'date'; input.required = true;
    input.value = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    input.setAttribute('aria-label', input.value);
    const display = document.createElement('span');
    display.setAttribute('aria-hidden', 'true');
    const day = document.createElement('span'); day.className = 'date-day'; day.textContent = date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '');
    const number = document.createElement('strong'); number.textContent = String(date.getDate());
    const month = document.createElement('span'); month.className = 'date-month'; month.textContent = date.toLocaleDateString('fr-FR', { month: 'short' });
    display.append(day, number, month); label.append(input, display); dateContainer.append(label);
    count++;
  }

  function setModeFields() {
    const isRdv = mode === 'rdv';
    rdvFields.hidden = !isRdv; devisFields.hidden = isRdv;
    rdvFields.querySelectorAll<FormControl>('input,select').forEach(input => input.disabled = !isRdv);
    devisFields.querySelectorAll<FormControl>('input,select').forEach(input => input.disabled = isRdv);
  }

  function setStep(step: number, focus = false) {
    form.hidden = false; progress.hidden = false; success.hidden = true;
    steps.forEach(fieldset => {
      const current = Number(fieldset.dataset.step) === step;
      fieldset.hidden = !current; fieldset.disabled = !current;
    });
    card.querySelectorAll<HTMLElement>('[data-progress]').forEach(label => {
      const active = Number(label.dataset.progress) === step;
      label.classList.toggle('is-active', active);
      if (active) label.setAttribute('aria-current', 'step'); else label.removeAttribute('aria-current');
    });
    setModeFields();
    if (focus) {
      const active = steps.find(fieldset => !fieldset.hidden);
      active?.querySelector<FormControl>('input:not([type="hidden"]),select,textarea')?.focus({ preventScroll: true });
      card.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }

  function selectMode(value: 'rdv' | 'devis') {
    mode = value; modeInput.value = value;
    card.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(button => {
      const selected = button.dataset.mode === mode;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    setStep(1);
  }

  card.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(button => {
    button.addEventListener('click', () => selectMode(button.dataset.mode as 'rdv' | 'devis'));
  });
  card.querySelector('[data-next]')?.addEventListener('click', () => {
    if (form.reportValidity()) setStep(2, true);
  });
  card.querySelector('[data-back]')?.addEventListener('click', () => setStep(1, true));

  photos.addEventListener('change', () => {
    const files = [...(photos.files || [])];
    const invalid = files.find(file => !['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024);
    const error = files.length > 3 ? 'Choisissez 3 photos maximum.' : invalid ? 'Chaque photo doit être un JPG, PNG ou WebP de 5 Mo maximum.' : '';
    clearPhotos.hidden = files.length === 0;
    photos.setCustomValidity(error);
    photoStatus.textContent = error || (files.length ? `${files.map(file => file.name).join(' · ')}. Aucun fichier ne sera envoyé.` : photoHint);
    if (error) photos.reportValidity();
  });

  clearPhotos.addEventListener('click', () => {
    photos.value = ''; photos.setCustomValidity('');
    photoStatus.textContent = photoHint; clearPhotos.hidden = true;
    photos.focus();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    // Enter on step one follows the same validation path as Continue.
    if (!steps[0].hidden) {
      if (form.reportValidity()) setStep(2, true);
      return;
    }
    if (!form.reportValidity()) return;
    // Read selected first-step controls while retaining native fieldset validation.
    const date = form.querySelector<HTMLInputElement>('[name="date"]:checked')?.value;
    const slot = form.querySelector<HTMLInputElement>('[name="slot"]:checked')?.value;
    const city = (form.elements.namedItem('city') as HTMLInputElement).value;
    const summary = card.querySelector<HTMLElement>('[data-summary]')!;
    summary.replaceChildren();
    const lines = [serviceInput.selectedOptions[0].text, city, mode === 'rdv' ? `${date || ''} · ${slot || ''}` : 'Demande de devis simulée'];
    lines.forEach(text => { const line = document.createElement('p'); line.textContent = text; summary.append(line); });
    form.hidden = true; progress.hidden = true; success.hidden = false;
    form.reset(); photos.setCustomValidity(''); photoStatus.textContent = photoHint; clearPhotos.hidden = true;
    success.focus({ preventScroll: true });
    card.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });

  card.querySelector('[data-restart]')?.addEventListener('click', () => {
    form.reset(); photos.setCustomValidity(''); photoStatus.textContent = photoHint;
    selectMode(mode); setStep(1, true);
  });

  const params = new URLSearchParams(window.location.search);
  selectMode(params.get('mode') === 'devis' ? 'devis' : 'rdv');
  const requestedService = params.get('service');
  if (requestedService && [...serviceInput.options].some(option => option.value === requestedService)) serviceInput.value = requestedService;
  const city = params.get('ville');
  if (city) (form.elements.namedItem('city') as HTMLInputElement).value = city.slice(0,100);
}
