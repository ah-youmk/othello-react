import Piece from './Piece';
import styles from './Position.module.css';

export default function Position({
  column,
  row,
  players,
  updateBoard,
  pLegalMoves,
  hasEnded,
  playerblackTurn,
}) {
  const type = playerblackTurn ? 'black' : 'white';
  let isFilled = false;
  const clickHandler = (e) => {
    e.preventDefault();
    if (isFilled || hasEnded) {
      return;
    }
    updateBoard(column, row);
  };

  return (
    <div className={styles.position} onClick={clickHandler}>
      {players.map((player) =>
        player.positions.map((position, index) => {
          if (!(position.col === column && position.row === row)) {
            return;
          }
          isFilled = true;
          return <Piece key={index} color={player.type} prev={false} />;
        })
      )}
      {pLegalMoves.map((pos, index) => {
        if (pos.col === column && pos.row === row) {
          return <Piece key={index} color={type} prev={true} />;
        }
      })}
    </div>
  );
}
