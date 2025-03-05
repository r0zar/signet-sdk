export type MessageType = 'SIGN_REQUEST' | 'SIGN_RESPONSE' | 'CONNECT_REQUEST' | 'CONNECT_RESPONSE' | 'NOTIFICATION';
export interface BaseMessage {
    type: MessageType;
    id: string;
}
export interface SignRequest extends BaseMessage {
    type: 'SIGN_REQUEST';
    data: any;
}
export interface SignResponse extends BaseMessage {
    type: 'SIGN_RESPONSE';
    signature?: string;
    error?: string;
}
export interface ConnectRequest extends BaseMessage {
    type: 'CONNECT_REQUEST';
}
export interface ConnectResponse extends BaseMessage {
    type: 'CONNECT_RESPONSE';
    connected: boolean;
    error?: string;
}
export interface NotificationMessage extends BaseMessage {
    type: 'NOTIFICATION';
    notificationType: 'info' | 'success' | 'error';
    title: string;
    message: string;
}
export type Message = SignRequest | SignResponse | ConnectRequest | ConnectResponse | NotificationMessage;
export interface SignatureResult {
    signature: string;
    data: any;
}
export type EventType = 'ready' | 'connected' | 'disconnected';
