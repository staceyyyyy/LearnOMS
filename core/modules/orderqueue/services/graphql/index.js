import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/orderqueue/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderQueueList = (variables) => useLazyQuery(Schema.getOrderQueueList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getOrderQueueById = (variables) => useQuery(Schema.getOrderQueueById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const setReallocation = (variables) => useMutation(Schema.setReallocation, {
    variables,
    ...context,
});

export const isAccessAllowed = (variables) => useQuery(Schema.isAccessAllowed, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const isAccessAllowedLazy = (options) => useLazyQuery(Schema.isAccessAllowed, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const exportOrderToCsv = (options) => useLazyQuery(Schema.exportOrderToCsv, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const bulkOrderReallocation = (variables) => useMutation(Schema.bulkOrderReallocation, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const orderImport = (variables) => useMutation(Schema.orderImport, {
    variables,
    ...context,
});

export const acceptMarketplaceOrderQueue = (variables) => useMutation(Schema.acceptMarketplaceOrderQueue, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const marketplaceFetchOrder = (variables) => useMutation(Schema.marketplaceFetchOrder, {
    variables,
    ...context,
});

export const editOrderItem = (variables) => useMutation(Schema.editOrderItem, {
    variables,
    ...context,
});

export const cancelOrder = (variables) => useMutation(Schema.cancelOrder, {
    variables,
    ...context,
});

export const getLocationOptions = (options) => useLazyQuery(Schema.getLocationOptions, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getUniqueProductFromSource = (variables) => useLazyQuery(Schema.getUniqueProductFromSource, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getLocationBySourceAndChannel = (variables) => useLazyQuery(Schema.getLocationBySourceAndChannel, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getHistoryOrderItemList = (variables) => useLazyQuery(Schema.getHistoryOrderItemList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getOrderQueueList,
    getOrderQueueById,
    setReallocation,
    isAccessAllowed,
    exportOrderToCsv,
    bulkOrderReallocation,
    downloadSampleCsv,
    orderImport,
    isAccessAllowedLazy,
    acceptMarketplaceOrderQueue,
    getActivity,
    marketplaceFetchOrder,
    editOrderItem,
    cancelOrder,
    getLocationOptions,
    getUniqueProductFromSource,
    getLocationBySourceAndChannel,
    getHistoryOrderItemList,
};
