import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logger from "./components/Logger";

import { useState } from "react";

import GameState, { Symbol } from "./entities/GameState";
import PlayerType from "./entities/Player";
import GameBoardSlot from "./entities/GameBoard";

import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_PLAYERS: PlayerType = {
  X: "Player1",
  O: "Player2",
};

const INITIAL_GAME_BOARD: GameBoardSlot[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveCurrentPlayerSymbol = (gameState: GameState[]) => {
  let symbol: Symbol = "X";

  if (gameState.length > 0) {
    const currentState = gameState[0];
    symbol = currentState.symbol === "X" ? "O" : "X";
  }

  return symbol;
};

const deriveGameBoard = (gameState: GameState[]) => {
  const gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  gameState.forEach(({ position, symbol }) => {
    gameBoard[position.row][position.col] = symbol;
  });

  return gameBoard;
};

const deriveWinner = (gameState: GameState[], gameBoard: GameBoardSlot[][]) => {
  let winner: Symbol | null = null;

  if (gameState.length > 0) {
    for (const combination of WINNING_COMBINATIONS) {
      const [pos1, pos2, pos3] = combination;
      const mark1 = gameBoard[pos1.row][pos1.column];
      const mark2 = gameBoard[pos2.row][pos2.column];
      const mark3 = gameBoard[pos3.row][pos3.column];

      if (mark1 && mark1 === mark2 && mark1 === mark3) {
        winner = mark1;
        break;
      }
    }
  }

  return winner;
};

function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameState, setGameState] = useState<GameState[]>([]);

  const currentPlayerSymbol = deriveCurrentPlayerSymbol(gameState);
  const gameBoard = deriveGameBoard(gameState);
  const winner = deriveWinner(gameState, gameBoard);

  const hasDraw = gameState.length === 9 && !winner;

  // * Handlers
  const updatePlayerNameHandler = (name: string, symbol: Symbol) => {
    setPlayers((prevState) => {
      prevState[symbol] = name;
      return prevState;
    });
  };

  const updateGameStateHandler = (row: number, col: number) => {
    setGameState((prevGameState) => {
      const symbol = deriveCurrentPlayerSymbol(prevGameState);
      const newState = new GameState({ row, col }, symbol);
      return [newState, ...prevGameState];
    });
  };

  const resetGameStateHandler = () => {
    setGameState([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {(Object.keys(players) as Symbol[]).map((symbol) => {
            const name = players[symbol];
            return (
              <Player
                initialName={name}
                symbol={symbol}
                currentPlayerSymbol={currentPlayerSymbol}
                updatePlayerNameHandler={updatePlayerNameHandler}
              />
            );
          })}
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner ? players[winner] : null}
            resetGameStateHandler={resetGameStateHandler}
          />
        )}
        <GameBoard
          gameBoard={gameBoard}
          updateGameStateHandler={updateGameStateHandler}
        />
        <Logger gameState={gameState} players={players} />
      </div>
    </main>
  );
}

export default App;
