import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {


  data;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {


    this.httpClient.get('http://localhost:3000/config').subscribe(
      res => {
        this.data = res;
        console.log('this.data : ' + JSON.stringify(this.data));
      }
    )

  }

}
