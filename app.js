import axios from 'axios';

const createCard = data => `
  <div class="max-w-xl flex justify-between items-center mx-auto px-4 py-5 sm:px-6 -mt-4 border-b border-gray">
    <div class="ml-4 mt-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img class="h-12 w-12 rounded-full" src="${data.avatar_url}">
        </div>
        <div class="ml-4">
          <h3 class="text-lg leading-6 font-medium text-gray-9">
            ${data.name}
            <span class="text-sm leading-5 text-gray-500">
            @${data.login}
            </span>
          </h3>
          <p class="text-sm leading-5 text-gray-500">
            ${data.public_repos} repositories. User since ${data.created_at.slice(0, 4)}
          </p>
          <p class="text-sm leading-5 text-gray-500">
            ${data.location || ''}
          </p>
          <p class="mt-1 text-sm leading-5 text-gray-500">
            ${data.bio || ''}
          </p>
        </div>
      </div>
    </div>
    <div class="ml-4 mt-4 flex-shrink-0 inline-flex">
      <span class="ml-3 inline-flex">
        <a href="${data.html_url}">
	  <button type="button" class="mr-3 py-2 px-3 border border-gray rounded-md">
            <span>
              Profile
            </span>
          </button>
        </a>
        <a href="${data.blog}">
          <button type="button" class="py-2 px-3 border border-gray rounded-md">
            <span>
              Website
            </span>
          </button>
        </a>
      </span>
    </div>
  </div> 
`;

const usernames = [];
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    try {
      const input = document.querySelector('input');
      const username = input.value;
      if (usernames.includes(username)) {
        alert(`You already searched for ${username}`);
	return;
      }

      usernames.push(username);
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const card = createCard(response.data);
      document.querySelector('#container').insertAdjacentHTML('afterbegin', card);
      input.value = '';
    } catch (err) {
      if (err.response.status === 404) {
        alert('User not found');
      } else {
        alert('Error');
        console.error(err);
      }
    }
  });
});

