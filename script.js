let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset");
let winnercontainer = document.querySelector("#winner-container");
let winnertext = document.querySelector("#winner-text");
let turno = true;

const checkWinPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turno = true;
    for (let box of boxes) {
        box.textContent = "";
        box.disabled = false;
    }
    winnercontainer.style.display = "none";
    winnertext.innerText = "";
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.textContent = "o";
            turno = false;
        } else {
            box.textContent = "x";
            turno = true;
        }
        box.disabled = true;
        checkWin();
    });
});

const ShowWinner = (winner) => {
    winnertext.innerText = `Congratulations Winner is ${winner}`;
    winnercontainer.style.display = "block";
    disableBoxes();
};

const showdraw = () => {
    winnertext.innerText = "It's a Draw!";
    winnercontainer.style.display = "block";
    disableBoxes();
};

const checkWin = () => {
    let winnerFound = false;

    for (let pattern of checkWinPattern) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                console.log("winner", position1);
                ShowWinner(position1);
                winnerFound = true;
                break;
            }
        }
    }

    // If all boxes filled and no winner
    if (!winnerFound) {
        let isdraw = true;
        boxes.forEach((box) => {
            if (box.innerText === "") {
                isdraw = false;
            }
        });
        if (isdraw) {
            showdraw();
        }
    }
};

reset.addEventListener("click", resetGame);
