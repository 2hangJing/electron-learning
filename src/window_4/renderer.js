window.addEventListener('load', e => {
    document.querySelector('button').addEventListener('click', e => {
        const w = document.querySelector('.width').value;
        const h = document.querySelector('.height').value;
        window.bridgeApi.fnSetScreenWH(w, h);
    });
});