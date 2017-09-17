import React from 'react';
import '../styles/App.css';
import Board from '../components/Board.js';
//import * as threat from '../helper/threatHelper.js'
import { calculateMovement } from '../helper/threatHelper.js'
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
            });
        }



        //----------------

        // if(this.state.selected === i){
        //     this.setState({
        //         selected: null,
        //         potentialMoves: Array(64).fill(false)
        //     });
        //     return;
        // }
        //
        // if( !this.state.selected && !squares[i]) {
        //     return;
        // }
        // if( !this.state.selected){
        //     let potentialMoves = this.calculatePotentialMoves(i);
        //     this.setState({
        //         selected: i,
        //         potentialMoves
        //     })
        // }
        // else if (this.state.potentialMoves[i]) {
        //     squares[i] = squares[this.state.selected];
        //     squares[this.state.selected] = 'e';
        //     this.setState({
        //         history: history.concat([
        //             {
        //                 squares: squares
        //             }
        //         ]),
        //         selected: null,
        //         stepNumber: history.length,
        //         whiteIsNext: !this.state.whiteIsNext,
        //         potentialMoves: Array(64).fill(false)
        //     });
        // }

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

        let status;
        // if (winner) {
        //     status = "Winner: " + winner;
        // } else {
             status = "Next player: " + (this.state.whiteIsNext ? "White" : "Black");
        // }
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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default App;
