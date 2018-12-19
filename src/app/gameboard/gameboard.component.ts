import { Component, OnInit, HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  UP_ARROW = 38,
  LEFT_ARROW = 37,
  SPACE = 32
}

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {
  allowKeyInput = true;
  board = new Board;
  character = new Character(this.board);


  ngOnInit() {}

  moveCharacterRight() {
    this.character.moveRight();
  }

  moveCharacterLeft() {
    this.character.moveLeft();
  }

  jump() {
    this.character.jump();
  }


  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (!event.repeat) {
    if (event.keyCode === KEY_CODE.SPACE) {
      this.jump();
    }

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.moveCharacterRight();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.moveCharacterLeft();
    }
  }
  }

}

class Block {
  color = 'white';
  class = '';
  isSolid = false;
  pos = {
    x: 0,
    y: 0
  };


  constructor(protected gameBoard = null) {

  }
}

class GravityBlock extends Block {
  isVisible = true;
  fall() {
      setTimeout(() => {
        if (this.canMoveDown()) {
          this.pos.y++;
          if (this.pos.y > 10) {
            this.destroy();
          }
          this.fall();
        }
        }, 100);
  }

  destroy() {
    this.isVisible = false;
  }

  canMoveDown() {
    if (this.pos.y === 9) {
      this.destroy();
      return false;
    }
    const targetBlock = this.gameBoard.getBlock(this.pos.x, this.pos.y + 1);
    return !targetBlock.isSolid;
  }

  constructor(protected gameBoard) {
    super(gameBoard);
    this.fall();
  }
}

class Grass extends Block {
  color = 'green';
  class = '';
  isSolid = true;
}

class Rock extends Block {
  image = 'rock.png';
  class = '';
  isSolid = true;
}

class Tree extends Block {
  image = 'tree.jpg';
  class = '';
  isSolid = true;
}

class Character extends GravityBlock {
  color = 'white';
  class = 'character';


  canMoveRight() {
    if (this.pos.x === 9) {
      return false;
    }
    const targetBlock = this.gameBoard.getBlock(this.pos.x + 1, this.pos.y);
    return !targetBlock.isSolid;
  }

  canMoveLeft() {
    if (this.pos.x === 0) {
      return false;
    }
    const targetBlock = this.gameBoard.getBlock(this.pos.x - 1, this.pos.y);
    return !targetBlock.isSolid;
  }

  moveRight() {
    if (this.canMoveRight()) {
      this.pos.x++;
      this.fall();
    }
  }

  moveLeft() {
    if (this.canMoveLeft()) {
      this.pos.x--;
      this.fall();
    }

  }

  jump() {
      this.pos.y--;
      setTimeout(() => {
        this.fall();
      }, 200);
  }

}


export class Board {
  grid = [
    [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [ new Block, new Block, new Block, new Block, new Tree, new Block, new Block, new Rock , new Block, new Block],
    [ new Block, new Grass, new Block, new Grass, new Grass, new Grass, new Block, new Grass, new Block, new Block],
    [ new Grass, new Grass, new Block, new Block, new Block, new Block, new Block , new Grass, new Grass, new Grass],
    ];

    getBlock(x: number, y: number) {
      return this.grid[y][x];
    }

}
