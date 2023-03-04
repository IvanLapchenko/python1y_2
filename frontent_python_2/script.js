window.onload = (event) => {
const form = document.querySelector('#event-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  fetch('http://127.0.0.1:5000/create_event', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => console.log(data))
    .catch(error => console.error(error));
});


const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const today_date = `${year}-${month}-${day}`;


const apiUrl = `http://127.0.0.1:5000/get_events_by/${today_date}`

fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
            console.log(data);
        })
      .catch(error => {
        console.error('Error:', error);
      });

}