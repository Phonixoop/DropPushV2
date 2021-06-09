export declare class Cryption {
    private static algorithm;
    private static key;
    private static secretKey;
    private static iv;
    static encrypt(content: any, key: string): Promise<string>;
    static decrypt(token: string, key: string): Promise<{
        data: any;
        ok: boolean;
    }>;
    static verify(data: any): Promise<void>;
}
