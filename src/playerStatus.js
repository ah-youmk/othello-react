const Player = class {
  constructor(name, positions, type) {
    this.name = name;
    this.type = type;
    this.turn = false;
    this.positions = positions;
    this.score = positions.length;
  }

  setTurn(turn) {
    this.turn = turn;
  }

  setName(name) {
    this.name = name;
  }
};

export const playerWhite = new Player(
  'Player1',
  [
    { col: 4, row: 4 },
    { col: 5, row: 5 },
  ],
  'white'
);
export const playerBlack = new Player(
  'Player2',
  [
    { col: 4, row: 5 },
    { col: 5, row: 4 },
  ],
  'black'
);
playerBlack.setTurn(true);
