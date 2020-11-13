export class WSChatBuilder {
    constructor() {
    }
    name: string;
    urlWs: string;
    setActiveUsers: (_users:Array<IUser>) => void;
    connectUser: (_user: IUser) =>void;
    removeUser: (user: IUser) => void
    updateStatusUser: (_id: string, _newStatus: string) => void;
    reciveMessageFromUser: (_id: string, _message: string) => void;
    sendMessage: (_text: string) => void;
    onOpen: () => void;
    onClose: () => void;
}