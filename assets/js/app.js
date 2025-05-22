const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const name = document.querySelector('.name');
const blog = document.querySelector('.blog');
const location = document.querySelector('.location');

async function displayUser(username) {
  name.classList.remove('error');
  name.classList.add('loading');
  name.textContent = 'Cargando...';
  blog.textContent = '';
  location.textContent = '';

  try {
    const response = await fetch(`${usersEndpoint}/${username}`);
    if (!response.ok) {
      throw new Error(`Usuario no encontrado (status: ${response.status})`);
    }

    const data = await response.json();

    name.classList.remove('loading');
    name.textContent = data.name || 'No disponible';
    blog.textContent = data.blog || 'No disponible';
    location.textContent = data.location || 'No disponible';

  } catch (err) {
    handleError(err);
  }
}

function handleError(err) {
  console.error('OH NO!', err);
  name.classList.remove('loading');
  name.classList.add('error');
  name.textContent = `Algo salió mal: ${err.message}`;
  blog.textContent = '';
  location.textContent = '';
}

displayUser('stolinski');
