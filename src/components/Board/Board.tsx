import { useEffect, useState } from "react"
import Square from "../Square/Square"
type Player = "X" | "O" | "Draw" | null


function calculateWinner(squares: Player[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}


function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [player, setPlayer] = useState('X')
    const [winner, setWinner] = useState<Player>(null)

    function setSquareValue(index: number) {
        const newData = squares.map((val, i) => {
            if (i === index) {
                return player;
            }
            return val
        })

        setSquares(newData)
        setPlayer(player === 'X' ? 'O' : 'X')
    }

    useEffect(() => {
        const w = calculateWinner(squares)
        if (w) {
            setWinner(w)
        }

        if (!w && !squares.filter((square) => !square).length) {
            setWinner('Draw')
        }
    }, [squares])



    function reset() {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setPlayer('X')
    }

    return (
        <div>
            {!winner && <p>Sua vez {player}</p>}
            {winner && winner !== "Draw" && <p>{winner} ganhou. Parabéns!!! 🥳</p>}
            {winner && winner === "Draw" && (
                <p>Empate!!!</p>
            )}

            

            <div className="grid">
                {Array(9)
                    .fill(null)
                    .map((_, i) => {
                        return (
                            <Square
                                winner={winner}
                                key={i}
                                onClick={() => setSquareValue(i)}
                                value={squares[i]}
                            />
                        )
                    })}
            </div>

            <div className="divReset">
                <button className="reset" onClick={reset}>Novo Jogo</button>
            </div>
        </div>
    )
}


export default Board