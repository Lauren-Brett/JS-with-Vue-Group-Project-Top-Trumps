<template>
  <div>
    <h1 class="main-header">Top Trumps Card Game</h1>
    <h2 class="title">Choose a deck:</h2>
    <ul class="deck-wrapper">
      <li
        class="flex-decks"
        v-on:click="handleDeckSelect(index)"
        v-for="(deck, index) in decks"
        :class="deckSelectedIndex === index ? 'selected-game-option' : '' "
      >
        <img class="deck-back" :src="deck.deckImageURL" />
        <p>{{deck.name}}</p>
      </li>
    </ul>
    <h2 class="title">Who do you want to play:</h2>
    <ul class="game-type-wrapper">
      <li
        v-on:click="handleGameSelect('player-player')"
        :class="gameType === 'player-player' ? 'selected-game-option' : '' "
      >Play a Friend</li>
      <li
        v-on:click="handleGameSelect('player-computer')"
        :class="gameType === 'player-computer' ? 'selected-game-option' : '' "
      >Play the Computer</li>
    </ul>
    <div class="game-selected">
      <button v-on:click="handleGameOptions()" type="button">PLAY!</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  props: ["decks"],
  data() {
    return {
      gameType: null,
      deckSelected: null,
      deckSelectedIndex: null,
      deckDescriptions: null
    };
  },
  methods: {
    // stores deck information in variables
    handleDeckSelect(index) {
      this.deckSelected = this.decks[index].deck;
      this.deckSelectedIndex = index;
      this.deckDescriptions = this.decks[index].descriptions;
    },
    handleGameSelect(gameType) {
      this.gameType = gameType;
    },

    // emits the game options so can be sent up to App.vue and passed down
    handleGameOptions() {
      if (this.gameType && this.deckSelected) {
        eventBus.$emit("game-options-selected", {
          gameType: this.gameType,
          deck: this.deckSelected,
          descriptions: this.deckDescriptions
        });
      }
    }
  }
};
</script>

<style scoped>
.deck-back {
  width: 200px;
  height: 300px;
  border-radius: 10px;
}

.selected-game-option {
  border: 4px solid #43bbf2;
}

.game-type-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style-type: none;
  justify-content: center;
  padding-inline-start: 0px;
  grid-gap: 50px;
  margin-top: 20px;
}

.game-type-wrapper > li {
  text-align: center;
  width: 125px;
  height: 65px;
  border: 2px solid black;
  padding: 10px;
  padding-top: 20px;
  box-shadow: 10px 10px 5px 0px;
  background-color: #e36556;
  border-radius: 5px;
}

.game-type-wrapper > li:hover {
  cursor: pointer;
}
</style>
