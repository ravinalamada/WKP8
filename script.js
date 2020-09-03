// References
const form = document.querySelector('form');
const list = document.querySelector('.list');

// Song array object;
let songs = [];

const showSong = () => {
  const sortedSong = songs.sort((a, b) => b.score - a.score);
  const songHtml = sortedSong.map(song => {
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
          <p id="${song.id}" class="score">Score:${song.score}<p>
          <button
          type="button" class="counter" value="${song.id}">+1</button>
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
    score: 0,
    id: Date.now(),
  };
  songs.push(newSong);
  list.dispatchEvent(new CustomEvent('listUpdated'));
  formEl.reset();
};

// Inreament the scrore
const incrementValue = (id) => {
  var findSong = songs.find(song => song.id === id);
  console.log(findSong);
  // var textBox = document.querySelector("p.score");
  findSong.score = findSong.score + 1;
};

const idToUse = (e) => {
  // console.log('yep');
  const button = e.target.closest('button.counter');
  // console.log(button);
    if(button) {
      console.log('I am btn');
      const id = Number(button.value);
        incrementValue(id);
    list.dispatchEvent(new CustomEvent('listUpdated'));
    }

}

// Handle delete items
const handleClick = e => {
  const deleteBtn = e.target.closest('button.delete');
  if (deleteBtn) {
    console.log('update that book please');
    const id = Number(deleteBtn.value);
    deleteSong(id);
  };
};

const deleteSong = id => {
  songs = songs.filter(song => song.id !== id);
  list.dispatchEvent(new CustomEvent('listUpdated'));
};

// Store the songs in the local storage
const setToLocalStorage = () => {
  const objectStringyfy = JSON.stringify(songs);
  localStorage.setItem('songs', objectStringyfy);
};

const restoreFromLocalStorage = () => {
  const songLs = JSON.parse(localStorage.getItem('songs'));
  console.log(songLs);

  if (songLs) {
    songs.push(...songLs);
    list.dispatchEvent(new CustomEvent('listUpdated'));
  };
}

// Listen to the events
form.addEventListener('submit', addSong);
list.addEventListener('listUpdated', showSong);
list.addEventListener('listUpdated', setToLocalStorage);
list.addEventListener('click', handleClick);
list.addEventListener('click', idToUse);

restoreFromLocalStorage();

