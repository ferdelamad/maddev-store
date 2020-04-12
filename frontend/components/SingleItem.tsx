import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

export const SINGLE_ITEM = gql`
  query SINGLE_ITEM($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
      image
    }
  }
`;

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

type Props = {
  id: string | string[]
};

const SingleItem: React.FC<Props> = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ITEM, {
    variables: { id }
  });

  return (
    <>
      {error && <p>Error: Item not found</p>}
      {loading && <p>Loading...</p>}
      I'm a single item
      {!data?.item && <p>No item found for id: {id}</p>}
      {data && data.item && (
        <SingleItemStyles>
          <Head>
            <title>Death Tech | {data.item.title}</title>
          </Head>
          <img src={data.item.largeImage} alt={data.title} />
          <div className="details">
            <h2>Viewing {data.item.title}</h2>
            <p>{data.item.description}</p>
          </div>
        </SingleItemStyles>
      )}
    </>
  )
};

export default SingleItem;
