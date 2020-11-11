import { useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables,
    context: {
        request: 'internal',
    },
});

export default {
    getCompanyList,
};
