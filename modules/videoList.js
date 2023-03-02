import { videoList, boxVideoList, boxPlayList } from './variables.js';

let videoListEdit = [...videoList];
let playList = [];

export const videoInit = () => {
  //Print to Inicial List
  boxList(videoList, boxVideoList);

  //Listeners
  readToListener(boxVideoList, addToListVideo);
  readToListener(boxPlayList, addToListVideo);
};

//Load Events Listeners
const readToListener = (box, fn) => {
  box.addEventListener('click', fn);
};

//Print to Videolist
const boxList = (arr, inner) => {
  arr.map((video) => {
    const row = document.createElement('div');
    row.classList.add('mt-8');
    row.innerHTML += `
        <p class="id"> Id: ${video.id}</p>
        <p class="titulo"> titulo: ${video.titulo}</p>  `;

    inner.getAttribute('id') === 'video-list'
      ? (row.innerHTML += `<a href= "#" class= "add-list" data-id="${video.id}"> Añadir </a>`)
      : null;

    inner.getAttribute('id') === 'play-list'
      ? (row.innerHTML += `<a href= "#" class= "remove-list" data-id="${video.id}"> Eliminar </a>`)
      : null;

    inner.appendChild(row);
  });
};

//Clean to List Function
const cleanToList = (box) => {
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
};

//AddToListVideo
function addToListVideo(e) {
  e.preventDefault();

  const video = e.target.parentElement;

  editToListVideo(video);
}

function editToListVideo(video, typeList) {
  const itemVideo = {
    id: video.querySelector('a').getAttribute('data-id'),
    titulo: video.querySelector('.titulo').textContent,
  };

  if (video.querySelector('a').classList.contains('add-list')) {
    //Delete videoListEdit
    videoListEdit = videoListEdit.filter((video) => video.id !== itemVideo.id);

    //Add to Play List
    playList = [...playList, itemVideo];
  }

  if (video.querySelector('a').classList.contains('remove-list')) {
    //Delete playList
    playList = playList.filter((video) => video.id !== itemVideo.id);

    //Add to Video List and order
    videoListEdit = [...videoListEdit, itemVideo];
    videoListEdit = videoListEdit.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  //Clean to HTML List
  cleanToList(boxVideoList);
  cleanToList(boxPlayList);

  //Paint to HTML List Again
  boxList(videoListEdit, boxVideoList);
  boxList(playList, boxPlayList);
}
