import { config } from './config';
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
        this.keyHeight = '';
        this.keyWidth = '';
        this.marginX = '';
        this.marginY = '';

        this.handleResize();
    }

    handleResize() {
        const bodyWidth = document.body.clientWidth;
        //解决canvas绘图模糊的问题 将canvas 本身放大scale倍，将dom缩小相应scale
        this.scale =  2 * bodyWidth / 375;

        const width = parseInt(bodyWidth);
        const height = parseInt(width / 2);
        this.canvas.width = width * 2;
        this.canvas.height = height * 2;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        this.context.fillStyle = config.backgroundColor;
        this.context.fillRect(0, 0, 2 * width, 2 * height);

        const bounds = this.canvas.getBoundingClientRect();
        this.offsetLeft = 2 * parseInt(bounds.left) || 0;
        this.offsetTop = 2 * parseInt(bounds.top) || 0;

        this.keyWidth = parseInt(30 * scale);
        this.keyHeight = 1.3 * keyWidth;
        this.marginX = parseInt(7 * scale);
        this.marginY = parseInt(10 * scale);

        const firstLineMarginLeft = parseInt(8 * scale);
        const secondLineMarginLeft = parseInt(firstLineMarginLeft + 1/2 * stepX);
        const thirdLineMarginLeft = secondLineMarginLeft;

        const firstLineMarginTop = (20 * scale);
        const normalFont = 25 ;
        this.canvas.font = `${normalFont * scale}px Helvetica Neue`;

        const genPoints = (item) => {
            return {
                x: (item.x - 1) * stepX,
                y: (item.y - 1) * stepY,
            }
        };

        const genFont = (item) => {
            return {
                x: parseInt((item.x - 1) * fontX + 1/2 * keyWidth),
                y: parseInt((item.y - 1) * fontY + 23/32 * keyHeight),
            }
        };

        //核心的渲染方法
        Object.keys(keyboardJson).forEach((obj) => {
            for (item of obj) {
                const value = obj[item];
                const points = genPoints(value);
                const fontPoints = genFont(value);

                if (item === 'del') {
                    value['x1'] = thirdLineMarginLeft + points.x;
                    value['x2'] = thirdLineMarginLeft + points.x + 2 * this.keyWidth + this.marginX;
                    value['y1'] = firstLineMarginTop + points.y;
                    value['y2'] = firstLineMarginTop + points.y + this.keyHeight;
                    value['fx'] = thirdLineMarginLeft + fontPoints.x;
                    value['fy'] = firstLineMarginTop + fontPoints.y;
                    drawBorder(this.context, value['x1'], value['y1'], 2 * this.keyWidth + this.marginX, this.keyHeight, 'stroke', 10, config.borderColor);
                    paintRect(this.context, value['x1'], value['y1'], 2 * this.keyWidth + this.marginX, this.keyHeight, config.contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
                    drawDelBtn(this.context, value['fx'] - 1/32 * this.keyWidth, value['fy'] + 1/16 * this.keyHeight, this.keyWidth + this.marginX + 1/16 * this.keyWidth , this.keyHeight * (1 + 1/8));

                    break;
                }

                value['x1'] = parseInt(firstLineMarginLeft + points.x);
                value['x2'] = value['x1'] + this.keyWidth;
                value['y1'] = parseInt(firstLineMarginTop + points.y);
                value['y2'] = value['y1'] + this.keyHeight;
                value['fx'] = firstLineMarginLeft + fontPoints.x;
                value['fy'] = firstLineMarginTop + fontPoints.y;

                drawBorder(this.context, value['x1'], value['y1'], this.keyWidth, this.keyHeight, 'stroke', 10, config.borderColor);
                paintRect(this.context, value['x1'], value['y1'], this.keyWidth, this.keyHeight, config.contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
                drawText(this.context, item, value['fx'], value['fy'], config.fontColor);
            }
        })
    }
}
