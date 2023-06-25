var config = {
    type: Phaser.AUTO,
    width: 300,
    height: 300,
    parent: 'game',
    scene: {
        create: create
    }
};

var game = new Phaser.Game(config);
var winScreen;

function create() {
    var board = this.add.graphics();
    var cellSize = 100;
    var boardSize = cellSize * 3;
    var boardOffset = (this.sys.canvas.width - boardSize) / 2;

    // Draw board grid
    board.lineStyle(6, 0xffffff);
    for (var i = 0; i <= 3; i++) {
        var position = i * cellSize + boardOffset;
        board.moveTo(position, boardOffset);
        board.lineTo(position, boardSize + boardOffset);
        board.moveTo(boardOffset, position);
        board.lineTo(boardSize + boardOffset, position);
    }
    board.strokePath();

    // Initialize board state
    var boardState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Add cell interactive input
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            var cell = this.add.rectangle(
                col * cellSize + boardOffset + cellSize / 2,
                row * cellSize + boardOffset + cellSize / 2,
                cellSize - 10,
                cellSize - 10
            );
            cell.isFilled = false;
            cell.symbol = '';

            cell.setInteractive();
            cell.on('pointerup', function () {
                if (this.isFilled) return;

                var row = Math.floor((this.y - boardOffset) / cellSize);
                var col = Math.floor((this.x - boardOffset) / cellSize);

                if (boardState[row][col] !== '') return;

                // Update board state
                boardState[row][col] = 'X';
                this.isFilled = true;
                this.symbol = 'X';

                // Draw X symbol
                var line1 = this.scene.add.graphics();
                line1.lineStyle(8, 0xff0000);
                line1.strokeLineShape(new Phaser.Geom.Line(
                    col * cellSize + boardOffset + 10,
                    row * cellSize + boardOffset + 10,
                    (col + 1) * cellSize + boardOffset - 10,
                    (row + 1) * cellSize + boardOffset - 10
                ));

                var line2 = this.scene.add.graphics();
                line2.lineStyle(8, 0xff0000);
                line2.strokeLineShape(new Phaser.Geom.Line(
                    (col + 1) * cellSize + boardOffset - 10,
                    row * cellSize + boardOffset + 10,
                    col * cellSize + boardOffset + 10,
                    (row + 1) * cellSize + boardOffset - 10
                ));

                // Check for win condition
                if (checkWin('X')) {
                    showWinScreen('Player X Wins!');
                } else if (checkDraw()) {
                    showWinScreen('It\'s a draw!');
                } else {
                    // Computer's turn
                    var emptyCells = [];
                    for (var r = 0; r < 3; r++) {
                        for (var c = 0; c < 3; c++) {
                            if (boardState[r][c] === '') {
                                emptyCells.push([r, c]);
                            }
                        }
                    }
                    var randomCell = Phaser.Utils.Array.GetRandom(emptyCells);
                    var compRow = randomCell[0];
                    var compCol = randomCell[1];

                    // Update board state
                    boardState[compRow][compCol] = 'O';

                    // Draw O symbol
                    var circle = this.scene.add.circle(
                        compCol * cellSize + boardOffset + cellSize / 2,
                        compRow * cellSize + boardOffset + cellSize / 2,
                        (cellSize - 10) / 2
                    );
                    circle.setStrokeStyle(8, 0x00ff00);

                    // Check for win condition
                    if (checkWin('O')) {
                        showWinScreen('Player O Wins!');
                    } else if (checkDraw()) {
                        showWinScreen('It\'s a draw!');
                    }
                }
            });
        }
    }

    function checkWin(player) {
        // Check rows
        for (var row = 0; row < 3; row++) {
            if (
                boardState[row][0] === player &&
                boardState[row][1] === player &&
                boardState[row][2] === player
            ) {
                return true;
            }
        }

        // Check columns
        for (var col = 0; col < 3; col++) {
            if (
                boardState[0][col] === player &&
                boardState[1][col] === player &&
                boardState[2][col] === player
            ) {
                return true;
            }
        }

        // Check diagonals
        if (
            boardState[0][0] === player &&
            boardState[1][1] === player &&
            boardState[2][2] === player
        ) {
            return true;
        }

        if (
            boardState[0][2] === player &&
            boardState[1][1] === player &&
            boardState[2][0] === player
        ) {
            return true;
        }

        return false;
    }

    function checkDraw() {
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (boardState[row][col] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    function showWinScreen(message) {
        winScreen = document.getElementById('win-screen');
        var winText = document.getElementById('win-text');
        winText.textContent = message;
        winScreen.style.display = 'block';
    }
}