import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  score(question, answer: String): number {
    const correct: Boolean = question.answer.toLowerCase() === answer.toLowerCase();
    console.log(`Correct: ${correct}`);
    return (correct ? 1 : -1) * question.value;
  }

}
