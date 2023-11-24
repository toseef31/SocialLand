import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

import { trigger, transition, animate, style, state, keyframes, group, AnimationEvent } from '@angular/animations'

@Component({
  selector: 'app-create-questionair',
  templateUrl: './create-questionair.component.html',
  styleUrls: ['./create-questionair.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        height: '6vh'
      })),
      state('final', style({
        height: '80vh'
      })),
      transition('initial=>final', animate('500ms')),
      transition('final=>initial', animate('100ms')),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          'border-radius': '50px'
        })),
        animate(500)
      ])
    ]),

    trigger('newForm', [
      transition('void => *', [
        style({
          'opacity': 1,
          'transform': 'translateX(-100px)'
        }),
        animate(400)
      ]),
      transition('* => void', [
        animate(180, style({
          'opacity': 0,
          'transform': 'translateX(100px)'
        }))
      ]),
    ]),

    trigger('addOptions', [
      transition('void => *', [
        animate(300, keyframes([
          style({
            'opacity': 0,
            'transform': 'translateX(-100px)',
            offset: 0
          }),
          style({
            'opacity': 0.5,
            'transform': 'translateX(50px)',
            offset: 0.3
          }),
          style({
            'opacity': 1,
            'transform': 'translateX(-20px)',
            offset: 0.5
          }),
          style({
            'opacity': 1,
            'transform': 'translateX(0px)',
            offset: 1
          }),
        ])
        )
      ]),

      transition('* => void', [
        group([
          animate(180, style({
            'opacity': 0,
            'transform': 'translateX(100px)'
          })),
          animate(100, style({
            'color': 'red'
          }))
        ])
      ]),
    ])
  ]
})

export class CreateQuestionairComponent implements OnInit {

  createForm!: FormGroup;
  elementType: number = 0;
  optionsTypes = [
    { id: 1, name: 'TextField' },
    { id: 2, name: 'Radio' },
    { id: 3, name: 'Checkbox' },
    { id: 4, name: 'Textarea' },
    { id: 5, name: 'Time' },
    { id: 6, name: 'Date' },
    { id: 7, name: 'Picture' },
  ];

  @ViewChild('selectedOption') selectedOption!: ElementRef;

  animStarted(event: AnimationEvent) {
    console.log(event);
  }

  animDone(event: AnimationEvent) {
    console.log(event);
  }

  get getQuestionairControls() {
    return (this.createForm.get('mainFormPanel') as FormArray).controls;
  }

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      "mainFormPanel": new FormArray([
        new FormGroup({
          'question': new FormControl(null),
          'questionType': new FormControl(null),
          "questionOptions": new FormArray([])
        })
      ]),

    })
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  manualChangeDetect() {
    this.changeDetector.detectChanges();
  }

  AddNewForm() {
    const control = new FormGroup({
      'question': new FormControl(null),
      'questionType': new FormControl(null),
      "questionOptions": new FormArray([])
    });

    (<FormArray>this.createForm.get('mainFormPanel')).push(control);
    this.changeDetector.detectChanges();
  }

  RemoveForm() {
    (<FormArray>this.createForm.get('mainFormPanel')).removeAt((<FormArray>this.createForm.get('mainFormPanel')).length - 1);
  }

  RemoveThisForm(index: number) {
    (<FormArray>this.createForm.get('mainFormPanel')).removeAt(index);
  }

  addMoreOption(questionIndex: number) {
    const control = new FormControl(null);
    (<FormArray>this.createForm.get('mainFormPanel')["controls"][questionIndex].get('questionOptions')).push(control);
    this.changeDetector.detectChanges();
  }

  removeOption(mainForIndex: number, optionIndex: number) {
    (<FormArray>this.createForm.get('mainFormPanel')["controls"][mainForIndex].get('questionOptions')).removeAt(optionIndex);

  }

  submitQuestionair() {
    var arrayControl = this.createForm.get('mainFormPanel') as FormArray;
    console.log(arrayControl);
  }

}
