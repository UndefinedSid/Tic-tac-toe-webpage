const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"; 
        box.classList = `box box${index+1}`;
    });
}
initGame();

function swapTurn(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = "";

    // check win positions
    winningPositions.forEach(position => {
        if(
            (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) &&
            (gameGrid[position[1]] === gameGrid[position[2]])
        ){
            winner = gameGrid[position[0]];

            // highlight winning boxes
            position.forEach(idx => {
                boxes[idx].classList.add("win");
            });

            boxes.forEach(box => box.style.pointerEvents = "none"); // stop game
        }
    });

    if(winner !== ""){
        gameInfo.innerText = `Winner - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    // check draw
    let fillCount = 0;
    gameGrid.forEach(cell => {
        if(cell !== "") fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
            boxes.forEach(box => box.classList.add("tie"));
        newGameBtn.classList.add("active");

    }

}

function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;

    if (currentPlayer === "X") {
    boxes[index].classList.add("player-x");
    } else {
    boxes[index].classList.add("player-o");
    }

        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"; 
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);