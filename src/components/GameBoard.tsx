import GameBoardSlot from "../entities/GameBoard";

interface Props {
  gameBoard: GameBoardSlot[][];
  updateGameStateHandler: (row: number, col: number) => void;
}

const GameBoard = ({ gameBoard, updateGameStateHandler }: Props) => {
  const btnClickHandler = (rowIndex: number, colIndex: number) => {
    if (gameBoard[rowIndex][colIndex]) {
      return;
    }

    updateGameStateHandler(rowIndex, colIndex);
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={`row-${rowIndex}`}>
            <ol>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={`col-${rowIndex}${colIndex}`}>
                    <button onClick={() => btnClickHandler(rowIndex, colIndex)}>
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
};

export default GameBoard;
