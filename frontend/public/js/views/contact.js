import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h2>Contact</h2>
      <p>Contact us at <a href="mailto:contact@example.com">contact@example.com</a>.</p>
    `;
}

export function init(styles, params) {
  loadStyles(styles);
}
