import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Card extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.name,
			text: this.props.text
		}
	}

	render() {
		return (
			<div>
				<div class="cardname">
					{this.state.name}
				</div>
				<div class="cardtext">
					{this.state.text}
				</div>
			</div>
		);
	}
}

export default Card