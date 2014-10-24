function getPosTop(i, j) {
    return 20 + i*120;
}

function getPosLeft(i, j) {
    return 20 + j*120;
}

function nospace(board) {
    for(var i=0; i < 4; i++) {
        for(var j=0; j < 4; j++) {
            if( board[i][j] === 0 ) {
                return false;
            }
        }
    }
    return true;
}

function getNumberBackgroundColor(number) {
    switch( number ){
        case 2   :return '#eee4de';
        case 4   :return '#ede0c8';
        case 8   :return '#f2b179';
        case 16  :return '#f59563';
        case 32  :return '#f67c5f';
        case 64  :return '#f65e3b';
        case 128 :return '#edcf72';
        case 256 :return '#edcc61';
        case 512 :return '#9c0'   ;
        case 1024:return '#33b5e5';
        case 2048:return '#09c'   ;
        case 4096:return '#a6c'   ;
        case 3192:return '#93c'   ;
    }
    return "black";
}

function getNumberColor( number ) {
    if ( number <= 4 ) {
        return '#776e65';
    }
    return 'white';
}

function canMoveUp(board) {
    for(var i=1; i < 4; i++) {
        for(var j=0; j < 4; j++) {
            if(board[i][j] !== 0) {
                if(board[i-1][j] === 0 || board[i][j] === board[i-1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for(var i=0; i < 3; i++) {
        for(var j=0; j < 4; j++) {
            if(board[i][j] !== 0) {
                if(board[i+1][j] === 0 || board[i][j] === board[i+1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveLeft(board) {
    for(var i=0; i < 4; i++) {
        for(var j=1; j < 4; j++) {
            if(board[i][j] !== 0) {
                if(board[i][j-1] === 0 || board[i][j] === board[i][j-1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for(var i=0; i < 4; i++) {
        for(var j=0; j < 3; j++) {
            if (board[i][j] !== 0) {
                if(board[i][j+1] === 0 || board[i][j] === board[i][j+1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockVertical(col, row1, row2, board) {
    for(var i=row1 + 1; i < row2; i++) {
        if(board[i][col] !== 0) {
            return false;
        }
    }
    return true;
}

function noBlockHorizontal(row, col1, col2, board) {
    for(var i=col1 + 1; i < col2; i++) {
        if(board[row][i] !== 0) {
            return false;
        }
    }
    return true;
}