import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import Search from '../Search/Search';

function Header() {
  return (
    <div className="header">
       
      <Link to="/" className="logo">
        <span>Moovi</span>
      </Link>
      <Search searchMedias={(searchQuery: string) => {
                getSearchResults({
                    variables: {
                        mediaType: MediaEnum.All,
                        query: searchQuery,
                        sessionId: sessionId,
                        page: 1
                    }
                })
            }} />
      <ul className="nav">
        <NavLink to="/movie" className="nav__item">
          Films
        </NavLink>
        <NavLink to="/tv" className="nav__item">
          Séries TV
        </NavLink>
        <NavLink to="/watchlist" className="nav__item">
          Watchlist
        </NavLink>
      </ul>
    </div>
  );
}

export default Header;
