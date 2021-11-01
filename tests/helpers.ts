export const baseUrl = 'http://tests.example.com';

export const actions = Object.freeze({
    list: 'list',
    create: 'create',
    read: 'read',
    update: 'update',
    delete: 'delete',
});

export function buildUrl(path = '') {
    if (!path) {
        return baseUrl
    }

    return `${baseUrl}/${path}`;
}
