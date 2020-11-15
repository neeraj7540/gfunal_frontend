import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/authservice.service';
import * as CanvasJS from 'src/assets/js/canvasjs.min';

@Component({
  selector: 'app-course-engagement',
  templateUrl: './course-engagement.component.html',
  styleUrls: ['./course-engagement.component.css']
})
export class CourseEngagementComponent implements OnInit {

  name: string = this.auth.getUserName();
  opacity: string = "";
  loading: boolean = false;

  isGraphLoaded: boolean = false;

  @ViewChild('monthlyGraph', { static: false }) monthlyChartContainer: any;


  constructor(public auth: AuthserviceService, private toastr: ToastrService,
    public api: ApiServiceService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fetchCourseEngagementData();


  }

  public check(): boolean {
    return this.loading ? true : false;
  }

  public fetchCourseEngagementData(): void {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.loading = true;
    var token = this.auth.getToken()
    var params = {
      "academyId": "5e579f158538fce701478063",
      "year": (new Date()).getFullYear(),
      "weekWiseData": false
    }
    this.api.fetchCourseEngagement(params, token).subscribe(data => {
      console.log(data);
      this.loading = false;
      if (data.status) {

        var graphPoints = [];
        var graphData = data.data.graphData;
        if (graphData.length > 0) {
          for (var i = 0; i < graphData.length; i++) {
            var obj = {
              y: graphData[i].videoDuration,
              label: months[graphData[i]._id],
              x: graphData[i]._id
            }
            graphPoints.push(obj);
          }
          let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Yearly Graph"
            },
            data: [{
              click: (e) => {
                this.openMonthlyGraph(e)
              },
              type: "column",
              dataPoints: graphPoints
            }]
          });
          chart.render();
          this.isGraphLoaded = true;
        }
      }
      return;
    },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }

  openMonthlyGraph(monthlyData: any) {
    console.log(monthlyData);
    this.loading = true;
    var token = this.auth.getToken()
    var params = {
      "academyId": "5e579f158538fce701478063",
      "year": (new Date()).getFullYear(),
      "weekWiseData": true,
      "month": monthlyData.dataPoint.x
    }
    this.api.fetchCourseEngagement(params, token).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.monthlyChartContainer.show();
      if (data.status) {
        var graphPoints = [];
        var graphData = data.data.graphData;
        if (graphData.length > 0) {
          for (var i = 0; i < graphData.length; i++) {
            var obj = {
              y: graphData[i].videoDuration,
              label: graphData[i]._id,
              x: graphData[i]._id
            }
            graphPoints.push(obj);
          }
          let chart = new CanvasJS.Chart("monthlyChartContainer", {
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Monthly Graph"
            },
            data: [{
              click: (e) => {
                // this.openMonthlyGraph(e)
              },
              type: "column",
              dataPoints: graphPoints
            }]
          });
          chart.render();
        }
      }
      return;
    },
      err => {
        this.loading = false;
        console.log(err)
        return
      }
    )
  }


}
