import { Component, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  public childComponentType: Type<any> | any;
  public onClose$: Subject<boolean> = new Subject();
  // private componentRef: any;

  @ViewChild('notificationTemplate', { read: ViewContainerRef, static: true })
  public notificationTemplate: ViewContainerRef | undefined;

  //------ take untill destroy (no need for ngDestroy) ------------
  constructor() { }

  ngOnInit(): void {
    console.log("Notification: ngOnInit");
    if (this.notificationTemplate) {
      this.notificationTemplate.createComponent(this.childComponentType);
    }
  }

  ngOnDestroy(): void {
    console.log("Notification: ngOnDestroy");
  }

  onClose() {
    this.onClose$.next(true);
  }

}
