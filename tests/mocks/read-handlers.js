import {rest} from 'msw';
import {HttpStatusCode, HttpVerb} from '../../src';
import {actions, buildUrl} from '../helpers';

export default [
    rest.get(buildUrl(`${actions.read}/${HttpStatusCode.HTTP_OK}`), (request, response, context) => {
        context.status(HttpStatusCode.HTTP_OK);
        context.json({
            data: {
                id: 1,
                first_name: 'John',
                last_name: 'Smith',
                email: 'john.smith@example.com'
            },
        });

        return response(context);
    }),
];
