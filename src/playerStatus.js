export const Player = class {
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

  setPositions(positions) {
    this.positions = positions;
  }
};

export const playerWhite = new Player(
  'ali',
  [
    { col: 4, row: 4 },
    { col: 5, row: 5 },
  ],
  'white'
);
export const playerBlack = new Player(
  'mamad',
  [
    { col: 4, row: 5 },
    { col: 5, row: 4 },
  ],
  'black'
);
playerBlack.setTurn(true);
