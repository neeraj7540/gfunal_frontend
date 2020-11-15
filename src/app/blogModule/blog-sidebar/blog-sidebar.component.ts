import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.css']
})
export class BlogSidebarComponent implements OnInit {


  private blogActive:string="";
  private openDasboardActive:string="";

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
  }

  public openBlogPosts(): void{
    this.router.navigate(['/blog-post-list'])
  }

  public openDashboard(): void{
    this.router.navigate(['/blog-dashboard'])
  }
  public openPages(): void{
    this.router.navigate(['/page-list'])
  }
  public openHeader(): void{
    this.router.navigate(['/b-header'])
  }
  public addNewPost(): void {
    this.router.navigate(['/add-post'])
  }
}
