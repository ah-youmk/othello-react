import { useState } from 'react';
import { Player } from '../playerStatus';
import Piece from './Piece';
import styles from './Position.module.css';

export default function Position({
  column,
  row,
  players,
  isFilled,
  onSetBlackPlayer,
  onSetWhitePlayer,
  blackPlayer,
  whitePlayer,
}) {
  const clickHandler = (e) => {
    e.preventDefault();
    if (isFilled) {
      console.log('illegal move');
      return;
    }
    if (blackPlayer.turn) {
      const newPositions = [
        ...blackPlayer.positions,
        { col: column, row: row },
      ];
      blackPlayer.setPositions(newPositions);
      const newPlayer = new Player(
        blackPlayer.name,
        blackPlayer.positions,
        blackPlayer.type
      );
      newPlayer.setTurn(false);
      whitePlayer.setTurn(true);
      onSetBlackPlayer(newPlayer);
      return;
    }

    const newPositions = [...whitePlayer.positions, { col: column, row: row }];
    whitePlayer.setPositions(newPositions);
    const newPlayer = new Player(
      whitePlayer.name,
      whitePlayer.positions,
      whitePlayer.type
    );
    newPlayer.setTurn(false);
    blackPlayer.setTurn(true);
    onSetWhitePlayer(newPlayer);
  };

  return (
    <div className={styles.position} onClick={clickHandler}>
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
