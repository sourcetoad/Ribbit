import {rest} from 'msw';
import {HttpStatusCode} from '../../src';
import {actions, buildUrl} from '../helpers';

export default [
    rest.put(buildUrl(`${actions.update}/${HttpStatusCode.HTTP_OK}`), (request, response, context) => {
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
    rest.patch(buildUrl(`${actions.update}/${HttpStatusCode.HTTP_OK}`), (request, response, context) => {
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
