// References
const form = document.querySelector('form');
const list = document.querySelector('.list');

// Song array object;
let songs = [];

const showSong = () => {
  const songHtml = songs.map(song => {
    return `
      <li class="items">
        <img class="items-img" src="${song.picture}"></img>
        <div class="song-title">
          <h5>${song.title}</h5>
          <span>${song.style}</span>
        </div>
        <div class="song-title">
          <h5>${song.name}</h5>
          <span>${song.length}</span>
        </div>
        <div class="increament">
          <p>Score:<span class="score">0</span><p>
          <button
          type="click" class="counter" onclick="increase()">+1</button>
        </div>
        <button type="button" class="delete" aria-label="Delete the song ${song.title}" value="${song.id}">
          <img class="delete" src="./assets/trash.svg" alt="${song.title} ">
        </button>
      </li>
    `
  }).join('');
  list.innerHTML = songHtml;
}; showSong();

// Show the song in the list

const addSong = e => {
  e.preventDefault();
  const formEl = e.currentTarget;
  const newSong = {
    title: formEl.title.value,
    name: formEl.name.value,
    style: formEl.style.value,
    length: formEl.length.value,
    picture: formEl.picture.value,
    id: Date.now(),
  };
  songs.push(newSong);
  list.dispatchEvent(new CustomEvent('listUpdated'));
  formEl.reset();
};

// Inreament the scrore
var a = 0;
function increase() {
  var textBox = document.querySelector("span.score");
  textBox.textContent = a;
  a++;
}

// Filter the song's title

function myFunction() {
  var input, filter;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
}

// Handle delete items
const handleClick = e => {
  const deleteBtn = e.target.closest('button.delete');
  if (deleteBtn) {
    console.log('update that book please');
    const id = Number(deleteBtn.value);
    deleteBook(id);
  };
};

const deleteBook = id => {
  songs = songs.filter(song => song.id !== id);
  list.dispatchEvent(new CustomEvent('listUpdated'));
};

//Show the list when reoad the page
const initLocalStorage = () => {
  const songList = JSON.parse(localStorage.getItem('songs'));
  if (songList) {
    songs = songList;
  }
  list.dispatchEvent(new CustomEvent('listUpdated'));
};

// we want to update the local storage each time we update delete
const updateLocalStorage = () => {
  localStorage.setItem('songs', JSON.stringify(songs));
};
// Listen to the events
form.addEventListener('submit', addSong);
list.addEventListener('listUpdated', showSong);
window.addEventListener('DOMContentLoaded', showSong);
list.addEventListener('click', handleClick);

initLocalStorage();
