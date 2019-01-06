import { Component, OnInit } from '@angular/core';
import { SearchBookService } from './search-book.service';
import { BookCollection } from '../models/bookCollection.model';
import { Items } from '../models/items.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-book-collection',
  templateUrl: './my-book-collection.component.html',
  styleUrls: ['./my-book-collection.component.css']
})
export class MyBookCollectionComponent implements OnInit {
  public favBooks: BookCollection[];
  constructor(private _route: ActivatedRoute, private _searchBookService: SearchBookService) {
    // this.favBooks = this._route.snapshot.data['collectionList'];
    // console.log('observable data:', this.favBooks.length);
  }
  ngOnInit() {
    console.log('in collection');
    this._searchBookService.getDataFromFirebaase();
    this.dataDisplay();
  }

  dataDisplay() {
    this._searchBookService.getBookData().subscribe(
      data => {
        this.favBooks = data as BookCollection[];
      }, (err: any) => console.log('err in my collection', err));
  }

  removeFromCollection(key: string) {
    console.log('key in book collection', key);
    if (confirm('Do you want to remove this book ?')) {
      this._searchBookService.deleteBook(key);
      this.dataDisplay();
    }
  }
}
