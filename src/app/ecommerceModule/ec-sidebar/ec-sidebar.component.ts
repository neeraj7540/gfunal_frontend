import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ec-sidebar',
  templateUrl: './ec-sidebar.component.html',
  styleUrls: ['./ec-sidebar.component.css']
})
export class EcSidebarComponent implements OnInit {

  private shopID: string;
  name:string;

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
  openThemePage() {
    this.router.navigate(['/ecommerce/header'], { queryParams: { shopId: this.shopID } });
  }
  openProducts() {
    this.router.navigate(['/ecommerce/products'], { queryParams: { shopId: this.shopID } });
  }
  openDiscount() {
    this.router.navigate(['/ecommerce/discount-list'], { queryParams: { shopId: this.shopID } });
  }
  openCustomerPage() {
    this.router.navigate(['/ecommerce/customers'], { queryParams: { shopId: this.shopID } });
  }
  openCollections() {
    this.router.navigate(['/ecommerce/collections'], { queryParams: { shopId: this.shopID } });
  }
  openOrders() {
    this.router.navigate(['/ecommerce/orders'], { queryParams: { shopId: this.shopID } });
  }
  openSettings() {
    this.router.navigate(['/ecommerce/settings'], { queryParams: { shopId: this.shopID } });
  }
  openGeneralSettings() {
    this.router.navigate(['/ecommerce/general-settings'], { queryParams: { shopId: this.shopID } });
  }
  openTaxRegion() {
    this.router.navigate(['/ecommerce/tax-regions'], { queryParams: { shopId: this.shopID } });
  }
  openNotifications() {
    this.router.navigate(['/ecommerce/notifications'], { queryParams: { shopId: this.shopID } });
  }
  openShipping() {
    this.router.navigate(['/ecommerce/shipping'], { queryParams: { shopId: this.shopID } });
  }
  openCheckout() {
    this.router.navigate(['/ecommerce/checkout'], { queryParams: { shopId: this.shopID } });
  }
  openNavigationPage() {
    this.router.navigate(['/ecommerce/navigation'], { queryParams: { shopId: this.shopID } });
  }
  openPagesPage() {
    this.router.navigate(['/ecommerce/pages'], { queryParams: { shopId: this.shopID } });
  }
  openAnnouncements(){
    this.router.navigate(['ecommerce/announcements'], { queryParams: { shopId: this.shopID } });

  }
}
