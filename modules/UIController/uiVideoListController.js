//Print to Videolist
export const UIboxList = (arr, box) => {
  arr.map((video) => {
    const row = document.createElement('div');
    row.classList.add('mt-8');
    row.innerHTML += `
        <p class="id"> Id: ${video.id}</p>
        <p class="titulo"> ${video.title}</p>
        <p class="artista">${video.artist}</p>
        <img class="art" width="100" height="100" src=${video.art} />
        <audio class="url" src="${video.url}"></audio>
        `;

    box.classList.contains('video-list-content')
      ? (row.innerHTML += `<a href="#" class="add-list" data-id ="${video.id}"> Añadir </a>`)
      : null;

    box.classList.contains('play-list-content')
      ? (row.innerHTML += `<a href="#" class="remove-list" data-id ="${video.id}"> Eliminar </a>`)
      : null;

    box.appendChild(row);
  });
};

//Print to WordSearch
export const UIsearchWordPrint = (arr, box) => {
  arr.map((w) => {
    const wordSearch = document.createElement('div');
    wordSearch.classList.add('search-div-word');
    wordSearch.innerHTML += `
            <p class="word-search">${w}</p>
            <a href="#" class="remove-word" data-id ="${w}"> X </a>
        `;
    box.appendChild(wordSearch);
  });
};

//Clean to List Function
export const UIcleanToList = (box) => {
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
};

//Reset to form
export const UIresetForm = (form) => {
  form.reset();
};

export const UInoResultBox = (box) => {
  const div = document.createElement('div');
  div.classList.add('color');
  div.innerHTML += `<p>No hay resultados</p>`;
  box.appendChild(div);
};

export const box = () => {
  // console.log('leyendo...')
};
