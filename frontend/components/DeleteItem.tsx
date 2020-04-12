import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

export const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    deleteItem(where: { id: $id}) {
      id
    }
  }
`;

type Props = {
  id: string
};

const DeleteItem: React.FC<Props> = ({ id, children }) => {
  const client = useApolloClient();

  const update = (cache, payload) => {
    // 1. Read the cache to get all items on the page
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
    // 2. Filter the deleted item
    const items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // 3. Put items back
    client.writeQuery({ query: ALL_ITEMS_QUERY, data: { ...data, items } });
  };

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem({
        variables: { id },
        update,
      });
    }
  };

  const [deleteItem, { data, error, loading }] = useMutation(DELETE_ITEM);

  return (
    <button onClick={handleClick}>{ children }</button>
  )
}

export default DeleteItem;
