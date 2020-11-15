import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public funnelStepsData :any;

  public funnelStepsList: Array<any> = [];

  isTemplatesShowing: boolean;

  public selectedTemplateCatType:string;

  constructor() { }

  // getData():any {
  //   return this.funnelStepsData$;
  // }

  // updateData(data: any) {
  //   this.funnelStepsData$.next(data);
  // }
}
