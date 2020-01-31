import React from 'react';
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
				<div className="cardname">
					{this.state.name}
				</div>
				<div className="cardtext">
					{this.state.text}
				</div>
			</div>
		);
	}
}

export default Card