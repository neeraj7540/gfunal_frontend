import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ec-theme-editor-sidebar',
  templateUrl: './ec-theme-editor-sidebar.component.html',
  styleUrls: ['./ec-theme-editor-sidebar.component.css']
})
export class EcThemeEditorSidebarComponent implements OnInit {


  private shopID: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkQueryIsAvailable();
  }
 

  public checkQueryIsAvailable(): void {
    this.activeRoute.queryParams.subscribe(
      data => {
        if (!data.shopId) {
          return this.router.navigate(['/ecommerce/shop-list']);
        }
        this.shopID = data.shopId;
        return
      }
    )
  }
  openDashboard(){
    this.router.navigate(['/ecommerce/dashboard'], { queryParams: { shopId: this.shopID } });

  }
  openHeader() {
    this.router.navigate(['/ecommerce/header'], { queryParams: { shopId: this.shopID } });
  }
  openSlider() {
    this.router.navigate(['/ecommerce/slider'], { queryParams: { shopId: this.shopID } });
  }
  openImageText() {
    this.router.navigate(['/ecommerce/image-with-text'], { queryParams: { shopId: this.shopID } });
  }
  openBestStore() {
    this.router.navigate(['/ecommerce/best-of-store'], { queryParams: { shopId: this.shopID } });
  }
  openFooter() {
    this.router.navigate(['/ecommerce/ec-footer'], { queryParams: { shopId: this.shopID } });
  }
  openPreview() {
    this.router.navigate(['/ecommerce/products'], { queryParams: { shopId: this.shopID } });
  }

}
