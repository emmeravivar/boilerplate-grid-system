import { searchVideoInit } from './modules/videoListController/searchVideoListController.js'
import { videoInit } from './modules/videoListController/videoListController.js'




window.onload = () => {
    videoInit() // Controller Videos List
    searchVideoInit() // Controller Search Field
}