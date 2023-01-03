import Position from './Position';
import styles from './Board.module.css';
import { playerBlack, playerWhite } from '../playerStatus';

const columns = [1, 2, 3, 4, 5, 6, 7, 8];
const rows = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Board() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.playerBlackStats}>
          <div className={styles.playerStats}>
            <div className={styles.playerName}>
              <p>{playerBlack.name}</p>
              <p>Current Score : {playerBlack.score}</p>
            </div>
            <div className={styles.playerTurn}>
              {playerBlack.turn ? (
                <p>{playerBlack.name}'s turn</p>
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
                    players={[playerWhite, playerBlack]}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className={styles.playerWhiteStats}>
          <div className={styles.playerStats}>
            <div className={styles.playerName}>
              <p>{playerWhite.name}</p>
              <p>Current Score : {playerWhite.score}</p>
            </div>
            <div className={styles.playerTurn}>
              {playerWhite.turn ? (
                <p>{playerWhite.name}'s turn</p>
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
