import React from 'react';
import './deckBuilder.scss';
import { AppView } from '../../app';
import { CardInstance, CardList, getRandomCardInstance, getCardInstance, CardData } from '../../components/card/card';
import { DeckCard } from './deckCard';

export function getRandomDeck(size: number) {
  let deck: {[id: number] : CardInstance} = {};
  for(let i=0; i < size; i++) {
    deck[i] = getRandomCardInstance(i);
  }
  return deck;
}

function transformInputToDeckList(inputArray: Array<string>): {[id: number] : CardInstance} {
  const deck: {[id: number] : CardInstance} = {};
  for(let i=0; i < inputArray.length; i++) {
    const card: CardData = CardList[inputArray[i]];
    deck[i] = getCardInstance(i, card, true);
  }
  return deck;
}

function transformDeckListToInput(deck: {[id: number] : CardInstance}) {
  const input: Array<String> = [];
  for(let instance of Object.values(deck)) {
    input.push( instance.card.name );
  }
  return input;
}

interface DeckBuilderProps {
  changeView: (view: AppView) => void
  setDeck: (deck: {[id: number] : CardInstance}, ally: boolean) => void
  swapPlayers: () => void
  allyDeck: {[id: number] : CardInstance}
  enemyDeck: {[id: number] : CardInstance}
  ally: boolean
}

interface DeckBuilderState {
  message: string
  input: string
}

export class DeckBuilder extends React.Component<DeckBuilderProps, DeckBuilderState> {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      input: JSON.stringify( transformDeckListToInput(this.props.allyDeck) ),
    }
  }

  handleChangePlayer = () => {
    const deck = this.props.enemyDeck;
    this.setState(prevState => ({
      input: JSON.stringify( transformDeckListToInput(deck) )
    }));
    this.props.swapPlayers();
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
      message: ""
    })
  }

  handleSubmit = () => {
    const input = JSON.parse(this.state.input);
    this.props.setDeck( transformInputToDeckList(input), true );
    this.setState({
      message: "Deck submitted successfully!"
    })
  }

  changeViewToStart = () => {
    this.props.changeView(AppView.START);
  }

  render(){
    const player = this.props.ally ? "PLAYER 1" : "PLAYER 2";
    const deck = this.props.allyDeck;
    const cardKeys = Object.keys(deck);

  	return (
  		<div className="deck-builder-component">
        <button className="deck-builder-component__start-button" onClick={this.changeViewToStart}>
          BACK
        </button>
  			<div className="deck--component__title">
  				DECK BUILDER
  			</div>
        <div className="deck-builder-component__subtitle">
          <div className="deck-builder-component__player">
            {player}
          </div>
          <button className="deck-builder-component__player-button" onClick={this.handleChangePlayer}>
            CHANGE PLAYER
          </button>
        </div>
        <div className="deck-builder-component__deck">
          { cardKeys.map((key) => (
          <DeckCard
            key={key}
            instance={deck[key]}
           />
          ))}
        </div>
        <div className="deck-builder-component__body">
          <button className="deck-builder-component__submit-button" onClick={this.handleSubmit}>
            SUBMIT
          </button>
          <textarea className="deck-builder-component__input" onChange={this.handleInput} value={this.state.input}>
          </textarea>
        </div>
        <div className="deck-builder-component__message">
          {this.state.message}
        </div>
  		</div>
	  )
  }
}