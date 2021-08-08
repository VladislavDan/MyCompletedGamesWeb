import {Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';

import {Game} from '../../types/Game';
import {Observable, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ConfirmService} from '../confirm/confirm.service';
import {ErrorService} from '../error/error.service';
import {InitializationDataService} from '../../common/services/initialization-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Backup} from '../../types/Backup';
import {GameEditorService} from './game-editor.service';
import {routs} from '../../common/navigate.constants';
import {SpinnerService} from '../spinner/spinner.service';

@Component({
  selector: 'GameEditorComponent',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent implements OnDestroy {

  @Input()
  public editedGame: Game | null = null;

  @ViewChild('consoleNameInput')
  public consoleNameInput: ElementRef<HTMLInputElement> | undefined;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public gameName = '';
  public consoleName = '';
  public isTogether = 'false';
  public status = 'Done';

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

    this.gameSaveChannelSubscription = gameEditorService.gameSaveChannel.subscribe((backup: Backup)=>{
      this.router.navigate([routs.games])
    });

    this.gameDeleteChannelSubscription = gameEditorService.gameDeleteChannel.subscribe((backup: Backup)=>{
      this.router.navigate([routs.games])
    });

    this.gameByIDChannelSubscription = gameEditorService.gameByIDChannel.subscribe((game: Game)=>{
      this.editedGame = game;
      if(this.editedGame){
        this.consoleName = this.editedGame.console;
        this.gameName = this.editedGame.name;
        this.isTogether = this.editedGame.isTogether.toString();
        this.status = this.editedGame.status;
      }
    });

    this.routeSubscription = activateRoute.params.subscribe(
      (params) => {
        this.gameEditorService.gameByIDChannel.next(params['id'])
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
        this.gameEditorService.gameDeleteChannel.next(this.editedGame)
      }
    });
  }

  onSave() {
    if(this.gameName === '' || this.consoleName === '') {
      this.errorService.errorChannel.next('Name or consoles is empty!');
      return;
    }

    if(this.editedGame) {
      this.confirmService.openConfirmDialog(
        'Do you want to change game?'
      ).subscribe(() => {
        if(this.confirmService.isConfirm) {
          this.gameEditorService.gameSaveChannel.next({
            ...this.editedGame,
            name: this.gameName,
            console: this.consoleName,
            isTogether: this.isTogether === 'true',
            status: this.status
          })
        }
      });
    } else {
      this.gameEditorService.gameSaveChannel.next({
        name: this.gameName,
        console: this.consoleName,
        isTogether: this.isTogether === 'true',
        status: this.status
      })
    }
  }

  cancel() {
      this.router.navigate([routs.games])
  }
}
