import GameState from "../entities/GameState";
import PlayerType from "../entities/Player";

interface Props {
  gameState: GameState[];
  players: PlayerType;
}

const Logger = ({ gameState, players }: Props) => {
  return (
    <ol id="log">
      {gameState.map(({ position, symbol }) => {
        return (
          <li
            key={`${position.row}${position.col}`}
          >{`${players[symbol]} marked ${symbol} at (${position.row},${position.col})`}</li>
        );
      })}
    </ol>
  );
};

export default Logger;
