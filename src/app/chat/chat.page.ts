import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FeedService } from '../feed/feed.service';
import { User } from '../mocks/types';
import { ChatService } from './chat.service';

interface Conent {
  userId: string;
  message?: string;
  img?: string;
  date: number;
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

  @ViewChild('list', { read: ElementRef, static: false })
  list: ElementRef;

  @ViewChild(IonInfiniteScroll, { static: false })
  infinitScroll: IonInfiniteScroll;

  private isMessageSent: boolean;
  private mutationObserver: MutationObserver;
  public chatUser: User;
  public currentUser$: Observable<User>;
  public chatContent: Conent[] = [];

  constructor(
    public feedService: FeedService,
    public chatService: ChatService,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.currentUser$ = this.chatService.getCurrentUser();
    this.chatUser = this.chatService.getChatUser().value;
    this.feedService.getContentItems();
  }

  logScrollStart() {
    this.isMessageSent = false;
  }

  ionViewWillEnter() {
    this.mutationObserver = new MutationObserver(() => {
      this.scrollToBottom();
    });

    this.mutationObserver.observe(this.list.nativeElement, {
      childList: true
    });

    this.content.scrollToBottom();
  }

  scrollToBottom() {
    if (this.isMessageSent) {
      this.content.scrollToBottom();
    }
  }

  sendMsg(user: User) {
    if (this.input.value) {
      this.chatContent.push({
        userId: user.id,
        message: this.input.value,
        date: Date.now()
      });
      this.isMessageSent = true;
      this.scrollToBottomAndClearValue();
    }
  }

  onDoubleClick() {
    if (this.input.value) {
      this.chatContent.push({
        userId: this.chatService.getChatUser().value.id,
        message: this.input.value,
        date: Date.now()
      });
      this.isMessageSent = true;
      this.scrollToBottomAndClearValue();
    }
  }

  scrollToBottomAndClearValue() {
    this.input.value = '';
  }

  checkCardColor(userId: string, contentUserId: string, img: string) {
    let result = 'none';
    if (!img) {
      if (userId === contentUserId) {
        result = 'primary';
      } else {
        result = 'light';
      }
    }
    return result;
  }

  onTakePicture(user: User) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.chatContent.push({
          img: 'data:image/jpeg;base64,' + imageData,
          userId: user.id,
          date: Date.now()
        });
      },
      err => {
        // Handle error
        console.log('Camera issue:' + err);
      }
    );
  }

  loadData() {
    setTimeout(() => {
      this.chatContent.unshift(
        ...[
          {
            img: '',
            message: 'lorem',
            userId: 'user',
            date: Date.now()
          },
          {
            img: '',
            message: 'lorem',
            userId: 'user',
            date: Date.now()
          },
          {
            img: '',
            message: 'lorem',
            userId: 'user',
            date: Date.now()
          }
        ]
      );

      this.infinitScroll.complete();
    }, 1000);
  }
}
