import { BookCollection } from '../models/bookCollection.model';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import { SearchBookService } from './search-book.service';

@Injectable()
export class CollectionListResolverService implements Resolve<BookCollection[]> {
    public favBooks: BookCollection[];
    constructor(private _searchBookService: SearchBookService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookCollection[]> {
        console.log(this._searchBookService.getBookData().subscribe(
                 data => { this.favBooks = data as BookCollection[];
                  console.log('Hell', this.favBooks.length); } )
            );
        return this._searchBookService.getBookData();
    }
}
