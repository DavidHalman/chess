import React from 'react';
import '../styles/App.css';
import Board from '../components/Board.js';

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
            xIsNext: true,
            potentialMoves: Array(64).fill(false)
        };

    }
    calculatePotentialMoves(i) {

        let newPotentialMoves = Array(64).fill(false);
        let currentSquares = this.state.history[this.state.stepNumber].squares;

        switch(currentSquares[i]) {
            //Black knight
            case ('wK'):
                if(i + 17 >= 0 && i + 17 <= 63 && Math.floor(i / 8) + 2 === Math.floor((i + 17) / 8)){ if(currentSquares[i+17].charAt(0) !== 'w'){newPotentialMoves[i+17] = true}}
                if(i + 15 >= 0 && i + 15 <= 63 && Math.floor(i / 8) + 2 === Math.floor((i + 15) / 8)){if(currentSquares[i+15].charAt(0) !== 'w'){newPotentialMoves[i+15] = true}}
                if(i + 10 >= 0 && i + 10 <= 63 && Math.floor(i / 8) + 1 === Math.floor((i + 10) / 8)){if(currentSquares[i+10].charAt(0) !== 'w'){newPotentialMoves[i+10] = true}}
                if(i + 6 >= 0 && i + 6 <= 63 && Math.floor(i / 8) + 1 === Math.floor((i + 6) / 8)){if(currentSquares[i+6].charAt(0) !== 'w'){newPotentialMoves[i+6] = true}}
                if(i - 6 >= 0 && i - 6 <= 63 && Math.floor(i / 8) - 1 === Math.floor((i - 6) / 8)){if(currentSquares[i-6].charAt(0) !== 'w'){newPotentialMoves[i-6] = true}}
                if(i - 10 >= 0 && i - 10  <= 63 && Math.floor(i / 8) - 1 === Math.floor((i - 10) / 8)){if(currentSquares[i-10].charAt(0) !== 'w'){newPotentialMoves[i-10] = true}}
                if(i - 15 >= 0 && i - 15 <= 63 && Math.floor(i / 8) - 2 === Math.floor((i - 15) / 8)){if(currentSquares[i-15].charAt(0) !== 'w'){newPotentialMoves[i-15] = true}}
                if(i - 17 >= 0 && i - 17 <= 63  && Math.floor(i / 8) - 2 === Math.floor((i - 17) / 8)){if(currentSquares[i-17].charAt(0) !== 'w'){newPotentialMoves[i-17] = true}}
                break;
            //White knight
            case ('bK'):
                if(i + 17 >= 0 && i + 17 <= 63 && Math.floor(i / 8) + 2 === Math.floor((i + 17) / 8)){ if(currentSquares[i+17].charAt(0) !== 'b'){newPotentialMoves[i+17] = true}}
                if(i + 15 >= 0 && i + 15 <= 63 && Math.floor(i / 8) + 2 === Math.floor((i + 15) / 8)){if(currentSquares[i+15].charAt(0) !== 'b'){newPotentialMoves[i+15] = true}}
                if(i + 10 >= 0 && i + 10 <= 63 && Math.floor(i / 8) + 1 === Math.floor((i + 10) / 8)){if(currentSquares[i+10].charAt(0) !== 'b'){newPotentialMoves[i+10] = true}}
                if(i + 6 >= 0 && i + 6 <= 63 && Math.floor(i / 8) + 1 === Math.floor((i + 6) / 8)){if(currentSquares[i+6].charAt(0) !== 'b'){newPotentialMoves[i+6] = true}}
                if(i - 6 >= 0 && i - 6 <= 63 && Math.floor(i / 8) - 1 === Math.floor((i - 6) / 8)){if(currentSquares[i-6].charAt(0) !== 'b'){newPotentialMoves[i-6] = true}}
                if(i - 10 >= 0 && i - 10  <= 63 && Math.floor(i / 8) - 1 === Math.floor((i - 10) / 8)){if(currentSquares[i-10].charAt(0) !== 'b'){newPotentialMoves[i-10] = true}}
                if(i - 15 >= 0 && i - 15 <= 63 && Math.floor(i / 8) - 2 === Math.floor((i - 15) / 8)){if(currentSquares[i-15].charAt(0) !== 'b'){newPotentialMoves[i-15] = true}}
                if(i - 17 >= 0 && i - 17 <= 63  && Math.floor(i / 8) - 2 === Math.floor((i - 17) / 8)){if(currentSquares[i-17].charAt(0) !== 'b'){newPotentialMoves[i-17] = true}}
                break;
            case ('bP'):
                if(i+8 >= 0 && i+8 <= 63 && currentSquares[i+8].charAt(0) === 'e'){newPotentialMoves[i+8] = true}
                if(i+9 >= 0 && i+9 <= 63 && currentSquares[i+9].charAt(0) === 'w'){newPotentialMoves[i+9] = true}
                if(i+7 >= 0 && i+7 <= 63 && currentSquares[i+7].charAt(0) === 'w'){newPotentialMoves[i+7] = true}
                break;
            case ('wP'):
                if(i-8 >= 0 && currentSquares[i-8].charAt(0) === 'e'){newPotentialMoves[i-8] = true}
                break;
        }
        this.setState({
            potentialMoves: newPotentialMoves
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(this.state.selected === i){
            this.setState({
                selected: null,
                potentialMoves: Array(64).fill(false)
            });
            return;
        }

        if( !this.state.selected && !squares[i]) {
            return;
        }
        if( !this.state.selected){
            this.calculatePotentialMoves(i);

            this.setState({
                selected: i
            })
        }
        else if (this.state.potentialMoves[i]) {
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
                xIsNext: !this.state.xIsNext,
                potentialMoves: Array(64).fill(false)
            });
        }
        //--------------

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
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
             status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        // }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        moves={this.state.potentialMoves}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
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
