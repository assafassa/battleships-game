

export const aopopnentBoard=[
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
export const aopponentShips=[
  {
    id: 1,
    type: 'ship1',
    length:6,
    howmanydown:0,
    images: ['ship1/1.png', 'ship1/2.png', 'ship1/3.png', 'ship1/4.png', 'ship1/5.png', 'ship1/6.png'],
    sunk:false
  },
  {
    id: 2,
    type: 'ship2',
    length:4,
    howmanydown:0,
    images: ['ship2/1.png', 'ship2/2.png', 'ship2/3.png', 'ship2/4.png'],
    sunk:false
  },
  {
    id: 3,
    type: 'ship3',
    length:3,
    howmanydown:0,
    isHorizontal: true,
    images: ['ship3/1.png', 'ship3/2.png', 'ship3/3.png'],
    sunk:false
  },
  {
    id: 4,
    type: 'ship4',
    length:4,
    howmanydown:0,
    images: ['ship4/1.png', 'ship4/2.png', 'ship4/3.png', 'ship4/4.png'],
    sunk:false
  },
];

export const aboard=[
  ['00', '31', '32', '33', '00', '00', '00', '41', '00', '00'],
['00', '00', '00', '00', '00', '00', '00', '42', '00', '00'],
['00', '00', '00', '00', '00', '00', '00', '43', '00', '00'],
['00', '00', '00', '00', '00', '00', '00', '44', '00', '00'],
['11', '12', '13', '14', '15', '16','00', '00', '00', '00'],
['00', '00', '00', '00', '00', '00', '00','00', '00', '00'],
['00', '00', '00', '00', '00', '21', '00','00', '00', '00'],
['00', '00', '00', '00', '00', '22', '00','00', '00', '00'],
['00', '00', '00', '00', '00', '23', '00','00', '00', '00'],
['00', '00', '00', '00', '00', '24', '00','00', '00', '00']
];
export const aships=[
  {
    id: 1,
    type: 'ship1',
    length:6,
    howmanydown:0,
    isHorizontal: true,
    images: ['ship1/1.png', 'ship1/2.png', 'ship1/3.png', 'ship1/4.png', 'ship1/5.png', 'ship1/6.png'],
    position: ['40', '41', '42', '43', '44', '45'], 
    sunk:false
  },
  {
    id: 2,
    type: 'ship2',
    length:4,
    howmanydown:0,
    isHorizontal: false,
    images: ['ship2/1.png', 'ship2/2.png', 'ship2/3.png', 'ship2/4.png'],
    position: ['65', '75', '85', '95'], 
    sunk:false
  },
  {
    id: 3,
    type: 'ship3',
    length:3,
    howmanydown:0,
    isHorizontal: true,
    images: ['ship3/1.png', 'ship3/2.png', 'ship3/3.png'],
    position: ['01', '02', '03'],
    sunk:false
  },
  {
    id: 4,
    type: 'ship4',
    length:4,
    howmanydown:0,
    isHorizontal: false,
    images: ['ship4/1.png', 'ship4/2.png', 'ship4/3.png', 'ship4/4.png'],
    position: ['07', '17', '27','37'], 
    sunk:false
  },
  // ... add more ships
];
  
