import { playerBlack, playerWhite } from './playerStatus.js';
import _ from 'lodash';

const pbRows = [];
const pbCols = [];
playerBlack.forEach((position) => {
  pbRows.push(position.row);
  pbCols.push(position.col);
});

const pwRows = [];
const pwCols = [];
playerWhite.forEach((position) => {
  pwRows.push(position.row);
  pwCols.push(position.col);
});

const contains = (arr, obj) => {
  let isThere = false;
  arr.forEach((item) => {
    if (_.isEqual(item, obj)) isThere = true;
  });
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

const calcScoreRow = (currentP, opponentP, sidePos, axis, pos) => {
  let score = 0;
  let isLegal = false;
  const parameter = axis === 4 ? -1 : 1;
  while (
    !currentP.includes(sidePos[axis - 1].row) &&
    opponentP.includes(sidePos[axis - 1].row) &&
    sidePos.row > 1 &&
    sidePos.row < 8
  ) {
    score++;
    sidePos = calcSidePos({ col: pos.col, row: pos.row + parameter });
  }
  if (currentP.includes(sidePos[axis].row)) {
    isLegal = true;
  }
  return [score, isLegal];
};

const calcScoreColumn = (currentP, opponentP, sidePos, axis, pos) => {
  let score = 0;
  let isLegal = false;
  const parameter = axis === 2 ? -1 : 1;
  while (
    !currentP.includes(sidePos[axis - 1].col) &&
    opponentP.includes(sidePos[axis - 1].col) &&
    sidePos.col > 1 &&
    sidePos.col < 8
  ) {
    score++;
    sidePos = calcSidePos({ col: pos.col + parameter, row: pos.row });
  }
  if (currentP.includes(sidePos[axis].col)) {
    isLegal = true;
  }
  return [score, isLegal];
};

const calcScoreDiameter = (type, sidePos, axis, pos) => {
  const currentPlayer = type === 'white' ? playerWhite : playerBlack;
  const opponentPlayer = type === 'white' ? playerBlack : playerWhite;
  let score = 0;
  let isLegal = false;
  const parameter = axis === 2 ? -1 : 1;
  while (
    !contains(currentPlayer, sidePos) &&
    contains(opponentPlayer, sidePos) &&
    sidePos.col > 1 &&
    sidePos.col < 8 &&
    sidePos.row > 1 &&
    sidePos.col < 8
  ) {
    score++;
    sidePos = calcSidePos({ col: pos.col + parameter, row: pos.row });
  }
  if (currentP.includes(sidePos[axis].col)) {
    isLegal = true;
  }
  return [score, isLegal];
};

const checkLegalMoves = (pos, type) => {
  let isLegal = 0;
  let currentPRows;
  let currentPCols;
  let opponentPRows;
  let opponentPCols;
  if (type === 'white') {
    currentPRows = pbRows;
    currentPCols = pbCols;
    opponentPRows = pwRows;
    opponentPCols = pwCols;
  } else {
    currentPRows = pwRows;
    currentPCols = pwCols;
    opponentPRows = pbRows;
    opponentPCols = pbCols;
  }
  let sidePos = calcSidePos(pos);

  if (calcScoreRow(currentPRows, opponentPRows, sidePos, 4, pos)[1]) isLegal++;
  if (calcScoreRow(currentPRows, opponentPRows, sidePos, 5, pos)[1]) isLegal++;
  if (calcScoreColumn(currentPCols, opponentPCols, sidePos, 2, pos)[1])
    isLegal++;
  if (calcScoreColumn(currentPCols, opponentPCols, sidePos, 7, pos)[1])
    isLegal++;
};

const pbAvailbaleMoves = [];
playerWhite.positions.forEach((position) => {
  const sidePositions = calcSidePos(position);

  sidePositions.forEach((sidePosition) => {
    if (
      contains(playerBlack.positions, sidePosition) ||
      contains(playerWhite.positions, sidePosition)
    ) {
      return;
    }
    pbAvailbaleMoves.push(sidePosition);
  });
});

const pbLegalMoves = [];
pbAvailbaleMoves.forEach((pos) => {
  if (checkLegalMoves(pos, playerBlack.type)) pbLegalMoves.push(pos);
});
