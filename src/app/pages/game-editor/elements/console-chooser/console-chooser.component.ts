import {Component, ElementRef, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {InitializationDataService} from '../../../../common/services/initialization-data.service';

@Component({
  selector: 'ConsoleChooserComponent',
  templateUrl: './console-chooser.component.html',
  styleUrls: ['./console-chooser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleChooserComponent {

  @ViewChild('consoleNameInput')
  public consoleNameInput: ElementRef<HTMLInputElement> | undefined;

  @Input()
  public consoleName: string = '';

  @Output()
  public consoleNameChange = new EventEmitter<string>();

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public consolesNamesControl = new FormControl();
  public filteredConsolesNames: Observable<string[]>;

  constructor(
    private initializationDataService: InitializationDataService,
  ) {

    this.filteredConsolesNames = this.consolesNamesControl.valueChanges.pipe(
      startWith(null),
      map((consoleName: string | null) => {
        return consoleName
          ? this.filterConsolesNames(consoleName)
          : this.initializationDataService.allConsolesName.slice()
      }));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.consoleName = value;
      this.consoleNameChange.emit(this.consoleName);
    }

    event.chipInput!.clear();

    this.consolesNamesControl.setValue(null);
  }

  remove(): void {
    this.consoleName = '';
    this.consoleNameChange.emit(this.consoleName);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.consoleName = event.option.viewValue;
    this.consoleNameChange.emit(this.consoleName);

    if (this.consoleNameInput) {
      this.consoleNameInput.nativeElement.value = '';
    }

    this.consolesNamesControl.setValue(null);
  }

  private filterConsolesNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredConsoleNames = this.initializationDataService.allConsolesName.filter((consoleName: string) => {
        return consoleName.toLowerCase().includes(filterValue)
      }
    );

    if(filteredConsoleNames.length === 0) {
      return [value];
    }

    return filteredConsoleNames;
  }
}
