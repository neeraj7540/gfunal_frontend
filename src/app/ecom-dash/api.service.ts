import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthserviceService } from '../authservice.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://54.144.5.93:3000'

  constructor(
    public httpclient: HttpClient,
    private auth: AuthserviceService
  ) { }

  public getProfile(token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/users/getprofile', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Shop API's

  public getEcommerceHeaderData(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/fetchTheStoreInformationForHeader', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  public getEcommerceBodyData(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/fetchTheStoreInformationForBody', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  public getCollectionProducts(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/productListingAccordingToCollection', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
 
  public saveAddressData(params: any, token: string, apiName: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getSavedAddressList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/listOfDeliveryAddress', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteAddress(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/deleteDeliveryAddress', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getwishlistData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/listingOfWishList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getorderListData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/orderList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public cartList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/cartList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public discountCouponListing(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/discountCouponListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public addToCart(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/addToCart', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public login(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/login', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  public register(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/signup', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  public deleteCartValue(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/deleteCartValue', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public moveToWishList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/moveToWishList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public removeFromWishList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/removeFromWishList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public previewAccount(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecomemrceCustomer/previewAccount', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

}
