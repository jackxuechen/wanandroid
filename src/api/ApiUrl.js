
import L from "../util/L";
import { getCookie, saveCookie } from "../util/AppManager";


export const baseUrl = 'https://www.wanandroid.com/'

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
            method: method,
        }
        if (param != null) {
            let formData = new FormData()
            for (key in param) {
                formData.append(key, param[key])
            }
            requsetConfig['body'] = formData
        }
        let cookie = await getCookie()
        if (cookie) {
            requsetConfig['headers'] = {
                'Cookie': cookie
            }
        }
        L.v(`网络请求 url:${url}`, '请求参数 param:', requsetConfig)
        let res = await fetch(url, requsetConfig)
        L.v(`网络请求 url:${url}`, '返回结果 res:', res)
        if (res.headers.map.hasOwnProperty('set-cookie')) {
            await saveCookie(res.headers.map['set-cookie'])
        }
        let resJson = await res.json()
        // if (resJson.errorCode != 0) {
        //     throw resJson
        // }
        return resJson
    } catch (error) {
        L.v(error)
        let result = await new Promise((resolve, reject) => {
            reject(error)
        })
        return result
    }
};

