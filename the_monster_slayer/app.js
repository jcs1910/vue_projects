new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = true;
    },
    attack() {
      this.monsterHealth -= this.calculateDamate(3, 10);
      if(this.checkWin()) {
        return;
      }

      this.playerHealth -= this.calculateDamate(5, 12);
      this.checkWin()
    },
    calculateDamate(min, max) {
      return Math.max(Math.floor(Math.random() * max + 1), min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won!! Do you want to play again?')) {
          this.gameIsRunning = false;
          return true
        }
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost!! Do you want to play again?')) {
          this.gameIsRunning = false;
          return true
        }
      }
      return false
    } 
  }
})