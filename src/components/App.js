import React from 'react';
import '../styles/App.css';
import Board from '../components/Board.js';
//import * as threat from '../helper/threatHelper.js'
import { calculateMovement, calculateThreat, kingMovement } from '../helper/threatHelper.js'
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            history: [
                {
                    squares: [
                        'bR', 'bK', 'bB', 'bKi', 'bQ', 'bB', 'bK', 'bR',
                        'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP',
                        'wR', 'wK', 'wB', 'wKi', 'wQ', 'wB', 'wK', 'wR',
                    ],
                }
            ],
            check: {
                white: false,
                black: false
            },
            stepNumber: 0,
            selected: null,
            whiteIsNext: true,
            potentialMoves: Array(64).fill(false)
        };

    }
    calculatePotentialMoves(i) {
        return calculateMovement(i, this.state.history[this.state.stepNumber].squares)
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let currentTurn = this.state.whiteIsNext ? 'w' : 'b';
        if(this.state.selected === null && currentTurn === squares[i].charAt(0)){
            this.setState({
                selected: i,
                potentialMoves: this.calculatePotentialMoves(i)
            })
        } else if (this.state.selected === i ) {
            this.setState({
                selected: null,
                potentialMoves: Array(64).fill(false)
            })
        } else if (this.state.potentialMoves[i]) {
            squares[i] = squares[this.state.selected];
            squares[this.state.selected] = 'e';
            this.setState({
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
                selected: null,
                stepNumber: history.length,
                whiteIsNext: !this.state.whiteIsNext,
                potentialMoves: Array(64).fill(false)

            }, () => {
                let checkAndWinner = calculateCheck(this.state.history[this.state.stepNumber].squares);
                this.setState({
                    check: checkAndWinner.check,
                    winner: checkAndWinner.winner
                })
            });
        }



    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            whiteIsNext: (step % 2) === 0,
            selected: null,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        //const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? "Move #" + move : "Game start";
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        let status = "Next player: " + (this.state.whiteIsNext ? "White" : "Black");
        let currentPiece = this.state.selected;

        let showPlayerTurn = '';
        if(this.state.selected === null){
            showPlayerTurn = this.state.whiteIsNext ? 'w' : 'b';
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        moves={this.state.potentialMoves}
                        onClick={i => this.handleClick(i)}
                        currentPlayer={showPlayerTurn}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{currentPiece}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

function calculateCheck(board) {
    let check = {
        white: false,
        black: false
    };
    let winner = {
        white: false,
        black: false,
    };
    for(let index = 0; index < 64; index++){
        if(board[index] === 'wKi'){
            let blackTeamThreat = calculateThreat(index, board);
            let whiteKingMovement = kingMovement(index, board);
            if(blackTeamThreat[index]){
                check.white = true;
            }
            let whiteKingCanMove = false;
            for(let counter = 0; counter < 63; counter++){
                if(whiteKingMovement[counter]){
                    whiteKingCanMove = true;
                }
            }
            if(!whiteKingCanMove && check.white){
                winner.black = true;
            }
        }
        if(board[index] === 'bKi'){
            let whiteTeamThreat = calculateThreat(index, board);
            let blackKingMovement = kingMovement(index, board);
            if(whiteTeamThreat[index]){
                check.black = true;
            }

            let blackKingCanMove = false;
            for(let counter = 0; counter < 63; counter++){
                if(blackKingMovement[counter]){
                    blackKingCanMove = true;
                }
            }
            if(!blackKingCanMove && check.black){
                winner.white = true;
            }
        }
    }
    return {
        check,
        winner
    }
}

export default App;
