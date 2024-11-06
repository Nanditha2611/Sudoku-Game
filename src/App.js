import React, { useState } from "react";
import SudokuGrid from "./sudoku";
import "./App.css";

const App = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill("")));
  const [message, setMessage] = useState("");

  const isValid = () => {
    const rows = Array(9)
      .fill()
      .map(() => new Set());
    const cols = Array(9)
      .fill()
      .map(() => new Set());
    const boxes = Array(9)
      .fill()
      .map(() => new Set());

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const value = grid[r][c];
        if (value === "") continue;

        const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

        if (
          rows[r].has(value) ||
          cols[c].has(value) ||
          boxes[boxIndex].has(value)
        ) {
          return false;
        }

        rows[r].add(value);
        cols[c].add(value);
        boxes[boxIndex].add(value);
      }
    }
    return true;
  };

  // Solve the Sudoku grid using a backtracking algorithm
  const solveSudoku = () => {
    const newGrid = grid.map((row) => row.slice());

    const solve = (r, c) => {
      if (r === 9) return true;
      if (c === 9) return solve(r + 1, 0);
      if (newGrid[r][c] !== "") return solve(r, c + 1);

      for (let num = 1; num <= 9; num++) {
        const char = String(num);
        newGrid[r][c] = char;

        if (isValid() && solve(r, c + 1)) {
          setGrid(newGrid);
          return true;
        }
        newGrid[r][c] = "";
      }
      return false;
    };

    if (solve(0, 0)) {
      setMessage("Sudoku solved successfully!");
    } else {
      setMessage("No solution exists for the given Sudoku.");
    }
  };

  const handleValidate = () => {
    if (isValid()) {
      setMessage("The current grid is valid.");
    } else {
      setMessage("The current grid is invalid. Check the numbers.");
    }
  };

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <SudokuGrid grid={grid} setGrid={setGrid} />
      <button onClick={handleValidate}>Validate</button>
      <button onClick={solveSudoku}>Solve</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
