import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider} from "@apollo/client"


const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3001/graphql"
  }),
  cache: new InMemoryCache()
})

ReactDOM.render(
<ApolloProvider client={client}>
    <App />
    </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
