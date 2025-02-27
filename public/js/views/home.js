import { loadStyles } from "../helpers/stylesManager.js";
import { getUsers } from "../api/userAPI.js";

export function render() {
  return `
    <!------------- TOPBAR --------------->
    <div class="topbar" id="topbar"></div>

    <!------------- SECOND TOPBAR --------------->
    <div class="second-topbar" id="second-topbar"></div>
    <!-- <div class="line-temp"></div> -->

    <div class="main-container">
      <!------------- SECTIONS/PARTS --------------->
      <div class="gradient-wrapper">
        <div class="section-section1" id="section-section1"></div>
      </div>
   
      <div class="section-section2" id="section-section2"></div>
      <div class="section-section3" id="section-section3"></div>
      <div id="section-section4"></div>
      <div id="section-section5"></div>
      <div id="section-section6"></div>
      <div id="section-section7"></div>
      <!------------- FOOTER --------------->
      <div class="footer" id="footer"></div>
    </div>

    <!------------- SIDEBAR --------------->
    <div class="sidebar" id="sidebar"></div>
    <script src="./js/components/sidebar.js"></script>

    

    <!-- Load the translator script -->
    <script src="./js/api/translator.js"></script>
  `;
}

// This function attaches event listeners and any view-specific logic.
export function init(styles, params) {
  loadStyles(styles);

  const path_components = "components/";
  const sections_folder = "main_sections/";

  // ---------------- IMPORT SECTIONS/PARTS ------------
  function load_sections() {
    console.log("=======");
    const arr_sections = ["1", "2", "4", "5", "7"];
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

  // async function handleGettingUsers() {
  //   try{
  //     const res = await getUsers()
  //     alert(`succes: ${JSON.stringify(res.data)}`, )
  //   }catch(err){
  //     const errmssg = err.response.data.error
  //     alert("error: " + errmssg)
  //   }
  // }

  // // Attach event listener to the button after the markup is in the DOM.
  // const btn = document.getElementById('fetchDataBtn');
  // if (btn) {
  //   btn.addEventListener('click',  handleGettingUsers);
  // }
}
