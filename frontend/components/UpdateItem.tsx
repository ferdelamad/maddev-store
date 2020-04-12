import React, { FormEvent, ChangeEvent } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Form from './styles/Form';
import { useForm } from '../hooks';

type Props = {
  id: string | string[],
}

type UseForm = {
  values: Values;
  handleSubmit: (event: FormEvent) => void;
  handleChange: (event: ChangeEvent) => void;
}

type Values = {
  title?: string;
  price?: number;
  description?: string;
}

export const GET_SINGLE_ITEM = gql`
  query GET_SINGLE_ITEM($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UPDATE_ITEM(
    $id: ID!
    $description: String
    $price: Int
    $title: String
  ) {
    updateItem(
      where: { id: $id}
      data: {
        description: $description
        price: $price
        title: $title
      }
    ) {
      id
      description
      price
      title
    }
  }
`;

const UpdateItem: React.FC<Props> = ({ id }) => {

  const onSubmit = async () => {
    const item = await updateItem({
      variables: {
        // pass the ID to identify the item
        id,
        ...values,
      }
    });
  }

  const { values, handleSubmit, handleChange }: UseForm = useForm(onSubmit)
  const [updateItem, { data, error, loading }] = useMutation(UPDATE_ITEM);
  const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_SINGLE_ITEM, {
    variables: { id }
  });

  return (
    <>
      {queryError && <p>Error getting the item</p>}
      {queryLoading && <p>Loading...</p>}
      {!queryData?.item && <p>No item found for {id}</p>}
      {queryData && queryData.item && (
        <Form onSubmit={handleSubmit}>
          {/* TODO: refactor this */}
          {error && <p>There was an error!</p>}
          <fieldset disabled={loading} aria-busy={loading}>

            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                defaultValue={queryData.item.title}
                required
              />
            </label>

            <label htmlFor="price">
              Price
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                defaultValue={queryData.item.price}
                required
              />
            </label>

            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="Enter a description"
                onChange={handleChange}
                defaultValue={queryData.item.description}
                required
              />
            </label>

            <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
          </fieldset>
        </Form>
      )}
    </>
  );
}

export default UpdateItem;
