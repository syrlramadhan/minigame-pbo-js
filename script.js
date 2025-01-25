class SnakeGame {
    constructor(canvas, speed = 170) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.gridSize = 20;
      this.snake = [{ x: 5, y: 5 }];
      this.direction = "RIGHT";
      this.food = this.generateFood();
      this.score = 0;
      this.speed = speed;
      this.interval = null;
  
      this.resizeCanvas();
      window.addEventListener("resize", this.resizeCanvas.bind(this));
      document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }
  
    resizeCanvas() {
      this.canvas.width = 1900;
      this.canvas.height = 945;
      this.food = this.generateFood();
      this.draw();
    }
  
    start() {
      this.interval = setInterval(() => this.update(), this.speed);
    }
  
    handleKeyPress(event) {
      const directions = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };
  
      const newDirection = directions[event.key];
      if (newDirection && this.isValidDirectionChange(newDirection)) {
        this.direction = newDirection;
      }
    }
  
    isValidDirectionChange(newDirection) {
      const oppositeDirections = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };
  
      return oppositeDirections[newDirection] !== this.direction;
    }
  
    generateFood() {
      const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
      const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
      return { x, y };
    }
  
    update() {
      const head = { ...this.snake[0] };
  
      switch (this.direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }
  
      if (this.isCollision(head)) {
        alert(`Game Over! Your score: ${this.score}`);
        clearInterval(this.interval);
        return;
      }
  
      this.snake.unshift(head);
  
      if (head.x === this.food.x && head.y === this.food.y) {
        this.score++;
        this.food = this.generateFood();
      } else {
        this.snake.pop();
      }
  
      this.draw();
    }
  
    isCollision(head) {
      return (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= this.canvas.width / this.gridSize ||
        head.y >= this.canvas.height / this.gridSize ||
        this.snake.some(segment => segment.x === head.x && segment.y === head.y)
      );
    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Draw border
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 5;
      this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Draw snake
      this.snake.forEach(segment => {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(
          segment.x * this.gridSize,
          segment.y * this.gridSize,
          this.gridSize,
          this.gridSize
        );
      });
  
      // Draw food
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.food.x * this.gridSize,
        this.food.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
  
      // Draw score
      this.ctx.fillStyle = "black";
      this.ctx.font = "16px Arial";
      this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    }
  }
  
  // Usage Example
  const canvas = document.getElementById("gameCanvas");
  const game = new SnakeGame(canvas);
  game.start();
  