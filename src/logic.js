import { playerBlack, playerWhite } from './playerStatus.js';
import _ from 'lodash';

const contains = (arr, obj) => {
  let isThere = false;
  for (const item of arr) {
    if (_.isEqual(item, obj)) isThere = true;
  }
  return isThere;
};

const calcSidePos = (position) => {
  const sidePos = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      sidePos.push({
        col: position.col + j,
        row: position.row + i,
      });
    }
  }
  return sidePos;
};

const calcScore = (type, sidePos, block) => {
  const currentPlayer = type === 'white' ? playerWhite : playerBlack;
  const opponentPlayer = type === 'white' ? playerBlack : playerWhite;
  let score = 0;
  let isLegal = false;
  while (
    !contains(currentPlayer.positions, sidePos[block - 1]) &&
    contains(opponentPlayer.positions, sidePos[block - 1]) &&
    sidePos[block - 1].col > 1 &&
    sidePos[block - 1].col < 8 &&
    sidePos[block - 1].row > 1 &&
    sidePos[block - 1].col < 8
  ) {
    score++;
    sidePos = calcSidePos({
      col: sidePos[block - 1].col,
      row: sidePos[block - 1].row,
    });
  }
  if (contains(currentPlayer.positions, sidePos[block - 1]) && score > 0)
    isLegal = true;
  return [score, isLegal];
};

const checkLegalMoves = (pos, type) => {
  let sidePos = calcSidePos(pos);

  if (calcScore(type, sidePos, 4)[1]) return true;
  if (calcScore(type, sidePos, 5)[1]) return true;
  if (calcScore(type, sidePos, 2)[1]) return true;
  if (calcScore(type, sidePos, 7)[1]) return true;
  if (calcScore(type, sidePos, 1)[1]) return true;
  if (calcScore(type, sidePos, 8)[1]) return true;
  if (calcScore(type, sidePos, 3)[1]) return true;
  if (calcScore(type, sidePos, 6)[1]) return true;

  return false;
};

const calcPAvailbaleMoves = (sidePos) => {
  const sidePositions = calcSidePos(sidePos);
  const pAvailbaleMoves = [];
  sidePositions.forEach((sidePosition) => {
    if (
      contains(playerBlack.positions, sidePosition) ||
      contains(playerWhite.positions, sidePosition)
    ) {
      return;
    }
    pAvailbaleMoves.push(sidePosition);
  });
  return pAvailbaleMoves;
};

let pbAvailbaleMoves = [];
playerWhite.positions.forEach((position) => {
  pbAvailbaleMoves = [...pbAvailbaleMoves, ...calcPAvailbaleMoves(position)];
});

const pbLegalMoves = [];
for (const pos of pbAvailbaleMoves) {
  if (checkLegalMoves(pos, playerBlack.type) && !contains(pbLegalMoves, pos)) {
    pbLegalMoves.push(pos);
  }
}
