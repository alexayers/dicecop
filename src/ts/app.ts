import {DiceCop} from "./app/diceCop";
require('../css/main.css');

let diceCop : DiceCop;

window.onload = () => {
    diceCop  = new DiceCop();
    diceCop.init();
    diceCop.resize();
};

window.onresize = function() {
    diceCop.resize();
};
