import React from 'react';
import '../styles/App.css';
import Board from '../components/Board.js';
//import * as threat from '../helper/threatHelper.js'
import { calculateMovement, calculateThreat, kingMovement, calculateCheck, simulateForCheckmateOnCheck } from '../helper/threatHelper.js'
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            history: [
                {
                    squares: [
                        'bR', 'bK', 'bB', 'bQ', 'bKi', 'bB', 'bK', 'bR',
                        'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP',
                        'wR', 'wK', 'wB', 'wQ', 'wKi', 'wB', 'wK', 'wR',
                        // 'bKi', 'bR', 'e', 'bR', 'e', 'e', 'e', 'e',
                        // 'bR', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        // 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        // 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        // 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        // 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
                        // 'e', 'e', 'e', 'e', 'e', 'e', 'wP', 'e',
                        // 'e', 'e', 'wKi', 'e', 'e', 'e', 'e', 'e',
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
            potentialMoves: Array(64).fill(false),
            winner: {
                blackWin: false,
                whiteWin: false
            }
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

        if(this.state.winner.blackWin || this.state.winner.whiteWin){
            debugger;
            return;
        }

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
                let check = calculateCheck(this.state.history[this.state.stepNumber].squares);
                let whiteWin = false;
                let blackWin = false;
                if(check.w){
                    blackWin = simulateForCheckmateOnCheck(this.state.history[this.state.stepNumber].squares, 'w');
                }
                if(check.b){
                    whiteWin = simulateForCheckmateOnCheck(this.state.history[this.state.stepNumber].squares, 'b');
                }
                this.setState({
                    check: check,
                    winner: {
                        blackWin: blackWin,
                        whiteWin: whiteWin
                    }
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
        if (this.state.check.w || this.state.check.b){
            debugger;
            status += " is in check."
        }


        if (this.state.winner.whiteWin){
            status = "White has won!";
        }
        else if (this.state.winner.blackWin){
            status = "Black has won!";
        }

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



export default App;
