import Ribbit from '../src';
import {buildBody, buildUrl} from '../src/RequestHelpers';
import {baseUrl} from './helpers';

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
        const result = buildBody(requestBody);

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
        const result = buildBody(requestBody);

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
        const result = buildUrl(baseUrl, params);

        // Assert
        expect(result).toBe(`${baseUrl}?created_at=desc&id=desc`);
    });

    it('Can handle number params', () => {
        // Arrange
        const params = {page: 2, per_page: 15};

        // Act
        const result = buildUrl(baseUrl, params);

        // Assert
        expect(result).toBe(`${baseUrl}?page=2&per_page=15`);
    });

    it('Can handle boolean params', () => {
        // Arrange
        const params = {all: true, with_deleted: false};

        // Act
        const result = buildUrl(baseUrl, params);

        // Assert
        expect(result).toBe(`${baseUrl}?all=1&with_deleted=0`);
    });

    it('Can handle empty object', () => {
        // Act
        const result = buildUrl(baseUrl, {});

        // Assert
        expect(result).toBe(baseUrl);
    });

    it('Can handle undefined', () => {
        // Act
        const result = buildUrl(baseUrl, undefined);

        // Assert
        expect(result).toBe(baseUrl);
    });
});
