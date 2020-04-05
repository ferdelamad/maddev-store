import React, { FormEvent, ChangeEvent } from 'react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import { useForm } from '../hooks';

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

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
    $title: String!
  ) {
    createItem(
      data: {
        description: $description
        image: $image
        largeImage: $largeImage
        price: $price
        title: $title
      }
    ) {
      id
    }
  }
`;

const CreateItem: React.FC = () => {
  const onSubmit = async () => {
    const item = await createItem({ variables: values})

    Router.push({
      pathname: '/item',
      query: { id: item.data.createItem.id },
    });
  }

  const { values, handleSubmit, handleChange }: UseForm = useForm(onSubmit)
  const [createItem, { data, error, loading }]= useMutation(CREATE_ITEM_MUTATION);

  console.log('DATA', data);

  return (
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
            value={values?.title || ''}
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
            value={values?.price || ''}
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
            value={values?.description || ''}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  )
}

export default CreateItem;
