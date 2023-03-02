import { UIcleanToList, UIboxList, UInoResultBox } from "./UIController/uiVideoListController.js"

//Load Events Listeners
export const readToListener = (box, evento, fn) => {
    box.addEventListener(evento, fn)
}

export const cleanAndPrintBox = (boxOne, boxTwo, arrOne, arrTwo) => {

    //Clean to HTML List    
    UIcleanToList(boxOne)
    UIcleanToList(boxTwo)

    //Paint to HTML List Again
    UIboxList(arrOne, boxOne)
    UIboxList(arrTwo, boxTwo)

    //Emply List To HTML
    emplyBoxList(arrOne, boxOne)
    emplyBoxList(arrTwo, boxTwo)

}

export const emplyBoxList = (arr, box) => {

    arr.length === 0 ? UInoResultBox(box) : null
}