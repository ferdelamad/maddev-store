import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import Item from './Item';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const Items: React.FC = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY);

  return (
    <Center>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ItemsList>
          {data.items.map(item => <Item key={item.id} item={item} />)}
        </ItemsList>
      )}
    </Center>
  )
}

export default Items;
