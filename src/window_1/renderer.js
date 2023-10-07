window.addEventListener('load', e => {
    document.querySelector('#btn1').addEventListener('click', () => {
        const value = document.querySelector('input').value;
        // 渲染进程触发函数 fnSetTitle
        window.bridgeApi.fnSetTitle(value);
    });
});