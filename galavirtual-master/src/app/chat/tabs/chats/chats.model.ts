export interface Chats {
    id: string;
    idChat: string;
    idUserAct: string;
    name: string;
    profilePicture?: string;
    status?: string;
    lastMessage?: string;
    time: string;
    unRead?: string;
    isActive?: boolean;
    isTyping?: boolean;
}
