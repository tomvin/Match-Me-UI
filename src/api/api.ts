import { OperationVariables, QueryOptions, ApolloQueryResult } from 'apollo-boost';
import { apolloClient } from '../modules/core/containers/App/App';

const query = <T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>): Promise<ApolloQueryResult<T>> => {
  return apolloClient.query<T, TVariables>(options);
}


export default {
  query
}
