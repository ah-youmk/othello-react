import Piece from './Piece';

export default function Position({
  column,
  row,
  players,
  updateBoard,
  divStyle,
  hasEnded,
}) {
  let isFilled = false;
  const clickHandler = (e) => {
    e.preventDefault();
    if (isFilled || hasEnded) {
      return;
    }
    updateBoard(column, row);
  };

  return (
    <div className={divStyle} onClick={clickHandler}>
      {players.map((player) =>
        player.positions.map((position, index) => {
          if (!(position.col === column && position.row === row)) {
            return;
          }
          isFilled = true;
          return <Piece key={index} color={player.type} />;
        })
      )}
    </div>
  );
}
