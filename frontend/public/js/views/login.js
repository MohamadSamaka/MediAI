import { loadStyles } from "../helpers/stylesManager.js";
import { login } from "../api/authAPI.js";


export function render() {
  return `
    <form id="userForm">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" value="admin@example.com"><br><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" value="AdminPass123"><br><br>
    <input type="button" value="Submit" id="submit-btn">  </form>
    `;
}

export function init(styles, params) {
  function submitForm() {
    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
  
    login(formData)
  }

  document.querySelector("#submit-btn").addEventListener("click", submitForm)
  
  loadStyles(styles);
}
