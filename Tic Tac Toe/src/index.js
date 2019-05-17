import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [Array(9).fill(null)],
            xIsNext: true,
        };
    }

    handlerClick(i) {
        const history = this.state.history.slice();
        const currentSquares = history[history.length - 1].slice();
        if(currentSquares[i] || calculateWinner(currentSquares)) {
            return
        }
        currentSquares[i] = this.state.xIsNext ? "X" : "O";
        history.push(currentSquares);
        this.setState({
            history: history,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(index) {
        const history = this.state.history.slice(0, index + 1);
        this.setState({
            history: history,
            xIsNext: history.length % 2,
        })
    }

    render() {
        const history = this.state.history.slice();
        const currentSquares = history[history.length - 1].slice();

        let status;
        let winner = calculateWinner(currentSquares);
        if(winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        const moves = history.map((squares, index) => {
            const desc = index ? "Go to move #" + index : "Go to game start";

            return (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)}>
                        {desc}
                    </button>
                </li>
            )
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={currentSquares} onClick={(i) => this.handlerClick(i)}/>
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
