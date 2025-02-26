import { loadStyles } from "../helpers/stylesManager.js";
import { getUsers } from "../api/userAPI.js";

export function render() {
  return `

    <!------------- TOPBAR --------------->
    <div class="topbar" id="topbar"></div>
    <div class="line-temp"></div>

    <h1>Frequently Asked Questions</h1>

    <div class="search-container">
      <input
        type="text"
        id="searchInput"
        class="search-input"
        placeholder="Search questions..."
      />
      <button id="searchBtn" class="search-button">Search</button>
    </div>

    <div class="faq-container">
      <div class="faq-item">
        <div class="faq-question">What is the AI Doctor & Hospital App?</div>
        <div class="faq-answer">
          It is a full-stack application that combines an AI-powered chatbot
          with hospital services to provide preliminary medical guidance and
          streamline healthcare management.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          How does the AI chatbot function as a doctor?
        </div>
        <div class="faq-answer">
          The chatbot leverages advanced natural language processing and machine
          learning algorithms to interpret user symptoms, provide initial
          medical advice, and recommend professional consultations when needed.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          Is the AI Doctor a replacement for real medical professionals?
        </div>
        <div class="faq-answer">
          No, it serves as an initial point of contact. It offers basic guidance
          and triage, but it always recommends consulting with certified
          healthcare professionals for accurate diagnoses and treatments.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          What hospital services are integrated into the app?
        </div>
        <div class="faq-answer">
          The app integrates services like appointment scheduling, telemedicine
          consultations, access to patient records, and real-time notifications,
          all designed to enhance the patient experience.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          How secure is my personal and medical data?
        </div>
        <div class="faq-answer">
          Security is a top priority. The application uses state-of-the-art
          encryption methods and complies with data protection regulations to
          ensure your information remains confidential and secure.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          Can the AI chatbot diagnose serious conditions?
        </div>
        <div class="faq-answer">
          While the chatbot can identify symptoms and suggest potential
          conditions, it is not equipped to diagnose serious illnesses. It
          always advises users to seek further evaluation from medical
          professionals.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          How do I schedule an appointment through the app?
        </div>
        <div class="faq-answer">
          Appointments can be scheduled directly through the chatbot or via the
          dedicated appointment section within the app, where you can choose
          your preferred date, time, and specialist.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          What technologies power this full-stack application?
        </div>
        <div class="faq-answer">
          The app is built with modern frameworks—such as React or Angular for
          the frontend and Node.js or Django for the backend—and employs AI
          frameworks like TensorFlow or PyTorch to drive its chatbot
          functionality.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">Is there 24/7 support available?</div>
        <div class="faq-answer">
          Yes, the AI chatbot provides round-the-clock assistance for basic
          inquiries, while live support is available during regular business
          hours for more complex issues.
        </div>
      </div>
      <div class="faq-item" style="border: none">
        <div class="faq-question">
          How can I provide feedback or report an issue?
        </div>
        <div class="faq-answer">
          You can use the in-app feedback form or contact our support team
          directly through the app. Your feedback helps us continuously improve
          our services.
        </div>
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

// This function attaches event listeners and any view-specific logic.
export function init(styles, params) {
  loadStyles(styles);
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Search functionality to highlight matching questions
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((q) => {
      q.classList.remove("highlight");
      if (searchTerm && q.textContent.toLowerCase().includes(searchTerm)) {
        q.classList.add("highlight");
      }
    });
  });

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
