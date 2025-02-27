///

//  ====== FAKE DATA LOOKS LIKE THIS ======
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     role: "Patient",
//     email: "john.doe@example.com",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     role: "Doctor",
//     email: "jane.smith@example.com",
//   },
//   {
//     id: 3,
//     name: "Admin User",
//     role: "Admin",
//     email: "admin.user@example.com",
//   },
// ];

// ======= SO U NEED ONLY TO GET: =========
// 1. ALL USERS FROM MONGODB
// 2. EXTRACT name,role,email.
// 3. REPLACE users array with new array where you put the informaiton from real data

// -- for example:

// users = [] // init array fake data
// let real_users = get_all_users()
// real_users.forEach((u)=>{
//  users.push({id,u.name,u.role,u.email})
//})

// NOW YOU HAVE REPLACED FAKE DATA WITH REAL ONES

import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
          <!------------- TOPBAR --------------->
       <div class="topbar-sub" id="topbar-sub"></div>
       <div class="line-temp"></div>

       
    <!-- Topbar -->
    <div id="topbar-dash">Admin Dashboard</div>
    <div class="container">
      <!-- Left Sidebar -->
      <div class="container-left">
        <nav class="navbar">
          <ul id="navbarList">
            <li>
              <a href="#" onclick="showUserManagement()"
                ><i class="fa-solid fa-users"></i> User Management</a
              >
            </li>
            <li>
              <a href="#" onclick="showStats()"
                ><i class="fa-solid fa-chart-line"></i> Stats</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <!-- Right Content Area -->
      <div class="container-right">
        <div id="dashboardContent" class="dashboard">
          <!-- Dynamic content will load here -->
        </div>
      </div>
    </div>


    
    <!------------- FOOTER --------------->
    <div class="footer" id="footer">


                  <!-- Load the translator script -->
    <script src="../../translator.js"></script>
    `;
}

export function init(styles, params) {
  console.log(params);
  loadStyles(styles);

  // Sample user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      role: "Patient",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Doctor",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      name: "Admin User",
      role: "Admin",
      email: "admin.user@example.com",
    },
  ];

  // Show User Management view
  function showUserManagement() {
    const dashboard = document.getElementById("dashboardContent");
    dashboard.innerHTML = `


         <div class="right-top">
          <div class="section-title">
            <br /><br />
            <i class="fa-solid fa-users"></i> User Management
          </div>
          <ul>
            <li>
              View comprehensive lists of patients, doctors, and other admins.
            </li>
            <li>Edit user details and update roles or permissions.</li>
            <li>Delete or suspend user accounts as needed.</li>
          </ul>
        </div>
          <div class="dashboard-section" id="user-management">
            
            <div class="section-content">
              <div class="filter-bar">
                <label for="roleFilter">Filter by Role:</label>
                <select id="roleFilter" onchange="filterUsers()">
                  <option value="all">All</option>
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="userTableBody">
                  ${users
                    .map(
                      (user) => `
                    <tr data-role="${user.role}">
                      <td>${user.id}</td>
                      <td>${user.name}</td>
                      <td>${user.role}</td>
                      <td>${user.email}</td>
                      <td class="action-buttons">
                        <button class="edit" onclick="editUser(${user.id})">Edit</button>
                        <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
                        <button class="promote" onclick="promoteUser(${user.id})">Promote</button>
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

  // Show Stats view
  function showStats() {
    const dashboard = document.getElementById("dashboardContent");
    // Calculate stats based on sample data
    const doctorCount = users.filter(
      (u) => u.role === "Doctor" || u.role === "Admin"
    ).length;
    const patientCount = users.filter((u) => u.role === "Patient").length;
    dashboard.innerHTML = `
          <div class="dashboard-section" id="stats">
            <div class="section-title"><i class="fa-solid fa-chart-line"></i> Stats</div>
            <div class="section-content stats">
              <div class="stat-card">
                <h2>Doctors</h2>
                <p>${doctorCount}</p>
              </div>
              <div class="stat-card">
                <h2>Patients</h2>
                <p>${patientCount}</p>
              </div>
            </div>
          </div>
        `;
  }

  // Filter users based on dropdown selection
  function filterUsers() {
    const filter = document.getElementById("roleFilter").value;
    const rows = document
      .getElementById("userTableBody")
      .getElementsByTagName("tr");
    Array.from(rows).forEach((row) => {
      const role = row.getAttribute("data-role");
      if (filter === "all" || role === filter) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // Edit user: Simulate navigation to an edit page
  function editUser(id) {
    alert("Navigate to edit page for user ID: " + id);
  }

  // Delete user: Remove the user from the data and refresh view
  function deleteUser(id) {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      showUserManagement();
    }
  }

  // Promote user: Change role to Admin and refresh view
  function promoteUser(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
      user.role = "Admin";
      showUserManagement();
    }
  }

  // Initialize with User Management view
  showUserManagement();

  const path_components = "components/";
  const sections_folder = "main_sections/";

  // // ---------------- IMPORT SECTIONS/PARTS ------------
  // function load_sections() {
  //   console.log("=======");
  //   const arr_sections = ["1", "2", "3", "4", "5", "6", "7"];
  //   for (let i = 0; i < arr_sections.length; i++) {
  //     let path =
  //       "./js/" +
  //       path_components +
  //       sections_folder +
  //       "s" +
  //       arr_sections[i] +
  //       ".html";
  //     let name = "section-section" + arr_sections[i];
  //     // import_html(path, name);
  //   }
  // }

  // ------------------- IMPORT COMPONENTS --------------------
  function load_components() {
    const arr_components = [
      "topbar",
      "footer",
      "sidebar",
      "second-topbar",
      "topbar-sub",
    ];
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

  // load_sections();
  load_components();
}
