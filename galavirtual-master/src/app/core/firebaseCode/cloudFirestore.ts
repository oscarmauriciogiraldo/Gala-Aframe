import * as firebase from 'firebase/app';
import 'firebase/firestore';

class CloudFirestore {

  users = [];
  messagesChatPrivate = [];

  constructor(firebaseConfig) {
  }

  registrarDatosUsuario(nomb: any, apell: any, cel: any, correo: any, pass: any, idDoc: any): void {
      firebase.firestore()
            .collection('users')
            .doc(idDoc)
            .set({
              nombre   : nomb,
              apellido : apell,
              celular  : cel,
              email    : correo,
              clave    : pass,
              chats    : []
            });
  }

  async getUsuarios(): Promise<any> {
    const idUser = localStorage.getItem('idUser');
    this.users = [];

    firebase.firestore()
            .collection('users')
            .get()
            .then(users => {
              if (!users.empty) {
                users.forEach(user => {
                  if (user.id !== idUser) {
                    this.users.push({
                      id          : `${user.id}`,
                      name        : `${user.data().nombre} ${user.data().apellido}`,
                      lastMessage : 'Este es un mensaje de prueba',
                      time        : 'chat.tabs.chats.recent.userslist.user3.time',
                      idChat      : `${user.id}${idUser}`,
                      idUserAct   : `${idUser}`
                    });
                  }
                });
              }
            });
  }

  getDataUser(): void {
    const idUser = localStorage.getItem('idUser');

    firebase.firestore()
            .collection('users')
            .doc(idUser)
            .get()
            .then(data => {
              if (data.exists) {
                const name = data.data().nombre;
                const lastName = data.data().apellido;
                const chats = data.data().chats;
                localStorage.setItem('nameUser', `${name} ${lastName}`);
              }
            });
  }

  async getChatPrivate(idUserTwo): Promise<void> {
    const idUser = localStorage.getItem('idUser');
    const refChat = firebase.firestore()
                            .collection('chats');

    firebase.firestore()
            .collection('users')
            .doc(idUser)
            .get()
            .then(data => {
              if (data.exists) {
                const chats = data.data().chats;
                // console.log(chats);
                let contador = 0;
                if (chats.length !== 0) {
                  for (const chatIden of chats) {
                    contador++;
                    // console.log(contador);
                    if (chatIden.idUserChat === idUserTwo) {
                      console.log('Encontro el chat con id => ' + chatIden.idUserChat);
                      console.log('Encontro el chat con id => ' + chatIden.idChat);
                      localStorage.setItem('idChat', chatIden.idChat);
                      const idChat = localStorage.getItem('idChat');

                      refChat.doc(idChat)
                              .onSnapshot(chat => {
                                if (chat.exists) {
                                  document.getElementById('contMSJChat').innerHTML = '';
                                  const messages = chat.data().messages;

                                  if (messages.length === 0) {
                                    document.getElementById('contMSJChat').innerHTML = '';
                                    let msjIniciarChat = '';
                                    msjIniciarChat = `<div class="chat-day-title">
                                                                <span class="title">Iniciar chat</span>
                                                              </div>`;
                                    document.getElementById('contMSJChat').innerHTML = msjIniciarChat;
                                  } else {
                                    for (const mssg of messages) {
                                      const liChat = document.createElement('li');

                                      if (mssg.id === idUser) {
                                        liChat.setAttribute('class', 'right');
                                      }

                                      const date = new Date(mssg.time);
                                      const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                                      liChat.innerHTML = `<div class="conversation-list">
                                                            <div class="user-chat-content">
                                                              <div class="ctext-wrap">
                                                                <div class="ctext-wrap-content">
                                                                  <p class="mb-0">
                                                                    ${mssg.message}
                                                                  </p>
                                                                  <p class="chat-time mb-0">
                                                                    <i class="ri-time-line align-middle"></i>
                                                                    <span class="align-middle">${hora}</span>
                                                                  </p>
                                                                </div>
                                                              </div>
                                                              <div class="conversation-name">${mssg.name}</div>
                                                            </div>
                                                          </div>`;
                                      document.getElementById('contMSJChat').appendChild(liChat);
                                    }
                                  }
                                } else {
                                  // this.createChatPrivate(idChat, nombre);
                                }
                              });
                      break;
                    } else if (contador === chats.length) {
                      // console.log('Crear nuevo chat');
                      this.createChatPrivate(idUser, idUserTwo);
                      break;
                    }
                  }
                } else {
                  // console.log('No hay chat');
                  this.createChatPrivate(idUser, idUserTwo);
                }
              }
            });
  }

  getChatEnVivo(): void {
    const idUser = localStorage.getItem('idUser');
    const idChat = localStorage.getItem('idChat');

    firebase.firestore()
            .collection('chats')
            .doc(idChat)
            .onSnapshot(chat => {
              const idChatOn = localStorage.getItem('idChat');
              if (chat.exists && idChatOn === 'chatEnVivoGrupal') {
                if (document.getElementById('contMSJChat')) {
                  document.getElementById('contMSJChat').innerHTML = '';
                }
                const messages = chat.data().messages;

                if (messages.length === 0) {
                  document.getElementById('contMSJChat').innerHTML = '';
                  let msjIniciarChat = '';
                  msjIniciarChat = `<div class="chat-day-title">
                                              <span class="title">Iniciar chat en vivo</span>
                                            </div>`;
                  document.getElementById('contMSJChat').innerHTML = msjIniciarChat;
                } else {
                  for (const mssg of messages) {
                    const liChat = document.createElement('li');

                    if (mssg.id === idUser) {
                      liChat.setAttribute('class', 'right');
                    }

                    const date = new Date(mssg.time);
                    const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                    liChat.innerHTML = `<div class="conversation-list">
                                          <div class="user-chat-content">
                                            <div class="ctext-wrap">
                                              <div class="ctext-wrap-content">
                                                <p class="mb-0">
                                                  ${mssg.message}
                                                </p>
                                                <p class="chat-time mb-0">
                                                  <i class="ri-time-line align-middle"></i>
                                                  <span class="align-middle">${hora}</span>
                                                </p>
                                              </div>
                                            </div>
                                            <div class="conversation-name">${mssg.name}</div>
                                          </div>
                                        </div>`;
                    if (document.getElementById('contMSJChat')) {
                      document.getElementById('contMSJChat').appendChild(liChat);
                    }
                  }
                }
              } else {
                // this.createChatPrivate(idChat, nombre);
              }
            });
  }

  createChatPrivate(idUser: any, idUserTwo: any): void {
    const refBDUser = firebase.firestore()
                              .collection('users')
                              .doc(idUser);
    const refBDUserTwo = firebase.firestore()
                              .collection('users')
                              .doc(idUserTwo);

    firebase.firestore()
            .collection('chats')
            .add({
              messages : []
            })
            .then(docRef => {
              const chatUser = {
                idUserChat : idUserTwo,
                idChat     : docRef.id
              };
              const chatUserTwo = {
                idUserChat : idUser,
                idChat     : docRef.id
              };

              refBDUser.get()
                        .then(data => {
                          if (data.exists) {
                            const chatsBD = data.data().chats;
                            chatsBD.push(chatUser);

                            refBDUser.update({
                              chats : chatsBD
                            })
                            .then(() => {
                              // console.log('hecho 1');
                            });
                          }
                        });

              refBDUserTwo.get()
                          .then(data => {
                            if (data.exists) {
                              const chatsBD = data.data().chats;
                              chatsBD.push(chatUserTwo);

                              refBDUserTwo.update({
                                chats : chatsBD
                              })
                              .then(() => {
                                // console.log('hecho 2');
                              });
                            }
                          });

              document.getElementById('contMSJChat').innerHTML = '';
              const msjIniciarChat = `<div class="chat-day-title">
                                        <span class="title">Iniciar chat</span>
                                      </div>`;
              document.getElementById('contMSJChat').innerHTML = msjIniciarChat;
            });
  }

  setNewMessage(mess): void {
    const idUser = localStorage.getItem('idUser');
    const nameUser = localStorage.getItem('nameUser');
    const idChat = localStorage.getItem('idChat');
    const date = new Date();
    const newMessage = {
      id: idUser,
      message: mess,
      name: nameUser,
      time: date.getTime()
    };
    const refDB = firebase.firestore()
                          .collection('chats')
                          .doc(idChat);
    refDB.get()
          .then(chat => {
            if (chat.exists) {
              const messagesChat = chat.data().messages;
              messagesChat.push(newMessage);

              refDB.set({
                messages: messagesChat
              })
              .then(() => {
                // this.getChatPrivate(idChat, nameUser);
              });
            }
          });
  }

}

let fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */

const initCloudFirestore = (config) => {
    if (!fireBaseBackend) {
      fireBaseBackend = new CloudFirestore(config);
    }
    return fireBaseBackend;
};

const getCloudFirestore = () => {
    return fireBaseBackend;
};

export { initCloudFirestore, getCloudFirestore };
