import {rest} from 'msw';
import {HttpStatusCode} from '../../src';
import {Action, baseUrl} from '../helpers';

export default [
    rest.put(`${baseUrl}/${Action.UPDATE}/${HttpStatusCode.HTTP_OK}/:userId`, (request, response, context) => {
        const {userId} = request.params;
        const {first_name, last_name, email} = request.body;
        return response(
            context.status(HttpStatusCode.HTTP_OK),
            context.json({
                data: {
                    id: parseInt(userId),
                    first_name,
                    last_name,
                    email
                },
            })
        );
    }),
    rest.patch(`${baseUrl}/${Action.UPDATE}/${HttpStatusCode.HTTP_OK}/:userId`, (request, response, context) => {
        const {userId} = request.params;
        const {first_name, last_name, email} = request.body;
        return response(
            context.status(HttpStatusCode.HTTP_OK),
            context.json({
                data: {
                    id: parseInt(userId),
                    first_name,
                    last_name,
                    email
                },
            })
        );
    }),
];
