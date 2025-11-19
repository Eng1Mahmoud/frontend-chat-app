export interface apiRespons {
    success: boolean;
    message: string;
}

export interface loginResponse extends apiRespons {
    token: string;
    data: {
        username: string;
        email: string;
        id: string;
    }
}