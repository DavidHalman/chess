export function calculateMovement(pos, board){
    switch(board[pos]){
        case ('wP'):
        case ('bP'):
            return pawnMovement(pos, board);
        case ('wK'):
        case ('bK'):
            return knightMovement(pos, board);
        case ('bB'):
        case ('wB'):
            return bishopMovement(pos, board);
        case ('wR'):
        case ('bR'):
            return rookMovement(pos, board);
        case ('wQ'):
        case ('bQ'):
            return queenMovement(pos, board);
        case ('wKi'):
        case ('bKi'):
            return kingMovement(pos, board);
        default:
            return Array(64).fill(false);
    }
}
//Calculate threat for king movement
export function calculateThreat(pos, board) {
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    let combinedThreat = Array(64).fill(false);
    for (let index = 0; index < 64; index++) {
        switch(board[index]){
            case (`${enemyColor}P`):
                combinedThreat = arrayOR(pawnThreat(index, board), combinedThreat);
                break;
            case (`${enemyColor}K`):
                combinedThreat = arrayOR(knightThreat(index, board), combinedThreat);
                break;
            case (`${enemyColor}B`):
                combinedThreat = arrayOR(bishopThreat(index, board), combinedThreat);
                break;
            case (`${enemyColor}R`):
                combinedThreat = arrayOR(rookThreat(index, board), combinedThreat);
                break;
            case (`${enemyColor}Q`):
                combinedThreat = arrayOR(queenThreat(index, board), combinedThreat);
                break;
            case (`${enemyColor}Ki`):
                combinedThreat = arrayOR(kingThreat(index, board), combinedThreat);
                break;
            default:
                break;
        }
    }
    return combinedThreat;
}

export function knightThreat(pos, board){
    let threat = new Array(64).fill(false);
    if (pos + 17 >= 0 && pos + 17 < 64 && Math.floor(pos / 8) + 2 === Math.floor((pos + 17) / 8)){threat[pos+17] = true}
    if (pos + 15 >= 0 && pos + 15 < 64 && Math.floor(pos / 8) + 2 === Math.floor((pos + 15) / 8)){threat[pos+15] = true}
    if (pos + 10 >= 0 && pos + 10 < 64 && Math.floor(pos / 8) + 1 === Math.floor((pos + 10) / 8)){threat[pos+10] = true}
    if (pos + 6 >= 0 && pos + 6 < 64 && Math.floor(pos / 8) + 1 === Math.floor((pos + 6) / 8)){threat[pos+6] = true}
    if (pos - 6 >= 0 && pos - 6 < 64 && Math.floor(pos / 8) - 1 === Math.floor((pos - 6) / 8)){threat[pos-6] = true}
    if (pos - 10 >= 0 && pos - 10 < 64 && Math.floor(pos / 8) - 1 === Math.floor((pos - 10) / 8)){threat[pos-10] = true}
    if (pos - 15 >= 0 && pos - 15 < 64 && Math.floor(pos / 8) - 2 === Math.floor((pos - 15) / 8)){threat[pos-15] = true}
    if (pos - 17 >= 0 && pos - 17 < 64  && Math.floor(pos / 8) - 2 === Math.floor((pos - 17) / 8)){threat[pos-17] = true}
    return threat;
}
//TODO Change these nested if statements???
function knightMovement(pos, board) {
    let movement = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    if (pos + 17 >= 0 && pos + 17 < 64 && Math.floor(pos / 8) + 2 === Math.floor((pos + 17) / 8)){ if(board[pos+17].charAt(0) === enemyColor || board[pos+17].charAt(0) === 'e'){movement[pos+17] = true}}
    if (pos + 15 >= 0 && pos + 15 < 64 && Math.floor(pos / 8) + 2 === Math.floor((pos + 15) / 8)){if(board[pos+15].charAt(0) === enemyColor || board[pos+15].charAt(0) === 'e'){movement[pos+15] = true}}
    if (pos + 10 >= 0 && pos + 10 < 64 && Math.floor(pos / 8) + 1 === Math.floor((pos + 10) / 8)){if(board[pos+10].charAt(0) === enemyColor || board[pos+10].charAt(0) === 'e'){movement[pos+10] = true}}
    if (pos + 6 >= 0 && pos + 6 < 64 && Math.floor(pos / 8) + 1 === Math.floor((pos + 6) / 8)){if(board[pos+6].charAt(0) === enemyColor || board[pos+6].charAt(0) === 'e'){movement[pos+6] = true}}
    if (pos - 6 >= 0 && pos - 6 < 64 && Math.floor(pos / 8) - 1 === Math.floor((pos - 6) / 8)){if(board[pos-6].charAt(0) === enemyColor || board[pos-6].charAt(0) === 'e'){movement[pos-6] = true}}
    if (pos - 10 >= 0 && pos - 10  < 64 && Math.floor(pos / 8) - 1 === Math.floor((pos - 10) / 8)){if(board[pos-10].charAt(0) === enemyColor || board[pos-10].charAt(0) === 'e'){movement[pos-10] = true}}
    if (pos - 15 >= 0 && pos - 15 < 64 && Math.floor(pos / 8) - 2 === Math.floor((pos - 15) / 8)){if(board[pos-15].charAt(0) === enemyColor || board[pos-15].charAt(0) === 'e'){movement[pos-15] = true}}
    if (pos - 17 >= 0 && pos - 17 < 64  && Math.floor(pos / 8) - 2 === Math.floor((pos - 17) / 8)){if(board[pos-17].charAt(0) === enemyColor || board[pos-17].charAt(0) === 'e'){movement[pos-17] = true}}
    return movement;
}

function pawnMovement(pos, board) {
    let threat = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    if (enemyColor === 'w') {
        //these moves are for the black pieces
        if (pos + 8 >= 0 && pos + 8 < 64 && board[pos + 8].charAt(0) === 'e') {
            threat[pos + 8] = true;
            threat[pos + 16] = Math.floor(pos / 8) === 1 && board[pos + 16].charAt(0) === 'e';
        }
        threat[pos + 9] = pos + 9 >= 0 && pos + 9 < 64 && board[pos + 9].charAt(0) === enemyColor && Math.floor(pos / 8) === Math.floor((pos + 9) / 8)-1;
        threat[pos + 7] = pos + 7 >= 0 && pos + 7 < 64 && board[pos + 7].charAt(0) === enemyColor && Math.floor(pos / 8) === Math.floor((pos + 7) / 8)-1;
    } else {
        // these moves are for the white pieces
        if (pos - 8 >= 0 && pos - 8 < 64 && board[pos - 8].charAt(0) === 'e') {
            threat[pos - 8] = true;
            threat[pos - 16] = Math.floor(pos / 8) === 6 && board[pos - 16].charAt(0) === 'e';
        }
        threat[pos - 9] = pos - 9 >= 0 && pos - 9 < 64 && board[pos - 9].charAt(0) === enemyColor && Math.floor(pos / 8) === Math.floor((pos - 9) / 8) + 1;
        threat[pos - 7] = pos - 7 >= 0 && pos - 7 < 64 && board[pos - 7].charAt(0) === enemyColor && Math.floor(pos / 8) === Math.floor((pos - 7) / 8) + 1;
    }
    return threat;
}
function pawnThreat(pos, board){
    let threat = new Array(64).fill(false);
    if(board[pos].charAt(0) === 'b') {
        threat[pos + 9] = pos + 9 >= 0 && pos + 9 < 64 && Math.floor(pos / 8) === Math.floor((pos + 9) / 8) - 1;
        threat[pos + 7] = pos + 7 >= 0 && pos + 7 < 64 && Math.floor(pos / 8) === Math.floor((pos + 7) / 8) - 1;
    } else {
        threat[pos - 9] = pos - 9 >= 0 && pos - 9 < 64 && Math.floor(pos / 8) === Math.floor((pos - 9) / 8) + 1;
        threat[pos - 7] = pos - 7 >= 0 && pos - 7 < 64 && Math.floor(pos / 8) === Math.floor((pos - 7) / 8) + 1;
    }
    return threat;
}

function rookMovement(pos, board) {
    let movement = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    let counter = 1;
    while(pos+8*counter >= 0 && pos+8*counter < 64){
        if(board[pos+8*counter] === 'e') {
            movement[pos + 8 * counter] = true;
        } else if (board[pos+8*counter].charAt(0) === enemyColor){
            movement[pos + 8 * counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos-8*counter >= 0 && pos-8*counter < 64){
        if(board[pos-8*counter] === 'e') {
            movement[pos - 8 * counter] = true;
        }
        else if (board[pos-8*counter].charAt(0) === enemyColor){
            movement[pos - 8 * counter] = true;
            break;
        }
        else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos+counter >= 0 && pos+counter < 64 && Math.floor(pos/8) === Math.floor((pos+counter)/8)){
        if(board[pos+counter] === 'e') {
            movement[pos + counter] = true;
        }
        else if (board[pos+counter].charAt(0) === enemyColor){
            movement[pos+counter] = true;
            break;
        }
        else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos-counter >= 0 && pos-counter < 64 && Math.floor(pos/8) === Math.floor((pos-counter)/8)){
        if(board[pos-counter] === 'e') {
            movement[pos-counter] = true;
        }
        else if (board[pos-counter].charAt(0) === enemyColor){
            movement[pos-counter] = true;
            break;
        }
        else {
            break;
        }
        counter++;
    }
    return movement;
}

function rookThreat(pos, board) {
    let threat = new Array(64).fill(false);
    let counter = 1;
    while(pos+8*counter >= 0 && pos+8*counter < 64){
        threat[pos + 8 * counter] = true;
        if(board[pos+8*counter] !== 'e') {
            threat[pos + 16] = board[pos + 8 * counter].slice(1) === 'Ki' && pos + 16 < 64 && pos + 16 >= 0;
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos-8*counter >= 0 && pos-8*counter < 64){
        threat[pos - 8 * counter] = true;
        if(board[pos - 8 * counter] !== 'e') {
            threat[pos - 16] = board[pos - 8 * counter].slice(1) === 'Ki' && pos - 16 < 64 && pos - 16 >= 0;
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos+counter >= 0 && pos+counter < 64 && Math.floor(pos/8) === Math.floor((pos+counter)/8)){
        threat[pos + counter] = true;
        if(board[pos+counter] !== 'e') {
            threat[pos + counter + 1] = (pos+counter+1) >= 0 && (pos+counter+1) < 64 && board[pos+counter].slice(1) === 'Ki' && Math.floor(pos/8) === Math.floor((pos+counter+1)/8);
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos-counter >= 0 && pos-counter < 64 && Math.floor(pos/8) === Math.floor((pos-counter)/8)){
        threat[pos-counter] = true;
        if(board[pos-counter] !== 'e') {
            threat[pos - counter - 1] = (pos - counter - 1) >= 0 && (pos - counter - 1) < 64 && board[pos - counter].slice(1) === 'Ki' && Math.floor(pos / 8) === Math.floor((pos - counter - 1)/8);
            break;
        }
        counter++;
    }
    return threat;
}
//todo make threat extend beyond a king
function bishopThreat(pos, board) {
    let threat = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    let counter = 1;
    while(pos + 9*counter >= 0 && pos + 9*counter < 64 && Math.floor(pos/8) + counter === Math.floor( (pos+9*counter)/8)){
        threat[pos + 9 * counter] = true;
        // if(board[pos + 9 * counter].charAt(0) !== 'e'){
        //     threat[pos + 9 * (counter + 1)] = pos + 9 * (counter + 1) >= 0 && pos + 9 * (counter + 1) < 64
        // }

        if(board[pos+9*counter].charAt(0) === 'e'){
            threat[pos+9*counter] = true;
        } else {
            threat[pos+9*counter] = true;
            break;
        }
        counter++;
    }
    counter = 1;
    while (pos + 7*counter >= 0 && pos + 7 * counter < 64 && Math.floor(pos / 8) + counter === Math.floor((pos + 7 * counter) / 8)){
        if (board[pos + 7 * counter].charAt(0) === 'e'){
            threat[pos + 7 * counter] = true;
        } else {
            threat[pos + 7 * counter] = true;
            break;
        }
        counter++;
    }
    counter = 1;
    while (pos - 7 * counter >= 0 && pos - 7 * counter < 64 && Math.floor(pos / 8) - counter === Math.floor((pos - 7 * counter) / 8)){
        if(board[pos - 7 * counter].charAt(0) === 'e'){
            threat[pos - 7 * counter] = true;
        } else {
            threat[pos - 7 * counter] = true;
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos - 9 * counter >= 0 && pos - 9 * counter < 64 && Math.floor(pos/8) - counter === Math.floor((pos - 9 * counter) / 8)){
        if(board[pos - 9 * counter].charAt(0) === 'e'){
            threat[pos - 9 * counter] = true;
        } else {
            threat[pos - 9 * counter] = true;
            break;
        }
        counter++;
    }
    return threat;
}
function bishopMovement(pos, board) {
    let movement = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    let allyColor = board[pos].charAt(0) === 'w' ? 'w' : 'b';
    let counter = 1;
    while(pos + 9*counter >= 0 && pos + 9 * counter < 64 && Math.floor(pos / 8) + counter === Math.floor((pos + 9 * counter) / 8)){
        if (board[pos + 9 * counter].charAt(0) === 'e'){
            movement[pos + 9 * counter] = true;
        } else if (board[pos + 9 * counter].charAt(0) === enemyColor){
            movement[pos + 9 * counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos + 7 * counter >= 0 && pos + 7 * counter < 64 && Math.floor(pos / 8) + counter === Math.floor((pos + 7 * counter) / 8)){
        if(board[pos + 7 * counter].charAt(0) === 'e'){
            movement[pos + 7 * counter] = true;
        } else if (board[pos + 7 * counter].charAt(0) === enemyColor){
            movement[pos + 7 * counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos - 7 * counter >= 0 && pos - 7 * counter < 64 && Math.floor(pos / 8) - counter === Math.floor((pos - 7 * counter) / 8)){
        if(board[pos - 7 * counter].charAt(0) === 'e'){
            movement[pos - 7 * counter] = true;
        } else if (board[pos - 7 * counter].charAt(0) === enemyColor){
            movement[pos - 7 * counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    counter = 1;
    while(pos - 9 * counter >= 0 && pos - 9 * counter < 64 && Math.floor(pos/8) - counter === Math.floor( (pos-9*counter)/8)){
        if(board[pos-9*counter].charAt(0) === 'e'){
            movement[pos-9*counter] = true;
        } else if (board[pos-9*counter].charAt(0) === enemyColor){
            movement[pos-9*counter] = true;
            break;
        } else {
            break;
        }
        counter++;
    }
    return movement;
}

function queenThreat(pos, board) {
    return arrayOR(rookThreat(pos,board), bishopThreat(pos, board));
}
function queenMovement(pos, board) {
    return arrayOR(rookMovement(pos, board), bishopMovement(pos, board));
}

function kingThreat(pos, board) {
    let threat = new Array(64).fill(false);
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    if(pos-9 >= 0 && pos-9 < 64 && Math.floor(pos/8) === Math.floor((pos-9)/8) + 1) { threat[pos-9] = true;}
    if(pos-8 >= 0 && pos-8 < 64) { threat[pos-8] = true;}
    if(pos-7 >= 0 && pos-7 < 64 && Math.floor(pos/8) === Math.floor((pos-7)/8) + 1) { threat[pos-7] = true;}
    if(pos-1 >= 0 && pos-1 < 64 && Math.floor(pos/8) === Math.floor((pos-1)/8)) { threat[pos-1] = true;}
    if(pos+1 >= 0 && pos+1 < 64 && Math.floor(pos/8) === Math.floor((pos+1)/8)) { threat[pos+1] = true;}
    if(pos+7 >= 0 && pos+7 < 64 && Math.floor(pos/8) === Math.floor((pos+7)/8) + 1) { threat[pos+7] = true;}
    if(pos+8 >= 0 && pos+8 < 64) { threat[pos+8] = true;}
    if(pos+9 >= 0 && pos+9 < 64 && Math.floor(pos/8) === Math.floor((pos+9)/8) - 1) { threat[pos+9] = true;}
    return threat;
}

export function kingMovement(pos, board) {
    let movement = new Array(64).fill(false);
    let allyColor = board[pos].charAt(0) === 'w' ? 'w' : 'b';
    let enemyColor = board[pos].charAt(0) === 'w' ? 'b' : 'w';
    let threat = calculateThreat(pos, board);
    if(pos-9 >= 0 && pos-9 < 64 && board[pos-9].charAt(0) !== allyColor && threat[pos-9] === false && Math.floor(pos/8) === Math.floor((pos-9)/8) + 1) { movement[pos-9] = true;}
    if(pos-8 >= 0 && pos-8 < 64 && board[pos-8].charAt(0) !== allyColor && threat[pos-8] === false) { movement[pos-8] = true;}
    if(pos-7 >= 0 && pos-7 < 64 && board[pos-7].charAt(0) !== allyColor && threat[pos-7] === false && Math.floor(pos/8) === Math.floor((pos-7)/8) + 1) { movement[pos-7] = true;}
    if(pos-1 >= 0 && pos-1 < 64 && board[pos-1].charAt(0) !== allyColor && threat[pos-1] === false && Math.floor(pos/8) === Math.floor((pos-1)/8)){ movement[pos-1] = true;}
    if(pos+1 >= 0 && pos+1 < 64 && board[pos+1].charAt(0) !== allyColor && threat[pos+1] === false && Math.floor(pos/8) === Math.floor((pos+1)/8)) { movement[pos+1] = true;}
    if(pos+7 >= 0 && pos+7 < 64 && board[pos+7].charAt(0) !== allyColor && threat[pos+7] === false && Math.floor(pos/8) === Math.floor((pos+7)/8) - 1) { movement[pos+7] = true;}
    if(pos+8 >= 0 && pos+8 < 64 && board[pos+8].charAt(0) !== allyColor && threat[pos+8] === false) { movement[pos+8] = true;}
    if(pos+9 >= 0 && pos+9 < 64 && board[pos+9].charAt(0) !== allyColor && threat[pos+9] === false && Math.floor(pos/8) === Math.floor((pos+9)/8) - 1) { movement[pos+9] = true;}
    return movement;
}

// Function will return true if player is in checkmate
// checkedPlayer should be either 'w' or 'b'
export function simulateForCheckmateOnCheck (board, checkedPlayer){
    debugger;
    let kingLocation = findKing(board, checkedPlayer);
    for(let pieceIndex = 0; pieceIndex < 64; pieceIndex++){
        if(board[pieceIndex].charAt(0) === checkedPlayer) {
            let simulatedMoves = calculateMovement(pieceIndex, board);
            for(let potentialMoveIndex = 0; potentialMoveIndex < 64; potentialMoveIndex++){
                if(simulatedMoves[potentialMoveIndex]) {
                    let simulatedBoard = board.slice();
                    simulatedBoard[potentialMoveIndex] = simulatedBoard[pieceIndex];
                    simulatedBoard[pieceIndex] = 'e';
                    let simulatedKingLocation = findKing(simulatedBoard, checkedPlayer);
                    let check = calculateCheck(simulatedKingLocation, simulatedBoard);
                    if(checkedPlayer === 'w' && check.w === false){
                        return false;
                    }
                    if(checkedPlayer === 'b' && check.b === false){
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function findKing(board, player){
    for(let index = 0; index < 64; index++){
        if(board[index] === `${player}Ki`) {
            return index;
        }
    }
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

export function calculateCheck(board) {
    let check = {
        w: false,
        b: false
    };
    for(let index = 0; index < 64; index++){
        if(board[index] === 'wKi'){
            let blackTeamThreat = calculateThreat(index, board);
            let whiteKingMovement = kingMovement(index, board);
            if(blackTeamThreat[index]){
                check.w = true;
            }
        }
        if(board[index] === 'bKi'){
            let whiteTeamThreat = calculateThreat(index, board);
            let blackKingMovement = kingMovement(index, board);
            if(whiteTeamThreat[index]){
                check.b = true;
            }
        }
    }
    return check;
}