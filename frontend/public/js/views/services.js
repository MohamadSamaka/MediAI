import { loadStyles } from "../helpers/stylesManager.js";
import { getUsers } from "../api/userAPI.js";

export function render() {
  return `
    <div class="container">
      <h1 style="text-align: center;">Our services</h1>
      <!-- Introduction Section -->
      <div class="intro">
        <strong
          >Who are we? What do we offer you? What are our strategic objectives?
          How do you enjoy our digital services?</strong
        >
        <p>
          Come and get to know the largest and most advanced health organization
          in Israel, which is far beyond a traditional health fund.
        </p>
      </div>
      <!-- Services Grid -->
      <div class="services-grid">
        <!-- Service 1: AI Medical Consultation -->
        <div class="service-box">
          <i class="fa-solid fa-stethoscope"></i>
          <h3>Medical Consultation</h3>
          <p>
            Receive instant, personalized medical advice from our AI-driven
            system. Input your symptoms and get tailored preliminary insights.
          </p>
        </div>
        <!-- Service 2: Appointment Booking -->
        <div class="service-box">
          <i class="fa-solid fa-calendar-check"></i>
          <h3>Book Appointments</h3>
          <p>
            Easily schedule appointments with top doctors and clinics nearby.
            Enjoy a streamlined booking process and manage your schedule
            seamlessly.
          </p>
        </div>
        <!-- Service 3: Clinic & Hospital Finder -->
        <div class="service-box">
          <i class="fa-solid fa-location-dot"></i>
          <h3>Find Healthcare</h3>
          <p>
            Locate the nearest clinics, hospitals, and specialized care centers
            using our integrated map service to get the care you need promptly.
          </p>
        </div>
        <!-- Service 4: Telemedicine -->
        <div class="service-box">
          <i class="fa-solid fa-video"></i>
          <h3>Telemedicine</h3>
          <p>
            Connect virtually with healthcare professionals from the comfort of
            your home. Experience secure and efficient virtual consultations.
          </p>
        </div>
        <!-- Service 5: Patient Health Records -->
        <div class="service-box">
          <i class="fa-solid fa-file-medical"></i>
          <h3>Health Records</h3>
          <p>
            Securely store and access your medical history, lab results, and
            prescriptions—all in one digital platform for convenience and
            continuity.
          </p>
        </div>
        <!-- Service 6: Prescription Management -->
        <div class="service-box">
          <i class="fa-solid fa-pills"></i>
          <h3>Medication Management</h3>
          <p>
            Manage your prescriptions effortlessly. Order refills, track
            medication schedules, and receive timely reminders so you never miss
            a dose.
          </p>
        </div>
        <!-- Service 7: Health Monitoring -->
        <div class="service-box">
          <i class="fa-solid fa-heartbeat"></i>
          <h3>Health Monitoring</h3>
          <p>
            Monitor your vital signs continuously and receive real-time alerts
            with personalized health tips, ensuring proactive healthcare
            management.
          </p>
        </div>
        <!-- Service 8: Emergency Support -->
        <div class="service-box">
          <i class="fa-solid fa-life-ring"></i>
          <h3>Emergency Support</h3>
          <p>
            Get 24/7 access to emergency assistance and immediate medical
            guidance during critical moments. Help is just a click away.
          </p>
        </div>
        <!-- Service 9: Billing & Insurance Assistance -->
        <div class="service-box">
          <i class="fa-solid fa-file-invoice-dollar"></i>
          <h3>Billing Assistance</h3>
          <p>
            Simplify your healthcare payments with our billing support. We
            assist with insurance claims, payment processing, and related
            inquiries.
          </p>
        </div>
        <!-- Service 10: Data-Driven Health Insights -->
        <div class="service-box">
          <i class="fa-solid fa-chart-line"></i>
          <h3>Health Insights</h3>
          <p>
            Use advanced analytics to gain personalized insights into your
            health trends. Make informed decisions to better manage your
            wellness.
          </p>
        </div>
      </div>
      <!-- Join Us Section -->
      <div class="join-us">
        <strong>How do you join us?</strong>
        <p>
          Do you want to enjoy the best and most comprehensive healthcare
          services in Israel? Leave your details in the form below, and one of
          our representatives will get back to you as soon as possible.
        </p>
      </div>
      <!-- Contact Form -->
      <div class="contact-form">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" placeholder="Enter your full name" />
        <label for="city">City</label>
        <input type="text" id="city" placeholder="Enter your city" />
        <label for="phone">Phone Number</label>
        <input type="text" id="phone" placeholder="Enter your phone number" />
        <button type="submit">Submit</button>
      </div>
    </div>
  `;
}

// This function attaches event listeners and any view-specific logic.
export function init(styles, params) {
  loadStyles(styles);
}
