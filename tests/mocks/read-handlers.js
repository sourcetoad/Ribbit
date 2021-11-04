import {rest} from 'msw';
import {HttpStatusCode} from '../../src';
import {Action, baseUrl} from '../helpers';

export default [
    rest.get(`${baseUrl}/${Action.READ}/${HttpStatusCode.HTTP_OK}/:userId`, (request, response, context) => {
        return response(
            context.status(HttpStatusCode.HTTP_OK),
            context.json({
                data: {
                    id: parseInt(request.params.userId),
                    first_name: 'John',
                    last_name: 'Smith',
                    email: 'john.smith@example.com'
                },
            }),
        );
    }),
];
