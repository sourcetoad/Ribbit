import {rest} from 'msw';
import {HttpStatusCode} from '../../src';
import {Action, baseUrl} from '../helpers';

export default [
    rest.get(`${baseUrl}/${Action.LIST}/${HttpStatusCode.HTTP_OK}`, (request, response, context) => {
        return response(
            context.status(HttpStatusCode.HTTP_OK),
            context.json({
                data: [
                    {
                        id: 1,
                        first_name: 'John',
                        last_name: 'Smith',
                        email: 'john.smith@example.com',
                    },
                    {
                        id: 2,
                        first_name: 'Jane',
                        last_name: 'Smith',
                        email: 'jane.smith@example.com',
                    },
                    {
                        id: 3,
                        first_name: 'Bob',
                        last_name: 'Roberts',
                        email: 'bob.roberts@example.com',
                    },
                    {
                        id: 4,
                        first_name: 'Betty',
                        last_name: 'Roberts',
                        email: 'betty.roberts@example.com',
                    },
                    {
                        id: 5,
                        first_name: 'Patrick',
                        last_name: 'Stewart',
                        email: 'patrick.stewart@example.com',
                    },
                    {
                        id: 6,
                        first_name: 'Johnathan',
                        last_name: 'Franks',
                        email: 'johnathan.franks@example.com',
                    },
                    {
                        id: 7,
                        first_name: 'LaVar',
                        last_name: 'Burton',
                        email: 'lavar.burton@example.com',
                    },
                    {
                        id: 8,
                        first_name: 'Michael',
                        last_name: 'Dorn',
                        email: 'michael.dorn@example.com',
                    },
                    {
                        id: 9,
                        first_name: 'Gates',
                        last_name: 'McFadden',
                        email: 'gates.mcfadden@example.com',
                    },
                    {
                        id: 10,
                        first_name: 'Brent',
                        last_name: 'Spiner',
                        email: 'brent.spiner@example.com',
                    },
                    {
                        id: 11,
                        first_name: 'Marina',
                        last_name: 'Sirtis',
                        email: 'marina.sirtis@example.com',
                    },
                    {
                        id: 12,
                        first_name: 'Will',
                        last_name: 'Wheaton',
                        email: 'wil.wheaton@example.com',
                    },
                    {
                        id: 13,
                        first_name: 'Whoopi',
                        last_name: 'Goldberg',
                        email: 'whoopi.goldberg@example.com',
                    },
                ],
            }),
            context.delay(1000),
        );
    }),
];
