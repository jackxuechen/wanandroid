export default class L {
    static debug = true
    static v(message, ...optionalParam) {
        if (this.debug == true) {
            console.info(message, optionalParam)
        }
    }
    // static e(message, ...optionalParam) {
    //     if (this.debug == true) {
    //         console.error(message, optionalParam)
    //     }
    // }
}