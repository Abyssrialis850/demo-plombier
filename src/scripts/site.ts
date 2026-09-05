import { setupBooking } from './booking';

const header = document.querySelector<HTMLElement>('[data-header]');
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 35);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Native dialogs supply focus containment, Escape and focus restoration.
const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
document.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog => {
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
    }
  });
});
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
menuButton?.addEventListener('click', () => {
  menu?.showModal();
  menuButton.setAttribute('aria-expanded', 'true');
});
document.querySelector('[data-menu-close]')?.addEventListener('click', () => menu?.close());
menu?.addEventListener('close', () => menuButton?.setAttribute('aria-expanded', 'false'));
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.replace('reveal-pending', 'reveal-ready');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 15px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight * 0.95) {
      element.classList.add('reveal-pending');
      observer.observe(element);
    }
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.reveal-pending').forEach(element => element.classList.remove('reveal-pending'));
    }
  });
}

document.querySelectorAll<HTMLDetailsElement>('[data-service]').forEach(details => {
  details.querySelector('summary')?.addEventListener('click', event => {
    event.preventDefault();
    const opening = !details.open;
    if (opening) document.querySelectorAll<HTMLDetailsElement>('[data-service]').forEach(other => { if (other !== details) other.open = false; });
    details.open = opening;
  });
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    document.querySelectorAll<HTMLElement>('[data-service-image]').forEach(image => {
      image.classList.toggle('is-active', image.dataset.serviceImage === details.dataset.service);
    });
  });
});

document.querySelectorAll<HTMLElement>('[data-comparison]').forEach(comparison => {
  const range = comparison.querySelector<HTMLInputElement>('input[type="range"]');
  if (!range) return;
  const render = () => {
    comparison.style.setProperty('--position', `${range.value}%`);
    range.setAttribute('aria-valuetext', `${range.value} % avant, ${100 - Number(range.value)} % après`);
  };
  range.addEventListener('input', render);
  // Explicit handling keeps the visual handle aligned across touch engines.
  let dragging = false;
  const move = (event: PointerEvent) => {
    const rect = range.getBoundingClientRect();
    range.value = String(Math.round(Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100))));
    render();
  };
  range.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging = true;
    move(event);
    range.focus({ preventScroll: true });
    try { range.setPointerCapture(event.pointerId); } catch { /* Synthetic events need no capture. */ }
  });
  range.addEventListener('pointermove', event => { if (dragging) move(event); });
  range.addEventListener('pointerup', () => dragging = false);
  range.addEventListener('pointercancel', () => dragging = false);
  range.addEventListener('keydown', event => {
    const increments: Record<string, number> = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, PageDown: -10, PageUp: 10 };
    if (event.key !== 'Home' && event.key !== 'End' && !(event.key in increments)) return;
    event.preventDefault();
    range.value = event.key === 'Home' ? '0' : event.key === 'End' ? '100' : String(Number(range.value) + increments[event.key]);
    render();
  });
});

const projectDialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
document.querySelectorAll<HTMLButtonElement>('[data-project-open]').forEach(button => {
  button.addEventListener('click', () => {
    if (!projectDialog) return;
    const image = projectDialog.querySelector<HTMLImageElement>('[data-dialog-image]');
    if (image) {
      image.src = button.dataset.image || '';
      image.alt = button.dataset.alt || '';
    }
    const content: Record<string, string | undefined> = {
      '#project-dialog-title': button.dataset.title,
      '[data-dialog-description]': button.dataset.description,
      '[data-dialog-scope]': button.dataset.scope,
      '[data-dialog-place]': button.dataset.place,
    };
    Object.entries(content).forEach(([selector, text]) => {
      const target = projectDialog.querySelector(selector);
      if (target) target.textContent = text || '';
    });
    projectDialog.showModal();
  });
});
document.querySelector('[data-project-close]')?.addEventListener('click', () => projectDialog?.close());
projectDialog?.addEventListener('click', event => {
  if (event.target !== projectDialog) return;
  const rect = projectDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) projectDialog.close();
});

document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(filterButton => {
      const active = filterButton === button;
      filterButton.classList.toggle('is-active', active);
      filterButton.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll<HTMLElement>('[data-category]').forEach(project => {
      project.hidden = filter !== 'all' && project.dataset.category !== filter;
      if (!project.hidden) count++;
    });
    document.querySelector('[data-project-grid]')?.classList.toggle('is-filtered', filter !== 'all');
    const status = document.querySelector('[data-filter-status]');
    if (status) status.textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}`;
  });
});

document.querySelectorAll<HTMLElement>('[data-booking]').forEach(setupBooking);
