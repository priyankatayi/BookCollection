import { Component, OnInit } from '@angular/core';
import { SearchBookService } from './search-book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookData } from '../models/bookData.model';
import { VolumeInfo } from '../models/VolumeInfo.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  private _searchBox: string;
  bookData: BookData;
  searchTerm: String;
  get searchBox(): string {
    return this._searchBox;
  }
  set searchBox(value: string) {
    this._searchBox = value;
  }
  errorMsg: string;
  constructor(private _searchBookService: SearchBookService, private _activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    if (this._activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
      this._activatedRoute.queryParamMap.subscribe(params => {
        this.searchBox = params.get('searchTerm');
        console.log('search Value', this.searchBox);
        this._searchBookService.getData(this.searchBox).subscribe(
          data => {
            this.bookData = data;
            console.log('BookData in url', this.bookData);
          }, (err: any) => {
            this.errorMsg = err;
            console.log('err in serach book onit', err);
          }
        );
      });
    }
  }

  getBookDetails(): any {
    this.bookData = null;
    if (this.searchBox !== '') {
      return this._searchBookService.getData(this.searchBox).subscribe(
        data => {
          // const title = data['items'][0]['volumeInfo'].title ? data['items'][0]['volumeInfo'].title : 'N/A';
          // const description = data['items'][0]['volumeInfo'].description ? data['items'][0]['volumeInfo'].description : 'N/A';
          // const averageRating = data['items'][0]['volumeInfo'].averageRating ? data['items'][0]['volumeInfo'].averageRating : 'N/A';
          // const authors = data['items'][0]['volumeInfo'].authors ? data['items'][0]['volumeInfo'].authors[0] : 'N/A';
          // console.log('Title is :', title);
          // console.log('Descrption is', description);
          // console.log('Rating', averageRating);
          // console.log('Author', authors);
          this.bookData = data;
          console.log('BookData is', this.bookData);
        }, (err: any) => {
          this.errorMsg = err;
          console.log('err in search book get data', err);
        });
    }
  }
}
