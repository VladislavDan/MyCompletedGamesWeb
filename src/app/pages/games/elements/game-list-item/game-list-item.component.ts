import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IGame} from '../../../../common/types/IGame';
import {EStatus} from '../../../../common/types/EStatus';
import {GamesService} from '../../games.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListItemComponent implements OnInit {

  private subscription: Subscription;
  @Input()
  public game: IGame = {
    console: '',
    id: -1,
    isTogether: true,
    name: '',
    status: EStatus.DONE
  };

  @Output()
  public editGameRequest = new EventEmitter<number>();
  public imageUrl: string = '';

  constructor(private gameService: GamesService) {
    this.subscription = gameService.imageLoadChannel.subscribe((url: string) => {
      this.imageUrl = url;
    })
  }

  ngOnInit() {
    this.gameService.imageLoadChannel.next(`${this.game.name} ${this.game.console}`)
  }

  onEditGame(gameID: number) {
      this.editGameRequest.emit(gameID);
  }
}
