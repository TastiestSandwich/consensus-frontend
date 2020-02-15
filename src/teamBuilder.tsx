import React from 'react';
import { AppView } from './app';
import { ChinpokoData, ChinpokoStoredData, getChinpokoData, BaseChinpokoList } from './chinpoko';

export interface ChinpokoInputData {
  name: string
  species: string
  lvl: number
  evHP: number
  evATK: number
  evDEF: number
  evSPE: number
}

function transformInputArrayToTeam(inputArray: Array<ChinpokoInputData>): {[id: number] : ChinpokoData} {
  const team: {[id: number] : ChinpokoData} = {};
  for(let i=0; i < inputArray.length; i++) {
    team[i] = getChinpokoData(transformInputToStored(inputArray[i]));
  }
  return team;
}

function transformInputToStored(input: ChinpokoInputData): ChinpokoStoredData {
  return ({
    name: input.name,
    species: BaseChinpokoList[input.species],
    lvl: input.lvl, evHP: input.evHP, evATK: input.evATK, evDEF: input.evDEF, evSPE: input.evSPE
  })
}

interface TeamBuilderProps {
  changeView: (view: AppView) => void
  setTeam: (team: {[id: number] : ChinpokoData}) => void
}

interface TeamBuilderState {
  message: string
  input: string
}

export class TeamBuilder extends React.Component<TeamBuilderProps, TeamBuilderState> {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      input: ""
    }
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
      message: ""
    })
  }

  handleSubmit = () => {
    const input = JSON.parse(this.state.input);
    this.props.setTeam( transformInputArrayToTeam(input) );
    this.setState({
      message: "Team submitted successfully!"
    })
  }

  changeViewToStart = () => {
    this.props.changeView(AppView.START);
  }

  render(){
  	return (
  		<div className="team-builder-component">
        <button className="team-builder-component__start-button" onClick={this.changeViewToStart}>
          BACK
        </button>
  			<div className="team-builder-component__title">
  				TEAM BUILDER
  			</div>
        <div className="team-builder-component__body">
          <input className="team-builder-component__input" onChange={this.handleInput}>
          </input>
          <button className="team-builder-component__submit-button" onClick={this.handleSubmit}>
            SUBMIT
          </button>
        </div>
        <div className="team-builder-component__message">
          {this.state.message}
        </div>
  		</div>
	  )
  }
}