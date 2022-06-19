export declare type errType = {
    status: 'ERR' | 'OK';
    error: {
        label: string;
        messages: string[];
    };
};
