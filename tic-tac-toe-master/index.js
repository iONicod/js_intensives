const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const gameField = [[], [], []];
let clickCounter = 0;
const possibleClicksCount = 9;

startGame();
addResetListener();

function initGameField(dimension, gameField){
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY
        }
    }
    console.log(gameField, 'Field initialized');
}

function startGame () {
    initGameField(3, gameField);
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkWinner(gameField){
    const checkHorizontalWinner = () => {
        for (let i=0; i<gameField.length; i++){
            let rowString = gameField[i].join("")
            if (rowString === CROSS.repeat(gameField.length)){
                alert(`${CROSS} won`);
                break;
            }
            else if(rowString === ZERO.repeat(gameField.length)) {
                alert(`${ZERO} won`);
                paintWinningFields(rowString, i,false);
                break;
            }
        }
    }
    const checkVerticalWinner = (index) => {
        let flatArray = gameField.flat(2);
        console.log(flatArray);
        let word = '';
        for(let i=index; i <flatArray.length; i+=gameField.length){
            if(flatArray[i]===EMPTY)
                continue;
            word += flatArray[i];
        }
        if (word === CROSS.repeat(gameField.length)){
            alert(`${CROSS} won`)
            return true;
        }
        if (word === ZERO.repeat(gameField.length)){
            alert(`${ZERO} won`)
            return true;
        }
    }
    const checkDiagonalWinner = () => {
    }
    const paintWinningFields = (line, startIndex, col = false) => {
        for (let i=0; i < line.length; i++) {
            findCell(startIndex, i).style.color = 'red';

        }
    }
    checkHorizontalWinner();
    for(let i=0; i < gameField.length; i++){
        if(checkVerticalWinner(i)){
            break;
        }
    }
}

function cellClickHandler (row, col) {
    if (gameField[row][col] === EMPTY) {
        let state = clickCounter % 2 ? CROSS : ZERO;
        gameField[row][col] = state;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(state, row, col);
        console.log(gameField);
    }
    if (clickCounter === possibleClicksCount)
        alert('Победила дружба');
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
