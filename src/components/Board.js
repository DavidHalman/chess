import React from 'react';
import '../styles/Board.css';
import whitePawn from '../images/whitePawn.png'
import whiteBishop from '../images/whiteBishop.png'
import whiteKnight from '../images/whiteKnight.png'
import whiteRook from '../images/whiteRook.png'
import whiteQueen from '../images/whiteQueen.png'
import whiteKing from '../images/whiteKing.png'
import blackPawn from '../images/blackPawn.png'
import blackKnight from '../images/blackKnight.png'
import blackBishop from '../images/blackBishop.png'
import blackRook from '../images/blackRook.png'
import blackQueen from '../images/blackQueen.png'
import blackKing from '../images/blackKing.png'

function Square(props) {
    let color = '';
    if(props.squareNumber % 2 === 0 ) {
        if (Math.floor(props.squareNumber / 8) % 2 === 0 ){
            color = 'white';
        } else {
            color = 'black'
        }
    } else {
        if (Math.floor(props.squareNumber / 8) % 2 === 0 ){
            color = 'black';
        } else {
            color = 'white'
        }
    }
    if (props.potentialMoves[props.squareNumber]){
        color += ' moveOption';
    }
    let currentTurn = props.currentPlayer === props.value.charAt(0) ? props.currentPlayer : '';
    let imagePath;
    switch(props.value){
        case ('wP'):
            imagePath = whitePawn;
            break;
        case ('wB'):
            imagePath = whiteBishop;
            break;
        case ('wK'):
            imagePath = whiteKnight;
            break;
        case ('wR'):
            imagePath = whiteRook;
            break;
        case ('wQ'):
            imagePath = whiteQueen;
            break;
        case ('wKi'):
            imagePath = whiteKing;
            break;
        case ('bP'):
            imagePath = blackPawn;
            break;
        case ('bB'):
            imagePath = blackBishop;
            break;
        case ('bK'):
            imagePath = blackKnight;
            break;
        case ('bR'):
            imagePath = blackRook;
            break;
        case ('bQ'):
            imagePath = blackQueen;
            break;
        case ('bKi'):
            imagePath = blackKing;
            break;
        default:
            imagePath = '';
    }
    return (
        <button className={`square ${color} ${currentTurn}`} onClick={props.onClick}>
            <img src = {imagePath} alt = {props.value.slice(1)} />
        </button>
    );
}

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                potentialMoves={this.props.moves}
                squareNumber={i}
                currentPlayer={this.props.currentPlayer}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>
                <div className="board-row">
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                </div>
                <div className="board-row">
                    {this.renderSquare(24)}
                    {this.renderSquare(25)}
                    {this.renderSquare(26)}
                    {this.renderSquare(27)}
                    {this.renderSquare(28)}
                    {this.renderSquare(29)}
                    {this.renderSquare(30)}
                    {this.renderSquare(31)}
                </div>
                <div className="board-row">
                    {this.renderSquare(32)}
                    {this.renderSquare(33)}
                    {this.renderSquare(34)}
                    {this.renderSquare(35)}
                    {this.renderSquare(36)}
                    {this.renderSquare(37)}
                    {this.renderSquare(38)}
                    {this.renderSquare(39)}
                </div>
                <div className="board-row">
                    {this.renderSquare(40)}
                    {this.renderSquare(41)}
                    {this.renderSquare(42)}
                    {this.renderSquare(43)}
                    {this.renderSquare(44)}
                    {this.renderSquare(45)}
                    {this.renderSquare(46)}
                    {this.renderSquare(47)}
                </div>
                <div className="board-row">
                    {this.renderSquare(48)}
                    {this.renderSquare(49)}
                    {this.renderSquare(50)}
                    {this.renderSquare(51)}
                    {this.renderSquare(52)}
                    {this.renderSquare(53)}
                    {this.renderSquare(54)}
                    {this.renderSquare(55)}
                </div>
                <div className="board-row">
                    {this.renderSquare(56)}
                    {this.renderSquare(57)}
                    {this.renderSquare(58)}
                    {this.renderSquare(59)}
                    {this.renderSquare(60)}
                    {this.renderSquare(61)}
                    {this.renderSquare(62)}
                    {this.renderSquare(63)}
                </div>
            </div>
        );
    }
}
