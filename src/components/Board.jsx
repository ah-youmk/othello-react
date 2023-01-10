import Position from './Position';
import PlayerInfo from './PlayerInfo';
import styles from './Board.module.css';
import { Player, playerBlack, playerWhite } from '../js/playerStatus';
import { useState, useEffect } from 'react';
import { playerLegalMoves } from '../js/logic';
import updateState, { saveSession } from '../js/updateState';
import StartPopup from './StartPopup';

const columns = [1, 2, 3, 4, 5, 6, 7, 8];
const rows = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Board() {
  const [hasEnded, setHasEnded] = useState(false);
  const [blackPlayer, setBlackPlayer] = useState(playerBlack);
  const [whitePlayer, setWhitePlayer] = useState(playerWhite);
  const [pLegalMoves, setPLegalMoves] = useState([]);
  const [togglePopup, setTogglePopup] = useState(true);
  const [isAi, setIsAi] = useState(false);
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
      setPLegalMoves([]);
      if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
      else if (blackPlayer.score < whitePlayer.score) whitePlayer.hasWon = true;
      else draw = true;
      saveSession(whitePlayer, blackPlayer, isAi);
      return;
    }
    if (blackPlayer.score === 0 || whitePlayer.score === 0) {
      setHasEnded(true);
      setPLegalMoves([]);
      if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
      else if (blackPlayer.score < whitePlayer.score) whitePlayer.hasWon = true;
      else draw = true;
      saveSession(whitePlayer, blackPlayer, isAi);
      return;
    }

    if (blackPlayer.turn) {
      const tempLegalMoves = playerLegalMoves(whitePlayer, blackPlayer);
      if (blackPlayer.disc <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        setPLegalMoves([]);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer, isAi);
        return;
      }
      if (pLegalMoves.length <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        setPLegalMoves([]);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer, isAi);
        return;
      }
      setPLegalMoves(() => playerLegalMoves(blackPlayer, whitePlayer));
    } else {
      const tempLegalMoves = playerLegalMoves(blackPlayer, whitePlayer);
      if (whitePlayer.disc <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        setPLegalMoves([]);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer, isAi);
        return;
      }
      if (pLegalMoves.length <= 0 && tempLegalMoves.length === 0) {
        setHasEnded(true);
        setPLegalMoves([]);
        if (blackPlayer.score > whitePlayer.score) blackPlayer.hasWon = true;
        else if (blackPlayer.score < whitePlayer.score)
          whitePlayer.hasWon = true;
        else draw = true;
        saveSession(whitePlayer, blackPlayer, isAi);
        return;
      }
      setPLegalMoves(() => playerLegalMoves(whitePlayer, blackPlayer));
    }
    if (
      sessionStorage.getItem('playerwPositions') ||
      JSON.parse(sessionStorage.getItem('togglePopup'))
    ) {
      setIsAi(JSON.parse(sessionStorage.getItem('isAi')));
      setTogglePopup(!JSON.parse(sessionStorage.getItem('togglePopup')));
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
    if (
      sessionStorage.getItem('playerbPositions') ||
      JSON.parse(sessionStorage.getItem('togglePopup'))
    ) {
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
        <PlayerInfo
          player={blackPlayer}
          hasEnded={hasEnded}
          draw={draw}
          playerDiv={styles.playerBlackStats}
        />

        <div className={styles.boardContainer}>
          <div className={styles.newGame}>
            <button
              onClick={() => {
                setTogglePopup(true);
              }}
            >
              New Game
            </button>
          </div>
          <div className={styles.boardLayout}>
            <div className={styles.board}>
              {rows.map((row, indexR) =>
                columns.map((column, indexC) => {
                  const uniqueID = `${indexR}` + `${indexC}`;
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
                      pLegalMoves={pLegalMoves}
                      hasEnded={hasEnded}
                      playerblackTurn={blackPlayer.turn}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        <PlayerInfo
          player={whitePlayer}
          hasEnded={hasEnded}
          draw={draw}
          playerDiv={styles.playerWhiteStats}
        />
      </div>
      {togglePopup ? (
        <StartPopup
          setTogglePopup={setTogglePopup}
          setBlackPlayer={setBlackPlayer}
          setWhitePlayer={setWhitePlayer}
          setHasEnded={setHasEnded}
          setIsAi={setIsAi}
        />
      ) : null}
    </>
  );
}
