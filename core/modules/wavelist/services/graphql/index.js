import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/wavelist/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickByWaveList = (variables) => useLazyQuery(Schema.getPickByWaveList, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByWaveById = (variables) => useQuery(Schema.getPickByWaveById, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByWaveItemById = (variables) => useQuery(Schema.getPickByWaveItemById, {
    variables, ...context, ...fetchPolicy,
});

export const donePickByWave = (variables) => useMutation(Schema.donePickByWave, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getPickByWaveList,
    getPickByWaveById,
    getPickByWaveItemById,
    donePickByWave,
};
