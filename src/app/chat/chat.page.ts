import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
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
  @ViewChild(IonContent, { static: false })
  content: IonContent;
  public chatUser: User;
  public currentUser$: Observable<User>;
  public chatContent: Conent[] = [];

  constructor(
    public feedService: FeedService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.chatService.getCurrentUser();
    this.chatUser = this.chatService.getChatUser().value;
    this.feedService.getContentItems().then(console.log);
  }

  sendMsg(user: User) {
    if (this.input.value) {
      this.chatContent.push({
        userId: user.id,
        message: this.input.value
      });
      this.scrollToBottomAndClearValue();
    }
  }

  onDoubleClick() {
    if (this.input.value) {
      this.chatContent.push({
        userId: this.chatService.getChatUser().value.id,
        message: this.input.value
      });
      this.scrollToBottomAndClearValue();
    }
  }

  scrollToBottomAndClearValue() {
    this.input.value = '';
    this.content.scrollToBottom();
  }
}
