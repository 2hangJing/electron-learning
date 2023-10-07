window.addEventListener('load', e => {
    document.querySelector('#btn1').addEventListener('click', async e => {
        const result = await window.bridgeApi.fnOpenMessageDialog();
        document.querySelector('#result1').innerText = JSON.stringify(result);
    });

    document.querySelector('#btn2').addEventListener('click', async e => {
        const result = await window.bridgeApi.fnOpenDialog();
        document.querySelector('#result2').innerText = JSON.stringify(result);
        document.querySelector('#result2_img').src = result.filePaths[0];
    });

    document.querySelector('#btn3').addEventListener('click', async e => {
        const result = await window.bridgeApi.fnOpenSaveDialog();
        document.querySelector('#result3').innerText = JSON.stringify(result);
    });
});