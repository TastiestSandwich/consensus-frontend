import React from 'react';
import '../../root.scss';
import './game.scss';
import { CardData, CardInstance, CardAction, shuffle } from '../../components/card/card';
import { Hand, SelectedCard } from '../../components/hand/hand';
import { Chinpoko, ChinpokoData } from '../../components/chinpoko/chinpoko';
import { PhaseCounter, PhaseGroup, PhaseData, CurrentPhase, initPhaseGroupData, setPhaseGroupData, shouldPhaseBeClicked, deleteFromPhaseGroupData, findHighestIndexOverLimit } from '../../components/phase/phase';
import { Engine, calcDamage, calcAbsorb, calcHeal } from '../../components/engine/engine';

export const enum GameStage {
  PLAY,
  RESOLUTION,
  GAMEOVER
}

interface GameProps {
  allyTeam: {[id: number] : ChinpokoData}
  enemyTeam: {[id: number] : ChinpokoData}
  allyDeckList: {[id: number] : CardInstance}
  enemyDeckList: {[id: number] : CardInstance}
  setTeam: (team: {[id: number] : ChinpokoData}, ally: boolean) => void
  setDeckList: (deckList: {[id: number] : CardInstance}, ally: boolean) => void
  swapPlayers: () => void
}

export interface GameState {
  allyDeck: Array<number>
  enemyDeck: Array<number>
  allyHand: Array<number>
  enemyHand: Array<number>
  allyDiscard: Array<number>
  enemyDiscard: Array<number>
  allyChinpoko: number
  enemyChinpoko: number
  selectedCard: CardInstance | null
  enemySelectedCard: CardInstance | null
  allyPhases: Array<PhaseData>
  enemyPhases: Array<PhaseData>
  stage: GameStage
  phaseCounters: Array<PhaseCounter>
  phaseLimit: number
  currentPhase: CurrentPhase | null
}

export class Game extends React.Component<GameProps, GameState> {
  constructor(props) {
    super(props);
    this.state = {
      allyHand: [],
      enemyHand: [],
      allyDeck: shuffle(Object.keys(this.props.allyDeckList).map(i => Number(i))),
      enemyDeck: shuffle(Object.keys(this.props.enemyDeckList).map(i => Number(i))),
      allyDiscard: [],
      enemyDiscard: [],
      allyChinpoko: 0,
      enemyChinpoko: 0,
      selectedCard: null,
      enemySelectedCard: null,
      allyPhases: initPhaseGroupData(5),
      enemyPhases: initPhaseGroupData(5),
      stage: GameStage.PLAY,
      phaseCounters: [],
      phaseLimit: 0,
      currentPhase: null
    };
  }

  componentDidMount() {
    this.drawCards(true, 5);
    this.drawCards(false, 5);
  }

  drawCards = (ally: boolean, times: number) => {
    let deck = ally ? this.state.allyDeck : this.state.enemyDeck;
    let hand = ally ? this.state.allyHand : this.state.enemyHand;
    let discard = ally ? this.state.allyDiscard : this.state.enemyDiscard;
    for(let i = 0; i < times; i++) {
      let id = deck.shift();
      // if no more cards in deck, shuffle discard
      if(id == undefined) {
        deck = shuffle([...discard]);
        discard = []
        id = deck.shift();
      }
      if(id != undefined) {
        hand.push(id);
      }
    }
    if(ally) {
      this.setState({
        allyDeck: deck,
        allyHand: hand,
        allyDiscard: discard
      })
    } else {
      this.setState({
        enemyDeck: deck,
        enemyHand: hand,
        enemyDiscard: discard
      })
    }
  }

  handleCardClick = (id: number) => {
    const deckList = {...this.props.allyDeckList};
    const clickedCard: CardInstance = deckList[id];
    if (clickedCard.isClicked || this.state.stage != GameStage.PLAY) {
      return;
    }
    this.setState({
      selectedCard: {...clickedCard}
    })
    clickedCard.isClicked = true;
    if (this.state.selectedCard != null) {
      const selectedCard = deckList[this.state.selectedCard.id];
      selectedCard.isClicked = false;
    }
    this.props.setDeckList(deckList, true);
  }

  deleteCardClick = () => {
    if (this.state.stage != GameStage.PLAY) {
      return;
    }
    const deckList = {...this.props.allyDeckList};
    if(this.state.selectedCard != null) {
        deckList[this.state.selectedCard.id].isClicked = false;
    }
    this.setState({
      selectedCard: null,
    })
    this.props.setDeckList(deckList, true);
  }

  handlePhaseClick = (phaseNumber: number) => {
    if (this.state.stage != GameStage.PLAY) {
      return;
    }
    const instance = this.state.selectedCard;
    if ( shouldPhaseBeClicked(phaseNumber, instance, this.state.allyPhases) ) {
      this.setState({
        allyPhases: setPhaseGroupData(phaseNumber, instance, this.state.allyPhases),
        selectedCard: null
      })
    }
  }

  deletePhaseClick = (phaseNumber: number, instance: CardInstance | null) => {
    if (instance === null) {
      return;
    }
    const deckList = {...this.props.allyDeckList};
    deckList[instance.id].isClicked = false;
    this.setState({
      allyPhases: deleteFromPhaseGroupData(instance, this.state.allyPhases),
    })
    this.props.setDeckList(deckList, true);
  }

  handleChangeTeamClick = () => {
    if (this.state.stage != GameStage.PLAY) {
      return;
    }
    this.props.swapPlayers();
    this.setState((state) => ({
      allyHand: state.enemyHand,
      enemyHand: state.allyHand,
      allyDeck: state.enemyDeck,
      enemyDeck: state.allyDeck,
      allyDiscard: state.enemyDiscard,
      enemyDiscard: state.allyDiscard,
      allyChinpoko: state.enemyChinpoko,
      enemyChinpoko: state.allyChinpoko,
      selectedCard: state.enemySelectedCard,
      enemySelectedCard: state.selectedCard,
      allyPhases: state.enemyPhases,
      enemyPhases: state.allyPhases,
    }))
  }

  discardCardIfNeeded(id: number, ally: boolean) {
    const myHand: Array<number> = ally? [...this.state.allyHand] : [...this.state.enemyHand];
    const myDiscard: Array<number> = ally? [...this.state.allyDiscard] : [...this.state.enemyDiscard];
    const myDeck = ally ? {...this.props.allyDeckList} : {...this.props.enemyDeckList};
    const instance = myDeck[id];
    instance.isClicked = false;
    if(instance.isRemovable) {
      myHand.splice( myHand.indexOf(id), 1 );
      myDiscard.push(id);
    }
    if(ally) {
      this.setState({
        allyHand: myHand,
        allyDiscard: myDiscard,
      })
    } else {
      this.setState({
        enemyHand: myHand,
        enemyDiscard: myDiscard,
      })
    }
    this.props.setDeckList(myDeck, ally);
   }

  handleCardAction(instance: CardInstance, action: CardAction, isAlly: boolean, ally: ChinpokoData, enemy: ChinpokoData) {
    if(action.effect.name === "DAMAGE") { this.effectDamage(instance.card, action, ally, enemy); }
    else if(action.effect.name === "ABSORB") { this.effectAbsorb(instance.card, action, ally, enemy); }
    else if(action.effect.name === "HEAL") { this.effectHeal(instance.card, action, ally); }
  }

  effectDamage(card: CardData, action: CardAction, ally: ChinpokoData, enemy: ChinpokoData) {
    let damage = calcDamage(action.parameters.power, card.type, ally, enemy);
    if (enemy.hp < damage) {
      damage = enemy.hp;
    }
    enemy.hp = enemy.hp - damage;
    console.log("Does " + damage + " points of damage!");
  }

  effectAbsorb(card: CardData, action: CardAction, ally: ChinpokoData, enemy: ChinpokoData) {
    let damage = calcDamage(action.parameters.power, card.type, ally, enemy);
    if (enemy.hp < damage) {
      damage = enemy.hp;
    }
    enemy.hp = enemy.hp - damage;
    console.log("Does " + damage + " points of damage!");

    let absorb = calcAbsorb(action.parameters.percentage, card.type, ally, damage);
    if (ally.hp + absorb > ally.maxhp) {
      absorb = ally.maxhp - ally.hp;
    }
    ally.hp = ally.hp + absorb;
    console.log("Absorbs " + absorb + " points of damage!");
  }

  effectHeal(card:CardData, action: CardAction, ally: ChinpokoData) {
    let heal = calcHeal(action.parameters.percentage, card.type, ally);
    if (ally.hp + heal > ally.maxhp) {
      heal = ally.maxhp - ally.hp;
    }
    ally.hp = ally.hp + heal;
    console.log("Heals " + heal + " points of damage!");
  }

  handleNextTurnClick = () => {
    if (this.state.stage === GameStage.PLAY) {
      const allyChinpoko: ChinpokoData = {...this.props.allyTeam[this.state.allyChinpoko]};
      const enemyChinpoko: ChinpokoData = {...this.props.enemyTeam[this.state.enemyChinpoko]};
      const phaseCounters: Array<PhaseCounter> = [
      {value: allyChinpoko.spe, isAlly: true, remainingPhases: [...this.state.allyPhases]},
      {value: enemyChinpoko.spe, isAlly: false, remainingPhases: [...this.state.enemyPhases]}];
      const phaseLimit: number = Math.max(...phaseCounters.map( pc => pc.value ));

      this.setState({
        stage: GameStage.RESOLUTION,
        phaseLimit: phaseLimit
      })
      this.solveNextPhase(phaseCounters, phaseLimit, allyChinpoko, enemyChinpoko);
      this.updateTeams(allyChinpoko, enemyChinpoko);
      this.stateBasedActions(phaseCounters, allyChinpoko, enemyChinpoko);
      this.setState({
        phaseCounters: phaseCounters
      });

    } else if (this.state.stage === GameStage.RESOLUTION) {
      const phaseCounters: Array<PhaseCounter> = [...this.state.phaseCounters];
      if(phaseCounters.length > 0) {
        const allyChinpoko: ChinpokoData = {...this.props.allyTeam[this.state.allyChinpoko]};
        const enemyChinpoko: ChinpokoData = {...this.props.enemyTeam[this.state.enemyChinpoko]};
        this.solveNextPhase(phaseCounters, this.state.phaseLimit, allyChinpoko, enemyChinpoko);
        this.updateTeams(allyChinpoko, enemyChinpoko);
        this.stateBasedActions(phaseCounters, allyChinpoko, enemyChinpoko);
        this.setState({
          phaseCounters: phaseCounters,
        });
      } else {
        this.drawCards(true, 1);
        this.drawCards(false, 1);
        this.setState({
          stage: GameStage.PLAY,
          allyPhases: initPhaseGroupData(5),
          enemyPhases: initPhaseGroupData(5),
          currentPhase: null,
        })
      }
    }
  }

  updateTeams(allyChinpoko: ChinpokoData, enemyChinpoko: ChinpokoData) {
    let allyTeam = this.props.allyTeam;
    let enemyTeam = this.props.enemyTeam;
    allyTeam[this.state.allyChinpoko] = allyChinpoko;
    enemyTeam[this.state.enemyChinpoko] = enemyChinpoko;
    this.props.setTeam(allyTeam, true);
    this.props.setTeam(enemyTeam, false);
  }

  stateBasedActions(phaseCounters: Array<PhaseCounter>, allyChinpoko: ChinpokoData, enemyChinpoko: ChinpokoData) {
    if(allyChinpoko.hp <= 0) {
      this.handleChinpokoDeath(allyChinpoko, true)
    }
    if(enemyChinpoko.hp <= 0) {
      this.handleChinpokoDeath(enemyChinpoko, false)
    }
  }

  handleChinpokoDeath(chinpoko: ChinpokoData, ally: boolean) {
    console.log("RIP " + chinpoko.storedData.name);
    let team = ally ? this.props.allyTeam : this.props.enemyTeam;
    let chinpokoIndex = ally ? this.state.allyChinpoko : this.state.enemyChinpoko;
    let aliveChinpokos: Array<number> = [];
    // fill up array with alive chinpokos index
    for(let index of Object.keys(team)) {
      if (Number(index) != chinpokoIndex && team[Number(index)].hp > 0) {
        aliveChinpokos.push(Number(index));
      }
    }
    if(aliveChinpokos.length) {
      let random = Math.floor(Math.random() * aliveChinpokos.length);
      let newChinpoko: ChinpokoData = team[aliveChinpokos[random]];
      console.log("GO " + newChinpoko.storedData.name + "!");
      if (ally) {
        this.setState({
          allyChinpoko: aliveChinpokos[random]
        })
      } else {
        this.setState({
          enemyChinpoko: aliveChinpokos[random]
        })
      }

    } else {
      console.log("GAME OVER");
      this.setState({
        stage: GameStage.GAMEOVER
      })
    }
  }

  unfillPhase(isAlly: boolean, phase: PhaseData) {
    if (isAlly) {
      const myPhases: Array<PhaseData> = [...this.state.allyPhases];
      myPhases[phase.index - 1].show = true;
      this.setState({
        allyPhases: myPhases,
        currentPhase: {isAlly: true, index: phase.index}
      })
    } else {
      const myPhases: Array<PhaseData> = [...this.state.enemyPhases];
      myPhases[phase.index - 1].show = true;
      this.setState({
        enemyPhases: myPhases,
        currentPhase: {isAlly: false, index: phase.index}
      })
    }
  }

  solveNextPhase(phaseCounters: Array<PhaseCounter>, phaseLimit: number, allyChinpoko: ChinpokoData, enemyChinpoko: ChinpokoData) {
    const index: number = findHighestIndexOverLimit(phaseCounters, phaseLimit);
    if (index >= 0) {

      const phaseCounter: PhaseCounter = phaseCounters[index];
      // remove phase from counter and do its action if it exists
      let phase: PhaseData | undefined = phaseCounter.remainingPhases.shift();

      if (phase != undefined) {
        const myChinpoko: ChinpokoData = phaseCounter.isAlly ? allyChinpoko : enemyChinpoko;
        const otherChinpoko: ChinpokoData = phaseCounter.isAlly ? enemyChinpoko : allyChinpoko;
        console.log( "doing phase " + phase.index + " of chinpoko " + myChinpoko.storedData.name);

        this.unfillPhase(phaseCounter.isAlly, phase);
        if (phase.action != null && phase.instance != null) {
          let instance = phase.instance;
          let action = phase.action;
          console.log(action.effect);
          this.handleCardAction(instance, action, phaseCounter.isAlly, myChinpoko, otherChinpoko);

          if(phase.isEnd) {
            this.discardCardIfNeeded(instance.id, phaseCounter.isAlly);
          }
        }
      }
      // delete phaseCounter if no more phases, else antisum limit
      if (phaseCounter.remainingPhases.length <= 0) {
        phaseCounters.splice(index,1);
      } else {
        phaseCounter.value = phaseCounter.value - phaseLimit;
      }

    } else {
      // sum speed to each phaseCounter and try again
      for (const pc of phaseCounters) {
        const myChinpoko: ChinpokoData = pc.isAlly ? allyChinpoko : enemyChinpoko;
        pc.value = pc.value + myChinpoko.spe;
      }
      this.solveNextPhase(phaseCounters, phaseLimit, allyChinpoko, enemyChinpoko);
    }
  }

  renderField() {
    const enemyChinpoko: ChinpokoData = this.props.enemyTeam[this.state.enemyChinpoko];
    const allyChinpoko: ChinpokoData = this.props.allyTeam[this.state.allyChinpoko];
    return (
      <div className = "game-component__field">
        <Chinpoko chinpoko = {enemyChinpoko} ally={false} />
        <Engine />
        <Chinpoko chinpoko = {allyChinpoko} ally={true} />
      </div>
    );
  }

  render() {
    const allyInstances: Array<CardInstance> = this.state.allyHand.map(a => this.props.allyDeckList[a]);
    const enemyInstances: Array<CardInstance> = this.state.enemyHand.map(a => this.props.enemyDeckList[a]);
    const stage: GameStage = this.state.stage;

    return (
      <div className="game-component">
        <div className="game-component__phases">
          { <ChangeTeam stage={this.state.stage} changeTeamClick={this.handleChangeTeamClick} /> }
          { <NextTurn stage={this.state.stage} nextTurnClick={this.handleNextTurnClick} /> }
          { <PhaseGroup phases={this.state.enemyPhases} ally={false} stage={stage} currentPhase={this.state.currentPhase} /> }
          { <PhaseGroup phases={this.state.allyPhases} ally={true} stage={stage} currentPhase={this.state.currentPhase}
            onPhaseClick={this.handlePhaseClick}
            onPhaseDelete={this.deletePhaseClick} /> }
          { this.state.selectedCard &&
          <SelectedCard instance={this.state.selectedCard} deleteCardClick={this.deleteCardClick} stage={this.state.stage}/> }
        </div>
        <div className="game-component__board">
          <Hand instances={enemyInstances} ally={false} stage={stage} className="game-component__hand" />
          { this.renderField() }
          <Hand instances={allyInstances} ally={true} stage={stage} onCardClick={this.handleCardClick} className="game-component__hand"/>
        </div>
      </div>
    );
  }
}

interface NextTurnProps {
  stage: GameStage
  nextTurnClick?: () => void
}

class NextTurn extends React.Component<NextTurnProps> {
  render() {
    const text:string = this.props.stage === GameStage.RESOLUTION ? "NEXT PHASE" : "NEXT TURN";
    return (
      <div className="next-turn">
        <button className = "next-turn-button" onClick={this.props.nextTurnClick}>
          {text}
        </button>
      </div>
    )
  }
}

interface ChangeTeamProps {
  stage: GameStage
  changeTeamClick?: () => void
}

class ChangeTeam extends React.Component<ChangeTeamProps> {
  render() {
    const show = this.props.stage === GameStage.PLAY;
    return (
      <div>
      {
        show &&
        <>
        <div className="change-team">
          <button className = "change-team-button" onClick={this.props.changeTeamClick}>
            CHANGE TEAM
          </button>
        </div>
        </>
      }
      </div>
    )
  }
}