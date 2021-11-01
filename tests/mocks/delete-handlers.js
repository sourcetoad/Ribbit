import {rest} from 'msw';
import {HttpStatusCode, HttpVerb} from '../../src';
import {actions, buildUrl} from '../helpers';

export default [
    rest.delete(buildUrl(`${actions.delete}/${HttpStatusCode.HTTP_NO_CONTENT}`), (request, response, context) => {
        context.status(HttpStatusCode.HTTP_NO_CONTENT);
        context.json('');

        return response(context);
    }),
];
