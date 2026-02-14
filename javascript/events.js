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

// Event registration - Stripe payment links
const digitalParentingLinks = {
  '0': 'This will not be a link',
  '5': 'https://buy.stripe.com/9B63coa0m2as9MlcHOgjC07',
  '10': 'https://buy.stripe.com/28E9AM4G2dTagaJcHOgjC06',
  '20': 'https://buy.stripe.com/6oUfZa0pM2as4s14bigjC05',
  '50': 'https://buy.stripe.com/14A00c1tQdTacYx7nugjC04'
};

const disabledJoyLinks = {
  '0': 'this will not be a link',
  '5': 'https://buy.stripe.com/4gM14g2xU6qIgaJcHOgjC00',
  '10': 'https://buy.stripe.com/aFa6oAegCaGY5w55fmgjC03',
  '20': 'https://buy.stripe.com/eVq00cc8u7uM1fP0Z6gjC01',
  '50': 'https://buy.stripe.com/7sY9AM3BYcP65w537egjC02'
};

document.addEventListener('DOMContentLoaded', function() {
  // Digital Parenting event
  const digitalSelect = document.getElementById('register-digital');
  const digitalBtn = digitalSelect?.parentElement.querySelector('.register-btn');

  const digitalName = document.getElementById('register-name');
  const digitalEmail = document.getElementById('register-email');

  if (digitalSelect && digitalBtn) {
    function updateDigitalBtn() {
      const hasName = digitalName?.value.trim();
      const hasEmail = digitalEmail?.value.trim();
      const hasPricing = digitalSelect.value;
      digitalBtn.disabled = !(hasName && hasEmail && hasPricing);
    }

    digitalSelect.addEventListener('change', updateDigitalBtn);
    digitalName?.addEventListener('input', updateDigitalBtn);
    digitalEmail?.addEventListener('input', updateDigitalBtn);

    digitalBtn.addEventListener('click', async function() {
      const selected = digitalSelect.value;
      const priceText = digitalSelect.options[digitalSelect.selectedIndex].text;
      await sendToGoogleSheet(
        digitalName.value.trim(),
        digitalEmail.value.trim(),
        'Digital Parenting',
        priceText
      );
      if (selected === '0') {
        window.location.href = 'event-confirmation.html';
      } else {
        window.location.href = digitalParentingLinks[selected];
      }
    });
  }

  // Disabled Joy event
  const disabledJoySelect = document.getElementById('register-disabled-joy');
  const disabledJoyBtn = disabledJoySelect?.parentElement.querySelector('.register-btn');

  const disabledJoyName = document.getElementById('register-name');
  const disabledJoyEmail = document.getElementById('register-email');

  if (disabledJoySelect && disabledJoyBtn) {
    function updateDisabledJoyBtn() {
      const hasName = disabledJoyName?.value.trim();
      const hasEmail = disabledJoyEmail?.value.trim();
      const hasPricing = disabledJoySelect.value;
      disabledJoyBtn.disabled = !(hasName && hasEmail && hasPricing);
    }

    disabledJoySelect.addEventListener('change', updateDisabledJoyBtn);
    disabledJoyName?.addEventListener('input', updateDisabledJoyBtn);
    disabledJoyEmail?.addEventListener('input', updateDisabledJoyBtn);

    disabledJoyBtn.addEventListener('click', async function() {
      const selected = disabledJoySelect.value;
      const priceText = disabledJoySelect.options[disabledJoySelect.selectedIndex].text;
      await sendToGoogleSheet(
        disabledJoyName.value.trim(),
        disabledJoyEmail.value.trim(),
        'Journaling for Disabled Joy',
        priceText
      );
      if (selected === '0') {
        window.location.href = 'event-confirmation.html';
      } else {
        window.location.href = disabledJoyLinks[selected];
      }
    });
  }
});
