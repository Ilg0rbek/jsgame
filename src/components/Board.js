import React from "react";

const Board = ({ squares, handleClick }) => {
  return (
    <div className="grid gap-4 grid-cols-3 w-96 h-96">
      {squares.map((square, index) => (
        <div
          className="text-5xl w-24 h-24 select-none p-5 flex items-center bg-gray-100 border-4 border-sky-300 hover:border-dashed cursor-pointer"
          key={index}
          onClick={() => handleClick(index)}
        >
          {square}
        </div>
      ))}
    </div>
  );
};

export default Board;
