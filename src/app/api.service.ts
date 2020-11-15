import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Login } from './login';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service'
import { Template } from './template'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // apiUrl: string = 'http://localhost:3000'
  //http://54.144.5.93:3000
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

  public sigin(user: Login): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/users/signin', user)
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

  public postHtmlCss(data: Template, token: string): Observable<any> {
    console.log(token)
    return this.httpclient.post(this.apiUrl + '/template/updateTemplate', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      })
    })
  }

  public updateNewThemeofLandingPage(data: Template, token: string): Observable<any> {
    console.log(token)
    return this.httpclient.post(this.apiUrl + '/template/updateNewThemeofLandingPage', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      })
    })
  }

  public choosePackage(packageType: string, token: string): Observable<any> {
    console.log(packageType)
    console.log("token is", token)
    return this.httpclient.post(this.apiUrl + '/package/choose_package', {
      "package_type": packageType
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public checkData(params: any, endPoint: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + endPoint, params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'token': this.auth.getToken()
        })
      }
    )
  }


  public signup(
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string
  ): Observable<any> {

    let params = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      password: password
    }
    return this.httpclient.post(
      this.apiUrl + '/users/signup', params
    )
  }

  public otpValidation(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/users/confirmation', params)
  }

  public forgotPassword(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/users/otpForgetPassword', params)
  }

  public changePassword(params: any): Observable<any> {

    console.log("params are", params)

    return this.httpclient.post(this.apiUrl + '/users/changePassword', params)

  }

  public landingPageName(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/template/landingpage_name', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public allLandingPages(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/template/fetchCustomerLandingPage', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  // public updateTemplate(
  //   params: any,
  //   token: string
  // ): Observable<any>{
  //   return this.httpclient.post(
  //     this.apiUrl+'/template/updateTemplate',
  //     params,
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type':'application/json',
  //         'token': token
  //       })
  //     }
  //   )
  // }
  public listingContacts(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/contact/listingContact', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public deleteContact(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/contact/deleteContact', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public saveContact(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/contact/contactForm', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      })
  }

  public importContactLandingPage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/contact/importContactLandingPage', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public listingLeads(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/leads/listingContact', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public deletelead(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/leads/deleteContact', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }


  public getDashboardData(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/leads/UserDashbordCountData', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public getTemplateDashboardData(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/leads/templateDashboardCountData', params)
  }

  public listingInvoices(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/invoice/invoiceListing', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }






  //blogs apis

  public blogSiteList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/listBlogSites', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public pageSiteList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/blogPageListing', params, {
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
    return this.httpclient.post(this.apiUrl + '/blog/deleteBlogPage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }





  public postData(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/previewBlog', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public createBlog(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/blogSite', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public blogDashboardData(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(
      this.apiUrl + '/blog/blogDashboardData', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

  // Add Post API

  public addPost(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/createblog', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updatePost(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/updateBlog', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

  public deleteInvoice(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/invoice/deleteInvoice', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public saveInvoice(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/invoice/createInvoice', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      })
  }

  public draftedListofUserLandingPage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/template/draftedListofUserLandingPage', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public getSearchContacts(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/invoice/displayCustomerList', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public createDomain(params: any, token: string, apiEndpoint: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + apiEndpoint, params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public listingDomains(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/domain/domainListing', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }

  public createNewThemeofLandingpage(data: Template, token: string): Observable<any> {
    console.log(token)
    return this.httpclient.post(this.apiUrl + '/template/createNewThemeofLandingpage', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      })
    })
  }

  public publishDraftedLandingPage(params: any, token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/template/publishDraftedLandingPage', params,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      }
    )
  }



  public resendOTP(params: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/users/resendotp', params)
  }


  //blogs apis

  public blogList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/blogListing', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteBlog(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/deleteBlog', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public addPage(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/blogPage', params, {
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
    return this.httpclient.post(this.apiUrl + '/blog/blogPageUpdate', params, {
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
    return this.httpclient.post(this.apiUrl + '/blog/previewBlogPage', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public getMyBlogsSite(
    params: any, token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/blogsOfMySite', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public saveOrUpdateBlogHeader(
    params: any,
    token: string, apiName: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getBlogHeaderData(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/previewBlogHeader', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  // Blog categories

  public blogCategoryList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/listBlogCategory', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public addBlogCategory(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/blogCatogries', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public updateBlogCategory(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/updateCategory', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public deleteBlogCategory(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/deleteBlogCategory', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }
  // Blog Footer
  public saveUpdateBlogFooter(
    params: any,
    token: string,
    apiName: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public getBlogFooter(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/previewBlogSiteFooter', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Blog Comments API


  public blogCommentsList(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/listBlogSiteComments', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  public deleteBlogComment(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/deleteBlogSiteComment', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }

  // Blog General Settings

  public getGeneralData(
    params: any,
    token: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/previewGeneralSettings', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    })
  }


  public saveOrUpdateSettings(
    params: any,
    token: string,
    apiName: string
  ): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/' + apiName, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

  // Blog menu apis
  public saveMenu(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/blogMenu', params, {
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
    return this.httpclient.post(this.apiUrl + '/blog/listOfBlogMenu', params, {
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
    return this.httpclient.post(this.apiUrl + '/blog/deleteMenu', params, {
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
    return this.httpclient.post(this.apiUrl + '/blog/updateMenu', params, {
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
    return this.httpclient.post(this.apiUrl + '/blog/previewMenu', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

  public addCategoryWithMenu(
    params: any,
    token: string): Observable<any> {
    return this.httpclient.post(this.apiUrl + '/blog/addCategoryWithMenu', params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    )
  }

}
