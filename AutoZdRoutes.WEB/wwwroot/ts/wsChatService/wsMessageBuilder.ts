export class WSChatBuilder {
    constructor() {
    }
    name: string;
    urlWs: string;
    initCurrentUser: (_user: IUser) => void;
    setActiveUsers: (_users:Array<IUser>) => void;
    connectUser: (_user: IUser) =>void;
    removeUser: (user: IUser) => void
    updateStatusUser: (_status: IStatus) => void;
    reciveMessageFromUser: (_id: string, _message: string) => void;
    sendMessage: (_text: string) => void;
    onOpen: () => void;
    onClose: () => void;
}