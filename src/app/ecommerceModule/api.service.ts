import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthserviceService } from '../authservice.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // apiUrl: string = 'http://localhost:3000'
  // apiUrl: string = 'https://gfunlbackend.herokuapp.com'
  apiUrl: string = 'http://54.144.5.93:3000'

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'token': this.auth.getToken()
  });

  constructor(
    public httpclient: HttpClient,
    private auth: AuthserviceService
  ) { }

  // User Profile API

  public getProfile(token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/users/getprofile', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Shop API's

  public getShopList(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/shoplist', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createShop(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/createShop', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteShop(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/createShop', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Shop Header

  public saveOrUpdateHeader(params: any, token: string, apiName: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/' + apiName, params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public getShopHeaderData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewEcommerceHeader', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // image with text

  public saveImageTextData(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/imageWithText', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public getImageTextData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewImagewithText', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteImageTextData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteImageWithText', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  // best of Store


  public saveUpdateBestStore(params: any, token: string, apiName: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public getBestStoreData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewBestOfStore', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Slides

  public saveSliderData(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/sliderOfEcommerce', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public updateSliderData(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updatingEcommerceSliderImages', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public getSliderData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewEcommerceSlider', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public deleteSliderData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteSliderofEcommerce', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Collections APIS

  public getCollections(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/collectionList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteCollection(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteCollection', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createCollection(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/addCollection', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public updateCollection(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updateCollection', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public getCollection(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewCollection', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  //  Products API

  public getProducts(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/listingProduct', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteProduct(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteProduct', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createProduct(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/ecommerce_addProduct', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public updateProduct(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updateEcommerceProduct', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  // Discount
  public discountCodeGenerate(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/discount', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  // General Settings

  public getGeneralSettings(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewGeneralSettings', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updateGeneralSettings(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updateGeneralSettings', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  //  E-commerce Notifications

  public getNotifications(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewGeneralSettings', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public saveNotifications(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updateGeneralSettings', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  //  Taxes Data

  public getTaxes(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/listTaxStandard', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getProduct(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewWholeProductDetails', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }



  public saveUpdateTax(params: any, token: string, isAddTax: boolean): Observable<any> {
    let apiName = "updateTaxStandard";
    if (isAddTax)
      apiName = "createTaxStandard"
    return this.httpclient.post(this.apiUrl + '/ecommerce/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteTax(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteTaxStandard', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  // Shipping APIS

  public saveOrUpdateShippingFrom(params: any, token: string, isSaveOrUpdate): Observable<any> {
    let apiName = "updateShippingFromAddress";
    if (isSaveOrUpdate)
      apiName = "createShippingFromAddress"

    return this.httpclient.post(this.apiUrl + '/ecommerce/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getShippingFromAddresses(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/listOfFromShippingAddress', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteShippingFromAddress(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteShippingFromAddress', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public saveUpdateShippingZone(params: any, token: string, isAddZoneRate: boolean): Observable<any> {
    let apiName = "updateShippingStandards";
    if (isAddZoneRate)
      apiName = "createShippingStandards"
    return this.httpclient.post(this.apiUrl + '/ecommerce/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getShippingZone(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/listShippingStandards', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteShippingZone(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteShippingStandards', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  // ecommerce menu apis
  public saveMenu(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/addNavigationName', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

  public updateMenu(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updateNavigationName', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

  public deleteMenu(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteNavigationName', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }


  public previewMenu(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewAddNavigationName', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

  public menuList(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/navigationNameListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }



  public addNavigation(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/navigation', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }


  public ecommerceCategoryList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/listEcommerceCategory', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  // Ecommerce pages

  public pageSiteList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/ecommercePageListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deletePageSite(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/deleteEcommercePage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  //  ADD Page

  public addPage(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/ecommercePages', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public updatePage(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updateEcommercePage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getPageData(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewEcommercePage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  // Footer APIS

  public getFooterData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/previewEcommerceFooter', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public saveFooterData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/ecommerceFooter', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public updateFooterData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/updateEcommerceFooter', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createCustomer(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/createCustomer', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getCustomers(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/customerListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getDiscounts(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/discountListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  public announcementListing(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/announcementListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  public addAnnouncement(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/ecommerce/announcementListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
}

