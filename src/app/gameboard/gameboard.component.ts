import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  board = [
  [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Block, new Grass, new Block, new Block, new Block, new Block, new Block],
  [ new Block, new Block, new Block, new Grass, new Grass, new Grass, new Block, new Block, new Block, new Block],
  [ new Grass, new Grass, new Grass, new Grass, new Grass, new Grass, new Grass, new Grass, new Grass, new Grass],
  ];

  character = new Character;

  constructor() {
    // this.character.moveLeft();
   }

  ngOnInit() {
  }

}

class Block {
  color = 'white';
  class = '';
}

class Grass extends Block {
  color = 'green';
  class = '';
}

class Character extends Block {
  color = 'white';
  class = 'character';
  pos = {
    x: 2,
    y: 3
  };

  set x(value) {
    this.pos.x = value;
  }

  set y(value) {
    this.pos.x = value;
  }

  moveRight() {
    this.pos.x++;
  }

  moveLeft() {
    this.pos.x--;
  }

  get x() {
    return this.pos.x - 1; // 0 base
  }
  get y() {
    return 10 - this.pos.y; // Invert and 0 base
  }

}
