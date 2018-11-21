import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any[];
  page: number;
  count: number;
  size = 10;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(q => {
      this.page = q.page ? +q.page : 1;
      this.getData();
    });
  }

  pageChanged($event) {
    this.router.navigate(['/'], {
      queryParams: {page: $event.page}
    });
  }

  private getData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data: any[]) => {
      this.data = data.slice((this.page - 1) * this.size, this.page * this.size);
      this.count = data.length;
    });
  }

}
