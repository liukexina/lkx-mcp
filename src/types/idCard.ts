export interface IdCardInfo {
    valid: boolean;
    idCard: string;
    province?: string;
    city?: string;
    district?: string;
    birthday?: string;
    age?: number;
    gender?: string;
    error?: string;
}

