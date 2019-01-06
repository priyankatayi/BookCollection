import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireObject, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchBookComponent } from './books/search-book.component';
import { SearchBookService} from './books/search-book.service';
import { HttpClientModule } from '@angular/common/http';
import { MyBookCollectionComponent } from './books/my-book-collection.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchDetailsComponent } from './books/search-details.component';
import { TruncatePipe } from './shared/truncatePipe';
import { TruncateTitlePipe } from './shared/truncateTitlePipe';
import { BookDetailsComponent } from './books/book-details.component';
import { CollectionListResolverService } from './books/collection-list-resolver-service';
import { PageNotFoundComponent } from './PageNotFound/page-not-found.component';
import { BookSearchActivateGuardService } from './books/book-search-activate-guard.service';

const routes: Routes = [
  {path: 'browse' , component: SearchBookComponent},
  {path: 'collection', component: MyBookCollectionComponent},
  {path: 'details/:id', component: BookDetailsComponent, canActivate: [BookSearchActivateGuardService]},
  {path: 'notfound', component: PageNotFoundComponent},
  {path: '', redirectTo: '/browse', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchBookComponent,
    MyBookCollectionComponent,
    SearchDetailsComponent,
    TruncatePipe,
    TruncateTitlePipe,
    BookDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule
  ],
  providers: [SearchBookService, CollectionListResolverService, BookSearchActivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private db: AngularFireDatabase) {
    // this.db.database.ref('/favBooks').onDisconnect().remove(function() {
    //   this.db.database.ref('/favBooks').remove();
    //   });
}
}


