import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Items } from '../models/items.model';
import { BookData } from '../models/bookData.model';
import { BookCollection } from '../models/bookCollection.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { VolumeInfo } from '../models/VolumeInfo.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


@Injectable()
export class SearchBookService {
  // tslint:disable-next-line:max-line-length
  baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  // tslint:disable-next-line:max-line-length
  parameterUrl = '&key=AIzaSyDNBPvCZ6VSFOvlWdOEJ6D3RJvpe9sIfkA&fields=items(id,volumeInfo(title,authors,description,averageRating,imageLinks))';
  public data;
  private viewUrl;
  public code;
  bookList: AngularFireList<any>;
  selectedBook: BookCollection = new BookCollection();
  constructor(private _http: HttpClient, private db: AngularFireDatabase) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('client error', errorResponse);
    } else {
      console.error('server error', errorResponse);
    }
    if (errorResponse.status) {
      this.code = errorResponse.status;
    }
    return new ErrorObservable(this.code ? this.code + ' ERROR' : 'There is an issue with the service');
  }
  // to get books data from Google books API based on search tearm
  getData(searchBoxValue): Observable<BookData> {
    searchBoxValue = searchBoxValue;
    this.data = this._http.get<BookData>(`${this.baseUrl}/${searchBoxValue}/${this.parameterUrl}`).pipe(catchError(this.handleError));
    console.log('getData method in service', this.data);
    return this.data;
  }

  // to get a specific book data from Google Books API based on id of the book
  viewData(id: string): Observable<BookData> {
    this.viewUrl = 'https://www.googleapis.com/books/v1/volumes';
    this.data = this._http.get<BookData>(`${this.viewUrl}/${id}`).pipe(catchError(this.handleError));
    console.log('viewData', this.data);
    return this.data;
  }

  // to get book data from firebase as a firebase list
  getDataFromFirebaase(): AngularFireList<BookCollection[]> {
    this.bookList = this.db.list('/favBooks');
    console.log('bookList', this.bookList);
    return this.bookList;
  }
  // to read book data from firebase as an observable
  getBookData(): Observable<BookCollection[]> {
    const returnArr = [];
    this.db.database.ref('/favBooks').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
      });
    });
    console.log('value is data: ', returnArr.length);
    return Observable.of(returnArr);
  }

  // to read book id from firebase as an observable
  getBooksID(): Observable<any[]> {
    const booksID = [];
    this.db.database.ref('/favBooks').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const item = childSnapshot.val();
        booksID.push(item.id);
      });
    });
    console.log('value is ids: ', booksID);
    return Observable.of(booksID).delay(2000);
  }

  // to insert a book data into firebase database
  insertData(data: Items) {
    this.getDataFromFirebaase();
    console.log('data in insert', data);
    this.bookList.push({
      id: data.id,
      title: data['volumeInfo'].title,
      description: data['volumeInfo'].description ? data['volumeInfo'].description : 'N/A',
      authors: data['volumeInfo'].authors ? data['volumeInfo'].authors[0] : 'N/A',
      image: data['volumeInfo'].imageLinks ? data['volumeInfo'].imageLinks['thumbnail'] : 'N/A',
      averageRating: data['volumeInfo'].averageRating ? data['volumeInfo'].averageRating : 'N/A'
    });
  }

  // to delete a book from firebase database
  deleteBook($key: string) {
    console.log('key is', $key, this.bookList);
    this.bookList.remove($key);
  }
}
