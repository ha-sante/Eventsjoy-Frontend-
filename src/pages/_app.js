import React, { useState, useEffect } from 'react';

import { Provider } from 'next-auth/client'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink,  } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'


const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
}

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  uri: 'http://localhost:4200/graphql',
  cache: new InMemoryCache({ addTypename: false }),
  link: ApolloLink.from([link, new HttpLink({uri: 'http://localhost:4200/graphql'})]),
  "defaultOptions": defaultOptions,
});


export const UserEventsCollectionContext = React.createContext();

export default function App ({ Component, pageProps }) {

  // Collection for user created events
  const [getUserEventsCollection, setUserEventsCollection] = useState({
    events: [],
    updateEvents: (update)=>{
      this.setUserEventsCollection(update);
    }
  });
 
  return (
    <UserEventsCollectionContext.Provider value={getUserEventsCollection}>

      <Provider session={pageProps.session}>
    		<ApolloProvider client={client}>
    		    <Component {...pageProps} />
    		</ApolloProvider>
      </Provider>

    </UserEventsCollectionContext.Provider>
  )
}