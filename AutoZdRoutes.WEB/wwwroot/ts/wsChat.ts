import { urlWs } from "./constants";

export const GetSocket=()=>new WebSocket(urlWs);