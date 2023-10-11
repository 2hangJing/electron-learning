class Drag {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.active = false;
        this.fnEventBind();
    }
    fnMouseDown(x, y){
        this.x = x;
        this.y = y;
        this.active = true;
    }
    fnMouseMove(x, y){
        if(!this.active) return;
        const offsetX = x - this.x;
        const offsetY = y - this.y;
        window.bridgeApi.fnModifyPosition(offsetX, offsetY);
    }
    fnMouseUp(){
        this.active = false;
    }
    fnEventBind(){
        window.addEventListener('mousedown', e => this.fnMouseDown.call(this, e.pageX, e.pageY));
        window.addEventListener('mousemove', e => this.fnMouseMove.call(this, e.pageX, e.pageY));
        window.addEventListener('mouseup', e => this.fnMouseUp.call(this));
    }
};

window.addEventListener('load', async e => {
    const deviceGroup = await navigator.mediaDevices.enumerateDevices();
    console.log(`[${new Date().toLocaleString()}] - deviceGroup`, deviceGroup);

    const video = document.querySelector('video');
    const constraints = {audio: false, video: { width: 300, height: 300 }};
    navigator.mediaDevices.getUserMedia(constraints)
    .then(res => {
        console.log(`[${new Date().toLocaleString()}] - res`, res);
        video.srcObject = res;
        video.play();
    })
    .catch(err => console.log(`[${new Date().toLocaleString()}] - err`, err));


    // window.addEventListener('contextmenu', e => {
    //     // window.bridgeApi.fnQuit();
    //     // e.preventDefault()
    // });

    const drag = new Drag();
   
});