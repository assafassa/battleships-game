import _ from 'lodash';
export const useReactiveGame= () => {
    
    const aplaceShip = (beforeGame,board,ships,shipnum,photonum,row, col,action) => {
        if (!beforeGame){
            return(false)
        }
        let check=0
        let newShips=_.cloneDeep(ships);
        let newBoard=_.cloneDeep(board);
        let ship=ships[shipnum-1]
        let shiplength=ship.length
        let switchaction
        if (action=='turn')
            if(ship.isHorizontal){
            newShips[shipnum-1].isHorizontal=false
            switchaction=true
            }else {
            newShips[shipnum-1].isHorizontal=true
            }
        else if (action=='move'){
            if(!ship.isHorizontal){
            switchaction=true
            }
        }
        
        if (row>=(photonum-1) && row<=(9-shiplength+photonum) && switchaction){
            
            ship.position.map((spot, index) => {
            
            newBoard[spot[0]][spot[1]]='00'
            
            });
            for (let i = 0; i < photonum; i++) {
            if (board[(row-i)][col][0]==0||board[(row-i)][col][0]==`${shipnum}` ){
                newBoard[(row-i)][col]=`${shipnum}${(photonum-i)}`
                newShips[shipnum-1].position[photonum-i-1]=`${row-i}${col}`
            }else{
                check=2
        
            }
            ;
            }
            for(let i = 1; i < (shiplength-photonum+1); i++) {
            if (board[(row+i)][col][0]==0||board[(row+i)][col][0]==`${shipnum}`){
                newBoard[(row+i)][col]=`${shipnum}${(photonum+i)}`
                newShips[shipnum-1].position[photonum+i-1]=`${row+i}${col}`
            }else{
                check=1
            }
            ;
            }
            if (check==0){
                return({newBoard,newShips})
            }else if (check!=0){
                return(false)
            }
        }else if (col>=(photonum-1) && col<=(9-shiplength+photonum) &&(!switchaction)){
            
            ship.position.map((spot, index) => {
            
            newBoard[spot[0]][spot[1]]='00'
        
            });
            for (let i = 0; i < photonum; i++) {
            if (board[(row)][col-i][0]==0 ||board[(row)][col-i][0]==`${shipnum}`){
                newBoard[(row)][col-i]=`${shipnum}${(photonum-i)}`
                newShips[shipnum-1].position[photonum-i-1]=`${row}${col-i}`
            }else{
                check=2
        
            };
            }
            for(let i = 1; i < (shiplength-photonum+1); i++) {
            if (board[(row)][col+i][0]==0||board[(row)][col+i][0]==`${shipnum}`){
                newBoard[(row)][col+i]=`${shipnum}${(photonum+i)}`
                newShips[shipnum-1].position[photonum+i-1]=`${row}${col+i}`
            }else{
                check=1
            };
            }
            if (check==0){
                return({newBoard,newShips})
            }else if (check!=0){
                return(false)
            }
        }else{
            return(false)
        }
    
    
    };

    const achoosequare=(chosenSpot,opopnentBoard,row,col)=>{
        let newoponBoard=_.cloneDeep(opopnentBoard)
        if (opopnentBoard[(chosenSpot[0])][(chosenSpot[1])]=='008'||chosenSpot=='999'||chosenSpot!=='998'){
            newoponBoard[(chosenSpot[0])][(chosenSpot[1])]='00'
            newoponBoard[row][col]='008'
            let newChosenspot=`${row}${col}`
            return({newoponBoard,newChosenspot})
    
        }else{
            return(false)
        }
    }
    
    return {
        aplaceShip,
        achoosequare,
      };  
};