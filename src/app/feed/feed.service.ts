import { Injectable } from '@angular/core';
import { getContentItem, getFeed } from '../mocks/api';
import { Content } from '../mocks/types';
import { FeedModel } from './feed.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  getConents(): Promise<Content[]> {
    return getFeed(200).then(res => res.contents);
  }

  getFeed(): Promise<FeedModel> {
    return getFeed().then(res => ({
      name: res.name,
      thumb: res.thumb,
      id: res.id
    }));
  }

  getContentItems() {
    return getContentItem(false, 20);
  }
}
