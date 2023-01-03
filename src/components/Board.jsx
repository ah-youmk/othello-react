import Position from './Position';
import styles from './Board.module.css';
import { Player } from '../playerStatus';

const columns = [1, 2, 3, 4, 5, 6, 7, 8];
const rows = [1, 2, 3, 4, 5, 6, 7, 8];
const playerWhite = new Player(
  'Player1',
  [
    { col: 4, row: 4 },
    { col: 5, row: 5 },
  ],
  'white'
);
const playerBlack = new Player(
  'Player1',
  [
    { col: 4, row: 5 },
    { col: 5, row: 4 },
  ],
  'black'
);
console.log(playerWhite);

export default function Board() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.playerBlackStats}></div>
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
        <div className={styles.playerWhiteStats}></div>
      </div>
    </>
  );
}
