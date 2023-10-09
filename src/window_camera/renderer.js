window.addEventListener('load', async e => {
    const deviceGroup = await navigator.mediaDevices.enumerateDevices();
    console.log(`[${new Date().toLocaleString()}] - deviceGroup`, deviceGroup);
});