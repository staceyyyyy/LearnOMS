import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPriorityLocationList = (variables) => useLazyQuery(Schema.getPriorityLocationList, {
    variables, ...context, ...fetchPolicy,
});

export const getPriorityLocationById = (variables) => useQuery(Schema.getPriorityLocationById, {
    variables, ...context, ...fetchPolicy,
});

export const createPriorityLocation = (variables) => useMutation(Schema.createPriorityLocation, {
    variables, ...context,
});

export const updatePriorityLocation = (variables) => useMutation(Schema.updatePriorityLocation, {
    variables, ...context,
});
export const getChannelList = (variables) => useLazyQuery(Schema.getChannelList, {
    variables, ...context, ...fetchPolicy,
});
export const getCityList = () => useLazyQuery(Schema.getCityList, {
    ...context, ...fetchPolicy,
});
export const getLocationList = (variables) => useLazyQuery(Schema.getLocationList, {
    variables, ...context, ...fetchPolicy,
});

export const deletePriorityLocation = (variables) => useMutation(Schema.deletePriorityLocation, {
    variables, ...context,
});
export const multideletePriorityLocation = (variables) => useMutation(Schema.multideletePriorityLocation, {
    variables, ...context,
});

export default {
    getPriorityLocationList,
    getPriorityLocationById,
    createPriorityLocation,
    updatePriorityLocation,
    getChannelList,
    getCityList,
    getLocationList,
    deletePriorityLocation,
    multideletePriorityLocation,
};
