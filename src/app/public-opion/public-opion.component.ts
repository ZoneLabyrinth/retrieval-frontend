import {Component, Input, OnInit} from '@angular/core';
import {SearchingService} from "../services/searching.service";
import {Mapping, Sentiment} from "../models/model";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-public-opion',
  templateUrl: './public-opion.component.html',
  styleUrls: ['./public-opion.component.css'],
  providers: [SearchingService]
})
export class PublicOpionComponent implements OnInit {

  private data;
  private TotalCount;
  private term;
  private selectedTerm;
  private pattern;

  page = 1;
  Mapping: Observable<Mapping[]>;
  states = [
    {name: '资讯', value: 'public-opinion'},
    {name: '知识', value: 'innovative'},
  ];

  form = new FormGroup({
    state: new FormControl(this.states[0])
  });

  private searchTerms = new Subject<string>();

  // @Input() selectedTerm: Mapping;

  constructor(private searchingService: SearchingService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  searching(term): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    // 快速匹配关键词
    this.Mapping = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchingService.getMapping(term)
        : Observable.of<Mapping[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Mapping[]>([]);
      });
    console.log(this.form.value.state.value)
    if (this.form.value.state.value === 'public-opinion') {
      console.log(">>")
    }

    // 获取路径参数，通过路径匹配搜索结果
    this.activeRoute.queryParams.subscribe(params => {
      this.term = params['term'];
      this.selectedTerm = params ['term'];
      this.page = params['page'];
    });

    // 获取数据,若路径有参数，则使用路径参数，否则不做处理
    if (this.term && this.page) {

      this.searchingService.getSentiment({page: this.page, term: this.term}).subscribe(data => {
        this.data = data.json();
        this.TotalCount = data.headers.get('x-total-count');
        this.TotalCount = parseInt(this.TotalCount) < 1000 ? parseInt(this.TotalCount) : 1000;
        console.log(this.data);
      });
    } else {
    }
  }

  getData() {
    this.searchingService.getSentiment({page: this.page, term: this.term}).subscribe(data => {
      this.data = data.json();
      this.TotalCount = data.headers.get('x-total-count');
      console.log(this.TotalCount);
      this.TotalCount = parseInt(this.TotalCount) < 1000 ? parseInt(this.TotalCount) : 1000;
      this.pattern = new RegExp(this.term);
      for (let contents of this.data) {
        let info = this.pattern.exec(contents.content);
        if (info && info.index > 30) {
          console.log(info.index);
          contents.content = '……' + contents.content.slice(info.index - 30, info.index + 1000);
          // console.log(contents.content);
        }
      }
    });
  }

  /**
   * 检索信息你
   * @param {string} term 传入查找词
   */
  search(term: string): void {
    this.page = 1;
    this.term = term;
    this.router.navigate(['publicOpinion'], {queryParams: {term: this.term, page: this.page}});
    console.log(this.page);
    this.getData();
  }


  // 切换分页时执行搜索
  pageChanged(event: any): void {
    this.getData();
    // let link = ['publicOpinion' + this.page];
    // this.router.navigate(link);
    this.router.navigate(['publicOpinion'], {queryParams: {term: this.term, page: this.page}});
    console.log('Page changed to: ' + this.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
  }

  /**
   * 检索关键字，跳转到相应地址查询
   * @param {string} keywords
   */
  gotoDetail(keywords: string) {
    // // 清空匹配框
    this.Mapping = Observable.of<Mapping[]>([]);
    // 判断是否为根路径，若路径有page和term，则查询。否则需要重新先getData()
    if (this.page && this.term) {
      this.selectedTerm = keywords;
      this.router.navigate(['publicOpinion'], {queryParams: {term: keywords, page: 1}});
    } else {
      this.router.navigate(['publicOpinion'], {queryParams: {term: keywords, page: 1}});
      this.page = 1;
      this.term = keywords;
      this.getData();

    }
    // 还原this.Mapping函数
    this.Mapping = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchingService.getMapping(term)
        : Observable.of<Mapping[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Mapping[]>([]);
      });


  }

  // changeItem(): void {
  //   this.router.navigate(['innovative']);
  // }

  gotoInnovative(): void {
    console.log(">>")
    this.router.navigate(['innovative']);
  }

}
