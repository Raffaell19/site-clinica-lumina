/**
 * CLÍNICA LUMINA — ESTÉTICA FACIAL & CORPORAL (PORTO ALEGRE)
 * JavaScript Interativo: Abas, Menu Mobile, FAQ, Validação & Fluxo Dinâmico
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MENU MOBILE (DRAWER AUTO-FECHÁVEL)
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .btn-mobile-full');

  function toggleMobileMenu() {
    const isOpen = hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (hamburgerBtn.classList.contains('active')) {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Regra Connect Digital: Fechar o menu ao clicar em qualquer link de âncora
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ==========================================================================
     2. ABAS INTERATIVAS (TRATAMENTOS FACIAIS VS. CORPORAIS)
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');

      // Atualiza botões
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Alterna painéis
      tabPanels.forEach(panel => {
        if (panel.id === `panel${target.charAt(0).toUpperCase() + target.slice(1)}`) {
          panel.removeAttribute('hidden');
          // Força reflow antes de adicionar a classe para acionar animação
          void panel.offsetWidth;
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });
  });

  /* ==========================================================================
     3. PRÉ-SELEÇÃO AUTOMÁTICA DE PROCEDIMENTO A PARTIR DOS CARDS
     ========================================================================== */
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  const serviceSelect = document.getElementById('clientService');
  const bookingSection = document.getElementById('agendamento');

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');

      if (serviceSelect && serviceName) {
        // Encontra opção correspondente ou mais próxima
        let found = false;
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.includes(serviceName) || serviceName.includes(serviceSelect.options[i].value)) {
            serviceSelect.selectedIndex = i;
            found = true;
            break;
          }
        }

        if (found) {
          serviceSelect.classList.remove('error');
          const errorMsg = document.getElementById('serviceError');
          if (errorMsg) errorMsg.classList.remove('visible');

          // Destaque visual temporário no campo
          serviceSelect.style.borderColor = 'var(--color-primary)';
          serviceSelect.style.backgroundColor = 'var(--color-primary-light)';
          setTimeout(() => {
            serviceSelect.style.borderColor = '';
            serviceSelect.style.backgroundColor = '';
          }, 1400);
        }

        // Rolagem suave até o formulário
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ==========================================================================
     4. FAQ ACCORDION (DÚVIDAS FREQUENTES)
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const collapse = item.querySelector('.accordion-collapse');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Fecha outros itens
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.accordion-header');
          const otherCollapse = otherItem.querySelector('.accordion-collapse');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherCollapse) otherCollapse.style.maxHeight = null;
        }
      });

      // Alterna item atual
      if (isExpanded) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        collapse.style.maxHeight = null;
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     5. MÁSCARA AUTOMÁTICA DE WHATSAPP (51) 9XXXX-XXXX
     ========================================================================== */
  const phoneInput = document.getElementById('clientPhone');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.substring(0, 11);

      if (val.length > 6) {
        e.target.value = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
      } else if (val.length > 2) {
        e.target.value = `(${val.substring(0, 2)}) ${val.substring(2)}`;
      } else if (val.length > 0) {
        e.target.value = `(${val}`;
      }
    });
  }

  /* ==========================================================================
     6. FORMULÁRIO VIP COM FLUXO DINÂMICO
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const successBox = document.getElementById('successBox');
  const submitBtn = document.getElementById('submitBtn');
  const resetFormBtn = document.getElementById('resetFormBtn');

  if (bookingForm && successBox) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const serviceInput = document.getElementById('clientService');
      const shiftInput = document.getElementById('clientShift');
      const notesInput = document.getElementById('clientNotes');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const serviceVal = serviceInput ? serviceInput.value : '';
      const shiftVal = shiftInput ? shiftInput.value : '';
      const notesVal = notesInput ? notesInput.value.trim() : '';

      let isValid = true;

      // Validação Nome
      if (!nameVal || nameVal.length < 3) {
        showError('clientName', 'nameError', true);
        isValid = false;
      } else {
        showError('clientName', 'nameError', false);
      }

      // Validação Telefone
      const digits = phoneVal.replace(/\D/g, '');
      if (!phoneVal || digits.length < 10) {
        showError('clientPhone', 'phoneError', true);
        isValid = false;
      } else {
        showError('clientPhone', 'phoneError', false);
      }

      // Validação Serviço
      if (!serviceVal) {
        showError('clientService', 'serviceError', true);
        isValid = false;
      } else {
        showError('clientService', 'serviceError', false);
      }

      if (!isValid) return;

      // Estado de Carregamento
      if (submitBtn) {
        submitBtn.disabled = true;
        const textSpan = submitBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = 'Registrando com prioridade...';
      }

      // Simulação de processamento instantâneo
      setTimeout(() => {
        // Preenche dados do sucesso
        const successName = document.getElementById('successName');
        const successService = document.getElementById('successService');
        const successShift = document.getElementById('successShift');

        if (successName) successName.textContent = nameVal;
        if (successService) successService.textContent = serviceVal;
        if (successShift) successShift.textContent = shiftVal;

        // Monta Mensagem WhatsApp Dinâmica Formatada
        let whatsappMsg = `*SOLICITAÇÃO DE AVALIAÇÃO VIP — CLÍNICA LUMINA*%0A%0A`;
        whatsappMsg += `Olá! Acabei de me cadastrar no site para agendar uma avaliação em Porto Alegre.%0A%0A`;
        whatsappMsg += `• *Nome:* ${encodeURIComponent(nameVal)}%0A`;
        whatsappMsg += `• *WhatsApp:* ${encodeURIComponent(phoneVal)}%0A`;
        whatsappMsg += `• *Procedimento:* ${encodeURIComponent(serviceVal)}%0A`;
        whatsappMsg += `• *Turno Preferido:* ${encodeURIComponent(shiftVal)}%0A`;
        if (notesVal) {
          whatsappMsg += `• *Observações:* ${encodeURIComponent(notesVal)}%0A`;
        }
        whatsappMsg += `%0AAguardo o retorno da recepção com os horários disponíveis!`;

        const waUrl = `https://wa.me/5551998777570?text=${whatsappMsg}`;

        const directWhatsAppBtn = document.getElementById('directWhatsAppBtn');
        if (directWhatsAppBtn) {
          directWhatsAppBtn.href = waUrl;
        }

        // Oculta Formulário e Mostra Card de Sucesso
        bookingForm.style.display = 'none';
        successBox.removeAttribute('hidden');

        // Fluxo Dinâmico: Disparo suave para o WhatsApp em nova aba após 1.2s
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1200);

      }, 600);
    });

    // Resetar formulário
    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        bookingForm.reset();
        bookingForm.style.display = 'flex';
        successBox.setAttribute('hidden', '');
        if (submitBtn) {
          submitBtn.disabled = false;
          const textSpan = submitBtn.querySelector('.btn-text');
          if (textSpan) textSpan.textContent = 'Confirmar Agendamento VIP';
        }
      });
    }
  }

  function showError(fieldId, errorId, show) {
    const field = document.getElementById(fieldId);
    const err = document.getElementById(errorId);
    if (field) {
      if (show) field.classList.add('error');
      else field.classList.remove('error');
    }
    if (err) {
      if (show) err.classList.add('visible');
      else err.classList.remove('visible');
    }
  }

});
