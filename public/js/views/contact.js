import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `

     <!------------- TOPBAR --------------->
    <div class="topbar" id="topbar"></div>
    <div class="line-temp"></div>
      
         <div class="space-down" style="margin-top: 140px;"></div>
     <h1 style="text-align: center;">Contact Us</h1>
<div class="header">
    
    </div>
    
    <div class="info-container">
      <div class="info-box">
        <!-- You can replace the img src with an actual icon -->
        <!-- <img src="https://via.placeholder.com/50" alt="Office Icon" /> -->
        <i class="fa-solid fa-building icon-contact"></i>
        <h3>OUR MAIN OFFICE</h3>
        <p>SoHo 94 Broadway St<br />New York, NY 1001</p>
      </div>
      <div class="info-box">
        <!-- <img src="https://via.placeholder.com/50" alt="Phone Icon" /> -->
        <i class="fa-solid fa-phone icon-contact"></i>
        <h3>PHONE NUMBER</h3>
        <p>234-9876-5400<br />888-0123-4567 (Toll Free)</p>
      </div>
      <div class="info-box">
        <i class="fa-solid fa-fax icon-contact"></i>
        <!-- <img src="https://via.placeholder.com/50" alt="Fax Icon" /> -->
        <h3>FAX</h3>
        <p>1-234-567-8900</p>
      </div>
      <div class="info-box">
        <i class="fa-solid fa-envelope icon-contact"></i>
        <!-- <img src="https://via.placeholder.com/50" alt="Email Icon" /> -->
        <h3>EMAIL</h3>
        <p>hello@thetheme.com</p>
      </div>
    </div>

    <!-- Main Contact Section -->
    <div class="contact-section">
      <div class="contact-left">
        <h2>Contact info</h2>
        <p>
          Connect with us to learn more about our innovative AI bot integration
          solutions for hospitals. Whether you have questions, need support, or
          are interested in partnering, we're here to help streamline healthcare
          communication and service delivery. Reach out today to start the
          conversation!
        </p>
        <img src="./assests/imgs/logo_2.png" alt= />
      </div>
      <div class="contact-right">
        <form action="#" method="post">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter a valid email address"
          />

          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
          />

          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Enter your message"
          ></textarea>

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>

    
          <!------------- FOOTER --------------->
      <div class="footer" id="footer"></div>


      
    <!------------- SIDEBAR --------------->
    <div class="sidebar" id="sidebar"></div>

        <script src="./js/components/sidebar.js"></script>

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
