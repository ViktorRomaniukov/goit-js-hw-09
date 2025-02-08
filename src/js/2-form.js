const form = document.querySelector('.feedback-form');
const emailInput = form.elements['email'];
const messageInput = form.elements['message'];
const storedFormData = localStorage.getItem('feedback-form-state');
const formData = { email: '', message: '' };

if (storedFormData) {
  const { email, message } = JSON.parse(storedFormData);

  formData.email = emailInput.value = email;
  formData.message = messageInput.value = message;
}

function handleInput(e) {
  const input = e.target;

  formData[input.name] = input.value.trim();

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const message = messageInput.value;

  if (!email || !message) return showMessage('Fill please all fields');

  console.log({...formData});
  localStorage.clear();
  formData.email = '';
  formData.message = '';
  emailInput.value = '';
  messageInput.value = '';
}

function showMessage(messageText) {
  const message = document.getElementById('message');

  message.textContent = messageText;
  message.classList.remove('hidden');
  message.classList.add('show');

  setTimeout(() => {
    message.classList.remove('show');
    message.classList.add('hidden');
  }, 3000);
}

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);