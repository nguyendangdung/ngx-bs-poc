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
  pageInfo1 = new PageInfo({size: 10});
  pageInfo2 = new PageInfo({size: 10});
  pageInfo3 = new PageInfo({size: 10});
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(q => {
      const page = q.page ? +q.page : 1;

      // Update place
      this.pageInfo2.page = page;
      this.getData(page);
    });

    setTimeout(() => {
      this.pageInfo3.count = 100;
    }, 2000);

    setTimeout(() => {
      this.pageInfo3.page = 5;
    }, 1000);
  }

  pageChanged($event) {
    this.router.navigate(['/'], {
      queryParams: {page: $event.page}
    });
  }

  private getData(page) {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data: any[]) => {
      // Update count and page in same place => work
      this.pageInfo1.count = data.length;
      this.pageInfo1.page = page;

      // Update count
      this.pageInfo2.count = data.length;

      this.data = data.slice((this.pageInfo1.page - 1) * this.pageInfo1.size, this.pageInfo1.page * this.pageInfo1.size);
    });
  }

}

export class PageInfo {
  constructor(parameters?: Partial<PageInfo>) {
    Object.assign(this, parameters);
  }
  page: number;
  size: number;
  count: number;
}
