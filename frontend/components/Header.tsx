import React from 'react';
import Nav from './Nav';

const Header: React.FC = () => {
  return (
    <div>
      <div>
        MAD DEV STORE
        <Nav />
      </div>
      <div>
        <p>Search</p>
      </div>
      <div>
        <p>Cart</p>
      </div>
    </div>
  );
};

export default Header;
