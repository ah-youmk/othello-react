import { useState } from 'react';
import styles from './modal.module.css';
import { Player } from '../js/playerStatus';
import { saveSession } from '../js/updateState';

export default function StartPopup({
  setTogglePopup,
  setBlackPlayer,
  setWhitePlayer,
  setHasEnded,
  setIsAi,
}) {
  const [blackPlayerName, setPlayerBlackName] = useState('');
  const [whitePlayerName, setPlayerWhiteName] = useState('');

  const aiPlay = () => {
    const ai = new Player(
      'Computer',
      [
        { col: 4, row: 4 },
        { col: 5, row: 5 },
      ],
      'white'
    );
    const blackPlayer = new Player(
      blackPlayerName,
      [
        { col: 4, row: 5 },
        { col: 5, row: 4 },
      ],
      'black'
    );
    blackPlayer.setTurn(true);
    setIsAi(true);
    setBlackPlayer(blackPlayer);
    setWhitePlayer(ai);
    saveSession(ai, blackPlayer, true);
    setHasEnded(false);
    setTogglePopup(false);
  };
  const twoPlayer = () => {
    const whitePlayer = new Player(
      whitePlayerName,
      [
        { col: 4, row: 4 },
        { col: 5, row: 5 },
      ],
      'white'
    );
    const blackPlayer = new Player(
      blackPlayerName,
      [
        { col: 4, row: 5 },
        { col: 5, row: 4 },
      ],
      'black'
    );
    blackPlayer.setTurn(true);
    setIsAi(false);
    setBlackPlayer(blackPlayer);
    setWhitePlayer(whitePlayer);
    saveSession(whitePlayer, blackPlayer, false);
    setHasEnded(false);
    setTogglePopup(false);
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.ai_play}>
            <div className={styles.ai_info}>
              <div>
                <span className={styles.ai_info_div_span}>
                  Play with the computer
                </span>
              </div>
              <br />
              <div>
                <span>Enter your name</span>
                <input
                  placeholder="Black Player"
                  onChange={(e) => setPlayerBlackName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className={styles.ai_info}>
              <button onClick={aiPlay}>Play</button>
            </div>
          </div>
          <div className={styles.two_player}>
            <div className={styles.player_info}>
              <div>
                <span>Player black's name</span>
                <input
                  placeholder="Black Player"
                  onChange={(e) => setPlayerBlackName(e.target.value)}
                ></input>
              </div>
              <br />
              <div>
                <span>Player white's name</span>
                <input
                  placeholder="White Player"
                  onChange={(e) => setPlayerWhiteName(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={styles.player_info}>
              <button onClick={twoPlayer}>Play</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
