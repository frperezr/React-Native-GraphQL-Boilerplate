import { View, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const DEVELOPMENT_URI = '127.0.0.1:5000';

const ApolloClientSetup = () => {
  // WebSocket Client
  const wsClient = new SubscriptionClient(`ws://${DEVELOPMENT_URI}/subscriptions`, {
    reconnect: true,
    connectionParams: {
      token: '',
    },
  });
  const wsLink = new WebSocketLink(wsClient);
  // Http Client
  const httpClient = new HttpLink({ uri: `http://${DEVELOPMENT_URI}/graphql` });

  // Auth Link
  const authLink = setContext(() => {
    return { token: '' };
  });

  // Link
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpClient
  );

  // Cache
  const cache = new InMemoryCache();

  // Client
  const client = new ApolloClient({
    link: authLink.concat(link),
    cache,
  });

  return { client, wsClient, httpClient };
};

export function withProvider(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <View>
          <ApolloProvider client={ApolloClientSetup().client}>
            <WrappedComponent
              {...this.props}
            />
          </ApolloProvider>
        </View>
      );
    }
  };
}
