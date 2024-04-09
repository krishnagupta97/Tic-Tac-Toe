const boxes = document.querySelectorAll('.btn')
const winningSection = document.querySelector('.winning-section');
const winningText = document.querySelector('.winning-text');
const winningSign = document.querySelector('.winning-sign');
const conatiner = document.querySelector('.container');
const gamebox = document.querySelector('.gamebox');
const newGameBtn = document.querySelector('.new-game');
const reset = document.querySelector('.reset');

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let turnX = true;
let count = 0;
boxes.forEach((box) => {
    box.addEventListener('click', () => {

        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        count++;
        box.disabled = true;
        let isWinner = checkWinner();
        if (count == 9 && !isWinner) {
            count = 0;
            gameDrawn();
        }
        
    })
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};


const showWinner = (winner) => {
    winningText.innerText = `Winner!`;
    winningSign.innerText = `${winner}`;
    winningSection.style.display = 'block';
    gamebox.style.zIndex = "-1";
    gamebox.style.transition = "0.6s";
    gamebox.style.transform = "scale(0)";
    reset.style.display = 'none';
    disableBoxes();
};


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
        // box.innerText = "";
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
};


newGameBtn.addEventListener('click', () => {
    winningSection.style.display = 'none';
    gamebox.style.transform = "scale(1)";
    gamebox.style.zIndex = "1";
    gamebox.style.transition = "0.6s";
    reset.style.display = 'block';
    enableBoxes();
    count = 0;
});


reset.addEventListener('click', () => {
    enableBoxes();
    count = 0;
});

const gameDrawn = () => {
    winningSign.innerText = "";
    winningText.innerText = "Match has been Drawn";
    winningSection.style.display = 'block';
    gamebox.style.zIndex = "-1";
    gamebox.style.transition = "0.6s";
    gamebox.style.transform = "scale(0)";
    reset.style.display = 'none';
    disableBoxes();
};