import { AsyncStorage } from 'react-native'
import L from "../util/L";

export const baseUrl = 'http://www.wanandroid.com/'

export async function apiGet(request) {
    return await apiRequest(request, 'GET')
};

export async function apiPost(request, param = null) {
    return await apiRequest(request, 'POST', param)
}

export async function apiRequest(request, method = 'GET', param = null) {
    try {
        let url = `${baseUrl}${request}`
        let requsetConfig = {
            credentials: 'include',
            method: method,
        }
        if (param != null) {
            let formData = new FormData()
            for (key in param) {
                formData.append(key, param[key])
            }
            requsetConfig['body'] = formData
        }
        L.v(`网络请求 url:${url}`, '请求参数 param:', requsetConfig)
        let res = await fetch(url, requsetConfig)
        if ((res.url.indexOf('user/login') != -1 || res.url.indexOf('user/register')) != -1 &&
            res.headers.map.hasOwnProperty('set-cookie')) {
            const cookie = res.headers.map['set-cookie']
            await AsyncStorage.setItem('cookie', cookie.toString())
        }
        let resJson = await res.json()
        L.v(`网络请求 url:${url}`, '返回结果 res:', res)
        return resJson
    } catch (error) {
        L.e(error)
    }
};