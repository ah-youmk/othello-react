import { calcPAvailbaleMoves, checkLegalMoves, contains } from './logic';

export function aiLegalMoves(ai, player) {
  const aiLegalMoves = [];
  let aiAvailbaleMoves = [];
  player.positions.forEach((position) => {
    aiAvailbaleMoves = [
      ...aiAvailbaleMoves,
      ...calcPAvailbaleMoves(position, ai, player),
    ];
  });
  for (const pos of aiAvailbaleMoves) {
    if (
      checkLegalMoves(pos, ai, player).isLegal &&
      !contains(aiLegalMoves, pos)
    ) {
      aiLegalMoves.push({
        pos: pos,
        score: checkLegalMoves(pos, ai, player).score,
      });
    }
  }

  return aiLegalMoves;
}

export const aiCalcBestPos = (aiLegalMoves, diff) => {
  let move = { pos: null, score: 0 };
  switch (diff) {
    case 'easy':
      move.score = 99;
      aiLegalMoves.forEach((item) => {
        if (item.score < move.score) {
          move = item;
        }
      });
      break;
    case 'normal':
      const scores = [];
      aiLegalMoves.forEach((item) => scores.push(item.score));
      scores.sort((a, b) => a - b);
      const moveScore =
        scores.length % 2 === 0
          ? scores[scores.length / 2 - 1]
          : scores[(scores.length + 1) / 2 - 1];
      aiLegalMoves.forEach((item) => {
        if (item.score === moveScore) move = item;
      });
      break;
    default:
      aiLegalMoves.forEach((item) => {
        if (item.score > move.score) {
          move = item;
        }
      });
      break;
  }

  return move;
};
