import {getresult, getnewboardships,getmenewboardships,chooserandomspot ,checkifgameover,wait} from './controllerfunc'
import {computergetresult,chooserandomfromboard} from './mycomputer'

import _ from 'lodash';
let isreadytoplay=false
export function readytoplay(){
    isreadytoplay=true
}

export async function takechosenspot(chosenSpot,opopnentBoard,opponentShips){
    let theopopnentBoard=_.cloneDeep(opopnentBoard)
    let theopponentShips=_.cloneDeep(opponentShips)
    let thechosenSpot=_.cloneDeep(chosenSpot)
    let {result,news}=computergetresult(thechosenSpot)
    let {newboard,newships}=getnewboardships(thechosenSpot,result,theopopnentBoard,theopponentShips)
    let isgameover=checkifgameover(newships)
    let waiting=await wait()
    return({newboard,newships,isgameover,news})
}

export async function getoponchosenspot(board,ships,opopnentBoard){
    let theships=_.cloneDeep(ships)
    let theboard=_.cloneDeep(board)
    let theopopnentBoard =_.cloneDeep(opopnentBoard)
    let newChosenspot=await chooserandomfromboard()
    let {newshipss,result,news}=getresult(theboard,newChosenspot,theships)
    let {newboard,newships}=getmenewboardships(newChosenspot,result,theboard,newshipss)
    let {randomspotboard,newspot}=chooserandomspot(theopopnentBoard)
    let isgameover=checkifgameover(newships)
    return({newboard,newships,randomspotboard,newspot,isgameover,news})
}

