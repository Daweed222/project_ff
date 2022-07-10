import React from 'react';
import { NavLink } from 'react-router-dom';

import { NavigationItems } from 'constants/NavigationItems';

const Header = () => {
    return (
        <header>
            <nav>
                { NavigationItems.map(item => <NavLink to={item.target}>
                    {item.text}
                </NavLink>) }
            </nav>
        </header>
    );
};

export default Header;