export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
export interface IFetch<I> {
  endpoint: string;
  method: string;
  body?: I;
  tags?: string[];
  params?: {
    [key: string]: string;
  }
}

export interface Iuser {
 _id: string;
  username: string;
  email: string;
  online: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  
}