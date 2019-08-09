import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../mocks/types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private currentUser: BehaviorSubject<User> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
  );

  private chatUser: BehaviorSubject<User> = new BehaviorSubject({
    id: '',
    name: '',
    thumb: '',
    isFalconChannel: false
  });

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
  }

  setChatUser(user: User) {
    this.chatUser.next(user);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getChatUser() {
    return this.chatUser;
  }
}
