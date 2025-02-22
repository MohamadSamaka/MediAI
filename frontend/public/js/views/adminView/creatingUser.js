import { loadStyles } from "../../helpers/stylesManager.js";
import axiosInstance from "../../api/index.js";

export function render() {
    return `
        <h2>הרשמה</h2>
        <form id="register-form">
        <label for="id">תעודת זהות:</label>
            <input type="text" id="id" required>

            <label for="firstname">שם פרטי:</label>
            <input type="text" id="firstname" required>

             <label for="lastname">שם משפחה:</label>
            <input type="text" id="lastname" required>

            
            <label for="email">אימייל:</label>
            <input type="email" id="email" required>

            <label for="phone">טלפון:</label>
            <input type="tel" id="phone" required>

            <label for="dateOfBirth">תאריך לידה:</label>
            <input type="date" id="dateOfBirth" required>

            <label for="address">כתובת:</label>
            <input type="text" id="address" required>
            
            <label for="password">סיסמה:</label>
            <input type="password" id="password" required>

            <label for="roleMenu">תפקיד:</label>
            <select id="roleMenu" required>
                <option value="">בחר תפקיד</option>
            
            </select>
            
            <button type="submit" id="create-user-btn">הרשם</button>
        </form>
        <p>כבר יש לך חשבון? <a href="login.html">התחבר כאן</a></p>
    `;

}


export async function init(styles, params) {
    loadStyles(styles);

   
async function getRole() {
    return await axiosInstance.get("/admin/roles", {
        withCredentials: true
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
        return [];
    });
}
const roles=await getRole();
document.getElementById("roleMenu").innerHTML = roles.map((role) => {
    return `<option value="${role.id}">${role.roleName}</option>`;
}).join("");


    function createUser() {
        const data = {
            id:document.getElementById("id").value,
            fname: document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            dateOfBirth: document.getElementById("dateOfBirth").value,
            address: document.getElementById("address").value,
            password: document.getElementById("password").value,
            roleId: document.getElementById("roleMenu").value
        };
        
        axiosInstance.post("/admin/users", data, {
            withCredentials: true
        }).then((response) => {
            alert("ההרשמה הושלמה בהצלחה!");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            alert("שגיאה בהרשמה, נסה שוב.");
        });
    }
    
    const createUserButton = document.querySelector("#create-user-btn");
    createUserButton.addEventListener("click", function(event) {
        event.preventDefault();
        createUser();
    });
}
