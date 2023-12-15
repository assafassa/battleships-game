
export let opopnentboard=[
  ['117', '127', '137', '147', '157', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '007', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '007', '00', '00', '777', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '777', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    
];
export let opponentships=[
    {
      id: 1,
      type: 'ship1',
      length:6,
      isHorizontal: true,
      images: ['ship1/1.png', 'ship1/2.png', 'ship1/3.png', 'ship1/4.png', 'ship1/5.png', 'ship1/6.png'],
      sunk:true
    },
    {
      id: 2,
      type: 'ship2',
      length:4,
      isHorizontal: false,
      images: ['ship2/1.png', 'ship2/2.png', 'ship2/3.png', 'ship2/4.png'],
      sunk:false
    },
    {
      id: 3,
      type: 'ship3',
      length:3,
      isHorizontal: true,
      images: ['ship3/1.png', 'ship3/2.png', 'ship3/3.png'],
      sunk:false
    },
    {
      id: 4,
      type: 'ship4',
      length:4,
      isHorizontal: false,
      images: ['ship4/1.png', 'ship4/2.png', 'ship4/3.png', 'ship4/4.png'],
      sunk:false
    },
    // ... add more ships
];




export let myboard=[
  ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    
];
export let myships=[
    {
      id: 1,
      type: 'ship1',
      length:6,
      isHorizontal: true,
      images: ['ship1/1.png', 'ship1/2.png', 'ship1/3.png', 'ship1/4.png', 'ship1/5.png', 'ship1/6.png'],
      sunk:false
    },
    {
      id: 2,
      type: 'ship2',
      length:4,
      isHorizontal: false,
      images: ['ship2/1.png', 'ship2/2.png', 'ship2/3.png', 'ship2/4.png'],
      sunk:false
    },
    {
      id: 3,
      type: 'ship3',
      length:3,
      isHorizontal: true,
      images: ['ship3/1.png', 'ship3/2.png', 'ship3/3.png'],
      sunk:false
    },
    {
      id: 4,
      type: 'ship4',
      length:4,
      isHorizontal: false,
      images: ['ship4/1.png', 'ship4/2.png', 'ship4/3.png', 'ship4/4.png'],
      sunk:false
    },
    // ... add more ships
];
export let chosenspotbyanemy

export function forwardresult(whosturn,chosenspot,result){
  if (result==='777'||result==='007'){
    if(whosturn=='opponent'){
      opopnentboard[chosenspot[0]][chosenspot[1]]=result
    }else if (whosturn=='me'){
        myboard[chosenspot[0]][chosenspot[1]]=result
    }
  }else {
    for (let i = 0; i < result.length; i++) {
      let spot=result.position[i]
      let shipnum=result.id
      if(whosturn=='opponent'){
        opopnentboard[spot[0]][spot[1]]=`${shipnum}${i+1}`
        opponentships[shipnum-1]=result
      }else if (whosturn=='me'){
          myboard[spot[0]][spot[1]]=`${shipnum}${i+1}`
          myboard[shipnum-1]=result
          chosenspotbyanemy=chosenspot
      }
    }
  }

}