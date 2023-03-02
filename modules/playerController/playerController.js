import { playList } from '../videoListController/videoListController.js';
import { readToListener } from './../helpers.js';
import { buttonPlay, buttonPause, buttonNext } from './../variables.js';

let audio, duration, song;
let playing = false;

export const playerInit = () => {
  // console.log('player iniciando')

  loadSong();

  readToListener(buttonPlay, 'click', playSong);
  readToListener(buttonPause, 'click', pauseSong);
  readToListener(buttonNext, 'click', nextSong);
};

//Esta función se carga cuando clickeamos en agregar a play List
function loadSong() {
  //Cargamos el primer audio del array PlayList
  audio = new Audio();
  song = playList;
  // console.log(song)
  audio.src = playList[0].url;
}

//Pause de Song
const pauseSong = () => {
  playing = false;
  audio.pause();
};

//Play de song
const playSong = () => {
  playing = true;
  audio.play();
};

const nextSong = () => {
  //   console.log('leyendo song', song);
};
