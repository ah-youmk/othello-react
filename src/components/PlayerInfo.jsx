import styles from './Board.module.css';

export default function PlayerInfo({ player, hasEnded }) {
  const playerWon = <p>{player.name} has won</p>;
  const playerLost = <p>{player.name} has lost</p>;
  return (
    <>
      <div className={styles.playerBlackStats}>
        <div className={styles.playerStats}>
          <div className={styles.playerName}>
            <p>
              {player.name} is {player.type}
            </p>
            <p>Remaining discs : {player.disc}</p>
            <p>Score : {player.score}</p>
            {hasEnded && player.hasWon ? (
              playerWon
            ) : hasEnded && !player.hasWon ? (
              playerLost
            ) : (
              <p></p>
            )}
          </div>
          <div className={styles.playerTurn}>
            {player.turn && !hasEnded ? (
              <p>{player.name}'s turn</p>
            ) : !player.turn && !hasEnded ? (
              <p>Wait for your turn</p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
