export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
export interface IFetch<I> {
  endpoint: string;
  method: string;
  body?: I | undefined | null;
  tags?: string[];
  params?: {
    [key: string]: string;
  }
}

export interface Iuser {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  online: boolean;
  createdAt: string;
  updatedAt: string;

}

export interface IMessage {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  status?: "sent" | "delivered" | "read";
  createdAt: string;
  updatedAt: string;
}