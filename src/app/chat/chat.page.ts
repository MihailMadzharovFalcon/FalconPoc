import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FeedService } from '../feed/feed.service';
import { User } from '../mocks/types';
import { ChatService } from './chat.service';

interface Conent {
  message: string;
  userId: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  @ViewChild('input', { static: false })
  input: any;

  public currentUser$: Observable<User>;
  public chatContent: Conent[] = [];

  constructor(
    public feedService: FeedService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.chatService
      .getCurrentUser()
      .pipe(tap(console.log));
    this.feedService.getContentItems().then(console.log);
  }

  sendMsg(user: User, message: string) {
    this.chatContent.push({
      userId: user.id,
      message: this.input.value
    });
    this.input.value = '';
  }
}
