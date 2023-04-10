export function useTelegram() {
    const telegram = window.Telegram?.WebApp;

    const closeApp = () => {
        if (telegram) {
            telegram.close();
        }
    };

    const onToggleButton = () => {
        if (telegram?.MainButton.isVisible) {
            telegram.MainButton.hide();
        } else {
            telegram.MainButton.show();
        }
    };

    return {
        closeApp,
        onToggleButton,
        telegram,
        user: telegram?.initDataUnsafe?.user,
    };
}
