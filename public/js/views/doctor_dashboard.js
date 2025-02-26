import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h2>From user dashboard</h2>
    `;
}

export function init(styles, params) {
  console.log(params);
  loadStyles(styles);

  // Sample appointment data (simulated for demonstration)
  const appointments = [
    {
      id: 1,
      experties: "Cardiology",
      location: "Room 101",
      dateTime: "2025-03-01T10:00:00",
      status: true,
      patientName: "John Doe",
    },
    {
      id: 2,
      experties: "Neurology",
      location: "Room 202",
      dateTime: "2025-03-02T14:30:00",
      status: true,
      patientName: "Jane Roe",
    },
  ];

  // Sample patient data (simulated for demonstration)
  const patients = [
    {
      id: 1,
      Fname: "John",
      Lname: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      Fname: "Jane",
      Lname: "Roe",
      email: "jane.roe@example.com",
      phone: "098-765-4321",
    },
    {
      id: 3,
      Fname: "Alice",
      Lname: "Smith",
      email: "alice.smith@example.com",
      phone: "555-555-5555",
    },
  ];

  // Display the Appointments view
  function showAppointments() {
    const dashboard = document.getElementById("dashboardContent");
    dashboard.innerHTML = `
      <div class="dashboard-section" id="appointments-section">
        <div class="section-title">
          <i class="fa-solid fa-calendar-check"></i> Appointments
        </div>
        <div class="section-content">
          <p>View a detailed list of your upcoming appointments.</p>
          <p>See appointment specifics: patient name, time, location, and expertise.</p>
          <p>Update or cancel appointments directly from your dashboard.</p>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date &amp; Time</th>
                <th>Location</th>
                <th>Expertise</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="appointmentsTableBody">
              ${appointments
                .map(
                  (app) => `
                <tr data-id="${app.id}">
                  <td>${app.patientName}</td>
                  <td>${new Date(app.dateTime).toLocaleString()}</td>
                  <td>${app.location}</td>
                  <td>${app.experties}</td>
                  <td class="action-buttons">
                    <button class="update" onclick="updateAppointment(${
                      app.id
                    })">Update</button>
                    <button class="cancel" onclick="cancelAppointment(${
                      app.id
                    })">Cancel</button>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Display the Search Patient view
  function showSearchPatient() {
    const dashboard = document.getElementById("dashboardContent");
    dashboard.innerHTML = `
      <div class="dashboard-section" id="search-patient-section">
        <div class="section-title">
          <i class="fa-solid fa-user"></i> Search Patient
        </div>
        <div class="section-content">
          <div class="search-bar">
            <input type="text" id="patientSearchInput" placeholder="Search by name..." oninput="filterPatients()">
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="patientTableBody">
              ${patients
                .map(
                  (patient) => `
                <tr data-name="${(
                  patient.Fname +
                  " " +
                  patient.Lname
                ).toLowerCase()}">
                  <td>${patient.Fname} ${patient.Lname}</td>
                  <td>${patient.email}</td>
                  <td>${patient.phone}</td>
                  <td>
                    <button onclick="viewPatient(${
                      patient.id
                    })">View User Information</button>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Filter patients based on search input
  function filterPatients() {
    const query = document
      .getElementById("patientSearchInput")
      .value.toLowerCase();
    const rows = document
      .getElementById("patientTableBody")
      .getElementsByTagName("tr");
    Array.from(rows).forEach((row) => {
      const name = row.getAttribute("data-name");
      row.style.display = name.includes(query) ? "" : "none";
    });
  }

  // Simulated update appointment action
  function updateAppointment(id) {
    alert("Update appointment with ID: " + id);
  }

  // When canceling, remove the appointment from the data and re-render the appointments view
  function cancelAppointment(id) {
    const index = appointments.findIndex((app) => app.id === id);
    if (index !== -1) {
      appointments.splice(index, 1);
      showAppointments();
    }
  }

  // Simulated view patient information action
  function viewPatient(id) {
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      alert(
        "Patient Information:\nName: " +
          patient.Fname +
          " " +
          patient.Lname +
          "\nEmail: " +
          patient.email +
          "\nPhone: " +
          patient.phone
      );
    }
  }

  // Initialize with the Appointments view
  showAppointments();

  const path_components = "components/";
  const sections_folder = "main_sections/";

  // ---------------- IMPORT SECTIONS/PARTS ------------
  function load_sections() {
    console.log("=======");
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
