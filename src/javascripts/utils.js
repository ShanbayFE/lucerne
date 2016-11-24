import config from './config';

const reset2default = (ctx) => {
    ctx.lineWidth = 1;
    ctx.fillStyle = '#000'
    ctx.strokeStyle = '#000';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = 'left';
}

const utils = {
    drawBorder: (ctx, x, y, width, height, type = 'stroke', borderRadius = 0, color = config.borderColor) => {
        borderRadius = borderRadius >= 0 ? +borderRadius : 0;

        const radius = {
            tl: borderRadius,
            tr: borderRadius,
            bl: borderRadius,
            br: borderRadius
        };

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);

        if (type === 'fill') {
            ctx.fillStyle = color;
            ctx.fill();
        } else if (type === 'stroke') {
            ctx.strokeStyle = color;
            ctx.stroke();
        }
        ctx.closePath();
        resetConfig(ctx);
    },
    drawDelBtn: (ctx, x, y, width, height, borderRadius = 0) => {
        borderRadius = borderRadius >= 0 ? +borderRadius : 0;

        ctx.beginPath();
        ctx.strokeStyle = '#5b5b5b';
        ctx.lineWidth = 5;

        ctx.moveTo(x + 1/4 * width - 1, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y - 1/2 * height);
        ctx.lineTo(x + 1/4 * width, y - 1/2 * height);
        ctx.lineTo(x, y - 1/4 * height);
        ctx.lineTo(x + 1/4 * width, y);

        ctx.moveTo(x + 1/2 * width, y - 1/8 * width);
        ctx.lineTo(x + 3/4 * width, y - 3/8 * height);
        ctx.moveTo(x + 1/2 * width, y - 3/8 * height);
        ctx.lineTo(x + 3/4 * width, y - 1/8 * width);
        ctx.stroke();

        ctx.closePath();
        resetConfig(ctx);
    },
    paintRect: (ctx, x, y, width, height, borderRadius = 0, color = config.contentColor, shadowColor = config.shadowColor, offsetX = 0, offsetY = 0, blur = 0) => {
        borderRadius = borderRadius >= 0 ? +borderRadius : 0;
        const radius = {
            tl: borderRadius,
            tr: borderRadius,
            bl: borderRadius,
            br: borderRadius
        };
        offsetX = typeof offsetX === 'number' ? offsetX : 0;
        offsetY = typeof offsetY === 'number' ? offsetY : 0;
        blur = typeof blur === 'number' ? blur : 0;

        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);

        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = blur;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
        ctx.fillStyle = color;

        ctx.fill();
        ctx.closePath();
        reset2default(ctx);
    },
    drawText: function (ctx, text, x, y, color = config.fontColor, align = 'center') {
        const alignExample = ['left', 'right', 'center', 'start', 'end'];

        align = (alignExample.indexOf(align) !== -1) ? align : 'left';

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
        ctx.closePath();

        reset2default(ctx);
    }
}
export default { utils }
