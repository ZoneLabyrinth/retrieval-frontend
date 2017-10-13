import {Component, Injectable, OnInit} from '@angular/core';
import {Sentiment, Types, Sources} from "../models/model";
import {SearchingService} from "../services/searching.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


const TYPES: Types[] = [
  {id: 1, name: '客户'},
  {id: 2, name: '渠道'},
  {id: 3, name: '产品'},
  {id: 4, name: '任意组合'},
];

const SOURCES: Sources[] = [
  {
    id: 1,
    title: '内部管理系统',
    content: [{
      name: '销管'
    }, {
      name: '商务'
    }, {
      name: '项目运营'
    }, {
      name: '运维服务'
    }, {
      name: '市场活动'
    }, {
      name: '客户行为'
    }]
  },
  {
    id: 2,
    title: '内部管理平台(知识库)',
    content: [{
      name: '解决方案'
    }, {
      name: '技术白皮书'
    }, {
      name: '案例'
    }, {
      name: '最佳实践'
    }]
  },
  {
    id: 3,
    title: '外部信息',
    content: [{
      name: '公司行业内资讯'
    }, {
      name: '工商信用'
    }, {
      name: '社会舆论'
    }, {
      name: '金融信息'
    }, {
      name: '招聘信息'
    }
    ]
  }
]

@Injectable()
@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css'],
  providers: [SearchingService]
})
export class SearchingComponent implements OnInit {

  sentiments: Observable<Sentiment[]>;
  private searchTerms = new Subject<string>();
  types = TYPES;
  sources = SOURCES;


  constructor(private searchingService: SearchingService) {
  }


  getSentiment(keyword: string): void {
    this.searchTerms.next(keyword);
  }

  ngOnInit() {
    // this.sentiments = this.searchTerms
    //   .debounceTime(300)
    //   .distinctUntilChanged()
    //   .switchMap(keyword => keyword ? this.searchingService.getSentiment(keyword) : Observable.of<Sentiment[]>([]))
    //   .catch(error => {
    //     console.log(error);
    //     return Observable.of<Sentiment[]>([]);
    //   });

  }

}
