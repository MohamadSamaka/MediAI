import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
         <!------------- TOPBAR --------------->
    <div class="topbar" id="topbar"> </div>
    <div class="line-temp"></div>

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
     
     <!------------- SIDEBAR --------------->
     <div class="sidebar" id="sidebar"></div>
     <script src="../components/sidebar.js"></script>
      <!------------- FOOTER --------------->
      <div class="footer" id="footer">

            <!-- Load the translator script -->
    <script src="../../translator.js"></script>

    `;
}

export function init(styles, params) {
  loadStyles(styles);

  const path_components = "components/";
  const sections_folder = "main_sections/";

  // ---------------- IMPORT SECTIONS/PARTS ------------
  function load_sections() {
    const arr_sections = ["1", "2", "3", "4", "5", "6", "7"];
    for (let i = 0; i < arr_sections.length; i++) {
      let path =
        "./js/" +
        path_components +
        sections_folder +
        "s" +
        arr_sections[i] +
        ".html";
      let name = "section-section" + arr_sections[i];
      import_html(path, name);
    }
  }

  // ------------------- IMPORT COMPONENTS --------------------
  function load_components() {
    const arr_components = ["topbar", "footer", "sidebar", "second-topbar"];
    for (let i = 0; i < arr_components.length; i++) {
      let path = "./js/" + path_components + arr_components[i] + ".html";
      let name = arr_components[i];
      import_html(path, name);
    }
  }

  // ----- helper function to import HTML -------------
  function import_html(path, name) {
    fetch(path)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById(name).innerHTML = html;
        // If the topbar is loaded, update the user-name title
        if (name === "topbar") {
          setTitle();
        }
      });
  }

  // ---------------- Local Storage Functions ----------------
  function setUserRole(role) {
    // Always stringify the role value
    localStorage.setItem("userRole", JSON.stringify(role));
  }

  function getUserRole() {
    const userRole = localStorage.getItem("userRole");
    try {
      return JSON.parse(userRole);
    } catch (error) {
      console.error("Error parsing userRole:", error);
      return null;
    }
  }

  // Ensure the DOM is fully loaded before importing components and sections

  load_sections();
  load_components();
}
