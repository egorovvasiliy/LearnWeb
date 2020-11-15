﻿export class AppClient {
    constructor() {
    }
    name: string;
    urlWs: string;
    initCurrentUser: (_user: IUser) => void;
    setActiveUsers: (_users:Array<IUser>) => void;
    connectUser: (_user: IUser) =>void;
    removeUser: (user: IUser) => void
    updateStatusUser: (_status: IStatus) => void;
    sendMessage: (_message: IMessage) => void;
    onOpen: () => void;
    onClose: () => void;
}