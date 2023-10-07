window.addEventListener('load', e => {

    document.querySelector('#btn1').addEventListener('click', () => {
        window.bridgeApi.fnCreateWindow_1();
    });
    document.querySelector('#btn2').addEventListener('click', () => {
        window.bridgeApi.fnCreateWindow_2();
    });
    document.querySelector('#btn3').addEventListener('click', () => {
        window.bridgeApi.fnCreateWindow_3();
    });
    document.querySelector('#btn4').addEventListener('click', () => {
        window.bridgeApi.fnCreateWindow_4();
    });
    document.querySelector('#btn5').addEventListener('click', () => {
        window.bridgeApi.fnCreateWindow_5();
    });
    document.querySelector('#btn6').addEventListener('click', () => {
        window.bridgeApi.fnCreateWindow_6();
    });

});