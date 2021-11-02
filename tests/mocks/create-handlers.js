import {rest} from 'msw';
import {HttpStatusCode} from '../../src';
import {actions, buildUrl} from '../helpers';

export default [
    rest.post(buildUrl(`${actions.create}/${HttpStatusCode.HTTP_CREATED}`), (request, response, context) => {
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
