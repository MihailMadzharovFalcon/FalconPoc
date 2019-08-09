export interface Content {
  id: string;
  message: string;
  network: string;
  channel: string;
  isRead: boolean;
  isDm: boolean;
  sender: User;
  changedAt: string;
}

export interface ContentItem extends Content {
  subitems: Content[];
}

export interface Feed {
  id: string;
  name: string;
  thumb: string;
  contents: Content[];
}

export interface User {
  id: string;
  name: string;
  thumb: string;
  isFalconChannel: boolean;
}
