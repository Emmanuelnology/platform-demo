import { Component, ViewChild, HostListener } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard.component';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(GameboardComponent) gameBoard;
  title = 'platform';

  moveRight() {
    this.gameBoard.character.moveRight();
  }

  moveLeft() {
    this.gameBoard.character.moveLeft();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.moveRight();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.moveLeft();
    }
  }

}
