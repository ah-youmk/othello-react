import Position from './Position';
import styles from './Board.module.css';
import { playerBlack, playerWhite } from '../playerStatus';
import { useState } from 'react';

const columns = [1, 2, 3, 4, 5, 6, 7, 8];
const rows = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Board() {
  const [blackPlayer, setBlackPlayer] = useState(playerBlack);
  const [whitePlayer, setWhitePlayer] = useState(playerWhite);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.playerBlackStats}>
          <div className={styles.playerStats}>
            <div className={styles.playerName}>
              <p>{blackPlayer.name} is Black</p>
              <p>Current Score : {blackPlayer.score}</p>
            </div>
            <div className={styles.playerTurn}>
              {blackPlayer.turn ? (
                <p>{blackPlayer.name}'s turn</p>
              ) : (
                <p>Wait for your turn</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.boardContainer}>
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
                    isFilled={false}
                    setBlackPlayer={setBlackPlayer}
                    setWhitePlayer={setWhitePlayer}
                    blackPlayer={blackPlayer}
                    whitePlayer={whitePlayer}
                    onSetBlackPlayer={(newPlayer) => setBlackPlayer(newPlayer)}
                    onSetWhitePlayer={(newPlayer) => setWhitePlayer(newPlayer)}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className={styles.playerWhiteStats}>
          <div className={styles.playerStats}>
            <div className={styles.playerName}>
              <p>{whitePlayer.name} is White</p>
              <p>Current Score : {whitePlayer.score}</p>
            </div>
            <div className={styles.playerTurn}>
              {whitePlayer.turn ? (
                <p>{whitePlayer.name}'s turn</p>
              ) : (
                <p>Wait for your turn</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
