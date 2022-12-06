import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Message from "./components/Message";
import Restart from "./components/Restart";

const App = () => {
  // O'yin taxtasi uchun
  const [squares, setSuqares] = useState(Array(9).fill(""));
  // Qaysi oyinchi birinchi yurushini aniqlash
  const [xTurn, setXTurn] = useState(true);
  // Kim yurayotgani haqida habar berib turuvchi msg
  const [msg, setMsg] = useState("X o`yinchi  ❌");
  // O'yin tugagan yoki yoqligini aniqlash
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    let boardTemp = [...squares];

    if (!gameOver) {
      if (boardTemp[index] !== "") return;
      boardTemp[index] = xTurn ? "X" : "O";
      setXTurn(!xTurn);
      setSuqares(boardTemp);
      setMsg(xTurn ? "O o'yinchi ⚽️" : "X o'yinchi ❌");
    }

    //G'oliblik
    if (checkWinner(boardTemp)) {
      setMsg(xTurn ? "X o'yinchi yutdi" : "O o'yinchi yutdi");
      setGameOver(true);
    }

    if (boardTemp.every((i) => i === "X" || i == "O") && !checkWinner()) {
      setMsg("Durang");
      setGameOver(true);
    }
  };

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let turnHolder = xTurn ? "X" : "O";

    const resultArr = [];

    winConditions.forEach((compination) => {
      let row = [
        board[compination[0]],
        board[compination[1]],
        board[compination[2]],
      ];

      let results = row.every((currentValue) => currentValue === turnHolder);

      resultArr.push(results);
    });

    if (resultArr.includes(true)) return true;
  };

  const resetGame = () => {
    setXTurn(true);
    setSuqares(Array(9).fill(""));
    setMsg("X o`yinchi  ❌");
    setGameOver(false);
  };

  return (
    <main className="flex items-center flex-col">
      <Message msg={msg} />
      <Board squares={squares} handleClick={handleClick} />
      <Restart resetGame={resetGame} />
    </main>
  );
};

export default App;
