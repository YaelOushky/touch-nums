'use strict'

var gBoard
var gTable = 16
var gLevel = Math.sqrt(gTable)
var gNums
var gNextNum
var gGameInterval

var gClickSound = new Audio('sound/pu_low.mp3');
var gWinierSound = new Audio('sound/winer.mp3'); // change to winner
var gStartSound = new Audio('sound/strt.mp3'); // change to start
var gErrorSound = new Audio('sound/error.mp3');

function init() {
    clearInterval(gGameInterval)
    gNextNum = 1
    gNums = createNums(gTable)
    gBoard = creatBoard(gLevel)
    renderBoard(gBoard)

}

function setLevel(num) {
    gTable = num
    gLevel = Math.sqrt(num)
    gStartSound.play()
    init()
    // if (num === 16) return gTable = num, gLevel = 4, init(), gStartSound.play()
    // if (num === 25) return gTable = num, gLevel = 5, init(), gStartSound.play()
    // if (num === 36) return gTable = num, gLevel = 6, init(), gStartSound.play()
}

function startGame(elBtn) {
    elBtn.innerHTML = 'play again'
    init()
}

function setTimer() {
    var startTime = Date.now()
    var elModal = document.querySelector('.timer')
    gGameInterval = setInterval(function () {
        var currTime = Date.now()
        var time = ((currTime - startTime) / 1000).toFixed(3);
        elModal.querySelector('h2').innerText = time
    }, 1)
}

function cellClicked(cellI, cellJ, clickedNum) {
    var currNum = gBoard[cellI][cellJ]
    if (gNextNum === 1) setTimer()
    if (currNum !== gNextNum) return gErrorSound.play()
    clickedNum.style.backgroundColor = 'lightskyblue'
    gClickSound.play()
    if (gNextNum === gTable) {
        gWinierSound.play()
        clearInterval(gGameInterval)
    }
    else gNextNum++
}

function renderBoard(board = 16) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td class="num" data-i="${i}" data-j="${j}" onclick="cellClicked(${i},${j},this)" >${board[i][j]}</td>`;
        }
        strHTML += '</tr>'
    }
    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML;
}

function creatBoard(num = 4) {
    var board = [];
    for (var i = 0; i < num; i++) {
        board.push([]);
        for (var j = 0; j < num; j++) {
            board[i][j] = randomNum()
        }
    }
    return board;
}

function randomNum() {
    var idx = getRandomInt(0, gNums.length - 1)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}

function createNums(num = 16) {
    var nums = []
    for (var i = 1; i <= num; i++) {
        nums.push(i)
    }
    return nums
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}