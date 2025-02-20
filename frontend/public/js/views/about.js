import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h2>About</h2>
      <p>This is an advanced example that uses a fixed layout with dynamic content.</p>
    `;
}

export function init(styles, params) {
  loadStyles(styles);
}
