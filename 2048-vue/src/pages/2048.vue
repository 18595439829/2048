<template>
  <div class="2048">
    <header>
      <h1>2048</h1>
      <a @click="newGame"
         id="newgamebutton">New Game</a>
      <p>
        score:<span id="score">0</span>
      </p>
    </header>
    <div id="grid-container">
      <div class="grid-cell"
           id="grid-cell-0-0"></div>
      <div class="grid-cell"
           id="grid-cell-0-1"></div>
      <div class="grid-cell"
           id="grid-cell-0-2"></div>
      <div class="grid-cell"
           id="grid-cell-0-3"></div>

      <div class="grid-cell"
           id="grid-cell-1-0"></div>
      <div class="grid-cell"
           id="grid-cell-1-1"></div>
      <div class="grid-cell"
           id="grid-cell-1-2"></div>
      <div class="grid-cell"
           id="grid-cell-1-3"></div>

      <div class="grid-cell"
           id="grid-cell-2-0"></div>
      <div class="grid-cell"
           id="grid-cell-2-1"></div>
      <div class="grid-cell"
           id="grid-cell-2-2"></div>
      <div class="grid-cell"
           id="grid-cell-2-3"></div>

      <div class="grid-cell"
           id="grid-cell-3-0"></div>
      <div class="grid-cell"
           id="grid-cell-3-1"></div>
      <div class="grid-cell"
           id="grid-cell-3-2"></div>
      <div class="grid-cell"
           id="grid-cell-3-3"></div>
    </div>
    <div id="gameover">
      GAME OVER
    </div>
  </div>
</template>
<script>
import main from '../assets/js/main2048'
export default {
  methods: {
    newGame() {
      main.newgame()
    }
  },
  mounted() {
    main.newgame()
  },
}
</script>

<style lang="less">
@import '../assets/css/index.css';
</style>

