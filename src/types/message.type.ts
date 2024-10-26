export type Message = {
    id: string;
    sender: 'user' | 'character';
    content: string;
    timestamp: Date;
}