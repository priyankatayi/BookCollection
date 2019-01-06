import { Component, OnInit } from '@angular/core';
import { SearchBookService } from './search-book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { BookData } from '../models/bookData.model';
import { BookCollection } from '../models/bookCollection.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  _id: string;
  errorMsg: string;
  bookDetails: any;
  exists = false;
  public books: any[];
  public booksID = [];
  constructor(private af: AngularFireDatabase,
    private _searchBookService: SearchBookService, private _actiavtedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this._actiavtedRoute.paramMap.subscribe(params => {
      this._id = params.get('id');
      console.log('id in bookdetails', this._id);
      this._searchBookService.viewData(this._id).subscribe(data => {
        this.bookDetails = data;
        console.log('bookdetails', this.bookDetails);
      },
        (err: any) => {
          this.errorMsg = err;
          console.log('err in book details', err);
        }
      );
    });
  }
  addToCollection(bookDetails): any {
    this._searchBookService.getBooksID().subscribe(
      data => {
        this.booksID = data as any[];
        this.booksID.forEach(id => {
          console.log('id', id, 'bookId', bookDetails.id);
          if (id === bookDetails.id) {
            this.exists = true;
            return true;
          }
        });
        if (this.exists) {
          this.router.navigate(['/notfound'],
          { queryParams: { 'errMsg': 'This book already exists in your collection.' }, skipLocationChange: true });
          return true;
        } else {
          this._searchBookService.insertData(bookDetails);
          this.router.navigate(['/collection']);
        }
      }, (err: any) => {
        console.log('err in my collection', err);
      });
  }
}
