import { aiCalcBestPos, aiLegalMoves } from './ai';
import { calcScoresAll, contains } from './logic';
import { Player } from './playerStatus';

export default function (
  whitePlayer,
  blackPlayer,
  pLegalMoves,
  column,
  row,
  isAi,
  setBlackPlayer,
  setWhitePlayer
) {
  if (!contains(pLegalMoves, { col: column, row: row })) {
    return;
  }
  if (isAi) {
    if (blackPlayer.disc > 0) {
      const result = calcScoresAll(
        { col: column, row: row },
        blackPlayer,
        whitePlayer
      );
      const newBlackPositions = [
        ...result.newCurrent,
        { col: column, row: row },
      ];
      const newWhitePositions = result.newOpponent;
      blackPlayer.setPositions(newBlackPositions);
      whitePlayer.setPositions(newWhitePositions);
      const newBlackPlayer = new Player(
        blackPlayer.name,
        blackPlayer.positions,
        blackPlayer.type
      );
      const newWhitePlayer = new Player(
        whitePlayer.name,
        whitePlayer.positions,
        whitePlayer.type
      );
      newBlackPlayer.setDisc(blackPlayer.disc - 1);
      newWhitePlayer.setDisc(whitePlayer.disc);

      const aiBest = aiCalcBestPos(aiLegalMoves(whitePlayer, blackPlayer));
      if (aiBest.pos === null) {
        newBlackPlayer.setTurn(true);
        newWhitePlayer.setTurn(false);
        setBlackPlayer(newBlackPlayer);
        setWhitePlayer(newWhitePlayer);
        return;
      }

      const aiResult = calcScoresAll(
        { col: aiBest.pos.col, row: aiBest.pos.row },
        whitePlayer,
        blackPlayer
      );
      const newAiPositions = [
        ...aiResult.newCurrent,
        { col: aiBest.pos.col, row: aiBest.pos.row },
      ];
      const afterAiBlackPositions = aiResult.newOpponent;
      blackPlayer.setPositions(afterAiBlackPositions);
      whitePlayer.setPositions(newAiPositions);
      const newAiPlayer = new Player(
        whitePlayer.name,
        whitePlayer.positions,
        whitePlayer.type
      );
      const afterBlackPlayer = new Player(
        blackPlayer.name,
        blackPlayer.positions,
        blackPlayer.type
      );
      newAiPlayer.setDisc(whitePlayer.disc - 1);
      afterBlackPlayer.setDisc(newBlackPlayer.disc);
      if (blackPlayer.disc <= 0) {
        afterBlackPlayer.setTurn(false);
        newAiPlayer.setTurn(true);
        setBlackPlayer(afterBlackPlayer);
        setWhitePlayer(newAiPlayer);
        return;
      }
      newAiPlayer.setTurn(false);
      afterBlackPlayer.setTurn(true);
      setWhitePlayer(newAiPlayer);
      setBlackPlayer(afterBlackPlayer);
      return;
    }
    const aiBest = aiCalcBestPos(aiLegalMoves(whitePlayer, blackPlayer));

    if (aiBest.pos === null) {
      blackPlayer.setTurn(false);
      whitePlayer.setTurn(true);
      setBlackPlayer(blackPlayer);
      setWhitePlayer(whitePlayer);
      return;
    }
    const aiResult = calcScoresAll(
      { col: aiBest.pos.col, row: aiBest.pos.row },
      whitePlayer,
      blackPlayer
    );
    const newAiPositions = [
      ...aiResult.newCurrent,
      { col: aiBest.pos.col, row: aiBest.pos.row },
    ];
    const afterAiBlackPositions = aiResult.newOpponent;
    blackPlayer.setPositions(afterAiBlackPositions);
    whitePlayer.setPositions(newAiPositions);
    const newAiPlayer = new Player(
      whitePlayer.name,
      whitePlayer.positions,
      whitePlayer.type
    );
    const afterBlackPlayer = new Player(
      blackPlayer.name,
      blackPlayer.positions,
      blackPlayer.type
    );
    newAiPlayer.setDisc(whitePlayer.disc - 1);
    afterBlackPlayer.setDisc(blackPlayer.disc);
    newAiPlayer.setTurn(true);
    afterBlackPlayer.setTurn(false);
    setWhitePlayer(newAiPlayer);
    setBlackPlayer(afterBlackPlayer);
    return;
  }

  if (blackPlayer.turn) {
    const result = calcScoresAll(
      { col: column, row: row },
      blackPlayer,
      whitePlayer
    );
    const newBlackPositions = [...result.newCurrent, { col: column, row: row }];
    const newWhitePositions = result.newOpponent;
    blackPlayer.setPositions(newBlackPositions);
    whitePlayer.setPositions(newWhitePositions);
    const newBlackPlayer = new Player(
      blackPlayer.name,
      blackPlayer.positions,
      blackPlayer.type
    );
    const newWhitePlayer = new Player(
      whitePlayer.name,
      whitePlayer.positions,
      whitePlayer.type
    );
    newBlackPlayer.setDisc(blackPlayer.disc - 1);
    newWhitePlayer.setDisc(whitePlayer.disc);
    if (whitePlayer.disc <= 0) {
      newBlackPlayer.setTurn(true);
      newWhitePlayer.setTurn(false);
      setBlackPlayer(newBlackPlayer);
      setWhitePlayer(newWhitePlayer);
      return;
    }
    newBlackPlayer.setTurn(false);
    newWhitePlayer.setTurn(true);
    setBlackPlayer(newBlackPlayer);
    setWhitePlayer(newWhitePlayer);
    return;
  }

  const result = calcScoresAll(
    { col: column, row: row },
    whitePlayer,
    blackPlayer
  );
  const newWhitePositions = [...result.newCurrent, { col: column, row: row }];
  const newBlackPositions = result.newOpponent;
  blackPlayer.setPositions(newBlackPositions);
  whitePlayer.setPositions(newWhitePositions);
  const newWhitePlayer = new Player(
    whitePlayer.name,
    whitePlayer.positions,
    whitePlayer.type
  );
  const newBlackPlayer = new Player(
    blackPlayer.name,
    blackPlayer.positions,
    blackPlayer.type
  );
  newWhitePlayer.setDisc(whitePlayer.disc - 1);
  newBlackPlayer.setDisc(blackPlayer.disc);
  if (blackPlayer.disc <= 0) {
    newBlackPlayer.setTurn(false);
    newWhitePlayer.setTurn(true);
    setBlackPlayer(newBlackPlayer);
    setWhitePlayer(newWhitePlayer);
    return;
  }
  newWhitePlayer.setTurn(false);
  newBlackPlayer.setTurn(true);
  setWhitePlayer(newWhitePlayer);
  setBlackPlayer(newBlackPlayer);
}
