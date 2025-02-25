const mongoose = require("mongoose");

// --- ROLES ---
const roles = [
  {
    _id: mongoose.Types.ObjectId("000000000000000000000001"),
    roleName: "patient",
  },
  {
    _id: mongoose.Types.ObjectId("000000000000000000000002"),
    roleName: "doctor",
  },
];

// --- LOCATIONS (as provided) ---
const locations = [
  {
    _id: mongoose.Types.ObjectId("100000000000000000000001"),
    locationName: "Tel Aviv",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000002"),
    locationName: "Jerusalem",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000003"),
    locationName: "Haifa",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000004"),
    locationName: "Beersheba",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000005"),
    locationName: "Eilat",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000006"),
    locationName: "Netanya",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000007"),
    locationName: "Ashdod",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000008"),
    locationName: "Holon",
  },
  {
    _id: mongoose.Types.ObjectId("100000000000000000000009"),
    locationName: "Rishon LeZion",
  },
];

// --- EXPERTISE ---
const expertise = [
  {
    _id: mongoose.Types.ObjectId("200000000000000000000001"),
    name: "Cardiology",
    description: "Expertise in heart and vascular system.",
  },
  {
    _id: mongoose.Types.ObjectId("200000000000000000000002"),
    name: "Neurology",
    description: "Expertise in brain and nervous system.",
  },
  {
    _id: mongoose.Types.ObjectId("200000000000000000000003"),
    name: "Orthopedics",
    description: "Expertise in bones and joints.",
  },
  {
    _id: mongoose.Types.ObjectId("200000000000000000000004"),
    name: "Dermatology",
    description: "Expertise in skin, hair, and nails.",
  },
  {
    _id: mongoose.Types.ObjectId("200000000000000000000005"),
    name: "Pediatrics",
    description: "Expertise in child healthcare.",
  },
];

// --- HOSPITALS ---
// Create one hospital per location, naming them "{location name} hospital".
// For Tel Aviv hospital, we will later assign two doctors (Doctor01 and Doctor02).
// For Jerusalem hospital, we assign Doctor03.
// The remaining hospitals are created without doctors.
const hospitals = [
  {
    _id: mongoose.Types.ObjectId("300000000000000000000001"),
    name: "Tel Aviv hospital",
    location: mongoose.Types.ObjectId("100000000000000000000001"),
    doctors: [
      mongoose.Types.ObjectId("500000000000000000000001"), // Doctor01
      mongoose.Types.ObjectId("500000000000000000000002"), // Doctor02
    ],
    phone: "+972501111111",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000002"),
    name: "Jerusalem hospital",
    location: mongoose.Types.ObjectId("100000000000000000000002"),
    doctors: [
      mongoose.Types.ObjectId("500000000000000000000003"), // Doctor03
    ],
    phone: "+972501122222",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000003"),
    name: "Haifa hospital",
    location: mongoose.Types.ObjectId("100000000000000000000003"),
    doctors: [],
    phone: "+972501133333",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000004"),
    name: "Beersheba hospital",
    location: mongoose.Types.ObjectId("100000000000000000000004"),
    doctors: [],
    phone: "+972501144444",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000005"),
    name: "Eilat hospital",
    location: mongoose.Types.ObjectId("100000000000000000000005"),
    doctors: [],
    phone: "+972501155555",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000006"),
    name: "Netanya hospital",
    location: mongoose.Types.ObjectId("100000000000000000000006"),
    doctors: [],
    phone: "+972501166666",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000007"),
    name: "Ashdod hospital",
    location: mongoose.Types.ObjectId("100000000000000000000007"),
    doctors: [],
    phone: "+972501177777",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000008"),
    name: "Holon hospital",
    location: mongoose.Types.ObjectId("100000000000000000000008"),
    doctors: [],
    phone: "+972501188888",
    type: "Hospital",
  },
  {
    _id: mongoose.Types.ObjectId("300000000000000000000009"),
    name: "Rishon LeZion hospital",
    location: mongoose.Types.ObjectId("100000000000000000000009"),
    doctors: [],
    phone: "+972501199999",
    type: "Hospital",
  },
];

// --- USERS ---

// Patients (role: patient)
// Each patient’s address is taken from one of our locations.
const patients = [
  {
    _id: mongoose.Types.ObjectId("400000000000000000000001"),
    idPerson: "PATIENT1", // 8 characters
    Fname: "Alice",
    Lname: "Smith",
    email: "alice@example.com",
    phone: "+972501234567", // 13 characters
    password: "password1",
    DateOfBirth: new Date("1990-01-01"),
    address: "Tel Aviv",
    roleId: mongoose.Types.ObjectId("000000000000000000000001"), // patient
    medicalInfoId: mongoose.Types.ObjectId("700000000000000000000001"),
    chatLogId: mongoose.Types.ObjectId("800000000000000000000001"),
  },
  {
    _id: mongoose.Types.ObjectId("400000000000000000000002"),
    idPerson: "PATIENT2",
    Fname: "Bob",
    Lname: "Johnson",
    email: "bob@example.com",
    phone: "+972501234568",
    password: "password2",
    DateOfBirth: new Date("1985-05-15"),
    address: "Jerusalem",
    roleId: mongoose.Types.ObjectId("000000000000000000000001"),
    medicalInfoId: mongoose.Types.ObjectId("700000000000000000000002"),
    chatLogId: mongoose.Types.ObjectId("800000000000000000000002"),
  },
  {
    _id: mongoose.Types.ObjectId("400000000000000000000003"),
    idPerson: "PATIENT3",
    Fname: "Charlie",
    Lname: "Williams",
    email: "charlie@example.com",
    phone: "+972501234569",
    password: "password3",
    DateOfBirth: new Date("1978-09-09"),
    address: "Haifa",
    roleId: mongoose.Types.ObjectId("000000000000000000000001"),
    medicalInfoId: mongoose.Types.ObjectId("700000000000000000000003"),
    chatLogId: mongoose.Types.ObjectId("800000000000000000000003"),
  },
];

// Doctors (role: doctor)
// We include all the normal user fields (making them patients as well) plus an extra field “expertiseId”
// For our purposes, we also add an "appointments" array (even if not in the original schema) so we can link the upcoming appointment.
const doctors = [
  {
    _id: mongoose.Types.ObjectId("500000000000000000000001"),
    idPerson: "DOCTOR01",
    Fname: "Emily",
    Lname: "Clark",
    email: "emily.clark@example.com",
    phone: "+972501234570",
    password: "docpassword1",
    DateOfBirth: new Date("1980-03-20"),
    address: "Tel Aviv",
    roleId: mongoose.Types.ObjectId("000000000000000000000002"), // doctor
    medicalInfoId: mongoose.Types.ObjectId("700000000000000000000004"),
    chatLogId: mongoose.Types.ObjectId("800000000000000000000004"),
    expertiseId: mongoose.Types.ObjectId("200000000000000000000001"), // Cardiology
    appointments: [],
  },
  {
    _id: mongoose.Types.ObjectId("500000000000000000000002"),
    idPerson: "DOCTOR02",
    Fname: "John",
    Lname: "Doe",
    email: "john.doe@example.com",
    phone: "+972501234571",
    password: "docpassword2",
    DateOfBirth: new Date("1975-07-10"),
    address: "Tel Aviv",
    roleId: mongoose.Types.ObjectId("000000000000000000000002"),
    medicalInfoId: mongoose.Types.ObjectId("700000000000000000000005"),
    chatLogId: mongoose.Types.ObjectId("800000000000000000000005"),
    expertiseId: mongoose.Types.ObjectId("200000000000000000000001"), // Cardiology
    // This doctor will have an appointment with a patient (see below)
    appointments: [mongoose.Types.ObjectId("600000000000000000000001")],
  },
  {
    _id: mongoose.Types.ObjectId("500000000000000000000003"),
    idPerson: "DOCTOR03",
    Fname: "Sarah",
    Lname: "Lee",
    email: "sarah.lee@example.com",
    phone: "+972501234572",
    password: "docpassword3",
    DateOfBirth: new Date("1982-11-30"),
    address: "Jerusalem",
    roleId: mongoose.Types.ObjectId("000000000000000000000002"),
    medicalInfoId: mongoose.Types.ObjectId("700000000000000000000006"),
    chatLogId: mongoose.Types.ObjectId("800000000000000000000006"),
    expertiseId: mongoose.Types.ObjectId("200000000000000000000002"), // Neurology (or another expertise)
    appointments: [],
  },
];

// --- APPOINTMENT ---
// We create one appointment for Patient3 with a cardiology doctor (Doctor02).
const appointments = [
  {
    _id: mongoose.Types.ObjectId("600000000000000000000001"),
    patient: mongoose.Types.ObjectId("400000000000000000000003"), // Patient3
    doctor: mongoose.Types.ObjectId("500000000000000000000002"),  // Doctor02 (Cardiology)
    appointment_time: new Date("2025-03-01T10:00:00Z"),
  },
];

// --- MEDICAL RECORDS ---
// For patients, we add diagnosis and prescriptions as needed.
// Patient1 and Patient2 get one diagnosis and one prescription each.
// Patient3 gets an appointment entry.
// We also create empty records for our doctors.
const medicalRecords = [
  // Medical record for Patient1
  {
    _id: mongoose.Types.ObjectId("700000000000000000000001"),
    userId: mongoose.Types.ObjectId("400000000000000000000001"),
    prescriptions: [
      {
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        prescribed_by: mongoose.Types.ObjectId("500000000000000000000001"), // Doctor01
        date_prescribed: new Date("2025-01-10"),
        notes: "Monitor blood pressure.",
      },
    ],
    diagnosis: [
      {
        condition: "Hypertension",
        diagnosed_by: mongoose.Types.ObjectId("500000000000000000000001"), // Doctor01
        date: new Date("2025-01-05"),
      },
    ],
    doctorNotes: [],
    appointmentId: [],
  },
  // Medical record for Patient2
  {
    _id: mongoose.Types.ObjectId("700000000000000000000002"),
    userId: mongoose.Types.ObjectId("400000000000000000000002"),
    prescriptions: [
      {
        medication: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        prescribed_by: mongoose.Types.ObjectId("500000000000000000000003"), // Doctor03
        date_prescribed: new Date("2025-02-15"),
        notes: "Take with meals.",
      },
    ],
    diagnosis: [
      {
        condition: "Diabetes Type 2",
        diagnosed_by: mongoose.Types.ObjectId("500000000000000000000003"), // Doctor03
        date: new Date("2025-02-10"),
      },
    ],
    doctorNotes: [],
    appointmentId: [],
  },
  // Medical record for Patient3 (with an appointment)
  {
    _id: mongoose.Types.ObjectId("700000000000000000000003"),
    userId: mongoose.Types.ObjectId("400000000000000000000003"),
    prescriptions: [],
    diagnosis: [],
    doctorNotes: [],
    appointmentId: [
      {
        appointment_time: new Date("2025-03-01T10:00:00Z"),
        appointment_id: mongoose.Types.ObjectId("600000000000000000000001"),
      },
    ],
  },
  // Medical record for Doctor01 (empty)
  {
    _id: mongoose.Types.ObjectId("700000000000000000000004"),
    userId: mongoose.Types.ObjectId("500000000000000000000001"),
    prescriptions: [],
    diagnosis: [],
    doctorNotes: [],
    appointmentId: [],
  },
  // Medical record for Doctor02 (with the appointment also added for the doctor)
  {
    _id: mongoose.Types.ObjectId("700000000000000000000005"),
    userId: mongoose.Types.ObjectId("500000000000000000000002"),
    prescriptions: [],
    diagnosis: [],
    doctorNotes: [],
    appointmentId: [
      {
        appointment_time: new Date("2025-03-01T10:00:00Z"),
        appointment_id: mongoose.Types.ObjectId("600000000000000000000001"),
      },
    ],
  },
  // Medical record for Doctor03 (empty)
  {
    _id: mongoose.Types.ObjectId("700000000000000000000006"),
    userId: mongoose.Types.ObjectId("500000000000000000000003"),
    prescriptions: [],
    diagnosis: [],
    doctorNotes: [],
    appointmentId: [],
  },
];

module.exports = {
  roles,
  locations,
  expertise,
  hospitals,
  patients,
  doctors,
  appointments,
  medicalRecords,
};
