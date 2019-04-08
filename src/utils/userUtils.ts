import { decodeCipher, encodeCipher } from './cryptoUtils';

let UserKey = 'user';
export function setFiled(filed: string, value: any) {
    //获取数据
    let userData = localStorage.getItem(UserKey);
    let user: any = {};
    //解析原有数据
    if (userData !== undefined && userData !== null) {
        user = JSON.parse(decodeCipher(userData));
    }
    //设置新数据
    Reflect.set(user, filed, value);
    //更新数据
    console.log(JSON.stringify(user));
    localStorage.setItem(UserKey, encodeCipher(JSON.stringify(user)));
}
export function getFiled(filed: string): object {
    let userData = localStorage.getItem(UserKey);
    let user: any = {};
    //解析原有数据
    if (userData !== undefined && userData !== null) {
        user = JSON.parse(decodeCipher(userData));
    }
    return user[filed];
}

export function getUser() {
    let userData = localStorage.getItem(UserKey);
    let user: any = {};
    //解析原有数据
    if (userData !== undefined && userData !== null) {
        user = JSON.parse(decodeCipher(userData));
    }
    return user;
}

export function setUser(user: any) {
    if (user === undefined || user === null) {
        localStorage.removeItem(UserKey);
    } else localStorage.setItem(UserKey, encodeCipher(JSON.stringify(user)));
}
