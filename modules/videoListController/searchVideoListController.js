import {
  searchVideoForm,
  boxVideoList,
  boxPlayList,
  cleanToSearchButton,
  removeSearchWord,
  searchWordBox,
} from './../variables.js';
import {
  UIcleanToList,
  UIsearchWordPrint,
  UIresetForm,
} from './../UIController/uiVideoListController.js';
import { videoListEdit, playList, putList } from './videoListController.js';
import { readToListener, cleanAndPrintBox } from './../helpers.js';

let searchVideoOne = []; //This list print about videoListEdit
let searchVideoTwo = []; //This list print about playList
let searchVideoWord = []; // This list are words search

export const searchVideoInit = () => {
  readToListener(searchVideoForm, 'submit', searchVideoItem);
  readToListener(cleanToSearchButton, 'click', loadOriginalList);
  readToListener(removeSearchWord, 'click', removeSearchWordAction);
};

//This function is call in event Click Submit
const searchVideoItem = (e) => {
  e.preventDefault();

  //Read to word
  const videoname = document.querySelector('#videoname').value;

  searchVideoWord.includes(videoname) || videoname === ''
    ? null
    : (searchVideoWord = [...searchVideoWord, videoname]);

  if (boxVideoList.hasAttribute('data-search')) {
    //Search in list Search Mode
    searchVideoOne = searchVideoOne.filter(
      (video) =>
        video.titulo.includes(videoname) || video.artist.includes(videoname)
    );
    searchVideoTwo = searchVideoTwo.filter(
      (video) =>
        video.titulo.includes(videoname) || video.artist.includes(videoname)
    );
  } else {
    //Create array with the search word
    searchVideoOne = videoListEdit.filter(
      (video) =>
        video.titulo.includes(videoname) || video.artist.includes(videoname)
    );
    searchVideoTwo = playList.filter(
      (video) =>
        video.titulo.includes(videoname) || video.artist.includes(videoname)
    );
  }

  //Clean Orginal List
  cleanAndPrintBox(boxVideoList, boxPlayList, searchVideoOne, searchVideoTwo);

  //Print word list Search
  cleanListWordSearch();

  //Clean and add attributes in Div
  cleanToSearchButton.removeAttribute('hidden');
  boxVideoList.setAttribute('data-search', 'searchVideoOne');
  boxPlayList.classList.add('search');

  //Reset to Form
  UIresetForm(searchVideoForm);
};

//This function is the controler Search Video List
export function editToListSearchVideo(video) {
  //Item in Search Video List
  const itemVideo = {
    id: video.querySelector('a').getAttribute('data-id'),
    titulo: video.querySelector('.titulo').textContent,
    artista: video.querySelector('.artista').textContent,
  };

  if (video.querySelector('a').classList.contains('add-list')) {
    //Delete searchVideoOne Array == videoListEdit
    searchVideoOne = searchVideoOne.filter(
      (video) => video.id !== itemVideo.id
    );

    //Add to Play List
    searchVideoTwo = [...searchVideoTwo, itemVideo];

    //Call to VideoList Controler
    putList(video, itemVideo);
  }

  if (video.querySelector('a').classList.contains('remove-list')) {
    //Delete playList
    searchVideoTwo = searchVideoTwo.filter(
      (video) => video.id !== itemVideo.id
    );

    //Add to Video List and order
    searchVideoOne = [...searchVideoOne, itemVideo];
    searchVideoOne = searchVideoOne.sort(function (a, b) {
      return a.id - b.id;
    });

    //Call to VideoList Controler
    putList(video, itemVideo);
  }

  cleanAndPrintBox(boxVideoList, boxPlayList, searchVideoOne, searchVideoTwo);
}

//When you click in "Clean List Button"
const loadOriginalList = () => {
  cleanAndPrintBox(boxVideoList, boxPlayList, videoListEdit, playList);

  UIcleanToList(searchWordBox);

  //Clean Attributes
  cleanToSearchButton.setAttribute('hidden', '');
  boxVideoList.removeAttribute('data-search');
  boxPlayList.removeAttribute('data-search');
};

//Delete Search Word and reset List
const removeSearchWordAction = (e) => {
  e.preventDefault();

  const removeWord = e.target.getAttribute('data-id');

  //Delete to Word at Array
  searchVideoWord = searchVideoWord.filter((word) => word !== removeWord);

  //Reset to list
  searchVideoOne = videoListEdit;
  searchVideoTwo = playList;

  //Filter all words Search
  searchVideoWord.forEach((word) => {
    searchVideoOne = searchVideoOne.filter(
      (video) => video.titulo.includes(word) || video.artista.includes(word)
    );
    searchVideoTwo = searchVideoTwo.filter(
      (video) => video.titulo.includes(word) || video.artista.includes(word)
    );
  });

  //Print To word List
  cleanListWordSearch();

  cleanAndPrintBox(boxVideoList, boxPlayList, searchVideoOne, searchVideoTwo);

  searchVideoWord.length === 0
    ? cleanToSearchButton.setAttribute('hidden', '')
    : null;
};

function cleanListWordSearch() {
  UIcleanToList(searchWordBox);
  UIsearchWordPrint(searchVideoWord, searchWordBox);
}
