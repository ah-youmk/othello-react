import styles from './Piece.module.css';

export default function Piece({ color, prev }) {
  return (
    <>
      {color === 'white' && !prev ? (
        <div className={styles.whitePiece}></div>
      ) : color === 'black' && !prev ? (
        <div className={styles.blackPiece}></div>
      ) : color === 'white' && prev ? (
        <div className={styles.whitePrev}></div>
      ) : (
        <div className={styles.blackPrev}></div>
      )}
    </>
  );
}
