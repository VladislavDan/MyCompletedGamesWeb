import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';

import {Game} from '../../../../types/Game';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ConfirmService} from '../../../confirm/confirm.service';
import {GamesService} from '../../games.service';
import {ErrorService} from '../../../error/error.service';

@Component({
  selector: 'GameEditorComponent',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameEditorComponent implements OnChanges {

  @Input()
  public games: Game[] = [];
  @Input()
  public isShowDeleteButton: boolean = false;
  @Input()
  public editedGame: Game | null = null;

  @ViewChild('consoleNameInput')
  public consoleNameInput: ElementRef<HTMLInputElement> | undefined;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public gameName = '';
  public consoleName = '';
  public consolesNamesControl = new FormControl();
  public filteredConsolesNames: Observable<string[]>;
  public allConsolesName: string[] = [];
  public isEditorOpened = false;

  constructor(private confirmService: ConfirmService, private gamesService: GamesService, private errorService: ErrorService) {

    this.filteredConsolesNames = this.consolesNamesControl.valueChanges.pipe(
      startWith(null),
      map((consoleName: string | null) => consoleName ? this.filterConsolesNames(consoleName) : this.allConsolesName.slice()));
  }

  ngOnChanges() {

    if(this.editedGame){
      this.consoleName = this.editedGame.console;
      this.gameName = this.editedGame.name;
    }

    this.games.forEach((game: Game) => {
      if(!this.allConsolesName.includes(game.console)) {
        this.allConsolesName.push(game.console)
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.consoleName = value;
    }

    event.chipInput!.clear();

    this.consolesNamesControl.setValue(null);
  }

  remove(): void {
    this.consoleName = ''
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.consoleName = event.option.viewValue;

    if(this.consoleNameInput) {
      this.consoleNameInput.nativeElement.value = '';
    }

    this.consolesNamesControl.setValue(null);
  }

  onDelete() {
      this.confirmService.confirmationResultChannel.subscribe((confirmResult: boolean) => {
        if(confirmResult) {
          this.gamesService.gameDeleteChannel.next(this.editedGame)
        }
      });
      this.confirmService.openConfirmDialogChannel.next('Do you want to delete game?')
  }

  onSave() {

    if(this.gameName === '' || this.consoleName === '') {
      this.errorService.errorChannel.next('Name or consoles is empty!')
    }

    if(this.editedGame) {
      this.confirmService.confirmationResultChannel.subscribe((confirmResult: boolean) => {
        if(confirmResult) {
          this.gamesService.gameSaveChannel.next({...this.editedGame, name: this.gameName, console: this.consoleName})
        }
      });
      this.confirmService.openConfirmDialogChannel.next('Do you want to change game?')
    } else {
      this.gamesService.gameSaveChannel.next({
        name: this.gameName,
        console: this.consoleName
      })
    }
  }

  opened() {
    this.isEditorOpened = true;
    if(this.editedGame){
      this.consoleName = this.editedGame.console;
      this.gameName = this.editedGame.name;
    }
  }

  closed() {

  }

  private filterConsolesNames(value: string): string[] {
    this.isEditorOpened = false;
    const filterValue = value.toLowerCase();

    return this.allConsolesName.filter(consoleName => consoleName.toLowerCase().includes(filterValue));
  }
}
