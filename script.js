const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById('main');

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard('No profile with this username');
    }
  }
}

function createUserCard(userData) {
  const cardHTML = 
  `      
    <div class="card">
      <div>
        <img
          src=${userData.avatar_url}
          alt=${userData.name}
          class="avatar"
        />
      </div>
      <div class="user-info">
        <h2>${userData.login}</h2>
        <p>
          ${userData.bio}
        </p>
        <ul>
          <li>${userData.followers} <strong>Followers</strong></li>
          <li>${userData.following} <strong>Following</strong></li>
          <li>${userData.public_repos} <strong>Repos</strong></li>
        </ul>

        <div id="repos">
          <a href="#" class="repo">Repo 1</a>
          <a href="#" class="repo">Repo 2</a>
          <a href="#" class="repo">Repo 3</a>
        </div>
      </div>
    </div>
  `;
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `
    <div class="card">
      <h1>${msg}</h1>
    </div>
  `
  main.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
