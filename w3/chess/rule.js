function isSquareEmpty(square) {
	return square.firstChild === null;
}

function isValidSquare(square) {
	const [row, col] = square;
	return row >= 0 && row < 8 && col >= 0 && col < 8;
}
// GAME MOVEMENT RULES
function getKnightMoves(currentSquare) {
	const [row, col] = currentSquare;
	const available_moves = [];

	const possibleMoves = [
		[row - 2, col - 1],
		[row - 2, col + 1],
		[row - 1, col - 2],
		[row - 1, col + 2],
		[row + 1, col - 2],
		[row + 1, col + 2],
		[row + 2, col - 1],
		[row + 2, col + 1],
	];

	// Filter out moves that are within the board boundaries (assuming an 8x8 board)
	for (const move of possibleMoves) {
		if (isValidSquare(move)) {
			available_moves.push(move);
		}
	}
	const valid_moves = [];
	available_moves.forEach((move) => {
		// Convert the move coordinates to a single index.
		const moveIndex = move[0] * 8 + move[1];
		// Get the square element using the calculated index.
		const squareElement = allSquares[moveIndex];
		if (isSquareEmpty(squareElement)) {
			valid_moves.push(move);
			squareElement.classList.add('valid-move');
		} else {
			if (
				!squareElement.firstChild.firstChild.classList.contains(
					playerGo
				)
			) {
				valid_moves.push(move);
				squareElement.classList.add('valid-move');
			}
		}
	});
	if (valid_moves) return true;
	return false;
}

function getPawnMoves(currentSquare) {
	const [row, col] = currentSquare;
	const available_moves = [];

	let possibleMoves = [];

	if (row === 1 || row === 6) {
		if (playerGo === 'black') {
			possibleMoves = [
				[row + 2, col],
				[row + 1, col],
			];
		} else {
			possibleMoves = [
				[row - 2, col],
				[row - 1, col],
			];
		}
	} else if (playerGo === 'black') {
		possibleMoves = [[row + 1, col]];
	} else {
		possibleMoves = [[row - 1, col]];
	}

	// Filter out moves that are within the board boundaries (assuming an 8x8 board)
	for (const move of possibleMoves) {
		if (isValidSquare(move)) {
			available_moves.push(move);
		}
	}
	const valid_moves = [];
	available_moves.forEach((move) => {
		// Convert the move coordinates to a single index.
		const moveIndex = move[0] * 8 + move[1];
		// Get the square element using the calculated index.
		const squareElement = allSquares[moveIndex];
		if (isSquareEmpty(squareElement)) {
			valid_moves.push(move);
			squareElement.classList.add('valid-move');
		} else {
			if (
				!squareElement.firstChild.firstChild.classList.contains(
					playerGo
				)
			) {
				valid_moves.push(move);
				squareElement.classList.add('valid-move');
			}
		}
	});
	if (valid_moves) return true;
	return false;
}

function getBishopMoves(currentSquare) {
	const [row, col] = currentSquare;
	const available_moves = [];

	const possibleMoves = [
		[row + 1, col + 1],
		[row + 2, col + 2],
		[row + 3, col + 3],
		[row + 4, col + 4],
		[row + 5, col + 5],
		[row + 6, col + 6],
		[row + 7, col + 7],
		[row + 1, col - 1],
		[row + 2, col - 2],
		[row + 3, col - 3],
		[row + 4, col - 4],
		[row + 5, col - 5],
		[row + 6, col - 6],
		[row + 7, col - 7],
		[row - 1, col - 1],
		[row - 2, col - 2],
		[row - 3, col - 3],
		[row - 4, col - 4],
		[row - 5, col - 5],
		[row - 6, col - 6],
		[row - 7, col - 7],
		[row - 1, col + 1],
		[row - 2, col + 2],
		[row - 3, col + 3],
		[row - 4, col + 4],
		[row - 5, col + 5],
		[row - 6, col + 6],
		[row - 7, col + 7],
	];

	// Filter out moves that are within the board boundaries (assuming an 8x8 board)
	for (const move of possibleMoves) {
		if (isValidSquare(move)) {
			available_moves.push(move);
		}
	}
	const valid_moves = [];
	let blockSquare = [];
	available_moves.forEach((move) => {
		// Convert the move coordinates to a single index.
		const moveIndex = move[0] * 8 + move[1];
		// Get the square element using the calculated index.
		const squareElement = allSquares[moveIndex];
		if (isSquareEmpty(squareElement)) {
			if (!sameDiagonal(move, blockSquare)) {
				valid_moves.push(move);
				squareElement.classList.add('valid-move');
			} else {
				if (
					(move[1] > col &&
						move[1] > blockSquare[1] &&
						col > blockSquare[1]) ||
					(move[1] < col &&
						move[1] < blockSquare[1] &&
						col < blockSquare[1])
				) {
					valid_moves.push(move);
					squareElement.classList.add('valid-move');
				}
			}
		} else {
			blockSquare = move;
			if (
				!squareElement.firstChild.firstChild.classList.contains(
					playerGo
				)
			) {
				valid_moves.push(move);
				squareElement.classList.add('valid-move');
			}
		}
	});
	if (valid_moves) return true;
	return false;
}

function sameDiagonal(square, block) {
	const [row1, col1] = square;
	const [row2, col2] = block;
	if (
		row1 < 0 ||
		row1 >= 8 ||
		col1 < 0 ||
		col1 >= 8 ||
		row2 < 0 ||
		row2 >= 8 ||
		col2 < 0 ||
		col2 >= 8
	) {
		return false; // Ensure that the coordinates are within the matrix bounds
	}

	const rowDiff = Math.abs(row1 - row2);
	const colDiff = Math.abs(col1 - col2);

	return rowDiff === colDiff;
}

function getRookMoves(currentSquare) {
	const [row, col] = currentSquare;
	const available_moves = [];

	const possibleMoves = [
		[row + 1, col],
		[row + 2, col],
		[row + 3, col],
		[row + 4, col],
		[row + 5, col],
		[row + 6, col],
		[row + 7, col],
		[row - 1, col],
		[row - 2, col],
		[row - 3, col],
		[row - 4, col],
		[row - 5, col],
		[row - 6, col],
		[row - 7, col],
		[row, col + 1],
		[row, col + 2],
		[row, col + 3],
		[row, col + 4],
		[row, col + 5],
		[row, col + 6],
		[row, col + 7],
		[row, col - 1],
		[row, col - 2],
		[row, col - 3],
		[row, col - 4],
		[row, col - 5],
		[row, col - 6],
		[row, col - 7],
	];

	// Filter out moves that are within the board boundaries (assuming an 8x8 board)
	for (const move of possibleMoves) {
		if (isValidSquare(move)) {
			available_moves.push(move);
		}
	}
	const valid_moves = [];
	let blockSquare = [];
	available_moves.forEach((move) => {
		// Convert the move coordinates to a single index.
		const moveIndex = move[0] * 8 + move[1];
		// Get the square element using the calculated index.
		const squareElement = allSquares[moveIndex];
		if (isSquareEmpty(squareElement)) {
			console.log(move, blockSquare);
			if (!sameDirection(move, blockSquare)) {
				valid_moves.push(move);
				squareElement.classList.add('valid-move');
			} else {
				if (
					(move[0] > row &&
						move[0] > blockSquare[0] &&
						row > blockSquare[0]) ||
					(move[0] < row &&
						move[0] < blockSquare[0] &&
						row < blockSquare[0])
				) {
					valid_moves.push(move);
					squareElement.classList.add('valid-move');
				}
			}
		} else {
			blockSquare = move;
			if (
				!squareElement.firstChild.firstChild.classList.contains(
					playerGo
				)
			) {
				valid_moves.push(move);
				squareElement.classList.add('valid-move');
			}
		}
	});
	if (valid_moves) return true;
	return false;
}
function sameDirection(square, block) {
	const [row1, col1] = square;
	const [row2, col2] = block;
	if (
		row1 < 0 ||
		row1 >= 8 ||
		col1 < 0 ||
		col1 >= 8 ||
		row2 < 0 ||
		row2 >= 8 ||
		col2 < 0 ||
		col2 >= 8
	) {
		return false; // Ensure that the coordinates are within the matrix bounds
	}

	return row1 === row2 || col1 === col2;
}

function getQueenMoves(currentSquare) {
	getRookMoves(currentSquare);
	getBishopMoves(currentSquare);
	if (getRookMoves(currentSquare) || getBishopMoves(currentSquare)) {
		return true;
	}
	return false;
}

function getKingMoves(currentSquare) {
	const [row, col] = currentSquare;
	const available_moves = [];

	const possibleMoves = [
		[row + 1, col + 1],
		[row + 1, col - 1],
		[row - 1, col - 1],
		[row - 1, col + 1],
		[row, col + 1],
		[row, col - 1],
		[row - 1, col],
		[row + 1, col],
	];

	// Filter out moves that are within the board boundaries (assuming an 8x8 board)
	for (const move of possibleMoves) {
		if (isValidSquare(move)) {
			available_moves.push(move);
		}
	}
	const valid_moves = [];
	available_moves.forEach((move) => {
		// Convert the move coordinates to a single index.
		const moveIndex = move[0] * 8 + move[1];
		// Get the square element using the calculated index.
		const squareElement = allSquares[moveIndex];
		if (isSquareEmpty(squareElement)) {
			valid_moves.push(move);
			squareElement.classList.add('valid-move');
		}
	});
	if (valid_moves) return true;
	return false;
}
