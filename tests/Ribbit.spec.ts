
import Ribbit, {HttpStatusCode} from '../src';
import {hasOwnProperty} from '../src/helpers';
import {Action, baseUrl} from './helpers';

describe('Test that you can make a successful call', () => {
    const api = new Ribbit();

    it('Test Get', async () => {
        // Act
        const request = api.get(`${baseUrl}/${Action.READ}/${HttpStatusCode.HTTP_OK}/1`);
        const response = await request.send();
        const responseBody = await response.json();

        // Assert
        expect(response.status).toBe(HttpStatusCode.HTTP_OK);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe('John');
        expect(responseBody.data.last_name).toBe('Smith');
        expect(responseBody.data.email).toBe('john.smith@example.com');
    });

    it('Test Post', async () => {
        // Arrange
        const requestBody = {
            first_name: 'John',
            last_name: 'Smith',
            email: 'john.smith@example.com',
        };

        // Act
        const request = api.post(`${baseUrl}/${Action.CREATE}/${HttpStatusCode.HTTP_CREATED}`, requestBody);
        const response = await request.send();
        const responseBody = await response.json();

        // Assert
        expect(response.status).toBe(HttpStatusCode.HTTP_CREATED);
        expect(responseBody.data.first_name).toBe(requestBody.first_name);
        expect(responseBody.data.last_name).toBe(requestBody.last_name);
        expect(responseBody.data.email).toBe(requestBody.email);
    });

    it('Test Patch', async () => {
        // Arrange
        const requestBody = {
            first_name: 'John',
            last_name: 'Smith',
            email: 'john.smith@example.com',
        };

        // Act
        const request = api.patch(`${baseUrl}/${Action.UPDATE}/${HttpStatusCode.HTTP_OK}/1`, requestBody);
        const response = await request.send();
        const responseBody = await response.json();

        // Assert
        expect(response.status).toBe(HttpStatusCode.HTTP_OK);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe(requestBody.first_name);
        expect(responseBody.data.last_name).toBe(requestBody.last_name);
        expect(responseBody.data.email).toBe(requestBody.email);
    });

    it('Test Put', async () => {
        // Arrange
        const requestBody = {
            first_name: 'John',
            last_name: 'Smith',
            email: 'john.smith@example.com',
        };

        // Act
        const request = api.put(`${baseUrl}/${Action.UPDATE}/${HttpStatusCode.HTTP_OK}/1`, requestBody);
        const response = await request.send();
        const responseBody = await response.json();

        // Assert
        expect(response.status).toBe(HttpStatusCode.HTTP_OK);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe(requestBody.first_name);
        expect(responseBody.data.last_name).toBe(requestBody.last_name);
        expect(responseBody.data.email).toBe(requestBody.email);
    });

    it('Test Delete', async () => {
        // Act
        const request = api.delete(`${baseUrl}/${Action.DELETE}/${HttpStatusCode.HTTP_NO_CONTENT}/1`);
        const response = await request.send();
        const responseBody = await response.json();

        // Assert
        expect(response.status).toBe(HttpStatusCode.HTTP_NO_CONTENT);
        expect(responseBody).toBe('');
    });
});

describe('That the buildBody() function works as expected', () => {
    const api = new Ribbit();

    it('When you give it a simple object it returns a json string', () => {
        // Arrange
        const requestBody = {
            first_name: 'John',
            last_name: 'Smith',
            email: 'john.smith@example.com',
        };

        // Act
        const result = api.buildBody(requestBody);

        // Assert
        expect(result).toStrictEqual(JSON.stringify(requestBody));
    });

    it('When you pass it a FormData object it returns it', () => {
        // Arrange
        const requestBody = new FormData()
        requestBody.append('first_name', 'John');
        requestBody.append('last_name', 'Smith');
        requestBody.append('email', 'john.smith@example.com');

        // Act
        const result = api.buildBody(requestBody);

        // Assert
        expect(result).toBeInstanceOf(FormData);
        if (result instanceof FormData) {
            requestBody.forEach((value, key) => {
                expect(result.has(key)).toBeTruthy();
                expect(result.get(key)).toBe(value);
            });
        }
    });
});

describe('That the buildUrl() function works as expected', () => {
    const api = new Ribbit();

    it('Can handle string params', () => {
        // Arrange
        const params = {created_at: 'desc', id: 'desc'};

        // Act
        const result = api.buildUrl(baseUrl, params);

        // Assert
        expect(result).toBe(`${baseUrl}?created_at=desc&id=desc`);
    });

    it('Can handle number params', () => {
        // Arrange
        const params = {page: 2, per_page: 15};

        // Act
        const result = api.buildUrl(baseUrl, params);

        // Assert
        expect(result).toBe(`${baseUrl}?page=2&per_page=15`);
    });

    it('Can handle boolean params', () => {
        // Arrange
        const params = {all: true, with_deleted: false};

        // Act
        const result = api.buildUrl(baseUrl, params);

        // Assert
        expect(result).toBe(`${baseUrl}?all=1&with_deleted=0`);
    });

    it('Can handle empty object', () => {
        // Act
        const result = api.buildUrl(baseUrl, {});

        // Assert
        expect(result).toBe(baseUrl);
    });

    it('Can handle undefined', () => {
        // Act
        const result = api.buildUrl(baseUrl, undefined);

        // Assert
        expect(result).toBe(baseUrl);
    });
});

describe('That you can override the default headers', () => {
    const headers: Record<string, string> = {
        'Accept': 'text/html',
        'Content-Type': 'application/json',
        'x-custom-header': 'bar',
    };

    it('By extending the class', () => {
        // Arrange
        class Foo extends Ribbit {
            static get defaultHeaders(): Record<string, string> {
                return headers;
            }
        }
        const api = new Foo();

        // Act
        const request = api.get(`${baseUrl}/${Action.READ}/${HttpStatusCode.HTTP_OK}`);

        // Assert
        for (const key in headers) {
            if (hasOwnProperty(headers, key)) {
                expect(request.request.headers.has(key)).toBeTruthy();
                expect(request.request.headers.get(key)).toBe(headers[key]);
            }
        }
    });

    it('In the method call', () => {
        // Arrange
        const api = new Ribbit();

        // Act
        const request = api.get(`${baseUrl}/${Action.READ}/${HttpStatusCode.HTTP_OK}`, {}, {headers});

        // Assert
        for (const key in headers) {
            if (hasOwnProperty(headers, key)) {
                expect(request.request.headers.has(key)).toBeTruthy();
                expect(request.request.headers.get(key)).toBe(headers[key]);
            }
        }
    });
});

describe('You can abort a request', () => {
    const api = new Ribbit();

    it('By calling abort()', async () => {
        // Arrange
        const request = api.get(`${baseUrl}/${Action.LIST}/${HttpStatusCode.HTTP_OK}`);
        const signal = request.controller.signal;
        const handler = jest.fn();

        signal.addEventListener('abort', handler);

        // Act
        await request.send();
        request.abort();

        // Assert
        expect(handler).toBeCalledTimes(1);
        expect(signal.aborted).toBeTruthy();
    });
});
