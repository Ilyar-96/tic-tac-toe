import { useEffect, useState } from 'react';

import Board from './Board';
import { calculateWinner } from '../helper';

import './Game.css';

const Game = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [countX, setCountX] = useState(0);
	const [countO, setCountO] = useState(0);
	const [isDraw, setIsDraw] = useState(false);
	const winner = calculateWinner(board);

	useEffect(() => {
		setIsDraw(!board.includes(null));
	}, [board])

	useEffect(() => {
		if (winner === 'X') {
			setCountX(countX + 1);
		} else if (winner === '0') {
			setCountO(countO + 1)
		}
	}, [winner])

	const handleClick = (index) => {
		const boardCopy = [...board];
		// Определить был ли клик по ячейке или игра закончена
		if (winner || boardCopy[index]) return;
		// Определить чей ход
		boardCopy[index] = xIsNext ? 'X' : "0";

		// Обновить стейт
		setBoard(boardCopy);
		setXIsNext(!xIsNext);
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setXIsNext(true);
	}

	const startNewGame = () => {
		return (
			<button
				className="start__btn"
				type='button'
				onClick={resetGame}>Очистить поле</button>
		)
	}

	const gameInfo = () => {
		if (winner) {
			return `Выиграл: ${winner}`;
		}

		if (isDraw) {
			return 'Ничья';
		}

		return `Ходит: ${xIsNext ? 'X' : '0'}`;
	}

	return (
		<div className='game'>
			<h2 className='game__title'>Счет:</h2>
			<div className="game__count count">
				<div className="count__x">X: {countX}</div>
				<div className="count__o">0: {countO}</div>
			</div>

			{winner || isDraw ? startNewGame() : null}
			<Board squares={board} click={handleClick} />
			<div className='game__info'>{gameInfo()}</div>
		</div>
	)
}

export default Game;