import {rest} from 'msw';
import {HttpStatusCode} from '../../src';
import {Action, baseUrl} from '../helpers';

export default [
    rest.post(`${baseUrl}/${Action.CREATE}/${HttpStatusCode.HTTP_CREATED}`, (request, response, context) => {
        const {first_name, last_name, email} = request.body;
        return response(
            context.status(HttpStatusCode.HTTP_CREATED),
            context.json({
                data: {
                    id: 1,
                    first_name,
                    last_name,
                    email,
                },
            })
        );
    }),
];
