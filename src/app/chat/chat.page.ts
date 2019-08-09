import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FeedService } from '../feed/feed.service';
import { User } from '../mocks/types';
import { ChatService } from './chat.service';

interface Conent {
  userId: string;
  message?: string;
  img?: string;
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
    public chatService: ChatService,
    private camera: Camera
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
          userId: user.id
        });
      },
      err => {
        // Handle error
        console.log('Camera issue:' + err);
      }
    );
  }
}
