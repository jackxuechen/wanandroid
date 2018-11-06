import Storage from "../dao/Storage";
import L from "../util/L";

export const baseUrl = 'http://www.wanandroid.com/'

export function apiGet(request) {
    return new Promise(function (resolve, reject) {
        let url = `${baseUrl}${request}`
        L.v('apiGet\n', 'request:\n', `\turl:${url}`)
        fetch(url)
            .then((Response) => Response.json())
            .then(responseJson => {
                L.v('response:\n\t', responseJson)
                L.v('---------------------------------------------')
                resolve(responseJson)
            })
            .catch(error => {
                L.e('error:\n\t', error.toString())
                L.v('---------------------------------------------')
                reject(error)
            })
    });
};
export function apiPost(request, param = null) {
    return new Promise(function (resolve, reject) {
        let url = `${baseUrl}${request}`
        L.v('apiGet\n', 'request:\n', `\turl:${url}`)
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
        let cookie = ''
        requsetConfig['headers'] = {
            'Cookie': cookie
        }
        L.v('param:\n', `\tparam:${requsetConfig}`)
        fetch(url, requsetConfig)
            .then((res) => {
                if ((res.url.indexOf('user/login') != -1 || res.url.indexOf('user/register')) != -1 &&
                    res.headers.map.hasOwnProperty('set-cookie')) {
                    const cookie = res.headers.map['set-cookie'][0]
                    Storage.setItem('cookie', cookie)
                }
                return res.json()
            })
            .then(responseJson => {
                L.v('response:\n\t', responseJson)
                L.v('---------------------------------------------')
                resolve(responseJson)
            })
            .catch(error => {
                L.e('error:\n\t', error.toString())
                L.v('---------------------------------------------')
                reject(error)
            })
    });
};