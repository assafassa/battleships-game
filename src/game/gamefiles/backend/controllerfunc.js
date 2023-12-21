import{generatenewgame} from './mycomputer'
export function getresult(board,chosenspot,ships){
  if (board[chosenspot[0]][chosenspot[1]]!='00'){
    let shipnum=board[chosenspot[0]][chosenspot[1]][0]
    let ship=ships[shipnum-1]
    ship.howmanydown+=1
    
    if (ship.howmanydown==ship.length){
      ship.sunk=true
      return({newshipss:ships,result:ship,news:'sunk'})
    }else{
      return({newshipss:ships,result:'777',news:'hit'})
    }
  }else{
    return({newshipss:ships,result:'007',news:'miss'})
  }
}

export function getnewboardships(chosenspot,result,board,ships){
  if (result=='777'||result=='007'){
    
    board[chosenspot[0]][chosenspot[1]]=result
    
  }else {
    let shipnum=result.id
    for (let i = 0; i < result.length; i++) {
      let spot=result.position[i]
      board[spot[0]][spot[1]]=`${shipnum}${i+1}7`
    }
    ships[shipnum-1]=result
  }
  return({newboard:board,newships:ships})
}

export function getmenewboardships(chosenspot,result,board,ships){
  if (result=='007'){
    
    board[chosenspot[0]][chosenspot[1]]=result
  }else if (result=='777'){
    board[chosenspot[0]][chosenspot[1]]+='7'
  }else {
    let shipnum=result.id
    for (let i = 0; i < result.length; i++) {
      let spot=result.position[i]
      board[spot[0]][spot[1]]=`${shipnum}${i+1}7`
    }
    ships[shipnum-1]=result
  }
  return({newboard:board,newships:ships})
}

export const chooserandomspot =(board)=>{
  
  let row=Math.floor(Math.random()*10)
  let col=Math.floor(Math.random()*10)
  while (board[row][col]!=='00'){
      row=Math.floor(Math.random()*10)
      col=Math.floor(Math.random()*10)
  }
  board[row][col]='008'
  return({randomspotboard:board,newspot: `${row}${col}`})
}
export function checkifgameover(ships){
  let isgameover=0
  ships.map((ship)=>{
    if (ship.sunk){
      isgameover+=1
    }
  })
  if (isgameover==2){
    ///add reset to my computer
    generatenewgame()
    return('gameover')
  }else{
    return('no')
  }

}
export const wait = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('waited');
    }, 3000);
  });
};