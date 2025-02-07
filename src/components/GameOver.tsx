interface Props {
  winner: string | null;
  resetGameStateHandler: () => void;
}

const GameOver = ({ winner, resetGameStateHandler }: Props) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {!winner && <p>It's a draw!</p>}
      {winner && <p>{winner} won!</p>}
      <p>
        <button onClick={resetGameStateHandler}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
