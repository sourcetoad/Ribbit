import {RibbitRequestData, RibbitRequestParams} from "./Ribbit";
import {isPlainObject} from "./helpers";

export function buildBody(data: RibbitRequestData): FormData | string {
    return isPlainObject(data) ? JSON.stringify(data) : (data as FormData);
}

export function buildUrl(baseUrl: string, params?: RibbitRequestParams): string {
    if (!params) {
        return baseUrl;
    }

    const paramString = Object.entries(params)
        .map(([key, value]) => {
            switch (typeof value) {
                case 'boolean':
                    return `${key}=${value ? 1 : 0}`;
                default:
                    return `${key}=${value}`;
            }
        })
        .join('&');

    if (!paramString) {
        return baseUrl;
    }

    return `${baseUrl}?${paramString}`;
}
