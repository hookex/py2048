
var board = [];
var score = 0;

$(document).ready(function(){
    init(false);
});

$(document).keydown(function(event){
    switch(event.keyCode) {
        case 38: // up
            if( moveUp() ) {
                generateOneNumber();
                updateNumNowText();
                updateBoardText();
                return false;
                if( isgameover() ) gameover();
            }
            break;
        case 40: // down
            if( moveDown() ) {
                generateOneNumber();
                updateNumNowText();
                updateBoardText();
                return false;
                if( isgameover() ) gameover();
            }
            break;
        case 37: //left
            if( moveLeft() ) {
                generateOneNumber();
                updateNumNowText();
                updateBoardText();
                return false;
                if( isgameover() ) gameover();
            }
            break;
        case 39: //right
            if( moveRight() ) {
                generateOneNumber();
                updateNumNowText();
                updateBoardText();
                return false;
                if( isgameover() ) gameover();
            }
            break;
        default : break;

    }
    // return false;
});

$('#newgamebutton').click(function(){
    newgame();
    updateBoardText();
})

function newgame() {
    $('#gameover').hide();
    // 初始化棋盘格
    init(true);
}


// 没有上次记录返回[]
function getLastBoard() {
    var boardText = $("#board-record").text();

    if (boardText !== '[]' && boardText !== '"[]"') {
        var boardArr = boardText.split('|');
        var board = [new Array(4),new Array(4),new Array(4),new Array(4)]

        for (var i=0; i < boardArr.length; i++) {
            console.log(i/4);
            board[parseInt(i/4)][i%4] = parseInt(boardArr[i]);
        }
    
        return board;
    } else {
        return [];
    }


}

function getNumNow() {
    var max = 0;
    for(var i in board) {
        for (var j in board[i]) {
            max = board[i][j] > max ? board[i][j]:max;
        }
    }
    return max;
}

function updateNumNowText() {
    $('.num-now').text(getNumNow());
}

// 将二维数组board转化为字符串存储
function updateBoardText() {
    var boardText = [];

    for(var i in board) {
        for (var j in board[i]) {
            boardText.push(board[i][j]);
        }
    }

    $('#board-record').text(boardText.join('|'));
}

// restart，false：继续上次游戏，true：重新开始游戏
function init(restart) {
    // 初始化grid-cell
    var i, j;
    for (i = 0; i < 4; i++) {
        for(j=0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    lastBoard = getLastBoard();

    if (!restart && lastBoard.length > 0) {

         board = lastBoard;
    
    } else {
      
        for(i = 0 ; i < 4 ; i++){
            board[i] = [];
            for(j = 0 ; j < 4 ; j++){
                board[i][j] = 0;
            }
        }
        generateOneNumber();
        generateOneNumber();
    }

    // 更新board视图
    updateBoardView();
    updateNumNowText();
}

function generateOneNumber() {
    if( nospace( board ) ) {
        return false;
    }

    var randx = ~~(Math.random() * 4); // ~~ 等于 Math.floor()
    var randy = ~~(Math.random() * 4);
    
    while(true) {
        if( board[randx][randy] === 0 ) break;
        randx = ~~(Math.random() * 4);
        randy = ~~(Math.random() * 4);
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
        
    return true;
}

function updateBoardView() {
    $('.number-cell').remove();
    for(var i=0; i < 4; i++) {
        for(var j=0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumbercell = $('#number-cell-' + i + '-' + j);

            if( board[i][j] === 0 ) {
                theNumbercell.css('width', '0px');
                theNumbercell.css('height', '0px');
                theNumbercell.css('top', getPosTop(i, j) + 50);
                theNumbercell.css('left', getPosLeft(i, j) + 50);
            } else {
                theNumbercell.css('width', '100px');
                theNumbercell.css('hide', '100px');
                theNumbercell.css('top', getPosTop(i, j));
                theNumbercell.css('left', getPosLeft(i, j));
                theNumbercell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumbercell.text(board[i][j]);
            }
        }
    }
}

function isgameover() {
    if(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)) return false;
    return true;
}

function gameover() {
    $('#gameover').show();
}

function moveDown() {

    if(canMoveDown(board)) {
        return true;
    }

}

function moveUp() {

    if(!canMoveUp(board)) {
        return false;
    }

    console.log(board);

    // move up
    for(var i=1; i < 4; i++) {
        for(var j=0; j < 4; j++) {
            if(board[i][j] !== 0) {
                for(var k=0; k < i; k++) {
                    if(board[k][j] === 0 && noBlockVertical(j, k, i, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][j] === board[k][j] && noBlockVertical(j, k, i, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    for(var i=2; i > -1; i--) {
        for(var j=0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for(var k = 3; k > i; k--) {
                    if(board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][j] === board[k][j] && noBlockVertical(j, i, k, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;
}

function moveLeft() {

    if (!canMoveLeft(board)) {
        return false;
    }

    for(var j = 1; j < 4; j++) {
        for(var i=0; i < 4; i++) {
            if (board[i][j] !== 0) {
                for(var k=0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][j] === board[i][k] && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;

}

function moveRight() {

    if (!canMoveRight(board)) {
        console.log(false);
        return false;
    }

    for(var j=2; j > -1; j--) {
        for(var i=0; i < 4; i++) {
            if (board[i][j] !== 0) {
                for(var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if(board[i][j] === board[i][k] && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;
}




