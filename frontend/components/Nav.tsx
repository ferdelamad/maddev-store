import React from 'react'
import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <div>
      <Link href="/">
        <a>Home page</a>
      </Link>
      <Link href="/sell">
        <a>Sell page</a>
      </Link>
    </div>
  )
};

export default Nav;
