import Position from './Position';
import PlayerInfo from './PlayerInfo';
import styles from './Board.module.css';
import positionStyles from './Position.module.css';
import { playerBlack, playerWhite } from '../playerStatus';
import { useState, useEffect } from 'react';
import { Player } from '../playerStatus';
import {
  calcPAvailbaleMoves,
  calcScoresAll,
  checkLegalMoves,
  contains,
} from '../logic';

const columns = [1, 2, 3, 4, 5, 6, 7, 8];
const rows = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Board() {
  const [hasEnded, setHasEnded] = useState(false);
  const [blackPlayer, setBlackPlayer] = useState(playerBlack);
  const [whitePlayer, setWhitePlayer] = useState(playerWhite);
  const [pLegalMoves, setPLegalMoves] = useState([]);

  if (pLegalMoves.length === 0 && blackPlayer.disc !== 30) {
    console.log('turn not changed');
    if (blackPlayer.turn) {
      whitePlayer.turn = true;
      blackPlayer.turn = false;
    } else {
      whitePlayer.turn = false;
      blackPlayer.turn = true;
    }
  }

  useEffect(() => {
    if (blackPlayer.disc === 0 && whitePlayer.disc === 0) {
      setHasEnded(true);
      return blackPlayer.score > whitePlayer.score
        ? blackPlayer.setHasWon(true)
        : whitePlayer.setHasWon(true);
    }
    if (blackPlayer.score === 0 || whitePlayer.score === 0) {
      setHasEnded(true);
      return blackPlayer.score === 0
        ? whitePlayer.setHasWon(true)
        : blackPlayer.setHasWon(true);
    }
    if (blackPlayer.disc === 0 && whitePlayer.disc === 0) {
      onSetHasEnded(true);
      setDivStyle(stylesPositions.position);
      if (blackPlayer.disc > whitePlayer.disc) blackPlayer.hasWon = true;
      else whitePlayer.hasWon = true;
      return;
    }
    if (blackPlayer.turn) {
      setPLegalMoves(() => playerLegalMoves(blackPlayer, whitePlayer));
    } else {
      setPLegalMoves(() => playerLegalMoves(whitePlayer, blackPlayer));
    }

    return () => {
      setPLegalMoves((prev) => prev.splice(0, prev.length));
    };
  }, [
    blackPlayer.turn,
    whitePlayer.turn,
    pLegalMoves.length,
    blackPlayer.disc,
    whitePlayer.disc,
  ]);

  const updateBoard = (column, row) => {
    if (!contains(pLegalMoves, { col: column, row: row })) {
      return;
    }

    if (blackPlayer.turn) {
      if (blackPlayer.disc <= 0) {
        const newBlackPlayer = new Player(
          playerBlack.name,
          playerBlack.positions,
          playerBlack.type
        );
        const newWhitePlayer = new Player(
          whitePlayer.name,
          whitePlayer.positions,
          whitePlayer.type
        );
        blackPlayer.setTurn(false);
        whitePlayer.setTurn(true);
        newBlackPlayer.setTurn(false);
        newWhitePlayer.setTurn(true);
        setBlackPlayer(newBlackPlayer);
        setWhitePlayer(newWhitePlayer);
        return;
      }
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
    if (whitePlayer.disc <= 0) {
      newBlackPlayer.setTurn(true);
      newWhitePlayer.setTurn(false);
      setBlackPlayer(newBlackPlayer);
      setWhitePlayer(newWhitePlayer);
      return;
    }
    if (blackPlayer.disc <= 0) {
      newBlackPlayer.setTurn(false);
      newWhitePlayer.setTurn(true);
      setBlackPlayer(newBlackPlayer);
      setWhitePlayer(newWhitePlayer);
      return;
    }
    newWhitePlayer.setDisc(whitePlayer.disc - 1);
    newBlackPlayer.setDisc(blackPlayer.disc);
    newWhitePlayer.setTurn(false);
    newBlackPlayer.setTurn(true);
    setWhitePlayer(newWhitePlayer);
    setBlackPlayer(newBlackPlayer);
  };

  const onSetHasEnded = (value) => {
    setHasEnded(value);
  };

  return (
    <>
      <div className={styles.container}>
        <PlayerInfo player={blackPlayer} hasEnded={hasEnded} />

        <div className={styles.boardContainer}>
          <div className={styles.board}>
            {rows.map((row, indexR) =>
              columns.map((column, indexC) => {
                const uniqueID = `${indexR}` + `${indexC}`;
                let divStyle;
                if (
                  contains(pLegalMoves, { col: column, row: row }) &&
                  !hasEnded
                ) {
                  divStyle = positionStyles.previewPosition;
                } else {
                  divStyle = positionStyles.position;
                }
                return (
                  <Position
                    key={uniqueID}
                    column={column}
                    row={row}
                    players={[whitePlayer, blackPlayer]}
                    updateBoard={updateBoard}
                    divStyle={divStyle}
                    hasEnded={hasEnded}
                  />
                );
              })
            )}
          </div>
        </div>

        <PlayerInfo player={whitePlayer} hasEnded={hasEnded} />
      </div>
    </>
  );
}

function playerLegalMoves(currentPlayer, opponentPlayer) {
  const pLegalMoves = [];
  let pAvailbaleMoves = [];
  opponentPlayer.positions.forEach((position) => {
    pAvailbaleMoves = [
      ...pAvailbaleMoves,
      ...calcPAvailbaleMoves(position, currentPlayer, opponentPlayer),
    ];
  });
  for (const pos of pAvailbaleMoves) {
    if (
      checkLegalMoves(pos, currentPlayer, opponentPlayer) &&
      !contains(pLegalMoves, pos)
    ) {
      pLegalMoves.push(pos);
    }
  }

  return pLegalMoves;
}
