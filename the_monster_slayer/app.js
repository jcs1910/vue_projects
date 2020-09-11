new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    logs: [],
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = true;
      this.logs = [];
    },
    attack() {
      const damage = this.calculateDamate(3, 10);
      this.monsterHealth -= damage;
      this.logs.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`
      })
      if(this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack() {
      const damage = this.calculateDamate(10, 20);
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      this.logs.unshift({
        isPlayer: false,
        text: `Player hits Monster hard for ${damage}`
      })

      this.monsterAttack();
    },
    monsterAttack() {
      const damage = this.calculateDamate(5, 12);
      this.playerHealth -= damage;
      this.checkWin()
      this.logs.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      })
    },
    calculateDamate(min, max) {
      return Math.max(Math.floor(Math.random() * max + 1), min);
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10
        this.logs.unshift({
          isPlayer: true,
          text: `Player heals 10`
        })

        this.monsterAttack();
      } else {
        this.playerHealth = 100;
      }
    },
    giveUp() {
      if (confirm('Are you really want to give up? Think Twice!!')) {
        this.gameIsRunning = false;
        this.logs = [];
      }
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won!! Do you want to play again?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost!! Do you want to play again?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false
    } 
  }
})