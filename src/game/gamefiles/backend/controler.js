import {getresult, getnewboardships,getmenewboardships,chooserandomspot ,checkifgameover,wait} from './controllerfunc'
import {computergetresult,chooserandomfromboard} from './mycomputer'

import _ from 'lodash';
let isreadytoplay=false
export function readytoplay(){
    isreadytoplay=true
}
export async function comtakechosenspot(thechosenSpot,opopnentBoard,opponentShips){
    let waiting=await wait()
    let {result,news}=computergetresult(thechosenSpot)
    return(takechosenspot(result,news,thechosenSpot,opopnentBoard,opponentShips))

}
export function takechosenspot(result,news,chosenSpot,opopnentBoard,opponentShips){
    let theopopnentBoard=_.cloneDeep(opopnentBoard)
    let theopponentShips=_.cloneDeep(opponentShips)
    let thechosenSpot=_.cloneDeep(chosenSpot)
    let {newboard,newships}=getnewboardships(thechosenSpot,result,theopopnentBoard,theopponentShips)
    let isgameover=checkifgameover(newships)
    return({newboard,newships,isgameover,news})
}
export async function comgetoponchosenspot(board,ships,opopnentBoard){
    let newChosenspot=await chooserandomfromboard()
    return(getoponchosenspot(newChosenspot,board,ships,opopnentBoard))
}
export function getoponchosenspot(Chosenspot,board,ships,opopnentBoard){
    let theships=_.cloneDeep(ships)
    let theboard=_.cloneDeep(board)
    let theopopnentBoard =_.cloneDeep(opopnentBoard)
    let {newshipss,result,news}=getresult(theboard,Chosenspot,theships)
    let {newboard,newships}=getmenewboardships(Chosenspot,result,theboard,newshipss)
    let {randomspotboard,newspot}=chooserandomspot(theopopnentBoard)
    let isgameover=checkifgameover(newships)
    return({newboard,newships,randomspotboard,newspot,isgameover,news,result})
}

