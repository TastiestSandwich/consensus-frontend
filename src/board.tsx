import React from 'react';
import './index.css';


class Board extends React.Component {
	render() {
		return (
			<div className="board">
				<div className="enemy-chinpokomon">
				ENEMY
				</div>
				<div className="ally-chinpokomon">
				ALLY
				</div>
				<div className="hand">
				HAND
				</div>
			</div>
		);
	}
}

export default Board