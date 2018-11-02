export const baseUrl = 'http://www.wanandroid.com/'

export function apiGet(request) {
    return new Promise(function (resolve, reject) {
        let url=`${baseUrl}${request}`
        console.info('apiGet\n','request:\n',`\turl:${url}`)
        fetch(url)
            .then((Response) => Response.json())
            .then(responseJson => {
                console.info('response:\n', responseJson)
                console.info('---------------------------------------------')
                resolve(responseJson)
            })
            .catch(error => {
                console.error('error:\n', error.toString())
                console.info('---------------------------------------------')
                reject(error)
            })
    });
};