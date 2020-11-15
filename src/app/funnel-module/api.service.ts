import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Login } from 'src/app/login';
import { Observable } from 'rxjs';
import { AuthserviceService } from 'src/app/authservice.service'
import { Template } from 'src/app/template'

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
  ) {

  }

  public getProfile(token: string): Observable<any> {
    console.log("token is", this.auth.getToken())
    console.log("header is", this.headers)

    return this.httpclient.post(this.apiUrl + '/users/getprofile', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })


  }

  // Funnel Apis

  public funnelList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/AllfunnelList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createFunnel(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/createFunnel', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public updateFunnel(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/updateFunnel', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteFunnel(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/deletefunnel', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public funnelContactList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/allFunnelContactList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteFunnelContact(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/deleteFunnelContact', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public createFunnelContact(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/createFunnelContact', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public importFunnelContacts(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/ImportAllContact', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }
  // public getCountries(token: string): Observable<any> {
  //   return this.httpclient.post(this.apiUrl + '/funnel/countries', {},
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'token': token
  //       })
  //     }
  //   )
  // }

  // public getStates(params: any, token: string): Observable<any> {
  //   return this.httpclient.post(this.apiUrl + '/funnel/states', params,
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'token': token
  //       })
  //     }
  //   )
  // }
  // public getCities(params: any, token: string): Observable<any> {
  //   return this.httpclient.post(this.apiUrl + '/funnel/cities', params,
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'token': token
  //       })
  //     }
  //   )
  // }
  public getFunnels(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/funnellistapi', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public pincodeApi(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/AllCountryListZip  ', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  // DashBboard apis

  public getFunnelCount(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/DashboardFunnelCount  ', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public getFunnelPageCount(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/DashboardFunnelStepCount  ', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  // end of api

  public getFunnelSteps(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/allFunnelStepList', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public addFunnelStep(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/createFunnelStep', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public deleteFunnelStep(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/deleteFunnelStepList', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public funnelStepTemplates(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/allfunneltemplist', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public funnelStepTemplatesByCategory(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/displayDropdownSub', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Funnel stats

  public getFunnelStats(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/FunnelStatPreview', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  // Products

  public getProducts(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/funnelProductList', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteProduct(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/deleteFunnelProduct', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createProduct(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/createFunnelProduct', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }

  public updateProduct(params: FormData, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/editFunnelProduct', params, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }
  public getProduct(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/funnel/funnelSingleProduct', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
}
