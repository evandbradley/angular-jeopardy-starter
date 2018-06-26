import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service'

import { ScoringComponent } from './scoring/scoring.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jeopardy';

  questionInfo;

  score: number = 0;

  scorer: ScoringComponent;

  answer: String;

  constructor(private DataService: DataService) {}

  categoryCount: number = 3;

  questions: Array<any> = [];

  getQuestionInfo () {
    this.DataService.getQuestionInfo()
      .subscribe(
        questionInfo => {
          // console.log(questionInfo)
          this.questionInfo = questionInfo[0];
        }
      )
  }

  getCategoriesInfo () {
    this.DataService.getMultipleQuestions(this.categoryCount)
    .subscribe(results =>
      results.map(
        result => {
          console.log(result[0])
          this.questions.push(result[0])
        }
      )
    )
  }

  select (newQuestionInfo) {
    this.questionInfo = newQuestionInfo;
  }

  check () {
    this.score += this.scorer.score(this.questionInfo, this.answer);
    this.questions = []
    this.questionInfo = {}
    this.answer = ''
    this.getCategoriesInfo()
  }

  ngOnInit () {
    this.scorer = new ScoringComponent()
    //this.getQuestionInfo()
    this.getCategoriesInfo()
  }



}
