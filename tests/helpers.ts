export const actions: Record<string, string> = Object.freeze({
    list: 'list',
    create: 'create',
    read: 'read',
    update: 'update',
    delete: 'delete',
});

export const baseUrl: string = 'http://tests.example.com';

export function buildUrl(path: string = ''): string {
    if (!path) {
        return baseUrl
    }

    return `${baseUrl}/${path}`;
}
