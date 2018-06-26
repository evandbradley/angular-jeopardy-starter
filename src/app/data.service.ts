import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class DataService {

  private baseUrl: string = "http://localhost:4200/api/random";

  constructor(private http: Http) { }

  getQuestionInfo(): Observable<any> {

    return this.http.get(this.baseUrl)
      .map(result => result.json())
  }

  getMultipleQuestions (count: number) {
    const reqs: Array<Observable<any>> = Array(count).fill(this.http.get(this.baseUrl))
    return forkJoin(reqs)
      .map(result => 
        result.map(question =>
          question.json()
        )
      )
  }
}
