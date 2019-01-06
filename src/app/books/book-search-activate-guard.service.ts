import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { SearchBookService } from './search-book.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookSearchActivateGuardService implements CanActivate {
    constructor( private _searchBookService: SearchBookService, private _router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._searchBookService.viewData(route.paramMap.get('id')).pipe(
            map(data => {
                const val = !!data;
                if (val) {
                    return true;
                } else {
                    console.log('false');
                    this._router.navigate(['/notfound']);
                    return false;
                }
            }),
            catchError((err) => {
                console.log('err', err);
                this._router.navigate(['/notfound'],
                 {queryParams: {'errMsg' : 'There is an issue with the service', 'code' : err}, skipLocationChange: true });
                return Observable.of(false);
            })
        );
    }
}
