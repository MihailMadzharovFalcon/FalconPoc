import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatService } from '../chat/chat.service';
import { Content, User } from '../mocks/types';
import { FeedModel } from './feed.model';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})
export class FeedPage {
  public feeds$: Observable<Content[]>;
  public feed$: Observable<FeedModel>;

  constructor(
    private feedService: FeedService,
    private chatService: ChatService
  ) {}
  ionViewWillEnter() {
    this.feeds$ = from(this.feedService.getConents()).pipe(tap(console.log));
    this.feed$ = from(this.feedService.getFeed()).pipe(
      tap(feed =>
        this.chatService.setCurrentUser({ ...feed, isFalconChannel: false })
      )
    );
  }

  setChatUser(chatUser: User) {
    this.chatService.setChatUser(chatUser);
  }
}
