export class UserCredentials {
    email: string;
    password: string;
}

export class UserInfo {
    id: string;
    name: string;
    email: string; 
}

export class UserInfoWithToken {
    token: string;
    userInfo: UserInfo;
}