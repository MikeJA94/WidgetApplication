import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { LocalResourceModel } from 'src/app/api/src/models';
import { WidgetService } from 'src/app/api/src/services/widget.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  public searchResults: LocalResourceModel[] = [];
  public searchResultsFile: LocalResourceModel[] = [];
  public searchResultsApp: LocalResourceModel[] = [];
  public searchKey: string = '';
  private debounceTime = 500;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private widgetService: WidgetService) {


  }

  ngOnInit() {


  }

  ngAfterViewInit(): void {

    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(this.debounceTime), // breath time
        distinctUntilChanged(),
      ).subscribe((searchValue) => {
        this.searchKey = searchValue;
        this.getResults();
      });

  }


  getResults() {
    const sub = this.widgetService.widgetLocalresourcesGet$Json({ searchKey: this.searchKey }).subscribe((results) => {
      if (sub) {
        sub.unsubscribe();
      }

      this.searchResults = results;
      this.searchResultsFile = this.searchResults.filter(r => r.type === 0);
      this.searchResultsApp = this.searchResults.filter(r => r.type === 1);

    });

  }


}
