import { Component, HostListener } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireObject, AngularFireList, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private db: AngularFireDatabase) {}
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...');
    this.db.database.ref('/favBooks').remove();
}

}
