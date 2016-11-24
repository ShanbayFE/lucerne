/* eslint max-len: "off" */
/* eslint no-mixed-operators: "off" */
/* "arrow-body-style": ["error", "always"] */
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

        // 解决canvas绘图模糊的问题 将canvas 本身放大scale倍，将dom缩小相应scale
        this.scale = 2 * bodyWidth / 375;

        const width = parseInt(bodyWidth, 10);
        const height = parseInt(width / 2, 10);
        this.canvas.width = width * 2;
        this.canvas.height = height * 2;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        this.context.fillStyle = config.backgroundColor;
        this.context.fillRect(0, 0, 2 * width, 2 * height);

        const bounds = this.canvas.getBoundingClientRect();
        this.offsetLeft = 2 * parseInt(bounds.left, 10) || 0;
        this.offsetTop = 2 * parseInt(bounds.top, 10) || 0;

        this.keyWidth = parseInt(30 * this.scale, 10);
        this.keyHeight = 1.3 * this.keyWidth;
        this.marginX = parseInt(7 * this.scale, 10);
        this.marginY = parseInt(10 * this.scale, 10);

        const stepX = this.keyWidth + this.marginX;
        const stepY = this.keyHeight + this.marginY;
        const fontX = this.keyWidth + this.marginX;
        const fontY = this.keyHeight + this.marginY;

        const firstLineMarginLeft = parseInt(8 * this.scale, 10);
        const secondLineMarginLeft = parseInt(firstLineMarginLeft + 1 / 2 * stepX, 10);
        const thirdLineMarginLeft = secondLineMarginLeft;

        const firstLineMarginTop = (20 * this.scale, 10);

        const normalFont = 25;
        this.canvas.font = `${normalFont * this.scale}px Helvetica Neue`;

        const genPoints = (item) => {
            return {
                x: (item.x - 1) * stepX,
                y: (item.y - 1) * stepY,
            };
        };

        const genFont = (item) => {
            return {
                x: parseInt((item.x - 1) * fontX + 1 / 2 * this.keyWidth, 10),
                y: parseInt((item.y - 1) * fontY + 23 / 32 * this.keyHeight, 10),
            };
        };

        // 核心的渲染方法
        Object.keys(keyboardJson).forEach((obj) => {
            for (const item of obj) {
                const value = obj[item];
                const points = genPoints(value);
                const fontPoints = genFont(value);

                if (item === 'del') {
                    value.x1 = thirdLineMarginLeft + points.x;
                    value.x2 = thirdLineMarginLeft + points.x + 2 * this.keyWidth + this.marginX;
                    value.y1 = firstLineMarginTop + points.y;
                    value.y2 = firstLineMarginTop + points.y + this.keyHeight;
                    value.fx = thirdLineMarginLeft + fontPoints.x;
                    value.fy = firstLineMarginTop + fontPoints.y;

                    utils.drawBorder(this.context, value.x1, value.y1, 2 * this.keyWidth + this.marginX, this.keyHeight, 'stroke', 10, config.borderColor);
                    utils.paintRect(this.context, value.x1, value.y1, 2 * this.keyWidth + this.marginX, this.keyHeight, config.contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
                    utils.drawDelBtn(this.context, value.fx - 1 / 32 * this.keyWidth, value.fy + 1 / 16 * this.keyHeight, this.keyWidth + this.marginX + 1 / 16 * this.keyWidth, this.keyHeight * (1 + 1 / 8));

                    break;
                }

                value.x1 = parseInt(firstLineMarginLeft + points.x, 10);
                value.x2 = value.x1 + this.keyWidth;
                value.y1 = parseInt(firstLineMarginTop + points.y, 10);
                value.y2 = value.y1 + this.keyHeight;
                value.fx = firstLineMarginLeft + fontPoints.x;
                value.fy = firstLineMarginTop + fontPoints.y;

                utils.drawBorder(this.context, value.x1, value.y1, this.keyWidth, this.keyHeight, 'stroke', 10, config.borderColor);
                utils.paintRect(this.context, value.x1, value.y1, this.keyWidth, this.keyHeight, config.contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
                utils.drawText(this.context, item, value.fx, value.fy, config.fontColor);
            }
        });
    }

    bindEvent() {
        window.addEventListener('resize', this.handleResize);
        this.canvas.addEventListener('touchend', ((e) => {
            e.preventDefault();
            const x = e.changedTouches[0].clientX;
            const y = e.changedTouches[0].clientY;
            let result;
            Object.keys(keyboardJson).forEach((line) => {
                for (const item of line) {
                    const value = line[item];
                    if (!result && this.checkPoints(x, y, value)) {
                        result = item;
                        this.clickAnimation(line[item]);
                    }
                }
            });
            if (result) this.onClick(result, e);
        }));
    }

    checkPoints(x, y, item) {
        x = 2 * x;
        y = 2 * y;
        if (x >= this.offsetLeft + item.x1 && x <= this.offsetLeft + item.x2 && y >= this.offsetTop + item.y1 && y <= this.offsetTop + item.y2) {
            return true;
        }
        return false;
    }

    clickAnimation(item, char) {
        utils.paintRect(this.canvas, item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1, '#eee');
        setTimeout(() => {
            if (char !== 'del') {
                utils.paintRect(this.canvas, item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1, '#fff');
                utils.drawText(this.canvas, char, item.fx, item.fy, config.fontColor);
            } else {
                utils.paintRect(this.canvas, item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1, '#fff');
                utils.drawDelBtn(this.canvas, item.fx - 1 / 32 * this.keyWidth, item.fy + 1 / 16 * this.keyHeight, this.keyWidth + this.marginX + 1 / 16 * this.keyWidth, this.keyHeight * (1 + 1 / 8));
            }
        }, 100);
    }
}
window.Keyboard = Keyboard;
