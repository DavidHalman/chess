
export function calculateThreat(pos, board){
    switch(board[pos]){
        case ('wP'):
        case ('bP'):
            return pawnThreat(pos, board);
        case ('wK'):
        case ('bK'):
            return knightThreat(pos, board);
        case ('bB'):
        case ('wB'):
            return bishopThreat(pos, board);
        case ('wR'):
        case ('bR'):
            return rookThreat(pos, board);
        case ('wQ'):
        case ('bQ'):
            return queenThreat(pos, board);
        case ('wKi'):
            return kingThreat(pos, board);
        default:
            console.log("Error");
            return;
    }

}

export function knightThreat(pos, board){
    let threat = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    if(pos + 17 >= 0 && pos + 17 <= 63 && Math.floor(pos / 8) + 2 === Math.floor((pos + 17) / 8)){ if(board[pos+17].charAt(0) === enemyColor || board[pos+17].charAt(0) === 'e'){threat[pos+17] = true}}
    if(pos + 15 >= 0 && pos + 15 <= 63 && Math.floor(pos / 8) + 2 === Math.floor((pos + 15) / 8)){if(board[pos+15].charAt(0) === enemyColor || board[pos+15].charAt(0) === 'e'){threat[pos+15] = true}}
    if(pos + 10 >= 0 && pos + 10 <= 63 && Math.floor(pos / 8) + 1 === Math.floor((pos + 10) / 8)){if(board[pos+10].charAt(0) === enemyColor || board[pos+10].charAt(0) === 'e'){threat[pos+10] = true}}
    if(pos + 6 >= 0 && pos + 6 <= 63 && Math.floor(pos / 8) + 1 === Math.floor((pos + 6) / 8)){if(board[pos+6].charAt(0) === enemyColor || board[pos+6].charAt(0) === 'e'){threat[pos+6] = true}}
    if(pos - 6 >= 0 && pos - 6 <= 63 && Math.floor(pos / 8) - 1 === Math.floor((pos - 6) / 8)){if(board[pos-6].charAt(0) === enemyColor || board[pos-6].charAt(0) === 'e'){threat[pos-6] = true}}
    if(pos - 10 >= 0 && pos - 10  <= 63 && Math.floor(pos / 8) - 1 === Math.floor((pos - 10) / 8)){if(board[pos-10].charAt(0) === enemyColor || board[pos-10].charAt(0) === 'e'){threat[pos-10] = true}}
    if(pos - 15 >= 0 && pos - 15 <= 63 && Math.floor(pos / 8) - 2 === Math.floor((pos - 15) / 8)){if(board[pos-15].charAt(0) === enemyColor || board[pos-15].charAt(0) === 'e'){threat[pos-15] = true}}
    if(pos - 17 >= 0 && pos - 17 <= 63  && Math.floor(pos / 8) - 2 === Math.floor((pos - 17) / 8)){if(board[pos-17].charAt(0) === enemyColor || board[pos-17].charAt(0) === 'e'){threat[pos-17] = true}}
    return threat;
}

function pawnThreat(pos, board) {
    let threat = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    if(enemyColor === 'w') {
        //these moves are for the black pieces
        if (pos + 8 >= 0 && pos + 8 <= 63 && board[pos + 8].charAt(0) === 'e') {
            threat[pos + 8] = true;
            if (Math.floor(pos / 8) === 1 && board[pos + 16].charAt(0) === 'e') {
                threat[pos + 16] = true;
            }
        }
        if (pos + 9 >= 0 && pos + 9 <= 63 && board[pos + 9].charAt(0) === enemyColor) {
            threat[pos + 9] = true
        }
        if (pos + 7 >= 0 && pos + 7 <= 63 && board[pos + 7].charAt(0) === enemyColor) {
            threat[pos + 7] = true
        }
    }
    else {
        // these moves are for the white pieces
        if (pos - 8 >= 0 && pos - 8 <= 63 && board[pos - 8].charAt(0) === 'e') {
            threat[pos - 8] = true;
            if (Math.floor(pos / 8) === 6 && board[pos - 16].charAt(0) === 'e') {
                threat[pos - 16] = true;
            }
        }
        if (pos - 9 >= 0 && pos - 9 <= 63 && board[pos - 9].charAt(0) === enemyColor) {
            threat[pos - 9] = true
        }
        if (pos - 7 >= 0 && pos - 7 <= 63 && board[pos - 7].charAt(0) === enemyColor) {
            threat[pos - 7] = true
        }
    }
    return threat;
}

function rookThreat(pos, board) {
    let threat = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    let counter = 1;
    while(pos+8*counter >= 0 && pos+8*counter <= 63){
        if(board[pos+8*counter] === 'e') {
            threat[pos + 8 * counter] = true;
        } else if (board[pos+8*counter].charAt(0) === enemyColor){
            threat[pos + 8 * counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos-8*counter >= 0 && pos-8*counter <= 63){
        if(board[pos-8*counter] === 'e') {
            threat[pos - 8 * counter] = true;
        }
        else if (board[pos-8*counter].charAt(0) === enemyColor){
            threat[pos - 8 * counter] = true;
            break;
        }
        else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos+counter >= 0 && pos+counter <= 63 && Math.floor(pos/8) === Math.floor((pos+counter)/8)){
        if(board[pos+counter] === 'e') {
            threat[pos + counter] = true;
        }
        else if (board[pos+counter].charAt(0) === enemyColor){
            threat[pos+counter] = true;
            break;
        }
        else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos-counter >= 0 && pos-counter <= 63 && Math.floor(pos/8) === Math.floor((pos-counter)/8)){
        if(board[pos-counter] === 'e') {
            threat[pos-counter] = true;
        }
        else if (board[pos-counter].charAt(0) === enemyColor){
            threat[pos-counter] = true;
            break;
        }
        else {
            break;
        }
        counter++;
    }
    return threat;
}

function bishopThreat(pos, board) {
    let threat = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    let counter = 1;
    while(pos + 9*counter >= 0 && pos + 9*counter <= 63 && Math.floor(pos/8) + counter === Math.floor( (pos+9*counter)/8)){
        if(board[pos+9*counter].charAt(0) === 'e'){
            threat[pos+9*counter] = true;
        } else if (board[pos+9*counter].charAt(0) === enemyColor){
            threat[pos+9*counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos + 7*counter >= 0 && pos + 7*counter <= 63 && Math.floor(pos/8) + counter === Math.floor( (pos+7*counter)/8)){
        if(board[pos+7*counter].charAt(0) === 'e'){
            threat[pos+7*counter] = true;
        } else if (board[pos+7*counter].charAt(0) === enemyColor){
            threat[pos+7*counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos - 7*counter >= 0 && pos - 7*counter <= 63 && Math.floor(pos/8) - counter === Math.floor( (pos-7*counter)/8)){
        if(board[pos-7*counter].charAt(0) === 'e'){
            threat[pos-7*counter] = true;
        } else if (board[pos-7*counter].charAt(0) === enemyColor){
            threat[pos-7*counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos - 9*counter >= 0 && pos - 9*counter <= 63 && Math.floor(pos/8) - counter === Math.floor( (pos-9*counter)/8)){
        if(board[pos-9*counter].charAt(0) === 'e'){
            threat[pos-9*counter] = true;
        } else if (board[pos-9*counter].charAt(0) === enemyColor){
            threat[pos-9*counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    return threat;
}

function queenThreat(pos, board) {
    return arrayOR(rookThreat(pos,board), bishopThreat(pos, board));
}

function kingThreat(pos, board) {

}

function arrayOR(array1, array2){
    let index = 0;
    let OR = new Array(Math.min(array1.length, array2.length)).fill(false);
    while(index < array1.length && index < array2.length){
        if(array1[index] || array2[index]){
            OR[index] = true;
        }
        index++;
    }
    return OR;
}