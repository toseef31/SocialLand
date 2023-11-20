import { Component, signal, computed, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrementAction, incrementAction, updateUserAction } from '../../_store/actions/counter.actions';
import { countDoubleSelector, countSelector, userUpdateSelector } from '../../_store/selectors/counter.selector';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: false,
  // imports: [SharedModule],
})
export class SignalsComponent {
  count$: Observable<number>;
  doubleCount$: Observable<number>;
  updateUser$: Observable<string>;

  // actions = signal<string[]>([]);
  // counter = signal(0);
  // doubleCounter = computed( ()=> this.counter() * 2 )

  constructor(
    private counterStore: Store<{ counter: number }>,
    private userStore: Store<{ user: string }>) {
      
    // effect( ()=> console.log(this.counter()));
    this.count$ = this.counterStore.select(countSelector)
    this.doubleCount$ = this.counterStore.select(countDoubleSelector)

    this.updateUser$ = this.userStore.select(userUpdateSelector)
  }

  increment(ele: HTMLInputElement) {
    if (!ele) return
    this.counterStore.dispatch(incrementAction({ 'value': +ele.value }))
  }

  decrement(ele: HTMLInputElement) {
    if (!ele) return
    this.counterStore.dispatch(decrementAction({ 'value': +ele.value }))
  }


  updateName(ele: HTMLInputElement) {
    if (!ele) return
    this.userStore.dispatch(updateUserAction({ 'name': ele.value }))
  }

  // increment() {
  //   this.counter.update( (oldValue)=> oldValue + 1)
  //   this.actions.mutate((oldActions)=> oldActions.push('INCREMENT'));
  // }

  // decrement() {
  //   this.counter.update( (oldValue)=> oldValue - 1)
  //   this.actions.update((oldActions)=> [...oldActions, 'DECREMENT']);
  // }
}
