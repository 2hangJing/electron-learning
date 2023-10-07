window.addEventListener('load', e => {
    document.querySelector('#btn1').addEventListener('click', async () => {
        const path = await window.bridgeApi.fnGetImagePath();
        const domInput = document.querySelector('input');
        domInput.value = path;
    });
});