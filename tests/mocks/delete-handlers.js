import {rest} from 'msw';
import {HttpStatusCode} from '../../src';
import {Action, baseUrl} from '../helpers';

export default [
    rest.delete(`${baseUrl}/${Action.DELETE}/${HttpStatusCode.HTTP_NO_CONTENT}/:userId`, (request, response, context) => {
        return response(
            context.status(HttpStatusCode.HTTP_NO_CONTENT),
            context.json('')
        );
    }),
];
