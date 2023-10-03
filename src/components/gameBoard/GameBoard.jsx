import { useState, useRef } from "react";
import "./GameBoard.scss";

const GameBoard = () => {
	const [score, setScore] = useState(0);

	const [positions, setPositions] = useState({
		top: 0,
		left: 0,
	});

	const randomT = Math.round(Math.random() * 348);
	const randomL = Math.round(Math.random() * 348);

	const newPositions = {
		top: randomT % 10 === 0 ? randomT : randomT - (randomT % 10),
		left: randomL % 10 === 0 ? randomL : randomL - (randomL % 10),
	};

	const [randomPositions, setRandomPositions] = useState(newPositions);

	const pRef = useRef();

	function controller(e) {
		const { top, left } = positions;

		switch (e.target.name) {
			case "UP":
				setPositions((prevPositions) => {
					if (prevPositions.top >= 10) {
						return { ...prevPositions, top: prevPositions.top - 10 };
					} else return prevPositions;
				});
				break;
			case "RIGHT":
				setPositions((prevPositions) => {
					if (prevPositions.left <= 348) {
						return { ...prevPositions, left: prevPositions.left + 10 };
					} else return prevPositions;
				});
				break;
			case "DOWN":
				setPositions((prevPositions) => {
					if (prevPositions.top <= 348) {
						return { ...prevPositions, top: prevPositions.top + 10 };
					} else return prevPositions;
				});
				break;
			case "LEFT":
				setPositions((prevPositions) => {
					if (prevPositions.left >= 10) {
						return { ...prevPositions, left: prevPositions.left - 10 };
					} else return prevPositions;
				});
				break;

			default:
				break;
		}

		if (top === randomPositions.top && left === randomPositions.left) {
			setScore((prevScore) => prevScore + 1);
			setRandomPositions(newPositions);
			pRef.current.style.color = "red";
			setTimeout(() => {
				pRef.current.style.color = "green";
			}, 100);
		}
	}

	return (
		<div className="GameBoard">
			<p ref={pRef}>score: {score}</p>

			<div className="wrapper">
				<div className="cube" style={positions}></div>
				<div className="point" style={randomPositions}></div>
			</div>

			<div onClick={(e) => controller(e)}>
				<button type="button" name="LEFT">
					LEFT
				</button>
				<button type="button" name="UP">
					UP
				</button>
				<button type="button" name="DOWN">
					DOWN
				</button>
				<button type="button" name="RIGHT">
					RIGHT
				</button>
			</div>
		</div>
	);
};

export default GameBoard;
