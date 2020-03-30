import React from 'react'
import Link from 'next/link';

import NavStyles from './styles/NavStyles';

const Nav: React.FC = () => {
  return (
    <NavStyles>
      <Link href="/shop">
        <a>Shop</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <Link href="/orders">
        <a>Orders</a>
      </Link>
      <Link href="/account">
        <a>Account</a>
      </Link>
    </NavStyles>
  )
};

export default Nav;
