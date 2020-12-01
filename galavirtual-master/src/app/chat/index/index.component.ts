
import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChatsComponent } from '../tabs/chats/chats.component';

import { Messages } from './data';
import { Message } from './chat.model';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { getCloudFirestore } from '../../core/firebaseCode/cloudFirestore';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

/**
 * Chat-component
 */
export class IndexComponent implements OnInit  {

  textoMessage = '';
  chatRoomVisible = false;
  activetab = 2;
  Messages: Message[];
  // @ViewChild(ChatsComponent) compChats;

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  lang: string;

  constructor(private authFackservice: AuthfakeauthenticationService,
              private authService: AuthenticationService,
              private router: Router, public translate: TranslateService) { }

  // ngAfterViewInit(): void {
  //   // throw new Error('Method not implemented.');
  //   this.chatRoomVisible = this.compChats.openRoomChat;
  // }

  ngOnInit(): void {
    this.Messages = Messages;
    this.lang = this.translate.currentLang;
    localStorage.setItem('idChat', 'chatEnVivoGrupal');
    getCloudFirestore().getDataUser();
    getCloudFirestore().getChatEnVivo();
    this.router.navigate(['/galaVirtual']);
  }

  openRoomChat(event): void {
    this.chatRoomVisible = event;
  }

  showUserProfile(): void {
    document.getElementById('profile-detail').style.display = 'block';
  }

  closeUserChat(): void {
    this.chatRoomVisible = false;
    document.getElementById('chat-room').classList.remove('user-chat-show');
  }

  invSetNewMessage(): void {
    let messageArry = this.textoMessage.split('');
    const lengthMessage = messageArry.length;
    let auxiliar = this.textoMessage;

    for (let positionMesagge = 0; positionMesagge < lengthMessage; positionMesagge++) {
      if (messageArry[0] === ' ') {
        auxiliar = auxiliar.substring(1);
        messageArry = auxiliar.split('');
      } else {
        if (this.textoMessage !== '' && this.textoMessage.length > 0) {
          getCloudFirestore().setNewMessage(auxiliar);
          this.textoMessage = '';
          break;
        }
      }
    }
  }

  logout(): void {
    if (environment.defaultauth === 'firebase') {
      localStorage.removeItem('idUser');
      localStorage.removeItem('idChat');
      localStorage.removeItem('nameUser');
      this.authService.logout();
    } else if (environment.defaultauth === 'fackbackend') {
      this.authFackservice.logout();
    }
    this.router.navigate(['/account/login']);
  }

  /**
   * Set language
   * @param lang language
   */
  setLanguage(lang): void {
    this.translate.use(lang);
    this.lang = lang;
  }
}
