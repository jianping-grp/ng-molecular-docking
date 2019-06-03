import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {map} from 'rxjs/operators';
import Swiper from 'swiper';

import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public current = 0;
  testSwiper: Swiper;
  images = [];
  constructor( private myhttp: HttpClient) { }
  ngAfterViewInit() {
    this.testSwiper = new Swiper('.swiper-container', {
      observer: true,
      loop: true,
      speed: 400,
      updateOnImagesReady : true,
       on:{
        autoplay: function(){
          console.log('sssss')
        },      },
        autoplay: {
          delay: 5000,
          // stopOnLastSlide: false,  
          disableOnInteraction: false,  
          },
      pagination: {
        el: '.swiper-pagination'
      },
      // navigation:{
      //   nextEL:'.swiper-button-next',
      //   prevEL:'.swiper-button-prev',
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar:{el: '.swiper-scrollbar'}
    });
  }
  ngOnInit() {
    this.myhttp.get("http://192.168.1.138:9000/banners/").subscribe((result: any) => {
      console.log(result);
      this.images = result;
  })}}