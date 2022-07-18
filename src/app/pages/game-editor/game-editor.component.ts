import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {IGame, Status} from '../../common/types/IGame';
import {ConfirmService} from '../../parts/confirm/confirm.service';
import {ErrorService} from '../../parts/error/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBackup} from '../../common/types/IBackup';
import {GameEditorService} from './game-editor.service';
import {routs} from '../../common/navigate.constants';

@Component({
  selector: 'game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent implements OnDestroy {

  public gameName = '';
  public consoleName = '';
  public isTogether = 'false';
  public status = Status.DONE;
  public finishDate: Date | null = new Date()
  public gameId = -1;

  private subscription: Subscription = new Subscription();

  constructor(
    private confirmService: ConfirmService,
    private gameEditorService: GameEditorService,
    private errorService: ErrorService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {

    this.subscription.add(gameEditorService.gameSaveChannel.subscribe((backup: IBackup)=>{
      this.router.navigate([routs.games])
    }));

    this.subscription.add(gameEditorService.gameDeleteChannel.subscribe((backup: IBackup)=>{
      this.router.navigate([routs.games])
    }));

    this.subscription.add(gameEditorService.gameByIDChannel.subscribe((game: IGame | undefined)=>{
      if(game){

        let finishDate

        if(game.finishDate) {
          finishDate = new Date(game.finishDate);
        } else {
          if(game.status === 'Done') {
            finishDate = new Date(game.id * 1);
          } else {
            finishDate = new Date();
          }
        }

        this.consoleName = game.console;
        this.gameName = game.name;
        this.isTogether = game.isTogether.toString();
        this.status = game.status;
        this.finishDate = finishDate
      }
    }));

    this.subscription.add(activateRoute.params.subscribe(
      (params) => {
        if(params['id']) {
          this.gameId = Number(params['id'])
          this.gameEditorService.gameByIDChannel.next(this.gameId)
        } else {
          this.gameId = -1
        }
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
            finishDate: this.status === Status.DONE ? this.finishDate?.getTime() : null
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
