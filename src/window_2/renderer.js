window.addEventListener('load', e => {
    let count = 10;
    const domH2 = document.querySelector('h2');
    const fnChangeCount = changNum => domH2.innerText = (count += changNum);
    window.bridgeApi.fnChangeCount((e, count) => {
        fnChangeCount(count);
    });

    fnChangeCount(0);
});