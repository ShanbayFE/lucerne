function Keyboard(className) {
    var c = document.createElement('canvas');
    document.body.insertBefore(c, document.body.childNodes[0]);
    c = document.getElementsByTagName('canvas')[0];
    c.className = className || '';

    var canvas = c.getContext('2d');

    var isShowing = true;
    var offsetTop;
    var offsetLeft;
    var scale;
    var backgroundColor = '#e2eede';
    var borderColor = '#dddddd';
    var contentColor = '#ffffff';
    var fontColor = '#333333';

    // var drawBorder = function (ctx, x, y, width, height, type, borderRadius, color) {
    //     var type = type || 'fill';
    //     var color = color || '#dddddd';
    //     var borderRadius = typeof borderRadius === 'number' ? parseInt(borderRadius) : 0;
    //     var radius = {
    //         tl: borderRadius,
    //         tr: borderRadius,
    //         bl: borderRadius,
    //         br: borderRadius
    //     };
    //     ctx.beginPath();
    //     ctx.lineWidth = 3;
    //     ctx.moveTo(x + radius.tl, y);
    //     ctx.lineTo(x + width - radius.tr, y);
    //     ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    //     ctx.lineTo(x + width, y + height - radius.br);
    //     ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    //     ctx.lineTo(x + radius.bl, y + height);
    //     ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    //     ctx.lineTo(x, y + radius.tl);
    //     ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    //     ctx.fillStyle = color;
    //     ctx.strokeStyle = color;
    //     if (type === 'fill') ctx.fill();
    //     else if (type === 'stroke') ctx.stroke();
    //     ctx.closePath();
    // }
    // var drawDelBtn = function (ctx, x, y, width, height, borderRadius) {
    //     var borderRadius = typeof borderRadius === 'number' ? parseInt(borderRadius) : 0;
    //     ctx.beginPath();
    //     ctx.strokeStyle = '#5b5b5b';
    //     ctx.lineWidth = 5;
    //     ctx.moveTo(x + 1/4 * width - 1, y);
    //     ctx.lineTo(x + width, y);
    //     ctx.lineTo(x + width, y - 1/2 * height);
    //     ctx.lineTo(x + 1/4 * width, y - 1/2 * height);
    //     ctx.lineTo(x, y - 1/4 * height);
    //     ctx.lineTo(x + 1/4 * width, y);
    //
    //     ctx.moveTo(x + 1/2 * width, y - 1/8 * width);
    //     ctx.lineTo(x + 3/4 * width, y - 3/8 * height);
    //     ctx.moveTo(x + 1/2 * width, y - 3/8 * height);
    //     ctx.lineTo(x + 3/4 * width, y - 1/8 * width);
    //     ctx.stroke();
    //     ctx.closePath();
    // }
    // var paintRect = function (ctx, x, y, width, height, color, shadowColor, offsetX, offsetY , blur) {
    //     var borderRadius = typeof borderRadius === 'number' ? parseInt(borderRadius) : 10;
    //     var radius = {
    //         tl: borderRadius,
    //         tr: borderRadius,
    //         bl: borderRadius,
    //         br: borderRadius
    //     };
    //     var color = color || '#000000';
    //     var shadowColor = shadowColor || '#000000';
    //     var offsetX = typeof offsetX === 'number' ? offsetX : 0;
    //     var offsetY = typeof offsetY === 'number' ? offsetY : 0;
    //     var blur = typeof blur === 'number' ? blur : 0;
    //     ctx.beginPath();
    //     ctx.moveTo(x + radius.tl, y);
    //     ctx.lineTo(x + width - radius.tr, y);
    //     ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    //     ctx.lineTo(x + width, y + height - radius.br);
    //     ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    //     ctx.lineTo(x + radius.bl, y + height);
    //     ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    //     ctx.lineTo(x, y + radius.tl);
    //     ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    //     ctx.shadowColor = shadowColor;
    //     ctx.shadowBlur = blur;
    //     ctx.shadowOffsetX = offsetX;
    //     ctx.shadowOffsetY = offsetY;
    //     ctx.fillStyle = color;
    //     ctx.fill();
    //     ctx.closePath();
    //     ctx.shadowBlur = 0;
    //     ctx.shadowOffsetX = 0;
    //     ctx.shadowOffsetY = 0;
    // }
    //
    // var drawText = function (ctx, text, x, y, color, align) {
    //     var color = color || '#000000';
    //     var alignExample = ['left', 'right', 'center', 'start', 'end'];
    //     var align = (alignExample.indexOf(align) !== -1) ? align : 'center';
    //     ctx.beginPath();
    //     ctx.fillStyle = color;
    //     ctx.textAlign = align;
    //     ctx.fillText(text, x, y);
    //     ctx.closePath();
    // }
    var keyHeight,
        keyWidth,
        marginX,
        marginY;
    var handleResize = function () {
        var bodyWidth = document.body.clientWidth;
        scale = 2 * bodyWidth / 375;
        var width = parseInt(bodyWidth);
        var height = parseInt(width / 2);
        c.width = width * 2;
        c.height = height * 2;
        c.style.width = width + 'px';
        c.style.height = height + 'px';

        canvas.fillStyle = backgroundColor;
        canvas.fillRect(0, 0, 2 * width, 2 * height);

        var bounds = c.getBoundingClientRect();
        offsetLeft = 2 * parseInt(bounds.left) || 0;
        offsetTop = 2 * parseInt(bounds.top) || 0;
        keyWidth = parseInt(30 * scale);
        keyHeight = 1.3 * keyWidth;
        marginX = parseInt(7 * scale);
        marginY = parseInt(10 * scale);
        var stepX = keyWidth + marginX;
        var stepY = keyHeight + marginY;

        var fontX = keyWidth + marginX;
        var fontY = keyHeight + marginY;

        var firstLineMarginLeft = parseInt(8 * scale);
        var secondLineMarginLeft = parseInt(firstLineMarginLeft + 1/2 * stepX);
        var thirdLineMarginLeft = secondLineMarginLeft;

        var firstLineMarginTop = (20 * scale);
        var normalFont = 25 ;
        var fontSize = 13 * scale;
        var genPoints = function (item) {
            return {
                x: (item.x - 1) * stepX,
                y: (item.y - 1) * stepY,
            }
        };
        var genFont = function (item) {
            return {
                x: parseInt((item.x - 1) * fontX + 1/2 * keyWidth),
                y: parseInt((item.y - 1) * fontY + 23/32 * keyHeight),
            }
        };
        canvas.font = normalFont * scale + "px Helvetica Neue";
        for (var item in firstLine) {
            var points = genPoints(firstLine[item]);
            var fontPoints = genFont(firstLine[item]);

            firstLine[item]['x1'] = parseInt(firstLineMarginLeft + points.x);
            firstLine[item]['x2'] = firstLine[item]['x1'] + keyWidth;
            firstLine[item]['y1'] = parseInt(firstLineMarginTop + points.y);
            firstLine[item]['y2'] = firstLine[item]['y1'] + keyHeight;
            firstLine[item]['fx'] = firstLineMarginLeft + fontPoints.x;
            firstLine[item]['fy'] = firstLineMarginTop + fontPoints.y;

            drawBorder(canvas, firstLine[item]['x1'], firstLine[item]['y1'], keyWidth, keyHeight, 'stroke', 10, borderColor);
            paintRect(canvas, firstLine[item]['x1'], firstLine[item]['y1'], keyWidth, keyHeight, contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
            drawText(canvas, item, firstLine[item]['fx'], firstLine[item]['fy'], fontColor);
        }
        for (var item in secondLine) {
            var points = genPoints(secondLine[item]);
            var fontPoints = genFont(secondLine[item]);

            secondLine[item]['x1'] = secondLineMarginLeft + points.x;
            secondLine[item]['x2'] = secondLineMarginLeft + points.x + keyWidth;
            secondLine[item]['y1'] = firstLineMarginTop + points.y;
            secondLine[item]['y2'] = firstLineMarginTop + points.y + keyHeight;
            secondLine[item]['fx'] = secondLineMarginLeft + fontPoints.x;
            secondLine[item]['fy'] = firstLineMarginTop + fontPoints.y;

            drawBorder(canvas, secondLine[item]['x1'], secondLine[item]['y1'], keyWidth, keyHeight, 'stroke', 10, borderColor);
            paintRect(canvas, secondLine[item]['x1'], secondLine[item]['y1'], keyWidth, keyHeight, contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
            drawText(canvas, item, secondLine[item]['fx'], secondLine[item]['fy'], fontColor);
        }
        for (var item in thirdLine) {
            var points = genPoints(thirdLine[item]);
            var fontPoints = genFont(thirdLine[item]);

            thirdLine[item]['x1'] = thirdLineMarginLeft + points.x;
            thirdLine[item]['x2'] = thirdLineMarginLeft + points.x + keyWidth;
            thirdLine[item]['y1'] = firstLineMarginTop + points.y;
            thirdLine[item]['y2'] = firstLineMarginTop + points.y + keyHeight;
            thirdLine[item]['fx'] = thirdLineMarginLeft + fontPoints.x;
            thirdLine[item]['fy'] = firstLineMarginTop + fontPoints.y;
            if (item === 'del') {
                thirdLine[item]['x1'] = thirdLineMarginLeft + points.x;
                thirdLine[item]['x2'] = thirdLineMarginLeft + points.x + 2 * keyWidth + marginX;
                thirdLine[item]['y1'] = firstLineMarginTop + points.y;
                thirdLine[item]['y2'] = firstLineMarginTop + points.y + keyHeight;
                thirdLine[item]['fx'] = thirdLineMarginLeft + fontPoints.x;
                thirdLine[item]['fy'] = firstLineMarginTop + fontPoints.y;
                drawBorder(canvas, thirdLine[item]['x1'], thirdLine[item]['y1'], 2 * keyWidth + marginX, keyHeight, 'stroke', 10, borderColor);
                paintRect(canvas, thirdLine[item]['x1'], thirdLine[item]['y1'], 2 * keyWidth + marginX, keyHeight, contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
                drawDelBtn(canvas, thirdLine[item]['fx'] - 1/32 * keyWidth, thirdLine[item]['fy'] + 1/16 * keyHeight, keyWidth + marginX + 1/16 * keyWidth , keyHeight * (1 + 1/8));
                break;
            }

            drawBorder(canvas, thirdLine[item]['x1'], thirdLine[item]['y1'], keyWidth, keyHeight, 'stroke', 10, borderColor);
            paintRect(canvas, thirdLine[item]['x1'], thirdLine[item]['y1'], keyWidth, keyHeight, contentColor, 'rgba(0, 0, 0, 0.1)', 2, 2, 2);
            drawText(canvas, item, thirdLine[item]['fx'], thirdLine[item]['fy'], fontColor);
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    var checkPoints = function (x, y, item) {
        x = 2 * x;
        y = 2 * y;
        if (x >= offsetLeft + item.x1 && x <= offsetLeft + item.x2 && y >= offsetTop + item.y1 && y <= offsetTop + item.y2) {
            return true;
        }
    }
    var clickAnimation = function (item, char) {
        paintRect(canvas, item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1, '#eeeeee');
        setTimeout(function () {
            if (char !== 'del') {
                paintRect(canvas, item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1, '#ffffff');
                drawText(canvas, char, item.fx, item.fy, fontColor);
            } else {
                paintRect(canvas, item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1, '#ffffff');
                drawDelBtn(canvas, item['fx'] - 1/32 * keyWidth, item['fy'] + 1/16 * keyHeight, keyWidth + marginX + 1/16 * keyWidth , keyHeight * (1 + 1/8));
            }
        }, 100);
    }
    c.addEventListener('touchend', (function (e) {
        e.preventDefault();
        var x = e.changedTouches[0].clientX;
        var y = e.changedTouches[0].clientY;
        var result;
        for (var item in firstLine) {
            if (!result && checkPoints(x, y, firstLine[item])) {
                result = item;
                clickAnimation(firstLine[item], item);
            }
        }
        for (var item in secondLine) {
            if (!result && checkPoints(x, y, secondLine[item])) {
                result = item;
                clickAnimation(secondLine[item], item);
            }
        }
        for (var item in thirdLine) {
            if (!result && checkPoints(x, y, thirdLine[item])) {
                result = item;
                clickAnimation(thirdLine[item], item);
            }
        }
        if (result) this.onClick(result, e);
    }).bind(this));
    this.show = function () {
        c.style.display = 'block';
        isShowing = true;
    }
    this.hide = function () {
        c.style.display = 'none';
        isShowing = false;
    }
    this.toggle = function () {
        if (isShowing) this.hide();
        else this.show();
    }
}
