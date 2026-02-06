document.getElementById('consultation-form').addEventListener('submit', function(e) {
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
  } else {
    // Form is valid, submit it
    // this.submit();

    const formData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      pronouns: document.getElementById('pronouns').value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      interested: interested.value,
      message: document.getElementById('message').value.trim()
    };
    console.log('Form submission:', formData);
  }
});
