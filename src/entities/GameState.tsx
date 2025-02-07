type Position = {
  row: number;
  col: number;
};

export type Symbol = "X" | "O";

export default class GameState {
  position: Position;
  symbol: Symbol;

  constructor(position: Position, symbol: Symbol) {
    this.position = position;
    this.symbol = symbol;
  }
}
