import { Message } from '../model/user';

export interface ApiResponse {
  success: boolean;
  message: string;
  isAuthenticatingMessage?: boolean;
  messages?: Array<Message>;
}