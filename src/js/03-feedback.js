import throttle from 'lodash.throttle';


const formEl = document.querySelector(".feedback-form");
const mailInput = document.querySelector('.feedback-form input');
const messageInput = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = "feedback-form-state";

const formData = { 
    email: "",
    message: "",
};


formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onInputChange, 500));

getStorageData();

function onInputChange() {

    if (mailInput.value || messageInput.value) {
      formData.email = mailInput.value;
      formData.message = messageInput.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }

  function getStorageData() {
    const storageData = localStorage.getItem(STORAGE_KEY);
    if (storageData) {
      mailInput.value = (JSON.parse(storageData)).email || "";
      messageInput.value = (JSON.parse(storageData)).message || "";
    }
  }
  

  function onFormSubmit(evt) {
    evt.preventDefault();
    const {
        elements: { email, message }
    } = evt.target;

    if (!email.value.trim() || !message.value.trim()) {
      alert('Всі поля мають бути заповнені!');
    } else {
      formData.email = email.value.trim();
      formData.message = message.value.trim();
      console.log(formData);
  
      evt.currentTarget.reset();
      localStorage.removeItem(STORAGE_KEY);
      formData.email = "";
      formData.message = "";
    }
    
  }
