import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {Game, Status} from '../../types/Game';
import {ConfirmService} from '../../parts/confirm/confirm.service';
import {ErrorService} from '../../parts/error/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBackup} from '../../types/IBackup';
import {GameEditorService} from './game-editor.service';
import {routs} from '../../common/navigate.constants';

@Component({
  selector: 'GameEditorComponent',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent implements OnDestroy {

  @ViewChild('consoleNameInput')
  public consoleNameInput: ElementRef<HTMLInputElement> | undefined;

  public gameName = '';
  public consoleName = '';
  public isTogether = 'false';
  public status = Status.DONE;
  public finishDate: Date | null = new Date()
  public gameId = -1;

  private gameSaveChannelSubscription: Subscription;
  private gameDeleteChannelSubscription: Subscription;
  private gameByIDChannelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private confirmService: ConfirmService,
    private gameEditorService: GameEditorService,
    private errorService: ErrorService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {

    this.gameSaveChannelSubscription = gameEditorService.gameSaveChannel.subscribe((backup: IBackup)=>{
      this.router.navigate([routs.games])
    });

    this.gameDeleteChannelSubscription = gameEditorService.gameDeleteChannel.subscribe((backup: IBackup)=>{
      this.router.navigate([routs.games])
    });

    this.gameByIDChannelSubscription = gameEditorService.gameByIDChannel.subscribe((game: Game | undefined)=>{
      if(game){
        this.consoleName = game.console;
        this.gameName = game.name;
        this.isTogether = game.isTogether.toString();
        this.status = game.status;
        this.finishDate = game.finishDate ?
          new Date(game.finishDate) :
          game.status === 'Done' ?
            new Date():
            null
      }
    });

    this.routeSubscription = activateRoute.params.subscribe(
      (params) => {
        if(params['id']) {
          this.gameId = params['id']
          this.gameEditorService.gameByIDChannel.next(this.gameId)
        } else {
          this.gameId = -1
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.gameDeleteChannelSubscription.unsubscribe();
    this.gameSaveChannelSubscription.unsubscribe();
    this.gameByIDChannelSubscription.unsubscribe()
  }

  onDelete() {
    this.confirmService.openConfirmDialog(
      'Do you want to delete game?'
    ).subscribe(() => {
      if(this.confirmService.isConfirm) {
        this.gameEditorService.gameDeleteChannel.next(this.gameId)
      }
    });
  }

  onSave() {
    if(this.gameName === '' || this.consoleName === '') {
      this.errorService.errorChannel.next('Name or consoles is empty!');
      return;
    }

    if(this.gameId !== -1) {
      this.confirmService.openConfirmDialog(
        'Do you want to change game?'
      ).subscribe(() => {
        if(this.confirmService.isConfirm) {
          this.gameEditorService.gameSaveChannel.next({
            id: this.gameId,
            name: this.gameName,
            console: this.consoleName,
            isTogether: this.isTogether === 'true',
            status: this.status,
            finishDate: this.status === Status.DONE ?
              this.finishDate ? this.finishDate.getTime() : null :
              null
          })
        }
      });
    } else {
      this.gameEditorService.gameSaveChannel.next({
        id: 0,
        name: this.gameName,
        console: this.consoleName,
        isTogether: this.isTogether === 'true',
        status: this.status,
        finishDate: this.status === 'Done' ?
          this.finishDate ? this.finishDate.getTime() : null :
          null
      })
    }
  }

  onChangeStatus(newStatus: Status) {
    if(newStatus === 'Done') {
      this.finishDate = this.finishDate || new Date()
    }
    this.status = newStatus
  }

  cancel() {
      this.router.navigate([routs.games])
  }
}
