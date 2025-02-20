import { loadStyles } from "../helpers/stylesManager.js"
import { getUsers } from "../api/userAPI.js"

export function render() {
  return `
    <div class="home-view">
      <h2>Home</h2>
      <p>Welcome to our home page!</p>
      <button id="fetchDataBtn">Fetch API Data</button>
      <div id="apiData"></div>
    </div>
  `;
}

// This function attaches event listeners and any view-specific logic.
export function init(styles, params) {
  loadStyles(styles)

  async function handleGettingUsers() {
    try{
      const res = await getUsers()
      alert(`succes: ${JSON.stringify(res.data)}`, )
    }catch(err){
      const errmssg = err.response.data.error
      alert("error: " + errmssg)
    }
  }

  // Attach event listener to the button after the markup is in the DOM.
  const btn = document.getElementById('fetchDataBtn');
  if (btn) {
    btn.addEventListener('click',  handleGettingUsers);
  }
}

