// Google Sheets registration logging
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxOQSQO8-X_pEom7gBzwgfWqyZC7MUSIaKkDKHU1NePIm1bcpjHgoIvPnswKiszAXQoyQ/exec';

function showLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = '<div class="loading-spinner"></div><p>Registering...</p>';
  document.body.appendChild(overlay);
}

function hideLoadingOverlay() {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) overlay.remove();
}

async function sendToGoogleSheet(name, email, group, price) {
  showLoadingOverlay();
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, group, price })
    });
  } catch (error) {
    console.error('Failed to log registration:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const select = document.querySelector('.register-dropdown');
  if (!select) return;

  const btn = select.parentElement.querySelector('.register-btn');
  const nameInput = document.getElementById('register-name');
  const emailInput = document.getElementById('register-email');
  const eventName = select.dataset.eventName || 'Event';

  function updateBtn() {
    const hasName = nameInput?.value.trim();
    const hasEmail = emailInput?.value.trim();
    const hasPricing = select.value;
    btn.disabled = !(hasName && hasEmail && hasPricing);
  }

  select.addEventListener('change', updateBtn);
  nameInput?.addEventListener('input', updateBtn);
  emailInput?.addEventListener('input', updateBtn);

  btn.addEventListener('click', async function () {
    const selectedOption = select.options[select.selectedIndex];
    const priceText = selectedOption.text;
    const stripeUrl = selectedOption.dataset.stripeUrl;

    await sendToGoogleSheet(
      nameInput.value.trim(),
      emailInput.value.trim(),
      eventName,
      priceText
    );

    if (!stripeUrl) {
      window.location.href = '/event-confirmation';
    } else {
      window.location.href = stripeUrl;
    }
  });
});
