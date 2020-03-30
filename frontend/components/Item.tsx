import React from 'react'
import Link from 'next/link';

import { Item as ItemType } from '../types/Item';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import { formatMoney } from '../lib';

type Props = {
  item: ItemType
};

const Item: React.FC<Props> = ({ item }) => {
  const {
    id,
    title,
    price,
    description,
    image,
    largeImage,
  } = item;

  return (
    <ItemStyles>
      {image && <img src={image} alt={title} />}

      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id }
          }}
        >
          <a>{ title }</a>
        </Link>
      </Title>

      <PriceTag>
        {formatMoney(price)}
      </PriceTag>

      <p>{ description }</p>

      <div className="buttonList">
        <Link href={{
          pathname: 'update',
          query: { id }
        }}>
          <a>Edit ✏️</a>
        </Link>
        <button>Add to cart</button>
        <button>Delete</button>
      </div>
    </ItemStyles>
  )
}

export default Item;
