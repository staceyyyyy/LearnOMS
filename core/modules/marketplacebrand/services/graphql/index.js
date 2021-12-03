import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/marketplacebrand/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreList = (variables) => useLazyQuery(Schema.getStoreList, {
    variables, ...context, ...fetchPolicy,
});

export const registerMarketplaceBrand = (variables) => useMutation(Schema.registerMarketplaceBrand, {
    variables, ...context,
});

export const getAvailableMpToConnect = (variables) => useLazyQuery(Schema.getAvailableMpToConnect, {
    variables, ...context, ...fetchPolicy,
});

export const getLocationList = (variables) => useLazyQuery(Schema.getLocationList, {
    variables, ...context, ...fetchPolicy,
});

export const disconnectMarketplaceChannel = (variables) => useMutation(Schema.disconnectMarketplaceChannel, {
    variables, ...context,
});

export const reconnectMarketplaceChannel = (variables) => useMutation(Schema.reconnectMarketplaceChannel, {
    variables, ...context,
});

export const updateMarketplaceLocation = (variables) => useMutation(Schema.updateMarketplaceLocation, {
    variables, ...context,
});

export const updateConnectedMarketplace = (variables) => useMutation(Schema.updateConnectedMarketplace, {
    variables, ...context,
});

export const registerMarketplaceChannel = (variables) => useMutation(Schema.registerMarketplaceChannel, {
    variables, ...context,
});

export const getMarketplaceCredentials = (variables) => useQuery(Schema.getMarketplaceCredentials, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getStoreList,
    registerMarketplaceBrand,
    getAvailableMpToConnect,
    getLocationList,
    reconnectMarketplaceChannel,
    disconnectMarketplaceChannel,
    registerMarketplaceChannel,
    updateMarketplaceLocation,
    getMarketplaceCredentials,
    updateConnectedMarketplace,
};
