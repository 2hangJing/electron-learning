window.addEventListener('load', e => {
    document.querySelector('#theme').addEventListener('click', async e => {
        const themeValue = document.querySelector('select').value;
        window.bridgeApi.fnSetThemeMode(themeValue);
    });


    document.querySelector('#customColorBtn').addEventListener('click', async e => {
        const bgColor = document.querySelector('#bgColor').value;
        const titleStyle = document.querySelector('#titleStyle').value;
        window.bridgeApi.fnSetCustomColor(bgColor, titleStyle);
    });
});