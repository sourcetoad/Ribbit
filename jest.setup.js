import {server} from './tests/mocks';
import fetch, {Request, Response} from 'node-fetch';

global.fetch = fetch;
global.Request = Request;
global.Response = Response;

beforeAll(() => {
    // Establish API mocking before all tests.
    server.listen()
});

afterEach(() => {
    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests.
    server.resetHandlers();
});

afterAll(() => {
    // Clean up after the tests are finished.
    server.close();
});
