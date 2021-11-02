import fetch, {Request, Response} from 'node-fetch';
import {server} from './tests/mocks';

beforeAll(() => {
    global.fetch = fetch;
    global.Request = Request;
    global.Response = Response;

    // Establish API mocking before all tests.
    server.listen()
});

afterEach(() => {
    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests.
    server.resetHandlers();
});

afterAll(() => {
    delete global.fetch;
    delete global.Request;
    delete global.Response;

    // Clean up after the tests are finished.
    server.close();
});
