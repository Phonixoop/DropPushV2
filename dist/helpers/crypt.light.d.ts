export declare class CryptionLight {
    private static algorithm;
    private static secretKey;
    private static iv;
    static encrypt(text: any): {
        iv: any;
        content: string;
    };
    static decrypt(hash: any): string;
}
