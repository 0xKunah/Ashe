import { api_secret, encryption_key } from './config'
import { AES, enc } from 'crypto-js'
export default class Crypto
{
    // Decrypt and check if provided auth key is the good one
    public static isAuthKey(value: string)
    {
        return Crypto.decrypt(value) == api_secret
    }

    // Encrypt auth key and return it
    // Auth key is required to access API
    public static getAuthKey()
    {
        return Crypto.encrypt(api_secret)
    }
    
    // Encryption method
    private static encrypt(value: string)
    {
        return AES.encrypt(value, encryption_key).toString()
    }

    // Decryption method
    private static decrypt(value: string)
    {
        return AES.decrypt(value, encryption_key).toString(enc.Utf8)
    }
}