import styles from './Board.module.css';

export default function PlayerInfo({ player, hasEnded, draw, playerDiv }) {
  const playerWon = <div>{player.name} has won</div>;
  const playerLost = <div>{player.name} has lost</div>;
  return (
    <>
      <div className={playerDiv}>
        <div className={styles.playerStats}>
          <div className={styles.playerName}>
            <div>
              {player.name} is {player.type}
            </div>
            <div> Remaining discs : {player.disc}</div>
            <div>Score : {player.score}</div>
            {player.turn && !hasEnded ? (
              <div>{player.name}'s turn</div>
            ) : !player.turn && !hasEnded ? (
              <div>Wait for your turn</div>
            ) : null}
            {hasEnded && player.hasWon
              ? playerWon
              : hasEnded && !player.hasWon
              ? playerLost
              : hasEnded && draw
              ? draw
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
