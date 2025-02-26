import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
    <div class="container">
      <img src="../public/imgs/logo_2.png" alt="" />
      <h1>404</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <a href="/frontend/pages/index.html">Go back to the homepage</a>
    </div>
    `;
}

export function init(styles, params) {
  loadStyles(styles);
}
