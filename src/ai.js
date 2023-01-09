import { calcPAvailbaleMoves, checkLegalMoves, contains } from './logic';

const aiFunction = () => {};

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

export const aiCalcBestPos = (aiLegalMoves) => {
  let best = { pos: null, score: 0 };
  aiLegalMoves.forEach((item) => {
    if (item.score > best.score) {
      best = item;
    }
  });

  return best;
};
