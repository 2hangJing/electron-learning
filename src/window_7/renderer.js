window.addEventListener('load', e => {
    document.querySelector('button').addEventListener('click', async e => {
        const result = window.bridgeApi.fnSendNotifications();
    });
});