import React from 'react';
import Button from "../Button/Button";

const Header = () => {
    const telegram = window.Telegram.WebApp;

    const closeApp = () => {
        telegram.close();
    }

    return (
        <div className={'header'}>
            <Button onClick={closeApp}>Close</Button>
            <span className={'username'}>
                {telegram.initDataUnsafe?.user?.username}
            </span>
        </div>
    );
};

export default Header;