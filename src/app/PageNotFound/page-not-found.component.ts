import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  errMsg: string;
  code;
  constructor( private _router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => { this.errMsg = params['errMsg'];
    this.code = params['code']; });
    console.log('errMsg', this.errMsg, this.code );
  }

}
