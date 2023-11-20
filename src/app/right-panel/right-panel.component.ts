import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

 // activerightPanel: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activerightPanel = parseInt(this.route.snapshot.paramMap.get('panelNo'));
    // console.log('activeRightPanel: '+ this.activerightPanel);
  }

}
