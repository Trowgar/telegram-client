const telegram = window.Telegram.WebApp;

export function useTelegram() {

    const closeApp = () => {
        telegram.close();
    }

    const onToggleButton = () => {
        if (telegram.MainButton.isVisible) {
            telegram.MainButton.hide();
        } else {
            telegram.MainButton.show();
        }
    }

    return {
        closeApp,
        onToggleButton,
        telegram,
        user: telegram.initDataUnsafe?.user,
    }
}