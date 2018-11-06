import { AsyncStorage } from 'react-native'
import L from '../util/L';
export default class Storage {
    static async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
            L.e(error)
        }
    }

    static async getItem(key, defaultValue) {
        let value = null
        try {
            value = await AsyncStorage.getItem(key)
        } catch (error) {
            L.e(error)
        }
        return value == null ? defaultValue : value
    }

    static async removeItem(key) {
        try {
            value = await AsyncStorage.removeItem(key)
        } catch (error) {
            L.e(error)
        }
    }
    static async mergeItem(key, value) {
        try {
            value = await AsyncStorage.mergeItem(key, value)
        } catch (error) {
            L.e(error)
        }
    }
}