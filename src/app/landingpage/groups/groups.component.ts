import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddGroup, DeleteGroup } from '../landingpage.actions';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  addGroup(): void {
    let group = {
      'title': "",
      'description': ""
    }
    this.store.dispatch(new AddGroup(group))
  }

  deleteGroup(groupId: number): void {
    this.store.dispatch(new DeleteGroup(groupId))
  }

  ngOnDestroy(): void {
  }
}
