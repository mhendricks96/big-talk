// Event registration - Stripe payment links
const digitalParentingLinks = {
  '0': 'https://buy.stripe.com/test_fZu8wIegPc4se431XJ7g401',
  '5': 'https://buy.stripe.com/test_14AaEQ1u36K89NNbyj7g402',
  '10': 'https://buy.stripe.com/test_8x26oA8Wv0lK2ll6dZ7g403',
  '20': 'https://buy.stripe.com/test_4gMcMYc8H7Ocgcb45R7g404',
  '50': 'https://buy.stripe.com/test_14AeV6c8H8Sggcbauf7g405'
};

const journalingLinks = {
  'sample1': 'https://buy.stripe.com/sample-journaling-1',
  'sample2': 'https://buy.stripe.com/sample-journaling-2',
  'sample3': 'https://buy.stripe.com/sample-journaling-3'
};

document.addEventListener('DOMContentLoaded', function() {
  // Digital Parenting event
  const digitalSelect = document.getElementById('register-digital');
  const digitalBtn = digitalSelect?.parentElement.querySelector('.register-btn');

  if (digitalSelect && digitalBtn) {
    digitalSelect.addEventListener('change', function() {
      digitalBtn.disabled = !this.value;
    });

    digitalBtn.addEventListener('click', function() {
      const selected = digitalSelect.value;
      const link = digitalParentingLinks[selected];
      if (link) {
        window.location.href = link;
      }
    });
  }

  // Journaling event
  const journalingSelect = document.getElementById('register-journaling');
  const journalingBtn = journalingSelect?.parentElement.querySelector('.register-btn');

  if (journalingSelect && journalingBtn) {
    journalingSelect.addEventListener('change', function() {
      journalingBtn.disabled = !this.value;
    });

    journalingBtn.addEventListener('click', function() {
      const selected = journalingSelect.value;
      const link = journalingLinks[selected];
      if (link) {
        window.location.href = link;
      }
    });
  }
});
