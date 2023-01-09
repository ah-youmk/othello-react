import Position from './Position';
import PlayerInfo from './PlayerInfo';
import styles from './Board.module.css';
import positionStyles from './Position.module.css';
import { Player, playerBlack, playerWhite } from '../js/playerStatus';
import { useState, useEffect } from 'react';
import { contains, playerLegalMoves } from '../js/logic';
import updateState, { saveSession } from '../js/updateState';

const columns = [1, 2, 3, 4, 5, 6, 7, 8];
const rows = [1, 2, 3, 4, 5, 6, 7, 8];

let isAi = false;

export default function Board() {
  const [hasEnded, setHasEnded] = useState(false);
  const [blackPlayer, setBlackPlayer] = useState(playerBlack);
  const [whitePlayer, setWhitePlayer] = useState(playerWhite);
  const [pLegalMoves, setPLegalMoves] = useState([]);
  let divStyle;
  let draw = false;

  if (blackPlayer.disc <= 0 && blackPlayer.turn) {
    whitePlayer.turn = true;
    blackPlayer.turn = false;
  }
  if (whitePlayer.disc <= 0 && whitePlayer.turn) {
    whitePlayer.turn = false;
    blackPlayer.turn = true;
  }
  if (
    pLegalMoves.length === 0 &&
    blackPlayer.disc !== 30 &&
    (blackPlayer.disc !== 0 || whitePlayer.disc !== 0) &&
    whitePlayer.disc !== 30
  ) {
    if (blackPlayer.score !== 0 && blackPlayer.turn) {
      whitePlayer.turn = true;
      blackPlayer.turn = false;
    } else if (whitePlayer.turn && whitePlayer.score !== 0) {
      whitePlayer.turn = false;
      blackPlayer.turn = true;
    }
  }

  useEffect(() => {
    if (blackPlayer.disc === 0 && whitePlayer.disc === 0) {
      setHasEnded(true);
      divStyle = positionStyles.position;
      if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
      else if (blackPlayer.score < whitePlayer.score) whitePlayer.hasWon = true;
      else draw = true;
      saveSession(whitePlayer, blackPlayer);
      return;
    }
    if (blackPlayer.score === 0 || whitePlayer.score === 0) {
      setHasEnded(true);
      if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
      else if (blackPlayer.score < whitePlayer.score) whitePlayer.hasWon = true;
      else draw = true;
      saveSession(whitePlayer, blackPlayer);
      return;
    }

    if (blackPlayer.turn) {
      const tempLegalMoves = playerLegalMoves(whitePlayer, blackPlayer);
      if (blackPlayer.disc <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer);
        return;
      }
      if (pLegalMoves.length <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer);
        return;
      }
      setPLegalMoves(() => playerLegalMoves(blackPlayer, whitePlayer));
    } else {
      const tempLegalMoves = playerLegalMoves(blackPlayer, whitePlayer);
      if (whitePlayer.disc <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer);
        return;
      }
      if (pLegalMoves.length <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer);
        return;
      }
      setPLegalMoves(() => playerLegalMoves(whitePlayer, blackPlayer));
    }
    if (sessionStorage.getItem('playerwPositions')) {
      const newWhite = new Player(
        sessionStorage.getItem('playerwName'),
        JSON.parse(sessionStorage.getItem('playerwPositions')),
        'white'
      );
      newWhite.setDisc(JSON.parse(sessionStorage.getItem('playerwDisc')));
      newWhite.setTurn(JSON.parse(sessionStorage.getItem('playerwTurn')));
      newWhite.setHasWon(JSON.parse(sessionStorage.getItem('playerwHasWon')));
      setWhitePlayer(newWhite);
    }
    if (sessionStorage.getItem('playerbPositions')) {
      const newBlack = new Player(
        sessionStorage.getItem('playerbName'),
        JSON.parse(sessionStorage.getItem('playerbPositions')),
        'black'
      );
      newBlack.setDisc(JSON.parse(sessionStorage.getItem('playerbDisc')));
      newBlack.setTurn(JSON.parse(sessionStorage.getItem('playerbTurn')));
      newBlack.setHasWon(JSON.parse(sessionStorage.getItem('playerbHasWon')));
      setBlackPlayer(newBlack);
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

  return (
    <>
      <div className={styles.container}>
        <PlayerInfo player={blackPlayer} hasEnded={hasEnded} draw={draw} />

        <div className={styles.boardContainer}>
          <div className={styles.board}>
            {rows.map((row, indexR) =>
              columns.map((column, indexC) => {
                const uniqueID = `${indexR}` + `${indexC}`;
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
                    updateBoard={(column, row) =>
                      updateState(
                        whitePlayer,
                        blackPlayer,
                        pLegalMoves,
                        column,
                        row,
                        isAi,
                        setBlackPlayer,
                        setWhitePlayer
                      )
                    }
                    divStyle={divStyle}
                    hasEnded={hasEnded}
                  />
                );
              })
            )}
          </div>
        </div>

        <PlayerInfo player={whitePlayer} hasEnded={hasEnded} draw={draw} />
      </div>
    </>
  );
}
