import Storage from "../dao/Storage";
import L from "../util/L";

export const baseUrl = 'http://www.wanandroid.com/'

export async function apiGet(request) {
    let url = `${baseUrl}${request}`
    L.v('网络:\n', `\t请求参数:\nurl:${url}`)
    let res = await fetch(url)
    let resJson = await res.json()
    L.v('网络:\n', `\t返回结果:\nres:${res.toString()}\nresJson:\n${resJson.toString()}`)
    return resJson
};
export async function apiPost(request, param = null) {
    let url = `${baseUrl}${request}`
    let requsetConfig = {
        method: 'POST',
    }
    if (param != null) {
        let formData = new FormData()
        for (key in param) {
            formData.append(key, param[key])
        }
        requsetConfig['body'] = formData
    }
    let cookie = Storage.getItem('cookie', '')
    requsetConfig['headers'] = {
        'Cookie': cookie
    }
    L.v('网络:\n', `\t请求参数:\nurl:${url}\nparam:${requsetConfig}`)
    let res = await fetch(url, requsetConfig)
    if ((res.url.indexOf('user/login') != -1 || res.url.indexOf('user/register')) != -1 &&
        res.headers.map.hasOwnProperty('set-cookie')) {
        const cookie = res.headers.map['set-cookie'][0]
        await Storage.setItem('cookie', cookie)
    }
    let resJson = await res.json()
    L.v('网络:\n', `\t返回结果:\nres:${res.toString()}\nresJson:\n${resJson.toString()}`)
    return resJson
};