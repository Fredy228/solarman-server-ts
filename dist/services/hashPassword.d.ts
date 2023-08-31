export declare const hashPassword: (password: string) => Promise<string>;
export declare const checkPassword: (candidate: string, hash: string) => Promise<boolean>;
