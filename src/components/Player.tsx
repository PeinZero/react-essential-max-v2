import { useState } from "react";

import { Symbol } from "../entities/GameState";

interface Props {
  initialName: string;
  symbol: Symbol;
  currentPlayerSymbol: Symbol;
  updatePlayerNameHandler: (name: string, symbol: Symbol) => void;
}

const Player = ({
  initialName,
  symbol,
  currentPlayerSymbol,
  updatePlayerNameHandler,
}: Props) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const buttonClickHandler = () => {
    if (isEditing) {
      updatePlayerNameHandler(name, symbol);
    }
    setIsEditing((prevValue) => !prevValue);
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  return (
    <li className={currentPlayerSymbol === symbol ? "active" : undefined}>
      <span className="player">
        {isEditing && (
          <input
            type="text"
            value={name}
            onChange={nameChangeHandler}
            required
          />
        )}
        {!isEditing && <span className="player-name">{name}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <span>
        <button onClick={buttonClickHandler}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </span>
    </li>
  );
};

export default Player;
