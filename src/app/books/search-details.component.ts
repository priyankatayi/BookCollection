import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BookData } from '../models/bookData.model';
import { VolumeInfo } from '../models/VolumeInfo.model';
import {Items} from '../models/items.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit, OnChanges {
  setFlag = true;
  @Input()
  searchBox: string;
  private empData;
  @Input()
  set searchData(val: BookData) {
    this.empData = '';
    this.empData = val;
    this.empData = this.searchData['items'];
    console.log('searchresults', this.empData);
  }
  get searchData(): BookData {
    return this.empData;
  }
  constructor(private _router: Router) { }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
      if (changes['searchBox'].currentValue === '') {
          this.empData = '';
          this.setFlag = false;
          console.log(this.setFlag);
      } else {
        this.setFlag = true;
        console.log(this.setFlag);
    }
  }
  bookDetails(data) {
    const id = data['id'];
    this._router.navigate(['/details', id], {queryParams: {'searchTerm': this.searchBox}});
    console.log('output Data', data['id']);
  }
}
