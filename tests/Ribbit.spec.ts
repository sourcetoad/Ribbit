
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
