import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {Sentiment, Mapping, InnovativeMapping} from "../models/model";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchingService {

  private baseUrl = 'http://localhost:8080';


  // private headers = new Headers({'Content-Type': 'application/json'});
  private data;
  sentiment: Sentiment[];

  constructor(private http: Http) {
  }

  getSentiment(keyword) {
    const url = `${this.baseUrl}/searching?page=${keyword.page}`;
    return this.http.post(url, keyword.term);

  }

  getMapping(keywords: string): Promise<Mapping[]> {
    const url = `${this.baseUrl}/searchMapping?keywords=${keywords}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Mapping[])
      .catch(this.handleError);
  }

  getInnovative(description: any) {
    const url = `${this.baseUrl}/innovativeSearching?page=${description.page}`;

    return this.http.post(url, description.term);

  }

  getInnovativeMapping(description: string): Promise<InnovativeMapping[]> {
    const url = `${this.baseUrl}/innovativeMapping?description=${description}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as InnovativeMapping[])
      .catch(this.handleError);

  }

//
  private handleError(error: any): Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
