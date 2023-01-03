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
};
