
import Ribbit, {HttpStatusCode} from '../src';
import {actions, buildUrl} from './helpers';

describe('Test that you can make a successful call', () => {
    const api = new Ribbit();

    it('Test Create', async () => {
        const requestBody = {
            first_name: 'John',
            last_name: 'Smith',
            email: 'john.smith@example.com',
        };
        const request = api.post(buildUrl(`${actions.create}/${HttpStatusCode.HTTP_CREATED}`), requestBody);
        const response = await request.send();
        const responseBody = await response.json();

        expect(response.status).toBe(HttpStatusCode.HTTP_CREATED);
        expect(responseBody.data).toContain(requestBody);
    });
});
