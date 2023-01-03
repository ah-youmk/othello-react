import styles from './Piece.module.css';

export default function Piece({ color }) {
  return (
    <>
      {color === 'white' ? (
        <div className={styles.whitePiece}></div>
      ) : (
        <div className={styles.blackPiece}></div>
      )}
    </>
  );
}
