import { AsyncStorage } from 'react-native'
const _appInfo = {
    username: '',
    cookie: ''
}

export async function saveCookie(cookie) {
    let cookieFromServerMap = new Map()
    cookie
        .split(' ')
        .forEach(
            (item) => {
                let itemArr = item.split('=')
                if (itemArr != null && itemArr.length == 2) {
                    cookieFromServerMap.set(itemArr[0], itemArr[1])
                }
            });
    let cookieLocal = await AsyncStorage.getItem('cookie')
    if (cookieLocal != null) {
        let cookieLocalMap = JSON.parse(cookieLocal)
        cookieFromServerMap.forEach((value, key) => {
            cookieLocalMap[key] = value
        })

        await AsyncStorage.setItem('cookie', cookieLocalMap.length == 0 ? '' : JSON.stringify(cookieLocalMap))
    } else {
        await AsyncStorage.setItem('cookie', cookieFromServerMap.length == 0 ? '' : JSON.stringify(cookieFromServerMap))
    }
}

export async function getCookie() {
    let cookieStr = await AsyncStorage.getItem('cookie')
    if (cookieStr) {
        let cookieMap = JSON.parse(cookieStr)
        let cookieArr = []
        Object.keys(cookieMap)
            .forEach((item) => {
                cookieArr.push(`${item}=${cookieMap[item]}`)
            })
        _appInfo.cookie = cookieArr.toString()
    }
    return _appInfo.cookie
}
export async function getUserName() {
    _appInfo.username = AsyncStorage.getItem('username')
    return _appInfo.username
}
export async function saveUserName(username) {
    await AsyncStorage.setItem('username', username)
}
export async function clearAppInfo() {
    _appInfo.username = ''
    _appInfo.cookie = ''
    await AsyncStorage.clear()
}




