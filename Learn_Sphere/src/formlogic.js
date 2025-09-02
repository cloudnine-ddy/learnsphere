const name = document .getElementById('name')
const email = document.getElementById('email')
const role = document .getElementById('role')
const password = document .getElementById('password')
const confirm_password = document .getElementById('confirm_password')
const token = document.getElementById('token')
const errorElement = document .getElementById('error')
const form = document .getElementById('form')

const VALID_TOKEN = null
const MIN_PASSWORD_LENGTH = 5

form.addEventListener('submit', (e) => {
  let messages= []  //error messages
  const pw = password.value;
  let nameVal = name.value;

  if (nameVal.trim() === '' ) {
    messages.push('Please enter a name!')
  }
  if (nameVal !== nameVal.trim()) {
    messages.push("Invalid character in name!")
  }
  if (pw.length < MIN_PASSWORD_LENGTH ){
    messages.push('Minimum password must be ' + MIN_PASSWORD_LENGTH + ' characters long!')
  }
  if (!/^\S+$/.test(pw)) {
    messages.push("Invalid character in password!")
  }
  if (pw !== confirm_password.value){
    messages.push('Confirmation password does not match!')
  }




  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join('\n ')
  }

})