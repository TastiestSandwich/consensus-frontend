import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Board extends React.Component {
	render() {
		return (
			<div class="board">
				<div class="enemy-chinpokomon">
				ENEMY
				</div>
				<div class="ally-chinpokomon">
				ALLY
				</div>
				<div class="hand">
				HAND
				</div>
			</div>
		);
	}
}

export default Board