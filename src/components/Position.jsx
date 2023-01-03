import Piece from './Piece';
import styles from './Position.module.css';

export default function Position({ column, row, players }) {
  return (
    <div className={styles.position}>
      {players.map((player) =>
        player.positions.map((position, index) => {
          if (!(position.col === column && position.row === row)) {
            return;
          }
          return <Piece key={index} color={player.type} />;
        })
      )}
    </div>
  );
}
