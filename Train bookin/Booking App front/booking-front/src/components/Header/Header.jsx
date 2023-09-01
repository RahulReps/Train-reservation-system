import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { Outlet } from 'react-router-dom';

export default function Header(props) {
  const [activetab, setActivetab] = useState('Home');

  return (
    <div style={{ width: '100%' }}>
      <div className='headnav'>
        <div className='branding'>
          <h1 className='brand-name'>VRCTC</h1>
        </div>
        <nav className='nav-links'>
          <Link
            to=''
            state={props}
            onClick={() => setActivetab('Home')}
            className={
              activetab === 'Home'
                ? 'head-ele head-ele-ltr head-ele-active'
                : 'head-ele head-ele-ltr'
            }
          >
            Home
          </Link>
          <Link
            to='book-train'
            onClick={() => setActivetab('Book')}
            state={props}
            className={
              activetab === 'Book'
                ? 'head-ele head-ele-ltr head-ele-active'
                : 'head-ele head-ele-ltr'
            }
          >
            Book
          </Link>
          <Link
            to='my-train'
            onClick={() => setActivetab('My Trains')}
            state={props}
            className={
              activetab === 'My Trains'
                ? 'head-ele head-ele-ltr head-ele-active'
                : 'head-ele head-ele-ltr'
            }
          >
            My Trains
          </Link>
        </nav>
        <Link to='user-info' state={props}>
        <div className='user-ele'>
          <div className='user-font'>
              {props.name}
          </div>
          </div>

        </Link>
      </div>
      <Outlet />
    </div>
  );
}
