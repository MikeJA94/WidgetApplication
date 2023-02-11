import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HeadlineModel } from 'src/app/api/src/models/headline-model';
import { WidgetService } from 'src/app/api/src/services/widget.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadLinesComponent implements OnInit {

  public headlines$: Observable<HeadlineModel[]>;

  constructor(private widgetService: WidgetService) {

    this.headlines$ = this.widgetService.widgetHeadlinesGet$Json();

  }

  ngOnInit() {

  }



}
