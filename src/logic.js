import _ from 'lodash';

export const contains = (arr, obj) => {
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

const checkLegal = (sidePos, block, currentPlayer, opponentPlayer) => {
  let score = 0;
  let isLegal = false;
  while (
    !contains(currentPlayer.positions, sidePos[block - 1]) &&
    contains(opponentPlayer.positions, sidePos[block - 1]) &&
    sidePos[block - 1].col > 0 &&
    sidePos[block - 1].col < 9 &&
    sidePos[block - 1].row > 0 &&
    sidePos[block - 1].col < 9
  ) {
    score++;
    sidePos = calcSidePos({
      col: sidePos[block - 1].col,
      row: sidePos[block - 1].row,
    });
  }

  if (contains(currentPlayer.positions, sidePos[block - 1]) && score > 0) {
    if (
      sidePos[block - 1].row > 0 &&
      sidePos[block - 1].row < 9 &&
      sidePos[block - 1].col > 0 &&
      sidePos[block - 1].col < 9
    ) {
      isLegal = true;
    }
  }
  return [score, isLegal];
};

const calcScore = (sidePos, block, currentPlayer, opponentPlayer) => {
  const tempCurrent = _.cloneDeep(currentPlayer);
  const tempOpponent = _.cloneDeep(opponentPlayer);
  const addCurr = [];
  const removeOppo = [];
  while (
    !contains(tempCurrent.positions, sidePos[block - 1]) &&
    contains(tempOpponent.positions, sidePos[block - 1]) &&
    sidePos[block - 1].col > 0 &&
    sidePos[block - 1].col < 9 &&
    sidePos[block - 1].row > 0 &&
    sidePos[block - 1].col < 9
  ) {
    addCurr.push(sidePos[block - 1]);
    removeOppo.push(sidePos[block - 1]);
    sidePos = calcSidePos({
      col: sidePos[block - 1].col,
      row: sidePos[block - 1].row,
    });
  }

  return contains(tempCurrent.positions, sidePos[block - 1]) &&
    addCurr.length > 0
    ? {
        addedCurr: addCurr,
        removedOppo: removeOppo,
      }
    : { addedCurr: [], removedOppo: [] };
};

export const calcScoresAll = (pos, currentPlayer, opponentPlayer) => {
  const sidePos = calcSidePos(pos);
  let result = {};
  let currentPlayerNewPositions = [...currentPlayer.positions];

  result = calcScore(sidePos, 4, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  result = calcScore(sidePos, 5, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  result = calcScore(sidePos, 2, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  result = calcScore(sidePos, 7, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  result = calcScore(sidePos, 1, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  result = calcScore(sidePos, 8, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  result = calcScore(sidePos, 3, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  result = calcScore(sidePos, 6, currentPlayer, opponentPlayer);
  currentPlayerNewPositions = [
    ...currentPlayerNewPositions,
    ...result.addedCurr,
  ];
  for (const item of result.removedOppo) {
    const index = opponentPlayer.positions.findIndex((position) =>
      _.isEqual(position, item)
    );
    if (index > -1) {
      opponentPlayer.positions.splice(index, 1);
    }
  }

  return {
    newCurrent: currentPlayerNewPositions,
    newOpponent: opponentPlayer.positions,
  };
};

export const checkLegalMoves = (pos, currentPlayer, opponentPlayer) => {
  if (!(pos.row > 0 && pos.row < 9 && pos.col > 0 && pos.col < 9)) {
    return false;
  }
  let isLegal = 0;
  let score = 0;
  const sidePos = calcSidePos(pos);

  if (checkLegal(sidePos, 4, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 4, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }
  if (checkLegal(sidePos, 5, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 5, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }
  if (checkLegal(sidePos, 2, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 2, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }
  if (checkLegal(sidePos, 7, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 7, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }
  if (checkLegal(sidePos, 3, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 3, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }
  if (checkLegal(sidePos, 6, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 6, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }
  if (checkLegal(sidePos, 1, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 1, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }
  if (checkLegal(sidePos, 8, currentPlayer, opponentPlayer)[1]) {
    score += checkLegal(sidePos, 8, currentPlayer, opponentPlayer)[0];
    isLegal++;
  }

  return isLegal > 0
    ? { isLegal: true, score: score }
    : { isLegal: false, score: score };
};

export const calcPAvailbaleMoves = (sidePos, currentPlayer, opponentPlayer) => {
  const sidePositions = calcSidePos(sidePos);
  const pAvailbaleMoves = [];
  sidePositions.forEach((sidePosition) => {
    if (
      contains(currentPlayer.positions, sidePosition) ||
      contains(opponentPlayer.positions, sidePosition)
    ) {
      return;
    }
    pAvailbaleMoves.push(sidePosition);
  });
  return pAvailbaleMoves;
};
