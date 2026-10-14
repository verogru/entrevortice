const siteConfig = {
  contactEmail: 'info@entrevortice.com',
  whatsappNumber: '584142136222',
  instagramUrl: 'https://instagram.com/entrevortice',
  domain: 'https://entrevortice.com'
};

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const navLinks = document.querySelectorAll('.site-nav a, .mobile-panel a');
const audienceCards = document.querySelectorAll('.audience-card');
const currentYear = document.querySelector('#current-year');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('[data-form-status]');
const segmentInput = document.querySelector('#segment');
const whatsappLinks = document.querySelectorAll('[data-whatsapp-link]');
const contactStatus = document.querySelector('[data-contact-status]');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) return;
  if (window.scrollY > 18) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

const closeMobileMenu = () => {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
};

const openMobileMenu = () => {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.hidden = false;
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute('href'));
  if (!section) return;
  const updateActiveLink = () => {
    const isActive = section.getBoundingClientRect().top <= 140 && section.getBoundingClientRect().bottom >= 140;
    link.classList.toggle('active', isActive);
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

audienceCards.forEach((card) => {
  const setSelected = () => {
    audienceCards.forEach((item) => item.classList.toggle('selected', item === card));
    const selectedSegment = card.dataset.segment || '';
    if (segmentInput) {
      segmentInput.value = selectedSegment;
    }
  };

  card.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    setSelected();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelected();
    }
  });
});

const showFormStatus = (message, type) => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove('error', 'success');
  if (type) {
    formStatus.classList.add(type);
  }
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

if (siteConfig.contactEmail) {
  if (contactStatus) {
    contactStatus.textContent = siteConfig.contactEmail;
  }
} else if (contactStatus) {
  contactStatus.textContent = 'Configuración pendiente';
}

if (siteConfig.whatsappNumber) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;
  whatsappLinks.forEach((link) => {
    link.href = whatsappUrl;
    link.hidden = false;
    link.setAttribute('aria-label', 'Contactar por WhatsApp');
  });
} else {
  whatsappLinks.forEach((link) => {
    link.hidden = true;
    link.removeAttribute('href');
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const consent = formData.get('consent');

    if (!name || name.length < 2) {
      showFormStatus('Introduce tu nombre para poder responderte.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormStatus('Introduce un correo electrónico válido.', 'error');
      return;
    }

    if (!message || message.length < 20) {
      showFormStatus('Cuéntanos un poco más sobre el desafío que necesitas resolver.', 'error');
      return;
    }

    if (!consent) {
      showFormStatus('Debes aceptar la política de privacidad antes de enviar la consulta.', 'error');
      return;
    }

    if (!siteConfig.contactEmail) {
      showFormStatus('Todavía no está configurado el correo corporativo. Configura la dirección de contacto antes de publicar esta web.', 'error');
      return;
    }

    const subject = `Consulta de ${name}`;
    const body = [
      `Nombre: ${name}`,
      `Empresa: ${String(formData.get('company') || 'No indicada')}`,
      `Correo: ${email}`,
      `Tipo de organización: ${String(formData.get('organization') || 'No indicado')}`,
      `Segmento: ${String(formData.get('segment') || 'No indicado')}`,
      '',
      'Descripción del desafío:',
      message
    ].join('\n');

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showFormStatus('Gracias por escribirnos. Hemos preparado el envío con tu consulta.', 'success');
  });
}
