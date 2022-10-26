import { gql, useMutation } from '@apollo/client';

exports.CREATE_EVENT_MUTATION = gql`
  mutation create_event($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;