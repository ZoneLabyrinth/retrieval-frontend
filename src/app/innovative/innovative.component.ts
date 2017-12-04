import {Component, OnInit} from '@angular/core';
import {SearchingService} from "../services/searching.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {InnovativeMapping} from "../models/model";
import {Subject} from "rxjs/Subject";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-innovative',
  templateUrl: './innovative.component.html',
  styleUrls: ['./innovative.component.css'],
  providers: [SearchingService]
})
export class InnovativeComponent implements OnInit {

  private data;
  private pattern;
  private TotalCount;
  private term;
  private selectedTerm;


  InnovativeMapping: Observable<InnovativeMapping[]>;


  private searchTerms = new Subject<string>();
  page = 1;
  states = [
    {name: '资讯', value: 'public-opinion'},
    {name: '知识', value: 'innovative'},
  ];

  form = new FormGroup({
    state: new FormControl(this.states[1])
  });

  constructor(private searchingService: SearchingService,
              private router: Router,
              private activeRouter: ActivatedRoute) {
  }


  ngOnInit() {
    this.InnovativeMapping = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchingService.getInnovativeMapping(term)
        : Observable.of<InnovativeMapping[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<InnovativeMapping[]>([]);
      });

    this.activeRouter.queryParams.subscribe(params => {
      this.term = this.selectedTerm = params.term;
      this.page = params.page;
    });



    if (this.term && this.page) {
      this.getData();
    } else {
    }


  }

  getData(): void {
    this.searchingService.getInnovative({page: this.page, term: this.term})
      .subscribe(data => {
        this.data = data.json();
        this.TotalCount = parseInt(data.headers.get("X-Total-Count"));
        this.TotalCount = parseInt(this.TotalCount) < 1000 ? parseInt(this.TotalCount) : 1000;
        this.pattern = new RegExp(this.term);
        for (let contents of this.data) {
          let info = this.pattern.exec(contents.content);
          if (info && info.index > 30) {
            console.log(info.index);
            contents.content = '……' + contents.content.slice(info.index - 30, contents.content.length);
            // console.log(contents.content);
          }
        }

        console.log(this.data);
      });
  }

  search(description: string): void {
    this.page = 1;
    this.term = description;
    this.router.navigate(['innovative'], {queryParams: {term: this.term, page: this.page}});
    this.getData();
  }

  searching(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(description: string): void {

    this.InnovativeMapping = Observable.of<InnovativeMapping[]>([]);
    if (this.page && this.term) {
      this.selectedTerm = description;
      this.router.navigate(['innovative'], {queryParams: {term: description, page: 1}});
    } else {
      this.router.navigate(['innovative'], {queryParams: {term: description, page: 1}});
      this.page = 1;
      this.term = description;
      this.getData();
    }

    this.InnovativeMapping = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchingService.getInnovativeMapping(term)
        : Observable.of<InnovativeMapping[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<InnovativeMapping[]>([]);
      });
  }

  pageChanged(event: any): void {
    this.getData();
    // let link = ['publicOpinion' + this.page];
    // this.router.navigate(link);
    this.router.navigate(['innovative'], {queryParams: {term: this.term, page: this.page}});
    console.log('Page changed to: ' + this.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
  }
  //
  gotoPbo():void{
    this.router.navigate(['publicOpinion']);
  }

}
