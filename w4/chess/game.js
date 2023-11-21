const width = 8;
let playerGo = 'black';
let allSquares;

$(document).ready(function () {
	const gameBoard = $('#gameboard');
	const display = $('.display span');

	display.text('black');

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
		startPieces.forEach(function (row, rowIdx) {
			row.forEach(function (piece, idx) {
				const square = $('<div>')
					.addClass('square green')
					.html(piece)
					.attr('square-id', [rowIdx, idx])
					.find(':first-child')
					.attr('draggable', true)
					.end();

				if (rowIdx % 2 === 0) {
					square.addClass(idx % 2 === 0 ? 'beige' : 'green');
				} else {
					square.addClass(idx % 2 === 0 ? 'green' : 'beige');
				}

				gameBoard.append(square);
			});
		});
	}

	createBoard();

	allSquares = $('.square');

	allSquares.on({
		dragstart: dragStart,
		dragover: dragOver,
		drop: dragDrop,
		click: showMoves,
	});

	let startPosId;
	let draggedElement;

	function dragStart(e) {
		startPosId = $(e.target).parent().attr('square-id');
		draggedElement = $(e.target);
	}

	function dragOver(e) {
		e.preventDefault();
	}

	function dragDrop(e) {
		e.stopPropagation();
		const correctGo = draggedElement.children().hasClass(playerGo);
		const taken = $(e.target).hasClass('piece');
		const opponentGo = playerGo === 'white' ? 'black' : 'white';
		const takenByOpponent = $(e.target).children().hasClass(opponentGo);
		const valid = checkValidMove(e.target);

		if (correctGo) {
			if (takenByOpponent && valid) {
				$(e.target).parent().append(draggedElement);
				$(e.target).remove();
				allSquares.removeClass('valid-move');

				changePlayer();
				return;
			}

			if (taken && !takenByOpponent) {
				$(e.target).parent().addClass('error-move');
				setTimeout(function () {
					$(e.target).parent().removeClass('error-move');
				}, 1000);
				removeMoveColor();
				return;
			}

			if (valid) {
				$(e.target).append(draggedElement);
				removeMoveColor();
				changePlayer();
			} else {
				$(e.target).addClass('error-move');
				setTimeout(function () {
					$(e.target).removeClass('error-move');
				}, 1000);
				allSquares.removeClass('valid-move');
			}
		} else {
			$(e.target).parent().addClass('error-move');
			setTimeout(function () {
				$(e.target).parent().removeClass('error-move');
			}, 1000);
			removeMoveColor();
			return;
		}
	}

	function removeMoveColor() {
		allSquares.removeClass('valid-move');
	}

	function changePlayer() {
		if (playerGo === 'black') {
			playerGo = 'white';
			display.text('white');
		} else {
			playerGo = 'black';
			display.text('black');
		}
	}

	function showMoves(e) {
		e.preventDefault();
		const correctGo = $(e.target).children().hasClass(playerGo);
		if (correctGo) {
			removeMoveColor();
			squareId = $(e.target).parent().attr('square-id');
			$(e.target).parent().addClass('valid-move');

			const posId = squareId.split(',').map(function (pos) {
				return parseInt(pos);
			});

			const pieceId = $(e.target).attr('id');
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
			$(e.target).parent().addClass('error-move');
			setTimeout(function () {
				$(e.target).parent().removeClass('error-move');
			}, 1000);
			removeMoveColor();
			return;
		}
	}

	function checkValidMove(target) {
		const targetId =
			$(target).attr('square-id') || $(target).parent().attr('square-id');
		const posId = targetId.split(',').map(function (pos) {
			return parseInt(pos);
		});
		const pieceId = draggedElement.attr('id');
		const startPos = startPosId.split(',').map(function (pos) {
			return parseInt(pos);
		});

		switch (pieceId) {
			case 'pawn':
				if (getPawnMoves(posId, startPos)) return true;
				else return false;
			case 'knight':
				if (getKnightMoves(posId, startPos)) return true;
				else return false;
			case 'bishop':
				if (getBishopMoves(posId, startPos)) return true;
				else return false;
			case 'rook':
				if (getRookMoves(posId, startPos)) return true;
				else return false;
			case 'king':
				if (getKingMoves(posId, startPos)) return true;
				else return false;
			case 'queen':
				if (getQueenMoves(posId, startPos)) return true;
				else return false;
		}
	}
});
