import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <div class="container">
      <h1 id="title-about">About MedicalAI</h1>
     
      <div class="section">
        <h2>Our Vision</h2>
        <p>
          Welcome to our cutting-edge AI chat project—a revolutionary platform
          that merges the brilliance of artificial intelligence with seamless,
          real-time communication. Our vision is to empower every user with a
          dynamic, intuitive, and futuristic chat experience.
        </p>
      </div>
      <div class="section ai-style">
        <h2>What We Do</h2>
        <p>
          Leveraging state-of-the-art AI algorithms, our platform delivers
          intelligent and adaptive chat interactions. With a sleek, dark-mode
          interface and fluid transitions, our project is designed for those who
          crave an immersive, modern digital communication experience.
        </p>
      </div>
      <div class="section">
        <h2>Technology &amp; Design</h2>
        <p>
          Our project is built with the latest web technologies—HTML, CSS, and
          JavaScript—ensuring a responsive, robust, and visually stunning
          interface. Inspired by futuristic AI aesthetics, every detail is
          crafted to provide a smooth and engaging user journey.
        </p>
      </div>
      <div class="section">
        <h2>Join the Revolution</h2>
        <p>
          We’re not just building a chat interface; we’re shaping the future of
          communication. Whether you’re a tech enthusiast, developer, or simply
          curious about AI, explore our platform and become a part of the next
          generation of intelligent conversation.
        </p>
      </div>
    </div>
    `;
}

export function init(styles, params) {
  loadStyles(styles);
}
