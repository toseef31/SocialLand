import { Component, OnInit, Input } from '@angular/core';
import { LoginStatusService } from '../services/loginstatus.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {

  @Input() activeLeftPanel: number = 0;

  constructor(private loginService: LoginStatusService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.activeLeftPanel = parseInt(this.route.snapshot.paramMap.get('panelNo'));
    // console.log('activeLeftPanel: '+ this.activeLeftPanel);
  }

  setNextRoute(nextRoute: string) {
    console.log("route set");
    this.loginService.setNextRouteName(nextRoute);
    this.router.navigate([nextRoute]);
  }

  testRouter(){
    this.router.navigate(['/landingpage/groups/0'],{relativeTo: this.route, queryParamsHandling: 'preserve'});
   // this.router.navigate(['/landingpage/groups/0'],{relativeTo: this.route, queryParams: { age: 'not-known'}, queryParamsHandling: 'merge'});
  }
}
