const gameBoard = document.querySelector('#gameboard');
const display = document.querySelector('.display span');
const width = 8;
let playerGo = 'black';
display.textContent = 'black';

const startPieces = [
	[
		black_rook,
		black_knight,
		black_bishop,
		black_queen,
		black_king,
		black_bishop,
		black_knight,
		black_rook,
	],
	[
		black_pawn,
		black_pawn,
		black_pawn,
		black_pawn,
		black_pawn,
		black_pawn,
		black_pawn,
		black_pawn,
	],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	[
		white_pawn,
		white_pawn,
		white_pawn,
		white_pawn,
		white_pawn,
		white_pawn,
		white_pawn,
		white_pawn,
	],
	[
		white_rook,
		white_knight,
		white_bishop,
		white_king,
		white_queen,
		white_bishop,
		white_knight,
		white_rook,
	],
];

function createBoard() {
	startPieces.forEach((row, rowIdx) => {
		row.forEach((piece, idx) => {
			const square = document.createElement('div');
			square.classList.add('square');
			square.classList.add('green');
			square.innerHTML = piece;
			square.firstChild?.setAttribute('draggable', true);
			square.setAttribute('square-id', [rowIdx, idx]);

			// Set square color
			if (rowIdx % 2 === 0) {
				square.classList.add(idx % 2 === 0 ? 'beige' : 'green');
			} else {
				square.classList.add(idx % 2 === 0 ? 'green' : 'beige');
			}

			gameBoard.append(square);
		});
	});
}

createBoard();

const allSquares = document.querySelectorAll('.square');

allSquares.forEach((square) => {
	square.addEventListener('dragstart', dragStart);
	square.addEventListener('dragover', dragOver);
	square.addEventListener('drop', dragDrop);
	square.addEventListener('click', showMoves);
});

let startPosId;
let draggedElement;

function dragStart(e) {
	startPosId = e.target.parentNode.getAttribute('square-id');
	draggedElement = e.target;
}
function dragOver(e) {
	e.preventDefault();
}

function dragDrop(e) {
	e.stopPropagation();
	const correctGo = draggedElement.firstChild.classList.contains(playerGo);
	const taken = e.target.classList.contains('piece');
	const opponentGo = playerGo === 'white' ? 'black' : 'white';
	const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);
	const valid = checkValidMove(e.target);

	if (correctGo) {
		if (takenByOpponent && valid) {
			e.target.parentNode.append(draggedElement);
			e.target.remove();
			allSquares.forEach((square) =>
				square.classList.remove('valid-move')
			);

			changePlayer();
			return;
		}

		if (taken && !takenByOpponent) {
			e.target.parentNode.classList.add('error-move');
			setTimeout(() => {
				e.target.parentNode.classList.remove('error-move');
			}, 1000);
			removeMoveColor();
			return;
		}

		if (valid) {
			e.target.append(draggedElement);
			allSquares.forEach((square) =>
				square.classList.remove('valid-move')
			);
			changePlayer();
		}
	} else {
		e.target.parentNode.classList.add('error-move');
		setTimeout(() => {
			e.target.parentNode.classList.remove('error-move');
		}, 1000);
		removeMoveColor();
		return;
	}
}

function removeMoveColor() {
	allSquares.forEach((square) => square.classList.remove('valid-move'));
}

function changePlayer() {
	if (playerGo === 'black') {
		playerGo = 'white';
		display.textContent = 'white';
	} else {
		playerGo = 'black';
		display.textContent = 'black';
	}
}

function showMoves(e) {
	e.preventDefault();
	const correctGo = e.target.firstChild?.classList.contains(playerGo);
	if (correctGo) {
		removeMoveColor();
		squareId = e.target.parentNode.getAttribute('square-id');
		e.target.parentNode.classList.add('valid-move');

		const posId = squareId.split(',').map((pos) => parseInt(pos));

		const pieceId = e.target.getAttribute('id');
		switch (pieceId) {
			case 'knight':
				getKnightMoves(posId);
				break;
			case 'pawn':
				getPawnMoves(posId);
				break;
			case 'king':
				getKingMoves(posId);
				break;
			case 'queen':
				getQueenMoves(posId);
				break;
			case 'bishop':
				getBishopMoves(posId);
				break;
			case 'rook':
				getRookMoves(posId);
				break;
		}
	} else {
		e.target.parentNode.classList.add('error-move');
		setTimeout(() => {
			e.target.parentNode.classList.remove('error-move');
		}, 1000);
		removeMoveColor();
		return;
	}
}

function checkValidMove(target) {
	const targetId =
		target.getAttribute('square-id') ||
		target.parentNode.getAttribute('square-id');
	const posId = targetId.split(',').map((pos) => parseInt(pos));
	const pieceId = draggedElement.id;
	switch (pieceId) {
		case 'pawn':
			if (getPawnMoves(posId)) return true;
		case 'knight':
			if (getKnightMoves(posId)) return true;
		case 'bishop':
			if (getBishopMoves(posId)) return true;
		case 'rook':
			if (getRookMoves(posId)) return true;
		case 'king':
			if (getKingMoves(posId)) return true;
			break;
		case 'queen':
			if (getQueenMoves(posId)) return true;
	}
	return false;
}
