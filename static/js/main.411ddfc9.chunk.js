(this["webpackJsonpface-recognition"]=this["webpackJsonpface-recognition"]||[]).push([[0],{14:function(e,t,n){e.exports=n(33)},19:function(e,t,n){},26:function(e,t){},27:function(e,t){},28:function(e,t){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),a=n(12),i=n.n(a),o=(n(19),n(7)),s=n(3),u=n.n(s),f=n(5),l=n(13),p=function(e){var t=Object(r.useState)(),n=Object(l.a)(t,2),c=n[0],a=n[1];return Object(r.useEffect)((function(){function t(){return(t=Object(f.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.getUserMedia({video:!0},(function(t){e.current.srcObject=t}),(function(e){return console.error(e)}));case 3:n=t.sent,a(n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}if(c)return function(){c.getTracks().forEach((function(e){e.stop()}))};!function(){t.apply(this,arguments)}()}),[c,e]),c},h=(n(31),{width:720,height:540});function d(e,t){var n=e.expressions,r=Object.entries(n).reduce((function(e,t){return e[1]>t[1]?e:t}),[]);t.current.textContent=r[0]}function m(){return(m=Object(f.a)(u.a.mark((function e(t,n,r,c,a){var i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=new r.TinyFaceDetectorOptions,r.matchDimensions(t.current,n),setInterval(Object(f.a)(u.a.mark((function e(){var o,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.detectAllFaces(a.current,i).withFaceExpressions();case 2:o=e.sent,s=r.resizeResults(o,n),t.current.getContext("2d").clearRect(0,0,t.current.width,t.current.height),r.draw.drawDetections(t.current,s),o.length&&d(o[0],c);case 7:case"end":return e.stop()}}),e)}))),200);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var v=function(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=Object(r.useRef)(),a=p(n);return a&&n.current&&!n.current.srcObject&&(n.current.srcObject=a),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"wrapper"},c.a.createElement("canvas",{ref:e,className:"canvas",width:h.width,height:h.height}),c.a.createElement("video",{className:"video",ref:n,onCanPlay:function(){Promise.all([o.nets.tinyFaceDetector.loadFromUri("models"),o.nets.faceExpressionNet.loadFromUri("models")]).then((function(){return n.current.play()})),n.current.addEventListener("play",(function(){return function(e,t,n,r,c){return m.apply(this,arguments)}(e,h,o,t,n)}))},autoPlay:!0,width:h.width,height:h.height})),c.a.createElement("div",{ref:t,className:"emotionText"},"Wait a second"))};n(32);var w=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(v,null))};i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.411ddfc9.chunk.js.map