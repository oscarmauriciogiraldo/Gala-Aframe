import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { chat } from './data';
import { Chats } from './chats.model';
import { TranslateService } from '@ngx-translate/core';
import { getCloudFirestore } from '../../../core/firebaseCode/cloudFirestore';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
/**
 * Tab-chat component
 */
export class ChatsComponent implements OnInit {

  chat: Chats[];
  // openRoomChat = true;

  @Output() openRoomChat = new EventEmitter();

  constructor(public translate: TranslateService) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    dots: false,
    margin: 16,
    navSpeed: 700,
    items: 4,
    nav: false
  };

  async ngOnInit(): Promise<void> {
    await getCloudFirestore().getUsuarios();
    this.chat = getCloudFirestore().users;
  }

  async invocarChatEnVivo(): Promise<void> {
    this.openRoomChat.emit(true);
    setTimeout( () => {
      document.getElementById('chat-room').classList.add('user-chat-show');
      localStorage.setItem('idChat', 'chatEnVivoGrupal');
      getCloudFirestore().getChatEnVivo();
      document.getElementById('nomUserChat').innerHTML = 'Chat en vivo';
    }, 200);
  }

  async showChat(id: any, idChat: any, idUserAct: any, nombre: any): Promise<void> {
    this.openRoomChat.emit(true);
    setTimeout( () => {
      getCloudFirestore().getChatPrivate(id);
      document.getElementById('chat-room').classList.add('user-chat-show');
      document.getElementById('nomUserChat').innerHTML = `${nombre}`;
    }, 200);
  }
}
