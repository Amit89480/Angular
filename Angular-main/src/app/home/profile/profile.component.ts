import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../home.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('main') htmlData:ElementRef;

  constructor(private service: HomeService) { }

  bookings = [];
  user = JSON.parse(localStorage.getItem("user"));
  userDetails = null;
  trains = [];

  ngOnInit(): void {
    this.service.getResearvations().subscribe(
      res => {
        this.bookings = res
      }, err => console.log(err)
    )
    this.service.getUserDetails(this.user.dbUserId).subscribe(
      res => {
        this.userDetails = res
      }, err => console.log(err)
    )
    this.service.getTrains().subscribe(
      res => {
        this.trains = res
      }, err => console.log(err)); 
  }

  getTrain(tid) {
    return this.trains.find(o => o.id == tid);
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById("main").innerHTML.toString();
    printContents = (<string>printContents + "").replace("col-sm", "col-xs");
    // console.log(printContents);
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Reporte</title>
          <meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <style>
          #main {
            max-width: 960px;
          }
          
          span {
            display: inline-block;
          }
          
          /* Sections of Ticket */
          
          .ticket-main {
            width: 580px;
            height: 368px;
            font-family: Monaco;
          }
          
          .ticket-top {
            border-top-left-radius: 19px;
            border-top-right-radius: 19px;
            background-color: rgb(255,94,3);
            height: 62px;
          }
          
          .ticket-middle {
            position: relative;
            background-color: rgb(255,255,244);
          /* 	background-image: url('./images/ticket-bg.png');  */
            height: 238px;
          }
          
          .ticket-bottom {
            border-bottom-left-radius: 19px;
            border-bottom-right-radius: 19px;
            background-color: rgb(255,94,3);
            height: 68px;
          }
          
          /* Top Strip Positioning */
          
          /* stuff only goes here on advance tickets ("VALID ONLY WITH RESERVATION[S]") or on new style tickets ("Off-Peak Day Return") */
          
          /* Middle Area Positioning - 4 rows */
          
          .middle-row {
            width: 93%;
            /*width: 539px;*/
            margin-left: 20.5px;
            /* height: ; */
          }
          
          .ticket-label {
            font-size: 10px;
            text-transform: none;
          }
          
          .ticket-detail {
            font-size: 16px;
            text-transform: uppercase;
          }
          
          .ticket-detail-large {
            font-size: 18px;
            font-weight: 700;
            text-transform: uppercase;
          }
          
          .ticket-detail-small {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
          }
          
          .middle-1 {
            display: inline-block;
            padding-top: 6px; /* Initial padding from top */
          }
          
          .middle-1-1 {
            display: inline-block;
            padding-bottom: 12px;
          }
          
          .middle-class {
            width: 88px;
          }
          
          .middle-type {
            width: 213px;
          }
          
          .middle-adult {
            width: 76px;
          }
          
          .middle-child {
            width: 91px;
          }
          
          
          .middle-2 {
            display: inline-block;
          }
          
          .middle-2-2 {
            display: inline-block;
            padding-bottom: 22px; /* More padding between the two sets of rows */
          }
          
          .middle-railcard-spacer {
            width: 150px;
          }
          
          .middle-startdate {
            width: 150px;
          }
          
          .middle-number {
            width: 114px;
          }
          
          .middle-longnumber {
            text-align: right;
            display: inline-block;
            /* don't actually need to set a width here - need to right align this */
          }
          
          .middle-3 {
            display: inline-block;
          }
          
          .middle-3-3 {
            display: inline-block;
            padding-bottom: 12px;
          }
          
          .middle-from {
            width: 226px;
          }
          
          .middle-valid {
            width: 234px;
          }
          
          
          .middle-4 {
            display: inline-block;
          }
          
          .middle-4-4 {
            display: inline-block;
            padding-bottom: 12px;
          }
          
          .middle-to {
            width: 226px;
          }
          
          .middle-route {
            width: 156px;
          }
          
          /* Bottom Strip Positioning */
          
          .ticket-printed {
            text-align: right;
            margin-right: 20.5px;
            margin-top: -16px; /* because margin-bottom doesn't work for some reason */
          }
          
          /* Logo Stuff */
          
          .ticket-logo-container {
            padding-top: 12px;
          }
          
          .ticket-logo-2-container {
            padding-top: 6px;
          }
          
          .ticket-logo {
          /* 	background-image: url('./images/ticket-logo-2-small-transparent.png'); */
            height: 55px;
            width: 55px;
            margin-left: 4.7%;
          }
          </style>
        </head>
        <body onload="window.print();">
          ${printContents}
        </body>
      </html>`);
    /* window.close(); */
    popupWin.document.close();
  }
}
