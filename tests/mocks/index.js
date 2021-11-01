import {setupServer} from 'msw/node';
import createHandlers from './create-handlers';
import readHandlers from './read-handlers';
import updateHandlers from './update-handlers';
import deleteHandlers from './delete-handlers';

export const handlers = [
    ...createHandlers,
    ...readHandlers,
    ...updateHandlers,
    ...deleteHandlers,
];

export const server = setupServer(...handlers);
