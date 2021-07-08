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
import {InitializationDataService} from '../../../../common/services/initialization-data.service';

@Component({
  selector: 'GameEditorComponent',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent {

  @Input()
  public isShowDeleteButton: boolean = false;
  @Input()
  public editedGame: Game | null = null;

  @ViewChild('consoleNameInput')
  public consoleNameInput: ElementRef<HTMLInputElement> | undefined;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public gameName = '';
  public consoleName = '';
  public isTogether = 'false';
  public isOpened = false;

  public consolesNamesControl = new FormControl();
  public filteredConsolesNames: Observable<string[]>;

  constructor(
    private confirmService: ConfirmService,
    private gamesService: GamesService,
    private errorService: ErrorService,
    private initializationDataService: InitializationDataService
  ) {

    this.filteredConsolesNames = this.consolesNamesControl.valueChanges.pipe(
      startWith(null),
      map((consoleName: string | null) => consoleName ? this.filterConsolesNames(consoleName) : this.initializationDataService.allConsolesName.slice()));
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
    this.confirmService.openConfirmDialog(
      'Do you want to delete game?'
    ).subscribe(() => {
      if(this.confirmService.isConfirm) {
        this.gamesService.gameDeleteChannel.next(this.editedGame)
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
          this.gamesService.gameSaveChannel.next({
            ...this.editedGame,
            name: this.gameName,
            console: this.consoleName,
            isTogether: this.isTogether === 'true'
          })
        }
      });
    } else {
      this.gamesService.gameSaveChannel.next({
        name: this.gameName,
        console: this.consoleName,
        isTogether: this.isTogether === 'true'
      })
    }
  }

  opened() {
    if(this.editedGame){
      this.consoleName = this.editedGame.console;
      this.gameName = this.editedGame.name;
      this.isTogether = this.editedGame.isTogether.toString();
    }
    this.isOpened = true;
  }

  closed() {
    this.isOpened = false
  }

  private filterConsolesNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.initializationDataService.allConsolesName.filter(consoleName => consoleName.toLowerCase().includes(filterValue));
  }
}
