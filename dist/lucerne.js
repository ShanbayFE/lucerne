!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("library",[],t):"object"==typeof exports?exports.library=t():e.library=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),a=o(1),l=(o(2),o(3)),s=n(l);(function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";i(this,e);var o=document.createElement("canvas");document.body.insertBefore(o,document.body.childNodes[0]),this.canvas=document.getElementsByTagName("canvas")[0],this.canvas.className=t,this.context=this.canvas.getContext("2d"),this.isShowing=!1,this.offsetTop="",this.offsetLeft="",this.scale="",this.keyHeight="",this.keyWidth="",this.marginX="",this.marginY="",this.handleResize()}return r(e,[{key:"handleResize",value:function(){var e=this,t=document.body.clientWidth;this.scale=2*t/375;var o=parseInt(t),n=parseInt(o/2);this.canvas.width=2*o,this.canvas.height=2*n,this.canvas.style.width=o+"px",this.canvas.style.height=n+"px",this.context.fillStyle=a.config.backgroundColor,this.context.fillRect(0,0,2*o,2*n);var i=this.canvas.getBoundingClientRect();this.offsetLeft=2*parseInt(i.left)||0,this.offsetTop=2*parseInt(i.top)||0,this.keyWidth=parseInt(30*scale),this.keyHeight=1.3*keyWidth,this.marginX=parseInt(7*scale),this.marginY=parseInt(10*scale);var r=parseInt(8*scale),l=parseInt(r+.5*stepX),f=l,d=20*scale,c=25;this.canvas.font=c*scale+"px Helvetica Neue";var y=function(e){return{x:(e.x-1)*stepX,y:(e.y-1)*stepY}},h=function(e){return{x:parseInt((e.x-1)*fontX+.5*keyWidth),y:parseInt((e.y-1)*fontY+23/32*keyHeight)}};Object.keys(s.default).forEach(function(t){var o=!0,n=!1,i=void 0;try{for(var l,s=t[Symbol.iterator]();!(o=(l=s.next()).done);o=!0){item=l.value;var c=t[item],u=y(c),x=h(c);if("del"===item){c.x1=f+u.x,c.x2=f+u.x+2*e.keyWidth+e.marginX,c.y1=d+u.y,c.y2=d+u.y+e.keyHeight,c.fx=f+x.x,c.fy=d+x.y,drawBorder(e.context,c.x1,c.y1,2*e.keyWidth+e.marginX,e.keyHeight,"stroke",10,a.config.borderColor),paintRect(e.context,c.x1,c.y1,2*e.keyWidth+e.marginX,e.keyHeight,a.config.contentColor,"rgba(0, 0, 0, 0.1)",2,2,2),drawDelBtn(e.context,c.fx-1/32*e.keyWidth,c.fy+1/16*e.keyHeight,e.keyWidth+e.marginX+1/16*e.keyWidth,1.125*e.keyHeight);break}c.x1=parseInt(r+u.x),c.x2=c.x1+e.keyWidth,c.y1=parseInt(d+u.y),c.y2=c.y1+e.keyHeight,c.fx=r+x.x,c.fy=d+x.y,drawBorder(e.context,c.x1,c.y1,e.keyWidth,e.keyHeight,"stroke",10,a.config.borderColor),paintRect(e.context,c.x1,c.y1,e.keyWidth,e.keyHeight,a.config.contentColor,"rgba(0, 0, 0, 0.1)",2,2,2),drawText(e.context,item,c.fx,c.fy,a.config.fontColor)}}catch(e){n=!0,i=e}finally{try{!o&&s.return&&s.return()}finally{if(n)throw i}}})}}]),e})()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={backgroundColor:"#e2eede",borderColor:"#ddd",contentColor:"#fff",fontColor:"#333",shadowColor:"rgba(0, 0, 0, 0.1)"};t.default={config:o}},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(1),r=n(i),a=function(e){e.lineWidth=1,e.fillStyle="#000",e.strokeStyle="#000",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0,e.textAlign="left"},l={drawBorder:function(e,t,o,n,i){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"stroke",l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:r.default.borderColor;l=l>=0?+l:0;var f={tl:l,tr:l,bl:l,br:l};e.beginPath(),e.lineWidth=3,e.moveTo(t+f.tl,o),e.lineTo(t+n-f.tr,o),e.quadraticCurveTo(t+n,o,t+n,o+f.tr),e.lineTo(t+n,o+i-f.br),e.quadraticCurveTo(t+n,o+i,t+n-f.br,o+i),e.lineTo(t+f.bl,o+i),e.quadraticCurveTo(t,o+i,t,o+i-f.bl),e.lineTo(t,o+f.tl),e.quadraticCurveTo(t,o,t+f.tl,o),"fill"===a?(e.fillStyle=s,e.fill()):"stroke"===a&&(e.strokeStyle=s,e.stroke()),e.closePath(),resetConfig(e)},drawDelBtn:function(e,t,o,n,i){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;r=r>=0?+r:0,e.beginPath(),e.strokeStyle="#5b5b5b",e.lineWidth=5,e.moveTo(t+.25*n-1,o),e.lineTo(t+n,o),e.lineTo(t+n,o-.5*i),e.lineTo(t+.25*n,o-.5*i),e.lineTo(t,o-.25*i),e.lineTo(t+.25*n,o),e.moveTo(t+.5*n,o-1/8*n),e.lineTo(t+.75*n,o-3/8*i),e.moveTo(t+.5*n,o-3/8*i),e.lineTo(t+.75*n,o-1/8*n),e.stroke(),e.closePath(),resetConfig(e)},paintRect:function(e,t,o,n,i){var l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:r.default.contentColor,f=arguments.length>7&&void 0!==arguments[7]?arguments[7]:r.default.shadowColor,d=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,c=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,y=arguments.length>10&&void 0!==arguments[10]?arguments[10]:0;l=l>=0?+l:0;var h={tl:l,tr:l,bl:l,br:l};d="number"==typeof d?d:0,c="number"==typeof c?c:0,y="number"==typeof y?y:0,e.beginPath(),e.moveTo(t+h.tl,o),e.lineTo(t+n-h.tr,o),e.quadraticCurveTo(t+n,o,t+n,o+h.tr),e.lineTo(t+n,o+i-h.br),e.quadraticCurveTo(t+n,o+i,t+n-h.br,o+i),e.lineTo(t+h.bl,o+i),e.quadraticCurveTo(t,o+i,t,o+i-h.bl),e.lineTo(t,o+h.tl),e.quadraticCurveTo(t,o,t+h.tl,o),e.shadowColor=f,e.shadowBlur=y,e.shadowOffsetX=d,e.shadowOffsetY=c,e.fillStyle=s,e.fill(),e.closePath(),a(e)},drawText:function(e,t,o,n){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:r.default.fontColor,l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"center",s=["left","right","center","start","end"];l=s.indexOf(l)!==-1?l:"left",e.beginPath(),e.fillStyle=i,e.textAlign=l,e.fillText(t,o,n),e.closePath(),a(e)}};t.default={utils:l}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={firstLine:{q:{x:1,y:1},w:{x:2,y:1},e:{x:3,y:1},r:{x:4,y:1},t:{x:5,y:1},y:{x:6,y:1},u:{x:7,y:1},i:{x:8,y:1},o:{x:9,y:1},p:{x:10,y:1}},secondLine:{a:{x:1,y:2},s:{x:2,y:2},d:{x:3,y:2},f:{x:4,y:2},g:{x:5,y:2},h:{x:6,y:2},j:{x:7,y:2},k:{x:8,y:2},l:{x:9,y:2}},thirdLine:{z:{x:1,y:3},x:{x:2,y:3},c:{x:3,y:3},v:{x:4,y:3},b:{x:5,y:3},n:{x:6,y:3},m:{x:7,y:3},del:{x:8,y:3}}};t.default={keyboardJson:o}}])});