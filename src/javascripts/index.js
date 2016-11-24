import { config.backgroundColor as backgroundColor } from './config';
import { utils } from './utils';
import keyboardJson from './data';

class Keyboard {
    constructor(className = '') {
        const canvas = document.createElement('canvas');
        document.body.insertBefore(canvas, document.body.childNodes[0]);

        this.canvas = document.getElementsByTagName('canvas')[0];
        this.canvas.className = className;
        this.context = this.canvas.getContext('2d');

        this.isShowing = false;
        this.offsetTop = '';
        this.offsetLeft = '';
        this.scale = '';

        this.handleResize();
    }

    handleResize() {
        const bodyWidth = document.body.clientWidth;
        this.scale =  2 * bodyWidth / 375;  //解决canvas绘图模糊的问题

        const width = parseInt(bodyWidth);
        const height = parseInt(width / 2);
        this.canvas.width = width * 2;
        this.canvas.height = height * 2;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        this.context.fillStyle = backgroundColor;
        this.context.fillRect(0, 0, 2 * width, 2 * height);

        const bounds = this.canvas.getBoundingClientRect();
        this.offsetLeft = 2 * parseInt(bounds.left) || 0;
        this.offsetTop = 2 * parseInt(bounds.top) || 0;
    }
}
