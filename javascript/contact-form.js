document.getElementById('consultation-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Reset all errors
  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('visible'));
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  document.getElementById('form-error-summary').style.display = 'none';

  const missingFields = [];

  // Check First Name
  const firstName = document.getElementById('first-name');
  if (!firstName.value.trim()) {
    document.getElementById('first-name-error').classList.add('visible');
    firstName.classList.add('error');
    missingFields.push('First Name');
  }

  // Check Last Name
  const lastName = document.getElementById('last-name');
  if (!lastName.value.trim()) {
    document.getElementById('last-name-error').classList.add('visible');
    lastName.classList.add('error');
    missingFields.push('Last Name');
  }

  // Check Email
  const email = document.getElementById('email');
  if (!email.value.trim()) {
    document.getElementById('email-error').classList.add('visible');
    email.classList.add('error');
    missingFields.push('Email');
  }

  // Check Phone
  const phone = document.getElementById('phone');
  if (!phone.value.trim()) {
    document.getElementById('phone-error').classList.add('visible');
    phone.classList.add('error');
    missingFields.push('Phone');
  }

  // Check Dropdown
  const interested = document.getElementById('interested');
  if (!interested.value) {
    document.getElementById('interested-error').classList.add('visible');
    interested.classList.add('error');
    missingFields.push('Dropdown');
  }

  // Show summary if there are errors
  if (missingFields.length > 0) {
    document.getElementById('error-list').textContent = missingFields.join(', ');
    document.getElementById('form-error-summary').style.display = 'block';
    document.getElementById('form-error-summary').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return; // Stop here if there are errors
  }

  // Form is valid, prepare data
  const formData = {
    _subject: 'New Consultation Request from Big Talk Counseling',
    'Name': `${firstName.value.trim()} ${lastName.value.trim()}`,
    'Pronouns': document.getElementById('pronouns').value.trim(),
    'Email': email.value.trim(),
    'Phone': phone.value.trim(),
    'Interested In': interested.value,
    'Message': document.getElementById('message').value.trim()
};

  // Send to Formspree
  try {
    const response = await fetch('https://formspree.io/f/xwvnkroj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to send');
    }

    // Hide form and error summary, show success message
    document.getElementById('consultation-form').style.display = 'none';
    document.getElementById('form-error-summary').style.display = 'none';
    const successMessage = document.getElementById('form-success-message');
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (error) {
    // Show error to user
    alert('Sorry, there was an error submitting your form. Please try again or contact us directly.');
    console.error('Form submission error:', error);
  }
});