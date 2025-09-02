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
  if (name.value === '' || name.value === null) {
    messages.push('Please enter a name!')
  }
  if (password.value.length <= MIN_PASSWORD_LENGTH || password.contains('')){
    messages.push('Minimum passowrd must be ' + MIN_PASSWORD_LENGTH + ' characters long!')
  }
  if (password.value !== confirm_password.value){
    messages.push('Confirmation password does not match!')
  }




  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
  }

})