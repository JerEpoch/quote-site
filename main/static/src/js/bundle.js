(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
// import VueBlu from 'vue-blu'
// import 'vue-blu/dist/css/vue-blu.min.css'

var VueBlu = require('vue-blu')
// var VueMin = require('vue-blu/dist/css/vue-blu.min.css')
},{"vue-blu":3}],3:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define("vue-blu",["vue"],e):"object"==typeof exports?exports["vue-blu"]=e(require("vue")):t["vue-blu"]=e(t.Vue)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="../",e(0)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var r=n(57),o=i(r);n(187);var a=n(83),s=i(a),c=n(114),l=i(c),u=n(104),f=i(u),d=n(94),p=i(d),h=n(113),v=n(112),m=i(v),g=n(98),y=i(g),b=n(105),_=i(b),C=n(84),x=i(C),w=n(86),k=n(88),S=n(111),M=n(96),O=n(85),E=i(O),j=n(103),D=i(j),P=n(107),T=i(P),F=n(92),R=n(87),I=n(106),N=n(110),$=i(N),A=n(102),L=i(A),B=n(109),z=n(95),V=i(z),Y=n(93),H=i(Y),W=n(108),K=n(99),q=i(K),U=n(97),G=i(U),J={Affix:s.default,Tooltip:l.default,Popover:f.default,Dropdown:p.default,Timeline:h.Timeline,TimelineItem:h.TimelineItem,Tag:m.default,Modal:y.default,ProgressBar:_.default,Alert:x.default,Breadcrumb:w.Breadcrumb,BreadcrumbItem:w.BreadcrumbItem,Collapse:k.Collapse,CollapseItem:k.CollapseItem,Tabs:S.Tabs,TabItem:S.TabItem,Menus:M.Menus,MenuItem:M.MenuItem,bAside:E.default,PopConfirm:D.default,ScrollTo:T.default,DataTable:F.DataTable,Column:F.Column,TableToolbar:F.TableToolbar,Checkbox:R.Checkbox,CheckboxGroup:R.CheckboxGroup,Radio:I.Radio,RadioGroup:I.RadioGroup,RadioButton:I.RadioButton,bSwitch:$.default,Pagination:L.default,Steps:B.Steps,Step:B.Step,InputNumber:V.default,Datepicker:H.default,bSelect:W.Select,bOption:W.Option},Q=function t(e,n){t.installed||((0,o.default)(J).forEach(function(t){return e.component(t,J[t])}),e.prototype.$notify=q.default,e.prototype.$modal=G.default)};"undefined"!=typeof window&&window.Vue&&Q(window.Vue),t.exports={version:"0.1.9",install:Q}},function(t,e,n){var i=n(74),r="object"==typeof self&&self&&self.Object===Object&&self,o=i||r||Function("return this")();t.exports=o},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=Array.isArray;t.exports=n},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(61),r=n(35);t.exports=function(t){return i(r(t))}},function(t,e,n){function i(t,e){var n=o(t,e);return r(n)?n:void 0}var r=n(212),o=n(239);t.exports=i},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var i=n(11),r=n(23);t.exports=n(8)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var i=n(19),r=n(60),o=n(45),a=Object.defineProperty;e.f=n(8)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var i=n(65),r=n(36);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e,n){var i=n(42)("wks"),r=n(24),o=n(2).Symbol,a="function"==typeof o,s=t.exports=function(t){return i[t]||(i[t]=a&&o[t]||(a?o:r)("Symbol."+t))};s.store=i},function(t,e,n){var i=n(1),r=i.Symbol;t.exports=r},function(t,e,n){function i(t){return null==t?void 0===t?c:s:(t=Object(t),l&&l in t?o(t):a(t))}var r=n(14),o=n(237),a=n(265),s="[object Null]",c="[object Undefined]",l=r?r.toStringTag:void 0;t.exports=i},function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(287),o=i(r),a={props:{always:{type:Boolean,default:!1},trigger:{type:String,default:"hover"},appendToBody:{type:Boolean,default:!0},content:{type:String,default:""},placement:{type:String,default:"top"},disabled:{type:Boolean,default:!1}},data:function(){return{reference:null,popper:null,isShow:!1}},watch:{disabled:function(t){t?this.destroy():this.runPopper()}},methods:{toggle:function(){var t=this;this.isShow=!this.isShow,this.isShow||(this.timer=setTimeout(function(){t.popper.destroy(),t.popper=null},300))},hidePopper:function(){var t=this;this.isShow=!1,this.timer=setTimeout(function(){t.popper.destroy(),t.popper=null},300)},showPopper:function(){this.isShow=!0,this.timer&&clearTimeout(this.timer),this.popperTimer&&clearTimeout(this.popperTimer)},createInstance:function(){if(this.showPopper(),this.popper)return void this.popper.update();var t={top:"top",left:"left",right:"right",bottom:"bottom",topLeft:"top-end",topRight:"top-start",leftTop:"left-end",leftBottom:"left-start",bottomLeft:"bottom-end",bottomRight:"bottom-start",rightTop:"right-end",rightBottom:"right-start"},e=t[this.placement]?t[this.placement]:"bottom",n=this.reference=this.reference||this.$el.children[0],i=this.$refs.popper,r={placement:e};this.appendToBody&&document.body.appendChild(i),this.popper=new o.default(n,i,r)},handleClick:function(t){t.stopPropagation(),this.$el.contains(t.target)?this.isShow?this.hidePopper():this.createInstance():this.$refs.popper.contains(t.target)?this.showPopper():this.isShow&&this.hidePopper()},bindEvent:function(){var t=this.reference=this.reference||this.$el.children[0],e=this.$refs.popper;t&&e&&("hover"===this.trigger?(t.addEventListener("mouseenter",this.createInstance),t.addEventListener("mouseleave",this.hidePopper),e.addEventListener("mouseenter",this.showPopper),e.addEventListener("mouseleave",this.hidePopper)):(t.addEventListener("click",this.handleClick),e.addEventListener("click",this.showPopper),document.documentElement.addEventListener("click",this.handleClick)))},runPopper:function(){this.disabled||(this.always?this.createInstance():this.bindEvent())},destroy:function(){this.popper&&(this.popper.destroy(),this.popper=null)},removeEvent:function(){if(this.reference){var t=this.$refs.popper;"focus"===this.trigger?(this.reference.removeEventListener("focus",this.createInstance),this.reference.removeEventListener("blur",this.toggle)):"click"===this.trigger?(this.reference.removeEventListener("click",this.handleClick),t.removeEventListener("click",this.showPopper),document.documentElement.removeEventListener("click",this.handleClick)):(this.reference.removeEventListener("mouseenter",this.createInstance),this.reference.removeEventListener("mouseleave",this.toggle))}}},mounted:function(){this.runPopper()},beforeDestroy:function(){this.removeEvent(),this.$refs.popper.remove(),this.destroy()}};e.default=a},function(t,e,n){var i=n(21);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(2),r=n(7),o=n(161),a=n(10),s="prototype",c=function(t,e,n){var l,u,f,d=t&c.F,p=t&c.G,h=t&c.S,v=t&c.P,m=t&c.B,g=t&c.W,y=p?r:r[e]||(r[e]={}),b=y[s],_=p?i:h?i[e]:(i[e]||{})[s];p&&(n=e);for(l in n)u=!d&&_&&void 0!==_[l],u&&l in y||(f=u?_[l]:n[l],y[l]=p&&"function"!=typeof _[l]?n[l]:m&&u?o(f,i):g&&_[l]==f?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e[s]=t[s],e}(f):v&&"function"==typeof f?o(Function.call,f):f,v&&((y.virtual||(y.virtual={}))[l]=f,t&c.R&&b&&!b[l]&&a(b,l,f)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){function i(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}var r=n(251),o=n(252),a=n(253),s=n(254),c=n(255);i.prototype.clear=r,i.prototype.delete=o,i.prototype.get=a,i.prototype.has=s,i.prototype.set=c,t.exports=i},function(t,e,n){function i(t,e){for(var n=t.length;n--;)if(r(t[n][0],e))return n;return-1}var r=n(52);t.exports=i},function(t,e,n){function i(t,e){var n=t.__data__;return r(e)?n["string"==typeof e?"string":"hash"]:n.map}var r=n(248);t.exports=i},function(t,e,n){var i=n(6),r=i(Object,"create");t.exports=r},function(t,e,n){function i(t){if("string"==typeof t||r(t))return t;var e=t+"";return"0"==e&&1/t==-o?"-0":e}var r=n(32),o=1/0;t.exports=i},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){function i(t){return null!=t&&o(t.length)&&!r(t)}var r=n(79),o=n(54);t.exports=i},function(t,e,n){function i(t){return"symbol"==typeof t||o(t)&&r(t)==a}var r=n(15),o=n(17),a="[object Symbol]";t.exports=i},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={props:{isShow:{type:Boolean,default:!1},title:{type:String},okText:{type:String,default:"OK"},cancelText:{type:String,default:"Cancel"},onOk:{type:Function,default:function(){}},onCancel:{type:Function,default:function(){}},backdrop:{type:Boolean,default:!0},backdropClosable:{type:Boolean,default:!0},okLoading:{type:Boolean,default:!1},width:{type:Number,default:640},showOk:{type:Boolean,default:!0},showCancel:{type:Boolean,default:!0},transition:{type:String,default:"fade"},showHeader:{type:Boolean,default:!0},showFooter:{type:Boolean,default:!0}},data:function(){return{isActive:!1,isLoading:!1}},computed:{modalWidth:function(){return 640!==this.width&&0!==this.width?{width:this.width+"px"}:null}},methods:{active:function(){this.isActive=!0},handleOk:function(){this.okLoading?(this.isLoading=!0,this.onOk()):(this.onOk(),this.handleClose())},handleCancel:function(){this.onCancel(),this.handleClose()},handleClose:function(){this.$emit("close")},backdropClose:function(){this.backdropClosable&&this.handleCancel()}},watch:{isShow:function(t){this.isActive=t,!t&&this.isLoading&&(this.isLoading=!1)}},mounted:function(){var t=this;this.$nextTick(function(){document.body.appendChild(t.$el)})},beforeDestroy:function(){this.$el.remove()}};e.default=n},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(57),o=i(r),a=n(153),s=i(a);e.default={isEmpty:function(t){if(null===t)return!0;if(t.length>0)return!1;if(0===t.length)return!0;if("object"!==("undefined"==typeof t?"undefined":(0,s.default)(t)))return!0;var e=!0;return(0,o.default)(t).every(function(n){return!Object.prototype.hasOwnProperty.call(t,n)||(e=!1,!1)}),e},isFunction:function(t){return!!(t&&t.constructor&&t.call&&t.apply)},getScroll:function(t,e){if("undefined"==typeof window)return 0;var n=e?"pageYOffset":"pageXOffset",i=e?"scrollTop":"scrollLeft",r=t===window,o=r?t[n]:t[i];return r&&"number"!=typeof o&&(o=window.document.documentElement[i]),o}}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var i=n(11).f,r=n(4),o=n(13)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(42)("keys"),r=n(24);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(2),r="__core-js_shared__",o=i[r]||(i[r]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){var i=n(35);t.exports=function(t){return Object(i(t))}},function(t,e,n){var i=n(21);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var i=n(2),r=n(7),o=n(38),a=n(47),s=n(11).f;t.exports=function(t){var e=r.Symbol||(r.Symbol=o?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(13)},function(t,e,n){var i=n(6),r=n(1),o=i(r,"Map");t.exports=o},function(t,e,n){function i(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}var r=n(256),o=n(257),a=n(258),s=n(259),c=n(260);i.prototype.clear=r,i.prototype.delete=o,i.prototype.get=a,i.prototype.has=s,i.prototype.set=c,t.exports=i},function(t,e){function n(t,e){return e=null==e?i:e,!!e&&("number"==typeof t||r.test(t))&&t>-1&&t%1==0&&t<e}var i=9007199254740991,r=/^(?:0|[1-9]\d*)$/;t.exports=n},function(t,e,n){function i(t,e){if(r(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!o(t))||(s.test(t)||!a.test(t)||null!=e&&t in Object(e))}var r=n(3),o=n(32),a=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,s=/^\w*$/;t.exports=i},function(t,e){function n(t,e){return t===e||t!==t&&e!==e}t.exports=n},function(t,e,n){var i=n(209),r=n(17),o=Object.prototype,a=o.hasOwnProperty,s=o.propertyIsEnumerable,c=i(function(){return arguments}())?i:function(t){return r(t)&&a.call(t,"callee")&&!s.call(t,"callee")};t.exports=c},function(t,e){function n(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}var i=9007199254740991;t.exports=n},function(t,e,n){function i(t){return a(t)?r(t):o(t)}var r=n(201),o=n(215),a=n(31);t.exports=i},function(t,e,n){t.exports={default:n(154),__esModule:!0}},function(t,e,n){t.exports={default:n(155),__esModule:!0}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var i=n(21),r=n(2).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e,n){t.exports=!n(8)&&!n(9)(function(){return 7!=Object.defineProperty(n(59)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(58);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e,n){"use strict";var i=n(38),r=n(20),o=n(66),a=n(10),s=n(4),c=n(37),l=n(165),u=n(40),f=n(173),d=n(13)("iterator"),p=!([].keys&&"next"in[].keys()),h="@@iterator",v="keys",m="values",g=function(){return this};t.exports=function(t,e,n,y,b,_,C){l(n,e,y);var x,w,k,S=function(t){if(!p&&t in j)return j[t];switch(t){case v:return function(){return new n(this,t)};case m:return function(){return new n(this,t)}}return function(){return new n(this,t)}},M=e+" Iterator",O=b==m,E=!1,j=t.prototype,D=j[d]||j[h]||b&&j[b],P=D||S(b),T=b?O?S("entries"):P:void 0,F="Array"==e?j.entries||D:D;if(F&&(k=f(F.call(new t)),k!==Object.prototype&&(u(k,M,!0),i||s(k,d)||a(k,d,g))),O&&D&&D.name!==m&&(E=!0,P=function(){return D.call(this)}),i&&!C||!p&&!E&&j[d]||a(j,d,P),c[e]=P,c[M]=g,b)if(x={values:O?P:S(m),keys:_?P:S(v),entries:T},C)for(w in x)w in j||o(j,w,x[w]);else r(r.P+r.F*(p||E),e,x);return x}},function(t,e,n){var i=n(19),r=n(170),o=n(36),a=n(41)("IE_PROTO"),s=function(){},c="prototype",l=function(){var t,e=n(59)("iframe"),i=o.length,r="<",a=">";for(e.style.display="none",n(163).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(r+"script"+a+"document.F=Object"+r+"/script"+a),t.close(),l=t.F;i--;)delete l[c][o[i]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[c]=i(t),n=new s,s[c]=null,n[a]=t):n=l(),void 0===e?n:r(n,e)}},function(t,e,n){var i=n(65),r=n(36).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e,n){var i=n(4),r=n(5),o=n(160)(!1),a=n(41)("IE_PROTO");t.exports=function(t,e){var n,s=r(t),c=0,l=[];for(n in s)n!=a&&i(s,n)&&l.push(n);for(;e.length>c;)i(s,n=e[c++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){t.exports=n(10)},function(t,e,n){function i(t){var e=this.__data__=new r(t);this.size=e.size}var r=n(25),o=n(273),a=n(274),s=n(275),c=n(276),l=n(277);i.prototype.clear=o,i.prototype.delete=a,i.prototype.get=s,i.prototype.has=c,i.prototype.set=l,t.exports=i},function(t,e){function n(t,e){for(var n=-1,i=null==t?0:t.length,r=Array(i);++n<i;)r[n]=e(t[n],n,t);return r}t.exports=n},function(t,e,n){function i(t,e){e=r(e,t);for(var n=0,i=e.length;null!=t&&n<i;)t=t[o(e[n++])];return n&&n==i?t:void 0}var r=n(72),o=n(29);t.exports=i},function(t,e,n){function i(t,e,n,s,c){return t===e||(null==t||null==e||!o(t)&&!a(e)?t!==t&&e!==e:r(t,e,n,s,i,c))}var r=n(210),o=n(16),a=n(17);t.exports=i},function(t,e){function n(t){return function(e){return t(e)}}t.exports=n},function(t,e,n){function i(t,e){return r(t)?t:o(t,e)?[t]:a(s(t))}var r=n(3),o=n(51),a=n(278),s=n(286);t.exports=i},function(t,e,n){function i(t,e,n,i,l,u){var f=n&s,d=t.length,p=e.length;if(d!=p&&!(f&&p>d))return!1;var h=u.get(t);if(h&&u.get(e))return h==e;var v=-1,m=!0,g=n&c?new r:void 0;for(u.set(t,e),u.set(e,t);++v<d;){var y=t[v],b=e[v];if(i)var _=f?i(b,y,v,e,t,u):i(y,b,v,t,e,u);if(void 0!==_){if(_)continue;m=!1;break}if(g){if(!o(e,function(t,e){if(!a(g,e)&&(y===t||l(y,t,n,i,u)))return g.push(e)})){m=!1;break}}else if(y!==b&&!l(y,b,n,i,u)){m=!1;break}}return u.delete(t),u.delete(e),m}var r=n(197),o=n(203),a=n(227),s=1,c=2;t.exports=i},function(t,e){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,function(){return this}())},function(t,e,n){function i(t){return t===t&&!r(t)}var r=n(16);t.exports=i},function(t,e){function n(t,e){return function(n){return null!=n&&(n[t]===e&&(void 0!==e||t in Object(n)))}}t.exports=n},function(t,e){function n(t){if(null!=t){try{return r.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var i=Function.prototype,r=i.toString;t.exports=n},function(t,e,n){(function(t){var i=n(1),r=n(285),o="object"==typeof e&&e&&!e.nodeType&&e,a=o&&"object"==typeof t&&t&&!t.nodeType&&t,s=a&&a.exports===o,c=s?i.Buffer:void 0,l=c?c.isBuffer:void 0,u=l||r;t.exports=u}).call(e,n(81)(t))},function(t,e,n){function i(t){if(!o(t))return!1;var e=r(t);return e==s||e==c||e==a||e==l}var r=n(15),o=n(16),a="[object AsyncFunction]",s="[object Function]",c="[object GeneratorFunction]",l="[object Proxy]";t.exports=i},function(t,e,n){var i=n(213),r=n(71),o=n(264),a=o&&o.isTypedArray,s=a?r(a):i;t.exports=s},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(e,n){e.exports=t},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(288),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(289),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(290),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.BreadcrumbItem=e.Breadcrumb=void 0;var r=n(291),o=i(r),a=n(292),s=i(a);e.Breadcrumb=o.default,e.BreadcrumbItem=s.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Checkbox=e.CheckboxGroup=void 0;var r=n(293),o=i(r),a=n(294),s=i(a);e.CheckboxGroup=s.default,e.Checkbox=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.CollapseItem=e.Collapse=void 0;var r=n(295),o=i(r),a=n(296),s=i(a);e.Collapse=o.default,e.CollapseItem=s.default},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"TableBody",props:{columns:Array,data:Array,checkable:Boolean,showIndex:Boolean,state:{type:Object,default:function(){}}},data:function(){return{}},computed:{cols:function(){return this.$parent.columns}},watch:{},methods:{handleToggleSelect:function(t,e,n){this.$parent.handleSelectedChange(t,e,n)}},created:function(){},render:function(t){var e=this,n=this.state.pagination,i=this.state.selectedRowKeys,r=this.$parent.rowKey;return t("tbody",null,[this._l(this.data,function(o,a){var s=o[r]?o[r]:n.current+"-"+a,c=i.indexOf(s)>=0;return t("tr",null,[e.checkable?t("th",null,[t("checkbox",{attrs:{checked:c,change:function(t){return e.handleToggleSelect(o,t,a)}},key:s},[])]):"",e.showIndex?t("th",null,[a+1]):"",e._l(e.cols,function(n,i){return n.visible?t("td",{key:""+a+i},[n.renderCell.call(e._renderProxy,t,{row:o,column:n,$index:a,store:e.store,_self:e.context||e.$parent.$vnode.context})]):null})])})])}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Column",props:{label:String,width:Number,className:String,field:String,sorter:[Boolean,Function,String],selectable:Boolean,filters:Array,onFilter:Function,visible:{type:Boolean,default:!0}},data:function(){return{column:{}}},created:function(){var t=this,e=this.visible?"check":"remove";this.column={label:this.label,width:this.width,className:this.className,field:this.field,sorter:this.sorter,selectable:this.selectable,scopedSlots:this.$scopedSlots,visible:this.visible,isShowIcon:e},this.column.renderCell=function(e,n){var i=n.row,r=n.column;return t.$scopedSlots.default?e("div",{class:"child"},[t.$scopedSlots.default(i)]):i[r.field]}},mounted:function(){this.$parent.columns.push(this.column)},render:function(t){return null}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"TableHeader",props:{columns:Array,checkable:Boolean,showIndex:Boolean,state:{type:Object,default:function(){}}},computed:{cols:function(){return this.$parent.columns}},methods:{handleToggleSelectAll:function(t){this.$parent.handleToggleSelectAll(t)}},render:function(t){var e=this,n=this.state,i=this.$parent.isCheckAll();return t("thead",null,[t("tr",null,[this.checkable?t("th",null,[t("checkbox",{attrs:{checked:i,change:function(t){return e.handleToggleSelectAll(t)}}},[])]):"",this.showIndex?t("th",null,["#"]):"",this._l(this.cols,function(i,r){if(!i.visible)return null;var o="sortable",a="",s="sort";return i.sorter&&(n.sortKey===i.field&&n.reverse?s="sort-desc":n.sortKey!==i.field||n.reverse||(s="sort-asc"),a=t("span",{class:"sort-trigger "+s},[t("i",{class:"fa fa-"+s},[])])),t("th",{key:r,class:o,on:{click:e.$parent.handleToggleSort.bind(e,i)}},[t("span",null,[i.label]),a])})])])}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.TableToolbar=e.Column=e.DataTable=void 0;var r=n(297),o=i(r),a=n(90),s=i(a),c=n(298),l=i(c);e.DataTable=o.default,e.Column=s.default,e.TableToolbar=l.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(299),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(300),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(301),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.MenuItem=e.Menus=void 0;var r=n(303),o=i(r),a=n(302),s=i(a);e.Menus=o.default,e.MenuItem=s.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t){var e=c.default.extend(u.default);return new e({el:document.createElement("div"),propsData:t})}Object.defineProperty(e,"__esModule",{value:!0});var o=n(56),a=i(o),s=n(82),c=i(s),l=n(304),u=i(l);e.default={open:function(t){var e={title:"消息",content:""},n=(0,a.default)(e,t);return r(n)},confirm:function(t){var e={title:"提示",content:"",icon:"question-circle-o",type:"warning"},n=(0,a.default)(e,t);return r(n)},alert:function(t){var e={title:"提示",type:"danger",icon:"exclamation-triangle",content:"",showCancel:!1},n=(0,a.default)(e,t);return r(n)}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(305),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t){var e=c.default.extend(u.default);return new e({el:document.createElement("div"),propsData:t})}Object.defineProperty(e,"__esModule",{value:!0});var o=n(56),a=i(o),s=n(82),c=i(s),l=n(306),u=i(l);e.default={open:function(t){var e={direction:"right",duration:4500},n=(0,a.default)(e,t);return r(n)},info:function(t){var e={direction:"right",duration:4500,type:"info"},n=(0,a.default)(e,t);return r(n)},warning:function(t){var e={direction:"right",duration:4500,type:"warning"},n=(0,a.default)(e,t);return r(n)},success:function(t){var e={direction:"right",duration:4500,type:"success"},n=(0,a.default)(e,t);return r(n)},danger:function(t){var e={direction:"right",duration:4500,type:"danger"},n=(0,a.default)(e,t);return r(n)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{active:Boolean,pageNo:Number,size:String},render:function(t){var e=this.active?"button is-primary "+this.size:"button "+this.size;return t("li",null,[t("a",{class:e,on:{click:this.$parent.handleChangePage.bind(this,this.pageNo)}},[this.pageNo])])}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(100),o=i(r);e.default={components:{Pager:o.default},props:{pageSize:{type:Number,default:10},current:{type:Number,default:1},total:Number,change:{type:Function,default:function(){}},pageSizeChange:{type:Function,default:function(){}},size:String,simple:{type:Boolean,default:!1},layout:{type:String,default:"total, pager, sizer, jumper"},sizeOptions:{type:Array,default:function(){return[10,20,30,40,50]}},align:String},data:function(){return{interCurrent:1,interPageSize:this.pageSize}},watch:{current:function(t){t!==this.interCurrent&&this.handleChangePage(t)},pageSize:function(t){t!==this.interPageSize}},computed:{totalPage:function(){return this.calcTotalPage()},sizeClass:function(){return"small"===this.size?"is-small":""},alignClass:function(){return this.align?"is-"+this.align:""}},methods:{calcTotalPage:function(){return Math.floor((this.total-1)/this.interPageSize)+1},handleChangePage:function(t){t!==this.interCurrent&&(this.interCurrent=t,this.change(t))},handleJumpPrev:function(){this.handleChangePage(Math.max(1,this.interCurrent-5))},handleJumpNext:function(){this.handleChangePage(Math.min(this.totalPage,this.interCurrent+5))},hasPrev:function(){return this.interCurrent>1},hasNext:function(){return this.interCurrent<this.totalPage},handlePrev:function(){this.handleChangePage(this.interCurrent-1)},handleNext:function(){this.handleChangePage(this.interCurrent+1)},handleQuickJumper:function(t){var e=t.target.value;e=Number(e),e&&!isNaN(e)&&13===t.keyCode&&this.handleChangePage(e)},handlePageSizeChange:function(t){var e=t.target.value;this.interPageSize=e,this.totalPage=this.calcTotalPage(e),this.pageSizeChange(this.current,e)}},mounted:function(){this.handleChangePage(this.current)},render:function(t){var e=this.alignClass,n=this.sizeClass,i=[],r="",a="",s="",c=null,l=null,u=null,f=null,d=null,p=this.interCurrent;if(this.simple){var h=this.hasPrev()?"button "+n:"button is-disabled "+n,v=this.hasNext()?"button "+n:"button is-disabled "+n;c=t("ul",null,[t("li",null,[t("a",{class:h,on:{click:this.handlePrev}},[t("i",{class:"fa fa-angle-left"},[])])]),t("li",null,[t("input",{class:"input "+n,attrs:{value:this.interCurrent,type:"number",min:"1",number:"true"},on:{keyup:this.handleQuickJumper}},[])]),t("li",null,["/ ",this.total]),t("li",null,[t("a",{class:v,on:{click:this.handleNext}},[t("i",{class:"fa fa-angle-right"},[])])])])}else{if(this.totalPage<=6)for(var m=1;m<=this.totalPage;m++){var g=p===m;i.push(t(o.default,{attrs:{pageNo:m,active:g,size:n},on:{click:this.handleChangePage.bind(this,m)}},[]))}else{l=t("li",{class:"btn-jumper"},[t("a",{class:"button is-primary is-inverted "+n,on:{click:this.handleJumpPrev}},[t("i",{class:"fa fa-angle-double-left"},[])])]),u=t("li",{class:"btn-jumper"},[t("a",{class:"button is-primary is-inverted "+n,on:{click:this.handleJumpNext}},[t("i",{class:"fa fa-angle-double-right"},[])])]),f=t(o.default,{attrs:{active:!1,size:n,pageNo:1}},[]),d=t(o.default,{attrs:{active:!1,size:n,pageNo:this.totalPage}},[]);var y=Math.max(1,p-2),b=Math.min(p+2,this.totalPage);p-1<=2&&(b=5),this.totalPage-p<=2&&(y=this.totalPage-4);for(var _=y;_<=b;_++){var C=p===_;i.push(t(o.default,{attrs:{pageNo:_,size:n,active:C},on:{click:this.handleChangePage.bind(this,_)}},[]))}p-1>=4&&i.unshift(l),this.totalPage-p>=4&&i.push(u),1!==y&&i.unshift(f),b!==this.totalPage&&i.push(d)}r=t("span",null,["共 ",this.total," 条"]),a=t("span",null,["跳转到 ",t("input",{class:"input "+n,attrs:{type:"number",min:"1",number:"true"},on:{keyup:this.handleQuickJumper}},[])]),s=t("span",{class:"select "+n},[t("select",{on:{change:this.handlePageSizeChange}},[this._l(this.sizeOptions,function(e){return t("option",{attrs:{value:e}},[e," 条/页"])})])]);var x=this.hasPrev()?"button "+n:"button is-disabled "+n,w=this.hasNext()?"button "+n:"button is-disabled "+n;c=t("ul",null,[t("li",null,[t("a",{class:x,on:{click:this.handlePrev}},[t("i",{class:"fa fa-angle-left"},[])])]),this._l(i,function(t){return t}),t("li",null,[t("a",{class:w,on:{click:this.handleNext}},[t("i",{class:"fa fa-angle-right"},[])])])])}var k={total:r,sizer:s,pager:c,jumper:a},S=this.layout.split(",");return t("nav",{class:"pagination "+n+" "+e},[S.map(function(t){return k[t.trim()]})])}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(101),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(307),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(308),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(309),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.RadioButton=e.Radio=e.RadioGroup=void 0;var r=n(312),o=i(r),a=n(310),s=i(a),c=n(311),l=i(c);e.RadioGroup=o.default,e.Radio=s.default,e.RadioButton=l.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(313),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Option=e.Select=void 0;var r=n(315),o=i(r),a=n(314),s=i(a);e.Select=o.default,e.Option=s.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Step=e.Steps=void 0;var r=n(316),o=i(r),a=n(317),s=i(a);e.Steps=s.default,e.Step=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(318),o=i(r);e.default=o.default},function(t,e,n){
"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.TabItem=e.Tabs=void 0;var r=n(320),o=i(r),a=n(319),s=i(a);e.Tabs=o.default,e.TabItem=s.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(321),o=i(r);e.default=o.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.TimelineItem=e.Timeline=void 0;var r=n(322),o=i(r),a=n(323),s=i(a);e.Timeline=o.default,e.TimelineItem=s.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(324),o=i(r);e.default=o.default},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{offset:{type:Number,default:0},onAffix:{type:Function,default:function(){}},boundary:{type:String,default:""}},data:function(){return{affixed:!1,styles:{},affixedClientHeight:0,wrapStyle:{}}},methods:{getScroll:function(t,e){var n=t["page"+(e?"Y":"X")+"Offset"],i="scroll"+(e?"Top":"Left");if("number"!=typeof n){var r=t.document;n=r.documentElement[i],"number"!=typeof n&&(n=r.body[i])}return n},getOffset:function(t){var e=t.getBoundingClientRect(),n=document.body,i=t.clientTop||n.clientTop||0,r=t.clientLeft||n.clientLeft||0,o=this.getScroll(window,!0),a=this.getScroll(window);return{top:e.bottom+o-i-this.affixedClientHeight,left:e.left+a-r}},handleScroll:function(){var t=this.getScroll(window,!0)+this.offsets,e=this.getOffset(this.$el);if(!this.affixed&&t>e.top&&(this.affixed=!0,this.styles={top:this.offsets+"px",left:e.left+"px",width:this.$el.offsetWidth+"px"},this.onAffix(this.affixed)),this.boundary&&t>e.top){var n=document.getElementById(this.boundary.slice(1));if(n){var i=this.getOffset(n);if(t+this.offsets>i.top){var r=t-i.top;this.styles.top="-"+r+"px"}}}if(this.affixed&&t<e.top&&(this.affixed=!1,this.styles={},this.onAffix(this.affixed)),this.affixed&&this.boundary){var o=document.getElementById(this.boundary.slice(1));if(o){var a=this.getOffset(o);t+this.offsets<=a.top&&(this.styles.top=0)}}}},computed:{offsets:function(){return this.boundary?0:this.offset}},mounted:function(){this.affixedClientHeight=this.$el.children[0].clientHeight,this.wrapStyle={height:this.affixedClientHeight+"px"},window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleScroll)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:""},title:{type:String},closable:{type:Boolean,default:!1},onClose:{type:Function,default:function(){}},icon:{type:String},animated:{type:Boolean,default:!1}},data:function(){return{isShow:!0}},computed:{typeClass:function(){return"loading"===this.type?"is-info":this.type?"is-"+this.type:null},hasIcon:function(){return this.iconClass?"has-icon":null},faSpin:function(){return"loading"===this.type?"fa-spin":this.animated?"fa-spin":null},iconClass:function(){return this.icon?this.icon:"info"===this.type?"info-circle":"success"===this.type?"check-circle":"warning"===this.type?"exclamation-triangle":"danger"===this.type?"times-circle":"loading"===this.type?"spinner":this.icon}},methods:{handleClose:function(){var t=this;this.isShow=!1,this.onClose(),setTimeout(function(){t.$destroy(),t.$el.remove()},100)}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(33),o=i(r);e.default={mixins:[o.default],props:{width:{type:Number,default:450},placement:{type:String,default:"left"},transition:{type:String,default:"fadeLeft"}},computed:{placementClass:function(){return this.placement&&"left"!==this.placement?"aside-"+this.placement:null},transitionName:function(){return"right"===this.placement&&"fadeLeft"===this.transition?"fadeRight":this.transition}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{separator:{type:String,default:">"}},computed:{$items:function(){return this.$children}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(34),o=i(r);e.default={props:{label:{type:String},to:{type:String,default:""}},data:function(){return{separator:""}},computed:{hasSlot:function(){return!o.default.isEmpty(this.$slots)}},mounted:function(){var t=this.$parent.$items.indexOf(this),e=this.$parent.$items.length;e!==t+1&&(this.separator=this.$parent.separator)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{name:String,label:String,type:{type:String,default:"primary"},disabled:Boolean,checked:Boolean,value:{},val:[String,Number,Boolean],change:{type:Function,default:function(){}}},data:function(){return{isChecked:this.checked,realVal:null}},computed:{typeClass:function(){return this.type?"is-"+this.type:null}},watch:{realVal:function(t){this.change(t)},checked:function(t){this.handleChecked(t)}},methods:{toggle:function(){this.isChecked=!this.isChecked,this.val&&!this.isChecked?(this.realVal="",this.$emit("input",this.realVal)):this.val&&this.isChecked?(this.realVal=this.val,this.$emit("input",this.realVal)):!this.val&&this.isChecked?(this.realVal=!0,this.$emit("input",this.realVal)):(this.realVal=!1,this.$emit("input",this.realVal)),this.$parent.isCheckboxGroup&&this.$parent.updateValue()},handleChecked:function(t){this.isChecked=t}},mounted:function(){this.isChecked&&!this.value&&this.$emit("input",this.$refs.checkbox.value),this.value===this.val&&(this.isChecked=!0)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:Array,onChange:{type:Function,default:function(){}}},data:function(){return{checkedList:[],isCheckboxGroup:!0}},methods:{updateValue:function(){var t=this;this.checkedList=[],this.$children.forEach(function(e){e.realVal&&t.checkedList.push(e.realVal)}),this.$emit("input",this.checkedList),this.onChange(this.checkedList)},initChecked:function(){var t=this;this.$children.forEach(function(e){t.value&&t.value.indexOf(e.val)>=0&&(e.isChecked=!0,e.realVal=e.val)})}},mounted:function(){this.initChecked()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{accordion:Boolean},computed:{$collapseItems:function(){return this.$children}},methods:{setActiveIndex:function(t){this.accordion&&this.$children.forEach(function(e,n){n!==t&&(e.isOpen=!1)})}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,actived:{type:Boolean,default:!1}},data:function(){return{isOpen:this.actived}},computed:{index:function(){return this.$parent.$collapseItems.indexOf(this)}},watch:{isActive:function(t){this.isOpen=t}},methods:{toggle:function(){this.isOpen=!this.isOpen,this.$parent.setActiveIndex(this.index)}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(284),o=i(r),a=n(34),s=i(a),c=n(91),l=i(c),u=n(89),f=i(u);e.default={components:{TableHeader:l.default,TableBody:f.default},name:"DataTable",props:{data:Array,change:{type:Function,default:function(){}},height:Number,checkable:{type:Boolean,default:!1},showIndex:Boolean,pagination:{},onSelectChange:{type:Function,default:function(){}},onSelectAll:{type:Function,default:function(){}},rowKey:String,bordered:Boolean,striped:Boolean,narrow:Boolean},data:function(){return{state:{sortKey:"",reverse:"",pagination:{current:1},selectedRows:[],selectedRowKeys:[]},cols:[],columns:[],selected:[],isTable:!0,interData:[],showData:[]}},computed:{mainStyle:function(){return this.height?{height:this.height+"px",overflow:"scroll"}:null},totalCnt:function(){var t=this.pagination&&this.pagination.total?this.pagination.total:0;return t}},watch:{columns:function(t){console.log(t)},data:function(t){this.interData=t,this.handleReorganizeData()}},methods:{calcColumnWidth:function(){var t=this,e=this.$el.offsetWidth,n=this.columns.length;this.checkable&&(e-=40,this.cols.push(40)),this.showIndex&&(e-=40,this.cols.push(40)),this.columns.forEach(function(t){t.width&&(e-=t.width,n-=1)});var i=Math.floor(e/n);this.columns.forEach(function(e){e.width?t.cols.push(e.width):t.height?t.cols.push(i):t.cols.push("")})},handleToggleSort:function(t){t.sorter&&t.field&&(this.state.sortKey=t.field,this.state.reverse=!this.state.reverse,(s.default.isFunction(t.sorter)||"custom"===t.sorter)&&(this.interData=(0,o.default)(this.interData,t.field),this.state.reverse&&this.interData.reverse()),this.handleTableChange())},handlePageSizeChange:function(t,e){console.log("pageSize",e),this.state.pagination.pageSize=e,this.handleTableChange()},handlePageChange:function(t){this.state.pagination.current=t;var e=this.state.pagination.change;e&&s.default.isFunction(e)&&e(t),this.handleTableChange()},handleInitTable:function(){},handleTableChange:function(){this.change(this.state),this.handleReorganizeData()},handleReorganizeData:function(){if(this.state.pagination.total){var t=this.state.pagination.current||1,e=this.state.pagination.pageSize||10;if(this.interData.length<=e)this.showData=this.interData;else{var n=(t-1)*e,i=parseInt(n,10)+parseInt(e,10);this.showData=this.interData.slice(n,i)}}else this.showData=this.interData},handleSelectedChange:function(t,e,n){var i=t[this.rowKey];if(!i){var r=this.state.pagination.current;i=r+"-"+n}var o=this.state.selectedRowKeys.indexOf(i)>=0;if(e&&!o&&(this.state.selectedRowKeys.push(i),this.state.selectedRows.push(t)),!e&&o){var a=this.state.selectedRowKeys.indexOf(i);this.state.selectedRows.splice(a,1),this.state.selectedRowKeys.splice(a,1)}this.onSelectChange(this.state.selectedRowKeys,this.state.selectedRows)},handleToggleSelectAll:function(t){var e=this,n=this.state.pagination.current;t?this.showData.forEach(function(t,i){var r=t[e.rowKey]?t[e.rowKey]:n+"-"+i,o=e.state.selectedRowKeys.indexOf(r)>=0;o||(e.state.selectedRowKeys.push(r),e.state.selectedRows.push(t))}):this.showData.forEach(function(t,i){var r=t[e.rowKey]?t[e.rowKey]:n+"-"+i,o=e.state.selectedRowKeys.indexOf(r);o>=0&&(e.state.selectedRows.splice(o,1),e.state.selectedRowKeys.splice(o,1))}),this.onSelectChange(this.state.selectedRowKeys,this.state.selectedRows)},isCheckAll:function(){var t=this,e=this.state.pagination.current,n=this.showData.some(function(n,i){var r=n[t.rowKey]?n[t.rowKey]:e+"-"+i;return t.state.selectedRowKeys.indexOf(r)<0});return!n},handleRefresh:function(){this.state={sortKey:"",reverse:"",selectedRows:[],selectedRowKeys:[]},this.pagination?this.state.pagination=this.pagination:this.state.pagination={current:1},this.interData=this.data,this.handleTableChange()}},created:function(){this.interData=this.data,this.pagination&&(this.state.pagination=this.pagination)},mounted:function(){this.calcColumnWidth(),this.handleReorganizeData()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hasRefresh:Boolean,hasColumnsControl:Boolean},data:function(){return{columns:[]}},methods:{handleRefresh:function(){this.$parent.handleRefresh()},handleColumnControl:function(t){this.$parent.columns[t].visible=!this.$parent.columns[t].visible,this.$parent.columns[t].isShowIcon=this.$parent.columns[t].visible?"check":"remove"}},created:function(){this.columns=this.$parent.columns}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(190),o=i(r);n(191);e.default={props:{options:{type:Object,default:function(){}},name:String,placeholder:String,val:String,value:{},class:String},data:function(){return{interVal:this.value,flatPickr:null}},computed:{isWrap:function(){return!!this.options&&!!this.options.wrap}},methods:{changeVal:function(){this.$emit("input",this.interVal)},handleClear:function(){this.flatPickr&&this.flatPickr.clear()}},watch:{interVal:function(t){this.interVal=t,this.$emit("input",this.interVal)}},mounted:function(){var t=this.$refs.pickrInput;this.flatPickr=new o.default(t,this.options)},beforeDestroy:function(){this.flatPickr&&(this.flatPickr.destroy(),this.flatPickr=null)}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(18),o=i(r);e.default={mixins:[o.default],props:{title:{type:String,default:""},trigger:{type:String,default:"click"},width:{type:Number},placement:{type:String,default:"bottom"}},methods:{hidePopper:function(){var t=this;"hover"!==this.trigger&&(this.isShow=!1),this.timer=setTimeout(function(){t.isShow=!1,t.popperTimer=setTimeout(function(){t.popper.destroy(),t.popper=null},300)},300)}},computed:{popperStyle:function(){return this.width&&276!==this.width?{width:this.width+"px",maxWidth:"none"}:null}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{min:{type:Number,default:0},max:{type:Number,default:1/0},step:{type:Number,default:1},disabled:Boolean,val:{type:Number,default:0},onChange:{type:Function,default:function(){}},size:String,mode:{type:String,default:""}},computed:{sizeClass:function(){return this.size?"is-"+this.size:null}},data:function(){return{interVal:this.val}},watch:{interVal:function(t,e){if(this.handleFormat(t),this.interVal!==Number(e)&&"-"!==this.interVal){if(isNaN(e)&&"-"!==e)return;this.$emit("input",this.interVal),this.onChange(this.interVal)}}},methods:{handleFormat:function(t){""!==t&&"-"!==t&&(this.interVal=isNaN(this.interVal)?0:Number(this.interVal),this.interVal>this.max&&(this.interVal=this.max),this.interVal<this.min&&(this.interVal=this.min))},increase:function(){this.max?this.interVal+this.step<=this.max&&this.changeVal(this.step):this.changeVal(this.step)},decrease:function(){this.min||0===this.min?this.interVal-this.step>=this.min&&this.changeVal(-this.step):this.changeVal(-this.step)},changeVal:function(t){this.disabled||(this.interVal+=t)},handleKeyDown:function(t){38===t.keyCode?this.increase():40===t.keyCode&&this.decrease()}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{icon:String,to:{default:"/"},isActive:{type:Boolean,default:!1},click:{type:Function},router:{type:Boolean,default:!0}},data:function(){return{hasChildren:!1,isOpen:!1,arrowClass:"fa-caret-down",type:this.$parent.type}},methods:{toggle:function(){this.isOpen=!this.isOpen},getChildrenStatus:function(){var t=this;this.$children.every(function(e){return e.isOpen&&(t.isOpen=!0),"float"===e.type&&(t.arrowClass="fa-caret-right"),!0})}},mounted:function(){this.isOpen=this.isActive,this.hasChildren=!!this.$slots.sub,this.hasChildren&&(this.getChildrenStatus(),"fa-caret-right"===this.arrowClass&&(this.$el.addEventListener("mouseenter",this.toggle),this.$el.addEventListener("mouseleave",this.toggle)))},beforeDestroy:function(){this.$el.removeEventListener("mouseenter",this.toggle),this.$el.removeEventListener("mouseleave",this.toggle)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{label:String,type:{type:String,default:"collapse"}},data:function(){return{typeClass:this.type,isOpen:!1}},methods:{hasOpened:function(){var t=this;return this.$children.every(function(e){return e.isOpen&&(t.isOpen=!0),!0}),!1}},mounted:function(){this.hasOpened()}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(33),o=i(r);e.default={mixins:[o.default],props:{content:String,icon:String,width:{type:Number,default:400},autoClose:{type:Number,default:0},type:{type:String,default:"info"}},methods:{handleClose:function(){var t=this;setTimeout(function(){t.$destroy(),t.$el.remove()},100)},close:function(){this.handleClose()}},computed:{modalWidth:function(){return 400!==this.width&&0!==this.width?{width:this.width+"px"}:null},iconClass:function(){return this.icon?"fa-"+this.icon:null},typeClass:function(){return this.type?"is-"+this.type:null}},mounted:function(){var t=this;setTimeout(function(){t.isShow=!0},100),this.autoClose&&setTimeout(function(){t.handleClose()},1e3*this.autoClose)}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(33),o=i(r);e.default={mixins:[o.default]}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:"default"},title:{type:String},content:{type:String,default:""},closable:{type:Boolean,default:!0},onClose:{type:Function,default:function(){}},duration:{type:Number,default:4500},placement:{type:String,default:"top-right"},icon:{type:String},animated:{type:Boolean,default:!1},transition:{type:String}},data:function(){return{isShow:!1,placementTransition:{"top-right":"fadeRight","top-center":"fadeDown","top-left":"fadeLeft","bottom-right":"fadeRight","bottom-center":"fadeUp","bottom-left":"fadeLeft"}}},computed:{typeClass:function(){return this.type?"is-"+this.type:null},hasIcon:function(){return this.iconClass?"has-icon":null},faSpin:function(){return this.animated?"fa-spin":null},iconClass:function(){return this.icon?this.icon:"info"===this.type?"info-circle":"success"===this.type?"check-circle":"warning"===this.type?"exclamation-triangle":"danger"===this.type?"times-circle":"loading"===this.type?(this.type="info",this.animated=!0,"spinner"):this.icon},transitionName:function(){return this.transition?this.transition:this.placementTransition[this.placement]}},methods:{handleClose:function(){var t=this;this.isShow=!1,setTimeout(function(){t.$destroy(),t.$el.remove()},100)},close:function(){clearTimeout(this.timer),this.isShow=!1,this.$destroy(),this.$el.remove()}},beforeMount:function(){var t=void 0;t=document.querySelector(".notifications."+this.placement),t||(t=document.createElement("div"),t.classList.add("notifications",this.placement),document.body.appendChild(t)),t.appendChild(this.$el)},mounted:function(){var t=this;this.isShow=!0,this.timer=setTimeout(function(){return t.close()},this.duration)}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(18),o=i(r);e.default={mixins:[o.default],props:{width:{type:Number},trigger:{type:String,default:"click"},title:{type:String,default:""},showOk:{type:Boolean,default:!0},showCancel:{type:Boolean,default:!0},okText:{type:String,default:"OK"},cancelText:{type:String,default:"Cancel"},onOk:{type:Function,default:function(){}},onCancel:{type:Function,default:function(){}},icon:String,type:{type:String,default:"info"}},computed:{popperStyle:function(){return this.width&&210!==this.width?{width:this.width+"px",maxWidth:"none"}:null},iconClass:function(){return this.icon?"fa-"+this.icon:null},typeClass:function(){return this.type?"is-"+this.type:null}},methods:{handleOk:function(t){this.onOk(),this.handleClose(t)},handleCancel:function(t){this.onCancel(),this.handleClose(t)},handleClose:function(t){t.stopPropagation(),this.hidePopper()}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(18),o=i(r);e.default={mixins:[o.default],props:{title:{type:String,default:""},trigger:{type:String,default:"click"},width:{type:Number}},data:function(){return{reference:null,popper:null,isShow:!1}},computed:{popperStyle:function(){return this.width&&276!==this.width?{width:this.width+"px",maxWidth:"none"}:null}},methods:{hidePopper:function(){var t=this;"hover"!==this.trigger&&(this.isShow=!1),this.timer=setTimeout(function(){t.isShow=!1,t.popperTimer=setTimeout(function(){t.popper.destroy(),t.popper=null},300)},300)}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:""},size:{type:String},percent:{type:Number,required:!0,default:0},striped:Boolean,animated:Boolean,showinfo:Boolean,infoInside:{type:Boolean,default:!0},format:{type:Function,default:function(t){return t+"%"}}},data:function(){return{info:""}},computed:{typeClass:function(){return this.type?"is-"+this.type:null},sizeClass:function(){return this.size?"is-"+this.size:null},stripedClass:function(){return this.striped?"progress-striped":null},animatedClass:function(){return this.animated?"animated":null},infoOutsideClass:function(){return this.infoInside?null:"info-outside"}},watch:{percent:function(t){this.info=this.format(t)}},mounted:function(){this.info=this.format(this.percent)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{name:String,label:String,type:{type:String,default:"primary"},disabled:Boolean,checked:Boolean,value:{},val:[String,Number,Boolean],onChange:{type:Function,default:function(){}}},data:function(){return{isChecked:this.checked,realVal:null}},computed:{typeClass:function(){return this.type?"is-"+this.type:null},index:function(){return this.$parent.radioItems?this.$parent.radioItems.indexOf(this):null}},watch:{value:function(){this.updateValue()}},methods:{toggle:function(){this.isChecked||(this.isChecked=!this.isChecked,this.$refs.checkbox.value&&!this.isChecked?(this.realVal="",this.$emit("input",this.realVal)):this.$refs.checkbox.value&&this.isChecked?(this.realVal=this.$refs.checkbox.value,this.$emit("input",this.realVal)):!this.$refs.checkbox.value&&this.isChecked?(this.realVal=!0,this.$emit("input",this.realVal)):(this.realVal=!1,this.$emit("input",this.realVal)),this.$parent.isRadioGroup&&this.$parent.updateValue(this.index),this.onChange(this.isChecked))},updateValue:function(){}},mounted:function(){this.isChecked&&!this.value&&this.$emit("input",this.$refs.checkbox.value),this.value===this.val&&(this.isChecked=!0)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{icon:String,disabled:Boolean,checked:Boolean,value:{},val:[String,Number,Boolean],onChange:{type:Function,default:function(){}},name:String},data:function(){return{isChecked:this.checked,realVal:null}},computed:{index:function(){return this.$parent.radioItems?this.$parent.radioItems.indexOf(this):null},iconClass:function(){return this.icon?"fa-"+this.icon:null}},methods:{toggle:function(){this.isChecked||(this.isChecked=!this.isChecked,this.$refs.checkbox.value&&!this.isChecked?(this.realVal="",this.$emit("input",this.realVal)):this.$refs.checkbox.value&&this.isChecked?(this.realVal=this.$refs.checkbox.value,this.$emit("input",this.realVal)):!this.$refs.checkbox.value&&this.isChecked?(this.realVal=!0,this.$emit("input",this.realVal)):(this.realVal=!1,this.$emit("input",this.realVal)),this.$parent.isRadioGroup&&this.$parent.updateValue(this.index),this.onChange(this.isChecked))}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:[String,Number],onChange:{type:Function,default:function(){}}},data:function(){return{checked:"",isRadioGroup:!0}},computed:{radioItems:function(){return this.$children}},watch:{value:function(){this.initChecked()}},methods:{updateValue:function(t){var e=this;this.checked="",this.$children.forEach(function(n,i){t!==i?n.isChecked=!1:e.checked=n.val}),this.$emit("input",this.checked),this.onChange(this.checked)},initChecked:function(){var t=this;this.$children.forEach(function(e){t.value&&t.value.indexOf(e.val)>=0?(e.isChecked=!0,e.realVal=e.val):(e.isChecked=!1,e.realVal="")})}},mounted:function(){this.initChecked()}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(192),o=i(r),a=n(34),s=i(a);e.default={props:{target:String,offset:{type:Number,default:500},duration:{type:Number,default:500},distance:Number},data:function(){return{isShow:!0}},computed:{targetEl:function(){return"top"===this.target?document.body:this.distance?this.distance:this.target},isPreset:function(){return("top"===this.target||"bottom"===this.target)&&(this.isShow=!1,!0)},iconClass:function(){return"bottom"===this.target?"fa-arrow-down":"fa-arrow-up"}},methods:{handleScroll:function(){this.isShow=s.default.getScroll(window,!0)>this.offset},scrollTo:function(){(0,o.default)(this.targetEl,{duration:this.duration})}},mounted:function(){this.isPreset&&window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){this.isPreset&&window.removeEventListener("scroll",this.handleScroll)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{isOpen:!1}},methods:{handleToggleOptions:function(){this.isOpen=!this.isOpen}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,description:String,isActive:Boolean},data:function(){return{step:{},active:this.isActive}},created:function(){this.step={title:this.title,description:this.description,isActive:this.isActive},this.$parent.steps.push(this.step)},mounted:function(){}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:"pills"},current:{type:Number,default:0},prevText:{type:String,default:"Prev"},nextText:{type:String,default:"Next"},onPrev:{type:Function,default:function(){}},onNext:{type:Function,default:function(){}},showFooter:{type:Boolean,default:!0}},data:function(){return{steps:[],stepStyle:{},currentIndex:this.current}},watch:{current:function(t){this.currentIndex=t,this.setActiveIndex(this.currentIndex)}},methods:{setActiveIndex:function(t){this.$children.forEach(function(e,n){n!==t?e.active=!1:e.active=!0})},next:function(){this.currentIndex<this.$children.length&&(this.currentIndex+=1,this.setActiveIndex(this.currentIndex),this.onNext(this.currentIndex))},prev:function(){this.currentIndex>0&&(this.currentIndex-=1,this.setActiveIndex(this.currentIndex),this.onPrev(this.currentIndex))}},created:function(){if("pills"===this.type){var t=parseInt(100/this.steps.length,10)+"%";this.stepStyle.width=t}},mounted:function(){this.setActiveIndex(this.currentIndex)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:"success"},size:String,onText:String,offText:String,checked:Boolean,disabled:Boolean,value:{},name:String,onChange:{type:Function,default:function(){}}},data:function(){return{on:!1,showText:""}},computed:{typeClass:function(){return this.type?"is-"+this.type:"is-success"},sizeClass:function(){return this.size?"is-"+this.size:null},hasText:function(){return this.onText||this.offText}},methods:{toggle:function(){this.on=!this.on,this.showText=this.on?this.onText:this.offText,this.$emit("input",this.on),this.onChange(this.on)}},mounted:function(){this.checked||this.value?(this.on=!0,this.showText=this.onText):this.showText=this.offText}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{icon:String,selected:Boolean,disabled:Boolean,label:{type:String,required:!0}},data:function(){return{isActive:!1,transition:"fade"}},beforeCreate:function(){this.isTabPane=!0},methods:{onActivated:function(){this.isActive=!0},deActivated:function(){this.isActive=!1}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{isFullWidth:Boolean,layout:{type:String,default:"top",validator:function(t){return["top","bottom","left","right"].indexOf(t)>-1}},type:{type:String,default:""},size:{type:String,default:""},alignment:{type:String,default:""},activeIndex:{type:Number,default:0},animation:{type:String,default:"fade"},onlyFade:{type:Boolean,default:!0},onTabClick:{type:Function,default:function(){}},transition:{type:String,default:"fade"}},data:function(){return{tabPanes:[],selectedIndex:0,prevSelectedIndex:-1}},watch:{activeIndex:function(t){this.selectedIndex=t}},computed:{alignClass:function(){return this.alignment?"is-"+this.alignment:null},typeClass:function(){return this.type?"is-"+this.type:null},sizeClass:function(){return this.size?"is-"+this.size:null},layoutClass:function(){return this.layout?"is-layout-"+this.layout:null},fullWidthClass:function(){return this.isFullWidth?"is-fullwidth":null}},methods:{isActive:function(t){return t===this.selectedIndex},handleSelect:function(t){this.prevSelectedIndex!==-1&&this.tabPanes[this.selectedIndex].deActivated(),this.prevSelectedIndex=this.selectedIndex,this.selectedIndex=t,this.tabPanes[t].onActivated(t,this.prevSelectedIndex),this.onTabClick(t)}},mounted:function(){this.tabPanes=this.$children.filter(function(t){return t.isTabPane}),this.handleSelect(this.activeIndex)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:""},size:{type:String},color:{type:String},closable:{type:Boolean,default:!1},onClose:{type:Function,default:function(){}},rounded:{type:Boolean,default:!1}},data:function(){return{isShow:!0}},computed:{typeClass:function(){return this.type?"is-"+this.type:null},sizeClass:function(){return this.size?"is-"+this.size:null},btnClass:function(){return"large"===this.size?null:"is-small"},colorStyle:function(){return this.color?{backgroundColor:this.color}:null},roundedClass:function(){return this.rounded?null:"is-square"}},methods:{handleClose:function(){var t=this;this.isShow=!1,this.onClose(),setTimeout(function(){t.$destroy(),t.$el.remove()},100)}}}},function(t,e){"use strict"},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{icon:String,date:String,type:String,color:String},computed:{iconClass:function(){return this.icon?"fa-"+this.icon:null},typeClass:function(){return this.type?"is-"+this.type:null}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(18),o=i(r);e.default={mixins:[o.default],methods:{handleClick:function(){this.isShow?this.hidePopper():this.createInstance()},bindEvent:function(){var t=this.reference=this.reference||this.$el.children[0];t&&("focus"===this.trigger?(t.addEventListener("focus",this.createInstance),t.addEventListener("blur",this.toggle)):"click"===this.trigger?t.addEventListener("click",this.handleClick):(t.addEventListener("mouseenter",this.createInstance),t.addEventListener("mouseleave",this.hidePopper)))},removeEvent:function(){this.reference&&("focus"===this.trigger?(this.reference.removeEventListener("focus",this.createInstance),this.reference.removeEventListener("blur",this.toggle)):"click"===this.trigger?this.reference.removeEventListener("click",this.handleClick):(this.reference.removeEventListener("mouseenter",this.createInstance),this.reference.removeEventListener("mouseleave",this.hidePopper)))}}}},function(t,e,n){t.exports={default:n(156),__esModule:!0}},function(t,e,n){t.exports={default:n(157),__esModule:!0}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(152),o=i(r),a=n(151),s=i(a),c="function"==typeof s.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===c(o.default)?function(t){return"undefined"==typeof t?"undefined":c(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":c(t)}},function(t,e,n){n(179),t.exports=n(7).Object.assign},function(t,e,n){n(180),t.exports=n(7).Object.keys},function(t,e,n){n(183),n(181),n(184),n(185),t.exports=n(7).Symbol},function(t,e,n){n(182),n(186),t.exports=n(47).f("iterator");
},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var i=n(5),r=n(177),o=n(176);t.exports=function(t){return function(e,n,a){var s,c=i(e),l=r(c.length),u=o(a,l);if(t&&n!=n){for(;l>u;)if(s=c[u++],s!=s)return!0}else for(;l>u;u++)if((t||u in c)&&c[u]===n)return t||u||0;return!t&&-1}}},function(t,e,n){var i=n(158);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var i=n(12),r=n(39),o=n(22);t.exports=function(t){var e=i(t),n=r.f;if(n)for(var a,s=n(t),c=o.f,l=0;s.length>l;)c.call(t,a=s[l++])&&e.push(a);return e}},function(t,e,n){t.exports=n(2).document&&document.documentElement},function(t,e,n){var i=n(58);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";var i=n(63),r=n(23),o=n(40),a={};n(10)(a,n(13)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(a,{next:r(1,n)}),o(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(12),r=n(5);t.exports=function(t,e){for(var n,o=r(t),a=i(o),s=a.length,c=0;s>c;)if(o[n=a[c++]]===e)return n}},function(t,e,n){var i=n(24)("meta"),r=n(21),o=n(4),a=n(11).f,s=0,c=Object.isExtensible||function(){return!0},l=!n(9)(function(){return c(Object.preventExtensions({}))}),u=function(t){a(t,i,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,i)){if(!c(t))return"F";if(!e)return"E";u(t)}return t[i].i},d=function(t,e){if(!o(t,i)){if(!c(t))return!0;if(!e)return!1;u(t)}return t[i].w},p=function(t){return l&&h.NEED&&c(t)&&!o(t,i)&&u(t),t},h=t.exports={KEY:i,NEED:!1,fastKey:f,getWeak:d,onFreeze:p}},function(t,e,n){"use strict";var i=n(12),r=n(39),o=n(22),a=n(44),s=n(61),c=Object.assign;t.exports=!c||n(9)(function(){var t={},e={},n=Symbol(),i="abcdefghijklmnopqrst";return t[n]=7,i.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=i})?function(t,e){for(var n=a(t),c=arguments.length,l=1,u=r.f,f=o.f;c>l;)for(var d,p=s(arguments[l++]),h=u?i(p).concat(u(p)):i(p),v=h.length,m=0;v>m;)f.call(p,d=h[m++])&&(n[d]=p[d]);return n}:c},function(t,e,n){var i=n(11),r=n(19),o=n(12);t.exports=n(8)?Object.defineProperties:function(t,e){r(t);for(var n,a=o(e),s=a.length,c=0;s>c;)i.f(t,n=a[c++],e[n]);return t}},function(t,e,n){var i=n(22),r=n(23),o=n(5),a=n(45),s=n(4),c=n(60),l=Object.getOwnPropertyDescriptor;e.f=n(8)?l:function(t,e){if(t=o(t),e=a(e,!0),c)try{return l(t,e)}catch(t){}if(s(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(5),r=n(64).f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return r(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?s(t):r(i(t))}},function(t,e,n){var i=n(4),r=n(44),o=n(41)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var i=n(20),r=n(7),o=n(9);t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],a={};a[t]=e(n),i(i.S+i.F*o(function(){n(1)}),"Object",a)}},function(t,e,n){var i=n(43),r=n(35);t.exports=function(t){return function(e,n){var o,a,s=String(r(e)),c=i(n),l=s.length;return c<0||c>=l?t?"":void 0:(o=s.charCodeAt(c),o<55296||o>56319||c+1===l||(a=s.charCodeAt(c+1))<56320||a>57343?t?s.charAt(c):o:t?s.slice(c,c+2):(o-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var i=n(43),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(43),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){"use strict";var i=n(159),r=n(166),o=n(37),a=n(5);t.exports=n(62)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){var i=n(20);i(i.S+i.F,"Object",{assign:n(169)})},function(t,e,n){var i=n(44),r=n(12);n(174)("keys",function(){return function(t){return r(i(t))}})},function(t,e){},function(t,e,n){"use strict";var i=n(175)(!0);n(62)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var i=n(2),r=n(4),o=n(8),a=n(20),s=n(66),c=n(168).KEY,l=n(9),u=n(42),f=n(40),d=n(24),p=n(13),h=n(47),v=n(46),m=n(167),g=n(162),y=n(164),b=n(19),_=n(5),C=n(45),x=n(23),w=n(63),k=n(172),S=n(171),M=n(11),O=n(12),E=S.f,j=M.f,D=k.f,P=i.Symbol,T=i.JSON,F=T&&T.stringify,R="prototype",I=p("_hidden"),N=p("toPrimitive"),$={}.propertyIsEnumerable,A=u("symbol-registry"),L=u("symbols"),B=u("op-symbols"),z=Object[R],V="function"==typeof P,Y=i.QObject,H=!Y||!Y[R]||!Y[R].findChild,W=o&&l(function(){return 7!=w(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=E(z,e);i&&delete z[e],j(t,e,n),i&&t!==z&&j(z,e,i)}:j,K=function(t){var e=L[t]=w(P[R]);return e._k=t,e},q=V&&"symbol"==typeof P.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof P},U=function(t,e,n){return t===z&&U(B,e,n),b(t),e=C(e,!0),b(n),r(L,e)?(n.enumerable?(r(t,I)&&t[I][e]&&(t[I][e]=!1),n=w(n,{enumerable:x(0,!1)})):(r(t,I)||j(t,I,x(1,{})),t[I][e]=!0),W(t,e,n)):j(t,e,n)},G=function(t,e){b(t);for(var n,i=g(e=_(e)),r=0,o=i.length;o>r;)U(t,n=i[r++],e[n]);return t},J=function(t,e){return void 0===e?w(t):G(w(t),e)},Q=function(t){var e=$.call(this,t=C(t,!0));return!(this===z&&r(L,t)&&!r(B,t))&&(!(e||!r(this,t)||!r(L,t)||r(this,I)&&this[I][t])||e)},X=function(t,e){if(t=_(t),e=C(e,!0),t!==z||!r(L,e)||r(B,e)){var n=E(t,e);return!n||!r(L,e)||r(t,I)&&t[I][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=D(_(t)),i=[],o=0;n.length>o;)r(L,e=n[o++])||e==I||e==c||i.push(e);return i},tt=function(t){for(var e,n=t===z,i=D(n?B:_(t)),o=[],a=0;i.length>a;)!r(L,e=i[a++])||n&&!r(z,e)||o.push(L[e]);return o};V||(P=function(){if(this instanceof P)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===z&&e.call(B,n),r(this,I)&&r(this[I],t)&&(this[I][t]=!1),W(this,t,x(1,n))};return o&&H&&W(z,t,{configurable:!0,set:e}),K(t)},s(P[R],"toString",function(){return this._k}),S.f=X,M.f=U,n(64).f=k.f=Z,n(22).f=Q,n(39).f=tt,o&&!n(38)&&s(z,"propertyIsEnumerable",Q,!0),h.f=function(t){return K(p(t))}),a(a.G+a.W+a.F*!V,{Symbol:P});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)p(et[nt++]);for(var et=O(p.store),nt=0;et.length>nt;)v(et[nt++]);a(a.S+a.F*!V,"Symbol",{for:function(t){return r(A,t+="")?A[t]:A[t]=P(t)},keyFor:function(t){if(q(t))return m(A,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){H=!0},useSimple:function(){H=!1}}),a(a.S+a.F*!V,"Object",{create:J,defineProperty:U,defineProperties:G,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:tt}),T&&a(a.S+a.F*(!V||l(function(){var t=P();return"[null]"!=F([t])||"{}"!=F({a:t})||"{}"!=F(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!q(t)){for(var e,n,i=[t],r=1;arguments.length>r;)i.push(arguments[r++]);return e=i[1],"function"==typeof e&&(n=e),!n&&y(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!q(e))return e}),i[1]=e,F.apply(T,i)}}}),P[R][N]||n(10)(P[R],N,P[R].valueOf),f(P,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},function(t,e,n){n(46)("asyncIterator")},function(t,e,n){n(46)("observable")},function(t,e,n){n(178);for(var i=n(2),r=n(10),o=n(37),a=n(13)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],c=0;c<5;c++){var l=s[c],u=i[l],f=u&&u.prototype;f&&!f[a]&&r(f,a,l),o[l]=o.Array}},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){/*! flatpickr v2.2.3, @license MIT */
function i(t,e){function n(){t._flatpickr&&k(t._flatpickr),t._flatpickr=ot,ot.element=t,ot.instanceConfig=e||{},H(),R(),I(),W(),V(),Y(),ot.isOpen=ot.config.inline,ot.changeMonth=C,ot.clear=x,ot.close=w,ot.destroy=k,ot.formatDate=O,ot.jumpToDate=f,ot.open=F,ot.parseDate=N,ot.redraw=A,ot.set=B,ot.setDate=z,ot.toggle=q,ot.isMobile=!ot.config.disableMobile&&!ot.config.inline&&"single"===ot.config.mode&&!ot.config.disable.length&&!ot.config.enable.length&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),ot.isMobile||h(),u(),ot.minDateHasTime=ot.config.minDate&&(ot.config.minDate.getHours()||ot.config.minDate.getMinutes()||ot.config.minDate.getSeconds()),ot.maxDateHasTime=ot.config.maxDate&&(ot.config.maxDate.getHours()||ot.config.maxDate.getMinutes()||ot.config.maxDate.getSeconds()),ot.isMobile||Object.defineProperty(ot,"dateIsPicked",{set:function(t){return t?ot.calendarContainer.classList.add("dateIsPicked"):void ot.calendarContainer.classList.remove("dateIsPicked")}}),ot.dateIsPicked=ot.selectedDates.length>0||ot.config.noCalendar,ot.selectedDates.length&&(ot.config.enableTime&&c(),Z()),ot.config.weekNumbers&&(ot.calendarContainer.style.width=ot.days.offsetWidth+ot.weekWrapper.offsetWidth+2+"px"),U("Ready")}function r(t){ot.config.noCalendar&&!ot.selectedDates.length&&(ot.selectedDates=[ot.now]),rt(t),ot.selectedDates.length&&(s(),Z())}function s(){if(ot.config.enableTime){var t=parseInt(ot.hourElement.value,10)||0,e=parseInt(ot.minuteElement.value,10)||0,n=ot.config.enableSeconds?parseInt(ot.secondElement.value,10)||0:0;ot.amPM&&(t=t%12+12*("PM"===ot.amPM.innerHTML)),ot.minDateHasTime&&0===it(G(),ot.config.minDate)?(t=Math.max(t,ot.config.minDate.getHours()),t===ot.config.minDate.getHours()&&(e=Math.max(e,ot.config.minDate.getMinutes()))):ot.maxDateHasTime&&0===it(G(),ot.config.maxDate)&&(t=Math.min(t,ot.config.maxDate.getHours()),t===ot.config.maxDate.getHours()&&(e=Math.min(e,ot.config.maxDate.getMinutes()))),l(t,e,n)}}function c(t){var e=t||G();e&&l(e.getHours(),e.getMinutes(),e.getSeconds())}function l(t,e,n){ot.selectedDates.length&&ot.selectedDates[ot.selectedDates.length-1].setHours(t%24,e,n||0,0),ot.config.enableTime&&!ot.isMobile&&(ot.hourElement.value=ot.pad(ot.config.time_24hr?t:(12+t)%12+12*(t%12===0)),ot.minuteElement.value=ot.pad(e),!ot.config.time_24hr&&ot.selectedDates.length&&(ot.amPM.textContent=G().getHours()>=12?"PM":"AM"),ot.config.enableSeconds&&(ot.secondElement.value=ot.pad(n)))}function u(){if(ot.config.wrap&&["open","close","toggle","clear"].forEach(function(t){try{ot.element.querySelector("[data-"+t+"]").addEventListener("click",ot[t])}catch(t){}}),"createEvent"in document&&(ot.changeEvent=document.createEvent("HTMLEvents"),ot.changeEvent.initEvent("change",!1,!0)),ot.isMobile)return K();ot.debouncedResize=nt(T,50),ot.triggerChange=function(){return U("Change")},ot.debouncedChange=nt(ot.triggerChange,1e3),"range"===ot.config.mode&&ot.days.addEventListener("mouseover",P),document.addEventListener("keydown",D),window.addEventListener("resize",ot.debouncedResize);var t="undefined"!=typeof window.ontouchstart?"touchstart":"click";document.addEventListener(t,M),document.addEventListener("blur",M),ot.config.clickOpens&&(ot.altInput||ot.input).addEventListener("focus",F),ot.config.noCalendar||(ot.prevMonthNav.addEventListener("click",function(){return C(-1)}),ot.nextMonthNav.addEventListener("click",function(){return C(1)}),ot.currentYearElement.addEventListener("wheel",function(t){return nt(tt(t),50)}),ot.currentYearElement.addEventListener("focus",function(){ot.currentYearElement.select()}),ot.currentYearElement.addEventListener("input",function(t){4===t.target.value.length&&(ot.currentYearElement.blur(),E(t.target.value),t.target.value=ot.currentYear)}),ot.days.addEventListener("click",L)),ot.config.enableTime&&(ot.timeContainer.addEventListener("wheel",function(t){return nt(r(t),5)}),ot.timeContainer.addEventListener("input",r),ot.timeContainer.addEventListener("wheel",ot.debouncedChange),ot.timeContainer.addEventListener("input",ot.triggerChange),ot.hourElement.addEventListener("focus",function(){ot.hourElement.select()}),ot.minuteElement.addEventListener("focus",function(){ot.minuteElement.select()}),ot.secondElement&&ot.secondElement.addEventListener("focus",function(){ot.secondElement.select()}),ot.amPM&&ot.amPM.addEventListener("click",function(t){r(t),ot.triggerChange(t)}))}function f(t){t=t?N(t):G()||(ot.config.minDate>ot.now?ot.config.minDate:ot.now);try{ot.currentYear=t.getFullYear(),ot.currentMonth=t.getMonth()}catch(e){console.error(e.stack),console.warn("Invalid date supplied: "+t)}ot.redraw()}function d(t,e){var n=t.target.parentNode.childNodes[0];n.value=parseInt(n.value,10)+e*(n.step||1);try{n.dispatchEvent(new Event("input",{bubbles:!0}))}catch(t){var i=document.createEvent("CustomEvent");i.initCustomEvent("input",!0,!0,{}),n.dispatchEvent(i)}}function p(t){var e=et("div","numInputWrapper"),n=et("input","numInput "+t),i=et("span","arrowUp"),r=et("span","arrowDown");return n.type="text",e.appendChild(n),e.appendChild(i),e.appendChild(r),i.addEventListener("click",function(t){return d(t,1)}),r.addEventListener("click",function(t){return d(t,-1)}),e}function h(){var t=document.createDocumentFragment();ot.calendarContainer=et("div","flatpickr-calendar"),ot.numInputType=navigator.userAgent.indexOf("MSIE 9.0")>0?"text":"number",ot.config.noCalendar||(t.appendChild(g()),ot.innerContainer=et("div","flatpickr-innerContainer"),ot.config.weekNumbers&&ot.innerContainer.appendChild(_()),ot.rContainer=et("div","flatpickr-rContainer"),ot.rContainer.appendChild(b()),ot.rContainer.appendChild(m()),ot.innerContainer.appendChild(ot.rContainer),t.appendChild(ot.innerContainer)),ot.config.enableTime&&t.appendChild(y()),ot.calendarContainer.appendChild(t),ot.config.inline||ot.config.static?(ot.calendarContainer.classList.add(ot.config.inline?"inline":"static"),$(),ot.config.appendTo&&ot.config.appendTo.nodeType?ot.config.appendTo.appendChild(ot.calendarContainer):ot.element.parentNode.insertBefore(ot.calendarContainer,(ot.altInput||ot.input).nextSibling)):document.body.appendChild(ot.calendarContainer)}function v(t,e,n){var i=j(e),r=et("span","flatpickr-day "+t,e.getDate());return r.dateObj=e,0===it(e,ot.now)&&r.classList.add("today"),i?(r.tabIndex=0,J(e)&&(r.classList.add("selected"),"range"===ot.config.mode?r.classList.add(0===it(e,ot.selectedDates[0])?"startRange":"endRange"):ot.selectedDateElem=r)):(r.classList.add("disabled"),ot.selectedDates[0]&&e>ot.minRangeDate&&e<ot.selectedDates[0]?ot.minRangeDate=e:ot.selectedDates[0]&&e<ot.maxRangeDate&&e>ot.selectedDates[0]&&(ot.maxRangeDate=e)),"range"===ot.config.mode&&(Q(e)&&!J(e)&&r.classList.add("inRange"),1===ot.selectedDates.length&&(e<ot.minRangeDate||e>ot.maxRangeDate)&&r.classList.add("notAllowed")),ot.config.weekNumbers&&"prevMonthDay"!==t&&n%7===1&&ot.weekNumbers.insertAdjacentHTML("beforeend","<span class='disabled flatpickr-day'>"+ot.config.getWeek(e)+"</span>"),U("DayCreate",r),r}function m(){ot.days||(ot.days=et("div","flatpickr-days"),ot.days.tabIndex=-1),ot.firstOfMonth=(new Date(ot.currentYear,ot.currentMonth,1).getDay()-ot.l10n.firstDayOfWeek+7)%7,ot.prevMonthDays=ot.utils.getDaysinMonth((ot.currentMonth-1+12)%12);var t=ot.utils.getDaysinMonth(),e=document.createDocumentFragment(),n=ot.prevMonthDays+1-ot.firstOfMonth;ot.config.weekNumbers&&(ot.weekNumbers.innerHTML=""),"range"===ot.config.mode&&(ot.minRangeDate=new Date(ot.currentYear,ot.currentMonth-1,n),ot.maxRangeDate=new Date(ot.currentYear,ot.currentMonth+1,(42-ot.firstOfMonth)%t)),ot.days.innerHTML="";for(var i=0;n<=ot.prevMonthDays;i++,n++)e.appendChild(v("prevMonthDay",new Date(ot.currentYear,ot.currentMonth-1,n),n));for(n=1;n<=t;n++)e.appendChild(v("",new Date(ot.currentYear,ot.currentMonth,n),n));for(var r=t+1;r<=42-ot.firstOfMonth;r++)e.appendChild(v("nextMonthDay",new Date(ot.currentYear,ot.currentMonth+1,r%t),r));return ot.days.appendChild(e),ot.days}function g(){var t=document.createDocumentFragment();ot.monthNav=et("div","flatpickr-month"),ot.prevMonthNav=et("span","flatpickr-prev-month"),ot.prevMonthNav.innerHTML=ot.config.prevArrow,ot.currentMonthElement=et("span","cur-month");var e=p("cur-year");return ot.currentYearElement=e.childNodes[0],ot.currentYearElement.title=ot.l10n.scrollTitle,ot.config.minDate&&(ot.currentYearElement.min=ot.config.minDate.getFullYear()),ot.config.maxDate&&(ot.currentYearElement.max=ot.config.maxDate.getFullYear(),ot.currentYearElement.disabled=ot.config.minDate&&ot.config.minDate.getFullYear()===ot.config.maxDate.getFullYear()),ot.nextMonthNav=et("span","flatpickr-next-month"),ot.nextMonthNav.innerHTML=ot.config.nextArrow,ot.navigationCurrentMonth=et("span","flatpickr-current-month"),ot.navigationCurrentMonth.appendChild(ot.currentMonthElement),ot.navigationCurrentMonth.appendChild(e),t.appendChild(ot.prevMonthNav),t.appendChild(ot.navigationCurrentMonth),t.appendChild(ot.nextMonthNav),ot.monthNav.appendChild(t),X(),ot.monthNav}function y(){ot.calendarContainer.classList.add("hasTime"),ot.timeContainer=et("div","flatpickr-time"),ot.timeContainer.tabIndex=-1;var t=et("span","flatpickr-time-separator",":"),e=p("flatpickr-hour");ot.hourElement=e.childNodes[0];var n=p("flatpickr-minute");if(ot.minuteElement=n.childNodes[0],ot.hourElement.tabIndex=ot.minuteElement.tabIndex=0,ot.hourElement.pattern=ot.minuteElement.pattern="d*",ot.hourElement.value=ot.pad(G()?G().getHours():ot.config.defaultHour),ot.minuteElement.value=ot.pad(G()?G().getMinutes():ot.config.defaultMinute),ot.hourElement.step=ot.config.hourIncrement,ot.minuteElement.step=ot.config.minuteIncrement,ot.hourElement.min=ot.config.time_24hr?0:1,ot.hourElement.max=ot.config.time_24hr?23:12,ot.minuteElement.min=0,ot.minuteElement.max=59,ot.hourElement.title=ot.minuteElement.title=ot.l10n.scrollTitle,ot.timeContainer.appendChild(e),ot.timeContainer.appendChild(t),ot.timeContainer.appendChild(n),ot.config.time_24hr&&ot.timeContainer.classList.add("time24hr"),ot.config.enableSeconds){ot.timeContainer.classList.add("hasSeconds");var i=p("flatpickr-second");ot.secondElement=i.childNodes[0],ot.secondElement.pattern=ot.hourElement.pattern,ot.secondElement.value=G()?ot.pad(G().getSeconds()):"00",ot.secondElement.step=ot.minuteElement.step,ot.secondElement.min=ot.minuteElement.min,ot.secondElement.max=ot.minuteElement.max,ot.timeContainer.appendChild(et("span","flatpickr-time-separator",":")),ot.timeContainer.appendChild(i)}return ot.config.time_24hr||(ot.amPM=et("span","flatpickr-am-pm",["AM","PM"][ot.hourElement.value>11|0]),ot.amPM.title=ot.l10n.toggleTitle,ot.amPM.tabIndex=0,ot.timeContainer.appendChild(ot.amPM)),ot.timeContainer}function b(){ot.weekdayContainer||(ot.weekdayContainer=et("div","flatpickr-weekdays"));var t=ot.l10n.firstDayOfWeek,e=ot.l10n.weekdays.shorthand.slice();return t>0&&t<e.length&&(e=[].concat(e.splice(t,e.length),e.splice(0,t))),ot.weekdayContainer.innerHTML="\n\t\t<span class=flatpickr-weekday>\n\t\t\t"+e.join("</span><span class=flatpickr-weekday>")+"\n\t\t</span>\n\t\t",ot.weekdayContainer}function _(){return ot.calendarContainer.classList.add("hasWeeks"),ot.weekWrapper=et("div","flatpickr-weekwrapper"),ot.weekWrapper.appendChild(et("span","flatpickr-weekday",ot.l10n.weekAbbreviation)),ot.weekNumbers=et("div","flatpickr-weeks"),ot.weekWrapper.appendChild(ot.weekNumbers),ot.weekWrapper}function C(t,e){ot.currentMonth="undefined"==typeof e||e?ot.currentMonth+t:t,E(),X(),m(),ot.config.noCalendar||ot.days.focus(),U("MonthChange")}function x(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];ot.input.value="",ot.altInput&&(ot.altInput.value=""),ot.mobileInput&&(ot.mobileInput.value=""),ot.selectedDates=[],ot.dateIsPicked=!1,ot.redraw(),t!==!1&&U("Change")}function w(){ot.isOpen=!1,ot.isMobile||(ot.calendarContainer.classList.remove("open"),(ot.altInput||ot.input).classList.remove("active")),U("Close")}function k(t){t=t||ot,t.clear(!1),document.removeEventListener("keydown",D),window.removeEventListener("resize",t.debouncedResize),document.removeEventListener("click",M),document.removeEventListener("blur",M),t.isMobile&&t.mobileInput&&t.mobileInput.parentNode?t.mobileInput.parentNode.removeChild(t.mobileInput):t.calendarContainer&&t.calendarContainer.parentNode&&t.calendarContainer.parentNode.removeChild(t.calendarContainer),t.altInput&&(t.input.type="text",t.altInput.parentNode&&t.altInput.parentNode.removeChild(t.altInput)),t.input.classList.remove("flatpickr-input"),t.input.removeEventListener("focus",F),t.input.removeAttribute("readonly")}function S(t){for(var e=t;e;){if(/flatpickr-day|flatpickr-calendar/.test(e.className))return!0;e=e.parentNode}return!1}function M(t){var e=ot.element.contains(t.target)||t.target===ot.input||t.target===ot.altInput;!ot.isOpen||S(t.target)||e||(ot.close(),"range"===ot.config.mode&&1===ot.selectedDates.length&&(ot.clear(),ot.redraw()))}function O(t,e){if(ot.config.formatDate)return ot.config.formatDate(t,e);var n=t.split("");return n.map(function(t,i){return ot.formats[t]&&"\\"!==n[i-1]?ot.formats[t](e):"\\"!==t?t:""}).join("")}function E(t){ot.currentMonth<0||ot.currentMonth>11?(ot.currentYear+=ot.currentMonth%11,ot.currentMonth=(ot.currentMonth+12)%12,U("YearChange")):t&&(!ot.currentYearElement.min||t>=ot.currentYearElement.min)&&(!ot.currentYearElement.max||t<=ot.currentYearElement.max)&&(ot.currentYear=parseInt(t,10)||ot.currentYear,ot.config.maxDate&&ot.currentYear===ot.config.maxDate.getFullYear()?ot.currentMonth=Math.min(ot.config.maxDate.getMonth(),ot.currentMonth):ot.config.minDate&&ot.currentYear===ot.config.minDate.getFullYear()&&(ot.currentMonth=Math.max(ot.config.minDate.getMonth(),ot.currentMonth)),ot.redraw(),U("YearChange"))}function j(t){if(ot.config.minDate&&it(t,ot.config.minDate)<0||ot.config.maxDate&&it(t,ot.config.maxDate)>0)return!1;if(!ot.config.enable.length&&!ot.config.disable.length)return!0;t=N(t,!0);for(var e,n=ot.config.enable.length>0,i=n?ot.config.enable:ot.config.disable,r=0;r<i.length;r++){if(e=i[r],e instanceof Function&&e(t))return n;if((e instanceof Date||"string"==typeof e)&&N(e,!0).getTime()===t.getTime())return n;if("object"===("undefined"==typeof e?"undefined":a(e))&&e.from&&e.to&&t>=N(e.from)&&t<=N(e.to))return n}return!n}function D(t){if(ot.isOpen)switch(t.which){case 13:ot.timeContainer&&ot.timeContainer.contains(t.target)?Z():L(t);break;case 27:ot.clear(),ot.redraw(),ot.close();break;case 37:t.target!==ot.input&t.target!==ot.altInput&&C(-1);break;case 38:t.preventDefault(),ot.timeContainer&&ot.timeContainer.contains(t.target)?r(t):(ot.currentYear++,ot.redraw());break;case 39:t.target!==ot.input&t.target!==ot.altInput&&C(1);break;case 40:t.preventDefault(),ot.timeContainer&&ot.timeContainer.contains(t.target)?r(t):(ot.currentYear--,ot.redraw())}}function P(t){if(1===ot.selectedDates.length&&t.target.classList.contains("flatpickr-day")){for(var e=t.target.dateObj,n=N(ot.selectedDates[0],!0),i=Math.min(e.getTime(),ot.selectedDates[0].getTime()),r=Math.max(e.getTime(),ot.selectedDates[0].getTime()),o=!1,a=i;a<r;a+=ot.utils.duration.DAY)if(!j(new Date(a))){o=!0;break}for(var s=ot.days.childNodes[0].dateObj.getTime(),c=0;c<42;c++,s+=ot.utils.duration.DAY){var l=s<ot.minRangeDate.getTime()||s>ot.maxRangeDate.getTime();if(l)ot.days.childNodes[c].classList.add("notAllowed"),ot.days.childNodes[c].classList.remove("inRange","startRange","endRange");else if(!o||l){ot.days.childNodes[c].classList.remove("startRange","inRange","endRange","notAllowed");var u=Math.max(ot.minRangeDate.getTime(),i),f=Math.min(ot.maxRangeDate.getTime(),r);t.target.classList.add(e<ot.selectedDates[0]?"startRange":"endRange"),n>e&&s===n.getTime()?ot.days.childNodes[c].classList.add("endRange"):n<e&&s===n.getTime()?ot.days.childNodes[c].classList.add("startRange"):s>u&&s<f&&ot.days.childNodes[c].classList.add("inRange")}}}}function T(){!ot.isOpen||ot.config.static||ot.config.inline||$()}function F(t){return ot.isMobile?(t&&(t.preventDefault(),t.target.blur()),setTimeout(function(){ot.mobileInput.click()},0),void U("Open")):void(ot.isOpen||(ot.altInput||ot.input).disabled||ot.config.inline||(ot.calendarContainer.classList.add("open"),ot.config.static||ot.config.inline||$(),ot.isOpen=!0,ot.config.allowInput||((ot.altInput||ot.input).blur(),(ot.config.noCalendar?ot.timeContainer:ot.selectedDateElem?ot.selectedDateElem:ot.days).focus()),(ot.altInput||ot.input).classList.add("active"),U("Open")))}function R(){var t=["utc","wrap","weekNumbers","allowInput","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"];ot.config=Object.create(i.defaultConfig);var e=o({},ot.instanceConfig,ot.element.dataset||{});Object.defineProperty(ot.config,"minDate",{get:function(){return this._minDate},set:function(t){this._minDate=N(t),ot.days&&A(),ot.currentYearElement&&(t&&this._minDate instanceof Date?(ot.minDateHasTime=this._minDate.getHours()||this._minDate.getMinutes()||this._minDate.getSeconds(),ot.currentYearElement.min=this._minDate.getFullYear()):ot.currentYearElement.removeAttribute("min"),ot.currentYearElement.disabled=this._maxDate&&this._minDate&&this._maxDate.getFullYear()===this._minDate.getFullYear())}}),Object.defineProperty(ot.config,"maxDate",{get:function(){return this._maxDate},set:function(t){this._maxDate=N(t),ot.days&&A(),ot.currentYearElement&&(t&&this._maxDate instanceof Date?(ot.currentYearElement.max=this._maxDate.getFullYear(),ot.maxDateHasTime=this._maxDate.getHours()||this._maxDate.getMinutes()||this._maxDate.getSeconds()):ot.currentYearElement.removeAttribute("max"),ot.currentYearElement.disabled=this._maxDate&&this._minDate&&this._maxDate.getFullYear()===this._minDate.getFullYear())}}),o(ot.config,e);for(var n=0;n<t.length;n++)ot.config[t[n]]=ot.config[t[n]]===!0||"true"===ot.config[t[n]];!e.dateFormat&&e.enableTime&&(ot.config.dateFormat=ot.config.noCalendar?"H:i"+(ot.config.enableSeconds?":S":""):i.defaultConfig.dateFormat+" H:i"+(ot.config.enableSeconds?":S":"")),e.altInput&&e.enableTime&&!e.altFormat&&(ot.config.altFormat=ot.config.noCalendar?"h:i"+(ot.config.enableSeconds?":S K":" K"):i.defaultConfig.altFormat+(" h:i"+(ot.config.enableSeconds?":S":"")+" K"))}function I(){"object"!==a(ot.config.locale)&&"undefined"==typeof i.l10ns[ot.config.locale]&&console.warn("flatpickr: invalid locale "+ot.config.locale),ot.l10n=o(Object.create(i.l10ns.default),"object"===a(ot.config.locale)?ot.config.locale:"default"!==ot.config.locale?i.l10ns[ot.config.locale]||{}:{})}function N(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t)return null;var n=/(\d+)/g,i=/^(\d{1,2})[:\s](\d\d)?[:\s]?(\d\d)?\s?(a|p)?/i,r=t;if(t.toFixed)t=new Date(t);else if("string"==typeof t)if(t=t.trim(),"today"===t)t=new Date,e=!0;else if(ot.config.parseDate)t=ot.config.parseDate(t);else if(i.test(t)){var o=t.match(i),a=o[4]?o[1]%12+("p"===o[4].toLowerCase()?12:0):o[1];t=new Date,t.setHours(a,o[2]||0,o[3]||0)}else if(/Z$/.test(t)||/GMT$/.test(t))t=new Date(t);else if(n.test(t)&&/^[0-9]/.test(t)){var s=t.match(n);t=new Date(s[0]+"/"+(s[1]||1)+"/"+(s[2]||1)+" "+(s[3]||0)+":"+(s[4]||0)+":"+(s[5]||0))}else t=new Date(t);return t instanceof Date?(ot.config.utc&&!t.fp_isUTC&&(t=t.fp_toUTC()),e&&t.setHours(0,0,0,0),t):(console.warn("flatpickr: invalid date "+r),console.info(ot.element),null)}function $(){var t=ot.calendarContainer.offsetHeight,e=ot.altInput||ot.input,n=e.getBoundingClientRect(),i=window.innerHeight-n.bottom+e.offsetHeight,r=void 0,o=window.pageXOffset+n.left;i<t?(r=window.pageYOffset-t+n.top-2,ot.calendarContainer.classList.remove("arrowTop"),ot.calendarContainer.classList.add("arrowBottom")):(r=window.pageYOffset+e.offsetHeight+n.top+2,ot.calendarContainer.classList.remove("arrowBottom"),ot.calendarContainer.classList.add("arrowTop")),ot.config.static||ot.config.inline||(ot.calendarContainer.style.top=r+"px",ot.calendarContainer.style.left=o+"px")}function A(){ot.config.noCalendar||ot.isMobile||(b(),X(),m())}function L(t){if(ot.config.allowInput&&13===t.which&&t.target===(ot.altInput||ot.input))return ot.setDate((ot.altInput||ot.input).value),t.target.blur();if(t.target.classList.contains("flatpickr-day")&&!t.target.classList.contains("disabled")&&!t.target.classList.contains("notAllowed")){var e=t.target.dateObj;if(ot.selectedDateElem=t.target,"single"===ot.config.mode)ot.selectedDates=[e],ot.config.enableTime||ot.close();else if("multiple"===ot.config.mode){var n=J(e);n?ot.selectedDates.splice(n,1):ot.selectedDates.push(e)}else"range"===ot.config.mode&&(2===ot.selectedDates.length&&ot.clear(),ot.selectedDates.push(e),ot.selectedDates.sort(function(t,e){return t.getTime()-e.getTime()}));s(),e.getMonth()!==ot.currentMonth&&"range"!==ot.config.mode&&(ot.currentYear=e.getFullYear(),ot.currentMonth=e.getMonth(),X()),m(),ot.minDateHasTime&&ot.config.enableTime&&0===it(e,ot.config.minDate)&&c(ot.config.minDate),Z(),setTimeout(function(){return ot.dateIsPicked=!0},50),"range"===ot.config.mode&&1===ot.selectedDates.length&&P(t),U("Change")}}function B(t,e){ot.config[t]=e,ot.redraw(),f()}function z(t,e){return t?(ot.selectedDates=(Array.isArray(t)?t.map(N):[N(t)]).filter(function(t){return t instanceof Date&&j(t)}),ot.redraw(),f(),c(),Z(),ot.dateIsPicked=ot.selectedDates.length>0,void(e&&U("Change"))):ot.clear()}function V(){ot.selectedDates=[],ot.now=new Date;var t=ot.config.defaultDate||ot.input.value;if(Array.isArray(t))ot.selectedDates=t.map(N);else if(t)switch(ot.config.mode){case"single":ot.selectedDates=[N(t)];break;case"multiple":ot.selectedDates=t.split("; ").map(N);break;case"range":ot.selectedDates=t.split(ot.l10n.rangeSeparator).map(N)}ot.selectedDates=ot.selectedDates.filter(function(t){return t instanceof Date&&t.getTime()&&j(t)});var e=ot.selectedDates.length?ot.selectedDates[0]:ot.config.minDate>ot.now?ot.config.minDate:ot.now;ot.currentYear=e.getFullYear(),ot.currentMonth=e.getMonth()}function Y(){ot.utils={duration:{DAY:864e5},getDaysinMonth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ot.currentMonth,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ot.currentYear;return 1===t&&(e%4===0&&e%100!==0||e%400===0)?29:ot.l10n.daysInMonth[t]},monthToStr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ot.config.shorthandCurrentMonth;return ot.l10n.months[(e?"short":"long")+"hand"][t]}}}function H(){ot.formats={D:function(t){return ot.l10n.weekdays.shorthand[ot.formats.w(t)]},F:function(t){return ot.utils.monthToStr(ot.formats.n(t)-1,!1)},H:function(t){return i.prototype.pad(t.getHours())},J:function(t){return t.getDate()+ot.l10n.ordinal(t.getDate())},K:function(t){return t.getHours()>11?"PM":"AM"},M:function(t){return ot.utils.monthToStr(t.getMonth(),!0)},S:function(t){return i.prototype.pad(t.getSeconds())},U:function(t){return t.getTime()/1e3},Y:function(t){return t.getFullYear()},d:function(t){return i.prototype.pad(ot.formats.j(t))},h:function(t){return t.getHours()%12?t.getHours()%12:12},i:function(t){return i.prototype.pad(t.getMinutes())},j:function(t){return t.getDate()},l:function(t){return ot.l10n.weekdays.longhand[ot.formats.w(t)]},m:function(t){return i.prototype.pad(ot.formats.n(t))},n:function(t){return t.getMonth()+1},s:function(t){return t.getSeconds()},w:function(t){return t.getDay()},y:function(t){return String(ot.formats.Y(t)).substring(2)}}}function W(){ot.input=ot.config.wrap?ot.element.querySelector("[data-input]"):ot.element,ot.input.classList.add("flatpickr-input"),ot.config.altInput&&(ot.altInput=et(ot.input.nodeName,ot.config.altInputClass),ot.altInput.placeholder=ot.input.placeholder,ot.altInput.type="text",ot.input.type="hidden",ot.input.parentNode&&ot.input.parentNode.insertBefore(ot.altInput,ot.input.nextSibling)),ot.config.allowInput||(ot.altInput||ot.input).setAttribute("readonly","readonly")}function K(){var t=ot.config.enableTime?ot.config.noCalendar?"time":"datetime-local":"date";ot.mobileInput=et("input","flatpickr-input flatpickr-mobile"),ot.mobileInput.step="any",ot.mobileInput.tabIndex=-1,ot.mobileInput.type=t,ot.mobileInput.disabled=ot.input.disabled,ot.mobileFormatStr="datetime-local"===t?"Y-m-d\\TH:i:S":"date"===t?"Y-m-d":"H:i:S",ot.selectedDates.length&&(ot.mobileInput.defaultValue=ot.mobileInput.value=O(ot.mobileFormatStr,ot.selectedDates[0])),ot.config.minDate&&(ot.mobileInput.min=O("Y-m-d",ot.config.minDate)),ot.config.maxDate&&(ot.mobileInput.max=O("Y-m-d",ot.config.maxDate)),ot.input.type="hidden",ot.config.altInput&&(ot.altInput.type="hidden");try{ot.input.parentNode.insertBefore(ot.mobileInput,ot.input.nextSibling)}catch(t){}ot.mobileInput.addEventListener("change",function(t){ot.setDate(t.target.value),U("Change"),U("Close")})}function q(){ot.isOpen?ot.close():ot.open()}function U(t,e){if(ot.config["on"+t])for(var n=Array.isArray(ot.config["on"+t])?ot.config["on"+t]:[ot.config["on"+t]],i=0;i<n.length;i++)n[i](ot.selectedDates,ot.input.value,ot,e);if("Change"===t)try{ot.input.dispatchEvent(new Event("change",{bubbles:!0})),ot.input.dispatchEvent(new Event("input",{bubbles:!0}))}catch(t){if("createEvent"in document)return ot.input.dispatchEvent(ot.changeEvent);ot.input.fireEvent("onchange")}}function G(){return ot.selectedDates.length?ot.selectedDates[ot.selectedDates.length-1]:null}function J(t){for(var e=0;e<ot.selectedDates.length;e++)if(0===it(ot.selectedDates[e],t))return""+e;return!1}function Q(t){return!("range"!==ot.config.mode||ot.selectedDates.length<2)&&(it(t,ot.selectedDates[0])>=0&&it(t,ot.selectedDates[1])<=0)}function X(){if(!ot.config.noCalendar&&!ot.isMobile&&ot.monthNav){if(ot.currentMonthElement.textContent=ot.utils.monthToStr(ot.currentMonth)+" ",ot.currentYearElement.value=ot.currentYear,ot.config.minDate){var t=ot.currentYear===ot.config.minDate.getFullYear()?(ot.currentMonth+11)%12<ot.config.minDate.getMonth():ot.currentYear<ot.config.minDate.getFullYear();ot.prevMonthNav.style.display=t?"none":"block"}else ot.prevMonthNav.style.display="block";if(ot.config.maxDate){var e=ot.currentYear===ot.config.maxDate.getFullYear()?ot.currentMonth+1>ot.config.maxDate.getMonth():ot.currentYear>ot.config.maxDate.getFullYear();ot.nextMonthNav.style.display=e?"none":"block"}else ot.nextMonthNav.style.display="block"}}function Z(){if(!ot.selectedDates.length)return ot.clear();ot.isMobile&&(ot.mobileInput.value=ot.selectedDates.length?O(ot.mobileFormatStr,G()):"");var t="range"!==ot.config.mode?"; ":ot.l10n.rangeSeparator;ot.input.value=ot.selectedDates.map(function(t){return O(ot.config.dateFormat,t)}).join(t),ot.config.altInput&&(ot.altInput.value=ot.selectedDates.map(function(t){return O(ot.config.altFormat,t)}).join(t)),U("ValueUpdate")}function tt(t){t.preventDefault();var e=Math.max(-1,Math.min(1,t.wheelDelta||-t.deltaY)),n=parseInt(t.target.value,10)+e;E(n),t.target.value=ot.currentYear}function et(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=document.createElement(t);return i.className=e,n&&(i.innerHTML=n),i}function nt(t,e,n){var i=void 0;return function(){for(var r=arguments.length,o=Array(r),a=0;a<r;a++)o[a]=arguments[a];var s=this,c=function(){i=null,n||t.apply(s,o)};clearTimeout(i),i=setTimeout(c,e),n&&!i&&t.apply(s,o)}}function it(t,e){return t instanceof Date&&e instanceof Date&&new Date(t.getTime()).setHours(0,0,0,0)-new Date(e.getTime()).setHours(0,0,0,0)}function rt(t){if(t.preventDefault(),t&&((t.target.value||t.target.textContent).length>=2||"keydown"!==t.type&&"input"!==t.type)&&t.target.blur(),ot.amPM&&t.target===ot.amPM)return t.target.textContent=["AM","PM"]["AM"===t.target.textContent|0];var e=Number(t.target.min),n=Number(t.target.max),i=Number(t.target.step),r=parseInt(t.target.value,10),o=Math.max(-1,Math.min(1,t.wheelDelta||-t.deltaY)),a=Number(r);"wheel"===t.type?a=r+i*o:"keydown"===t.type&&(a=r+i*(38===t.which?1:-1)),a<e?a=n+a+(t.target!==ot.hourElement)+(t.target===ot.hourElement&&!ot.amPM):a>n&&(a=t.target===ot.hourElement?a-n-!ot.amPM:e),ot.amPM&&t.target===ot.hourElement&&(1===i?a+r===23:Math.abs(a-r)>i)&&(ot.amPM.textContent="PM"===ot.amPM.innerHTML?"AM":"PM"),t.target.value=ot.pad(a)}var ot=this;return n(),ot}function r(t,e){for(var n=[],r=0;r<t.length;r++)try{t[r]._flatpickr=new i(t[r],e||{}),n.push(t[r]._flatpickr)}catch(t){console.warn(t,t.stack)}return 1===n.length?n[0]:n}var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};i.defaultConfig={mode:"single",utc:!1,wrap:!1,weekNumbers:!1,allowInput:!1,clickOpens:!0,time_24hr:!1,enableTime:!1,noCalendar:!1,dateFormat:"Y-m-d",altInput:!1,altInputClass:"form-control input",altFormat:"F j, Y",defaultDate:null,minDate:null,maxDate:null,parseDate:null,formatDate:null,getWeek:function(t){var e=new Date(t.getTime());e.setHours(0,0,0,0),e.setDate(e.getDate()+3-(e.getDay()+6)%7);var n=new Date(e.getFullYear(),0,4);return 1+Math.round(((e.getTime()-n.getTime())/864e5-3+(n.getDay()+6)%7)/7)},enable:[],disable:[],shorthandCurrentMonth:!1,inline:!1,static:!1,appendTo:null,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",enableSeconds:!1,hourIncrement:1,minuteIncrement:5,defaultHour:12,defaultMinute:0,disableMobile:!1,locale:"default",onChange:null,onOpen:null,onClose:null,onReady:null,onValueUpdate:null,onDayCreate:null},i.l10ns={en:{weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(t){var e=t%100;if(e>3&&e<21)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle"}},i.l10ns.default=i.l10ns.en,i.localize=function(t){return o(i.l10ns.default,t||{})},i.prototype={pad:function(t){return("0"+t).slice(-2)}},"undefined"!=typeof HTMLElement&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(t){return r(this,t)},HTMLElement.prototype.flatpickr=function(t){return r([this],t)}),"undefined"!=typeof jQuery&&(jQuery.fn.flatpickr=function(t){return r(this,t)}),Date.prototype.fp_incr=function(t){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+parseInt(t,10))},Date.prototype.fp_isUTC=!1,Date.prototype.fp_toUTC=function(){var t=new Date(this.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds());return t.fp_isUTC=!0,t},"classList"in document.documentElement||!Object.defineProperty||"undefined"==typeof HTMLElement||Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){function t(t){return function(n){var i=e.className.split(/\s+/),r=i.indexOf(n);t(i,r,n),e.className=i.join(" ")}}var e=this,n={add:t(function(t,e,n){~e||t.push(n)}),remove:t(function(t,e){~e&&t.splice(e,1)}),toggle:t(function(t,e,n){~e?t.splice(e,1):t.push(n)}),contains:function(t){return!!~e.className.split(/\s+/).indexOf(t)},item:function(t){return e.className.split(/\s+/)[t]||null;
}};return Object.defineProperty(n,"length",{get:function(){return e.className.split(/\s+/).length}}),n}}),t.exports=i},function(t,e,n){var i=i||{l10ns:{}};i.l10ns.zh={},i.l10ns.zh.weekdays={shorthand:["周日","周一","周二","周三","周四","周五","周六"],longhand:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]},i.l10ns.zh.months={shorthand:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],longhand:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},t.exports=i.l10ns},function(t,e,n){/*!
	 * Jump.js 1.0.1 - A small, modern, dependency-free smooth scrolling library.
	 * Copyright (c) 2016 Michael Cavalea - https://github.com/callmecavs/jump.js
	 * License: MIT
	 */
!function(e,n){t.exports=n()}(this,function(){"use strict";var t=function(t,e,n,i){return t/=i/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)},e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},n=function(){function n(){return window.scrollY||window.pageYOffset}function i(t){return t.getBoundingClientRect().top+c}function r(t){v||(v=t),m=t-v,g=f(m,c,p,h),window.scrollTo(0,g),m<h?requestAnimationFrame(r):o()}function o(){window.scrollTo(0,c+p),s&&d&&(s.setAttribute("tabindex","-1"),s.focus()),"function"==typeof y&&y(),v=!1}function a(o){var a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];switch(h=a.duration||1e3,u=a.offset||0,y=a.callback,f=a.easing||t,d=a.a11y||!1,c=n(),"undefined"==typeof o?"undefined":e(o)){case"number":s=void 0,d=!1,l=c+o;break;case"object":s=o,l=i(s);break;case"string":s=document.querySelector(o),l=i(s)}switch(p=l-c+u,e(a.duration)){case"number":h=a.duration;break;case"function":h=a.duration(p)}requestAnimationFrame(r)}var s=void 0,c=void 0,l=void 0,u=void 0,f=void 0,d=void 0,p=void 0,h=void 0,v=void 0,m=void 0,g=void 0,y=void 0;return a},i=n();return i})},function(t,e,n){var i=n(6),r=n(1),o=i(r,"DataView");t.exports=o},function(t,e,n){function i(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}var r=n(241),o=n(242),a=n(243),s=n(244),c=n(245);i.prototype.clear=r,i.prototype.delete=o,i.prototype.get=a,i.prototype.has=s,i.prototype.set=c,t.exports=i},function(t,e,n){var i=n(6),r=n(1),o=i(r,"Promise");t.exports=o},function(t,e,n){var i=n(6),r=n(1),o=i(r,"Set");t.exports=o},function(t,e,n){function i(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new r;++e<n;)this.add(t[e])}var r=n(49),o=n(268),a=n(269);i.prototype.add=i.prototype.push=o,i.prototype.has=a,t.exports=i},function(t,e,n){var i=n(1),r=i.Uint8Array;t.exports=r},function(t,e,n){var i=n(6),r=n(1),o=i(r,"WeakMap");t.exports=o},function(t,e){function n(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}t.exports=n},function(t,e,n){function i(t,e){var n=a(t),i=!n&&o(t),u=!n&&!i&&s(t),d=!n&&!i&&!u&&l(t),p=n||i||u||d,h=p?r(t.length,String):[],v=h.length;for(var m in t)!e&&!f.call(t,m)||p&&("length"==m||u&&("offset"==m||"parent"==m)||d&&("buffer"==m||"byteLength"==m||"byteOffset"==m)||c(m,v))||h.push(m);return h}var r=n(225),o=n(53),a=n(3),s=n(78),c=n(50),l=n(80),u=Object.prototype,f=u.hasOwnProperty;t.exports=i},function(t,e){function n(t,e){for(var n=-1,i=e.length,r=t.length;++n<i;)t[r+n]=e[n];return t}t.exports=n},function(t,e){function n(t,e){for(var n=-1,i=null==t?0:t.length;++n<i;)if(e(t[n],n,t))return!0;return!1}t.exports=n},function(t,e,n){var i=n(207),r=n(231),o=r(i);t.exports=o},function(t,e,n){function i(t,e,n,a,s){var c=-1,l=t.length;for(n||(n=o),s||(s=[]);++c<l;){var u=t[c];e>0&&n(u)?e>1?i(u,e-1,n,a,s):r(s,u):a||(s[s.length]=u)}return s}var r=n(202),o=n(246);t.exports=i},function(t,e,n){var i=n(232),r=i();t.exports=r},function(t,e,n){function i(t,e){return t&&r(t,e,o)}var r=n(206),o=n(55);t.exports=i},function(t,e){function n(t,e){return null!=t&&e in Object(t)}t.exports=n},function(t,e,n){function i(t){return o(t)&&r(t)==a}var r=n(15),o=n(17),a="[object Arguments]";t.exports=i},function(t,e,n){function i(t,e,n,i,m,y){var b=l(t),_=l(e),C=h,x=h;b||(C=c(t),C=C==p?v:C),_||(x=c(e),x=x==p?v:x);var w=C==v,k=x==v,S=C==x;if(S&&u(t)){if(!u(e))return!1;b=!0,w=!1}if(S&&!w)return y||(y=new r),b||f(t)?o(t,e,n,i,m,y):a(t,e,C,n,i,m,y);if(!(n&d)){var M=w&&g.call(t,"__wrapped__"),O=k&&g.call(e,"__wrapped__");if(M||O){var E=M?t.value():t,j=O?e.value():e;return y||(y=new r),m(E,j,n,i,y)}}return!!S&&(y||(y=new r),s(t,e,n,i,m,y))}var r=n(67),o=n(73),a=n(234),s=n(235),c=n(238),l=n(3),u=n(78),f=n(80),d=1,p="[object Arguments]",h="[object Array]",v="[object Object]",m=Object.prototype,g=m.hasOwnProperty;t.exports=i},function(t,e,n){function i(t,e,n,i){var c=n.length,l=c,u=!i;if(null==t)return!l;for(t=Object(t);c--;){var f=n[c];if(u&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return!1}for(;++c<l;){f=n[c];var d=f[0],p=t[d],h=f[1];if(u&&f[2]){if(void 0===p&&!(d in t))return!1}else{var v=new r;if(i)var m=i(p,h,d,t,e,v);if(!(void 0===m?o(h,p,a|s,i,v):m))return!1}}return!0}var r=n(67),o=n(70),a=1,s=2;t.exports=i},function(t,e,n){function i(t){if(!a(t)||o(t))return!1;var e=r(t)?h:l;return e.test(s(t))}var r=n(79),o=n(249),a=n(16),s=n(77),c=/[\\^$.*+?()[\]{}|]/g,l=/^\[object .+?Constructor\]$/,u=Function.prototype,f=Object.prototype,d=u.toString,p=f.hasOwnProperty,h=RegExp("^"+d.call(p).replace(c,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=i},function(t,e,n){function i(t){return a(t)&&o(t.length)&&!!P[r(t)]}var r=n(15),o=n(54),a=n(17),s="[object Arguments]",c="[object Array]",l="[object Boolean]",u="[object Date]",f="[object Error]",d="[object Function]",p="[object Map]",h="[object Number]",v="[object Object]",m="[object RegExp]",g="[object Set]",y="[object String]",b="[object WeakMap]",_="[object ArrayBuffer]",C="[object DataView]",x="[object Float32Array]",w="[object Float64Array]",k="[object Int8Array]",S="[object Int16Array]",M="[object Int32Array]",O="[object Uint8Array]",E="[object Uint8ClampedArray]",j="[object Uint16Array]",D="[object Uint32Array]",P={};P[x]=P[w]=P[k]=P[S]=P[M]=P[O]=P[E]=P[j]=P[D]=!0,P[s]=P[c]=P[_]=P[l]=P[C]=P[u]=P[f]=P[d]=P[p]=P[h]=P[v]=P[m]=P[g]=P[y]=P[b]=!1,t.exports=i},function(t,e,n){function i(t){return"function"==typeof t?t:null==t?a:"object"==typeof t?s(t)?o(t[0],t[1]):r(t):c(t)}var r=n(217),o=n(218),a=n(30),s=n(3),c=n(283);t.exports=i},function(t,e,n){function i(t){if(!r(t))return o(t);var e=[];for(var n in Object(t))s.call(t,n)&&"constructor"!=n&&e.push(n);return e}var r=n(250),o=n(263),a=Object.prototype,s=a.hasOwnProperty;t.exports=i},function(t,e,n){function i(t,e){var n=-1,i=o(t)?Array(t.length):[];return r(t,function(t,r,o){i[++n]=e(t,r,o)}),i}var r=n(204),o=n(31);t.exports=i},function(t,e,n){function i(t){var e=o(t);return 1==e.length&&e[0][2]?a(e[0][0],e[0][1]):function(n){return n===t||r(n,t,e)}}var r=n(211),o=n(236),a=n(76);t.exports=i},function(t,e,n){function i(t,e){return s(t)&&c(e)?l(u(t),e):function(n){var i=o(n,t);return void 0===i&&i===e?a(n,t):r(e,i,f|d)}}var r=n(70),o=n(280),a=n(281),s=n(51),c=n(75),l=n(76),u=n(29),f=1,d=2;t.exports=i},function(t,e,n){function i(t,e,n){var i=-1;e=r(e.length?e:[u],c(o));var f=a(t,function(t,n,o){var a=r(e,function(e){return e(t)});return{criteria:a,index:++i,value:t}});return s(f,function(t,e){return l(t,e,n)})}var r=n(68),o=n(214),a=n(216),s=n(224),c=n(71),l=n(229),u=n(30);t.exports=i},function(t,e){function n(t){return function(e){return null==e?void 0:e[t]}}t.exports=n},function(t,e,n){function i(t){return function(e){return r(e,t)}}var r=n(69);t.exports=i},function(t,e,n){function i(t,e){return a(o(t,e,r),t+"")}var r=n(30),o=n(267),a=n(271);t.exports=i},function(t,e,n){var i=n(279),r=n(233),o=n(30),a=r?function(t,e){return r(t,"toString",{configurable:!0,enumerable:!1,value:i(e),writable:!0})}:o;t.exports=a},function(t,e){function n(t,e){var n=t.length;for(t.sort(e);n--;)t[n]=t[n].value;return t}t.exports=n},function(t,e){function n(t,e){for(var n=-1,i=Array(t);++n<t;)i[n]=e(n);return i}t.exports=n},function(t,e,n){function i(t){if("string"==typeof t)return t;if(a(t))return o(t,i)+"";if(s(t))return u?u.call(t):"";var e=t+"";return"0"==e&&1/t==-c?"-0":e}var r=n(14),o=n(68),a=n(3),s=n(32),c=1/0,l=r?r.prototype:void 0,u=l?l.toString:void 0;t.exports=i},function(t,e){function n(t,e){return t.has(e)}t.exports=n},function(t,e,n){function i(t,e){if(t!==e){var n=void 0!==t,i=null===t,o=t===t,a=r(t),s=void 0!==e,c=null===e,l=e===e,u=r(e);if(!c&&!u&&!a&&t>e||a&&s&&l&&!c&&!u||i&&s&&l||!n&&l||!o)return 1;if(!i&&!a&&!u&&t<e||u&&n&&o&&!i&&!a||c&&n&&o||!s&&o||!l)return-1}return 0}var r=n(32);t.exports=i},function(t,e,n){function i(t,e,n){for(var i=-1,o=t.criteria,a=e.criteria,s=o.length,c=n.length;++i<s;){var l=r(o[i],a[i]);if(l){if(i>=c)return l;var u=n[i];return l*("desc"==u?-1:1)}}return t.index-e.index}var r=n(228);t.exports=i},function(t,e,n){var i=n(1),r=i["__core-js_shared__"];t.exports=r},function(t,e,n){function i(t,e){return function(n,i){if(null==n)return n;if(!r(n))return t(n,i);for(var o=n.length,a=e?o:-1,s=Object(n);(e?a--:++a<o)&&i(s[a],a,s)!==!1;);return n}}var r=n(31);t.exports=i},function(t,e){function n(t){return function(e,n,i){for(var r=-1,o=Object(e),a=i(e),s=a.length;s--;){var c=a[t?s:++r];if(n(o[c],c,o)===!1)break}return e}}t.exports=n},function(t,e,n){var i=n(6),r=function(){try{var t=i(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=r},function(t,e,n){function i(t,e,n,i,r,w,S){switch(n){case x:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case C:return!(t.byteLength!=e.byteLength||!w(new o(t),new o(e)));case d:case p:case m:return a(+t,+e);case h:return t.name==e.name&&t.message==e.message;case g:case b:return t==e+"";case v:var M=c;case y:var O=i&u;if(M||(M=l),t.size!=e.size&&!O)return!1;var E=S.get(t);if(E)return E==e;i|=f,S.set(t,e);var j=s(M(t),M(e),i,r,w,S);return S.delete(t),j;case _:if(k)return k.call(t)==k.call(e)}return!1}var r=n(14),o=n(198),a=n(52),s=n(73),c=n(261),l=n(270),u=1,f=2,d="[object Boolean]",p="[object Date]",h="[object Error]",v="[object Map]",m="[object Number]",g="[object RegExp]",y="[object Set]",b="[object String]",_="[object Symbol]",C="[object ArrayBuffer]",x="[object DataView]",w=r?r.prototype:void 0,k=w?w.valueOf:void 0;t.exports=i},function(t,e,n){function i(t,e,n,i,a,c){var l=n&o,u=r(t),f=u.length,d=r(e),p=d.length;if(f!=p&&!l)return!1;for(var h=f;h--;){var v=u[h];if(!(l?v in e:s.call(e,v)))return!1}var m=c.get(t);if(m&&c.get(e))return m==e;var g=!0;c.set(t,e),c.set(e,t);for(var y=l;++h<f;){v=u[h];var b=t[v],_=e[v];if(i)var C=l?i(_,b,v,e,t,c):i(b,_,v,t,e,c);if(!(void 0===C?b===_||a(b,_,n,i,c):C)){g=!1;break}y||(y="constructor"==v)}if(g&&!y){var x=t.constructor,w=e.constructor;x!=w&&"constructor"in t&&"constructor"in e&&!("function"==typeof x&&x instanceof x&&"function"==typeof w&&w instanceof w)&&(g=!1)}return c.delete(t),c.delete(e),g}var r=n(55),o=1,a=Object.prototype,s=a.hasOwnProperty;t.exports=i},function(t,e,n){function i(t){for(var e=o(t),n=e.length;n--;){var i=e[n],a=t[i];e[n]=[i,a,r(a)]}return e}var r=n(75),o=n(55);t.exports=i},function(t,e,n){function i(t){var e=a.call(t,c),n=t[c];try{t[c]=void 0;var i=!0}catch(t){}var r=s.call(t);return i&&(e?t[c]=n:delete t[c]),r}var r=n(14),o=Object.prototype,a=o.hasOwnProperty,s=o.toString,c=r?r.toStringTag:void 0;t.exports=i},function(t,e,n){var i=n(193),r=n(48),o=n(195),a=n(196),s=n(199),c=n(15),l=n(77),u="[object Map]",f="[object Object]",d="[object Promise]",p="[object Set]",h="[object WeakMap]",v="[object DataView]",m=l(i),g=l(r),y=l(o),b=l(a),_=l(s),C=c;(i&&C(new i(new ArrayBuffer(1)))!=v||r&&C(new r)!=u||o&&C(o.resolve())!=d||a&&C(new a)!=p||s&&C(new s)!=h)&&(C=function(t){var e=c(t),n=e==f?t.constructor:void 0,i=n?l(n):"";if(i)switch(i){case m:return v;case g:return u;case y:return d;case b:return p;case _:return h}return e}),t.exports=C},function(t,e){function n(t,e){return null==t?void 0:t[e]}t.exports=n},function(t,e,n){function i(t,e,n){e=r(e,t);for(var i=-1,u=e.length,f=!1;++i<u;){var d=l(e[i]);if(!(f=null!=t&&n(t,d)))break;t=t[d]}return f||++i!=u?f:(u=null==t?0:t.length,!!u&&c(u)&&s(d,u)&&(a(t)||o(t)))}var r=n(72),o=n(53),a=n(3),s=n(50),c=n(54),l=n(29);t.exports=i},function(t,e,n){function i(){this.__data__=r?r(null):{},this.size=0}var r=n(28);t.exports=i},function(t,e){function n(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}t.exports=n},function(t,e,n){function i(t){var e=this.__data__;if(r){var n=e[t];return n===o?void 0:n}return s.call(e,t)?e[t]:void 0}var r=n(28),o="__lodash_hash_undefined__",a=Object.prototype,s=a.hasOwnProperty;t.exports=i},function(t,e,n){function i(t){var e=this.__data__;return r?void 0!==e[t]:a.call(e,t)}var r=n(28),o=Object.prototype,a=o.hasOwnProperty;t.exports=i},function(t,e,n){function i(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=r&&void 0===e?o:e,this}var r=n(28),o="__lodash_hash_undefined__";t.exports=i},function(t,e,n){function i(t){return a(t)||o(t)||!!(s&&t&&t[s])}var r=n(14),o=n(53),a=n(3),s=r?r.isConcatSpreadable:void 0;t.exports=i},function(t,e,n){function i(t,e,n){if(!s(n))return!1;var i=typeof e;return!!("number"==i?o(n)&&a(e,n.length):"string"==i&&e in n)&&r(n[e],t)}var r=n(52),o=n(31),a=n(50),s=n(16);t.exports=i},function(t,e){function n(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}t.exports=n},function(t,e,n){function i(t){return!!o&&o in t}var r=n(230),o=function(){var t=/[^.]+$/.exec(r&&r.keys&&r.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();t.exports=i},function(t,e){function n(t){var e=t&&t.constructor,n="function"==typeof e&&e.prototype||i;return t===n}var i=Object.prototype;t.exports=n},function(t,e){function n(){this.__data__=[],this.size=0}t.exports=n},function(t,e,n){function i(t){var e=this.__data__,n=r(e,t);if(n<0)return!1;var i=e.length-1;return n==i?e.pop():a.call(e,n,1),--this.size,!0}var r=n(26),o=Array.prototype,a=o.splice;t.exports=i},function(t,e,n){function i(t){var e=this.__data__,n=r(e,t);return n<0?void 0:e[n][1]}var r=n(26);t.exports=i},function(t,e,n){function i(t){return r(this.__data__,t)>-1}var r=n(26);t.exports=i},function(t,e,n){function i(t,e){var n=this.__data__,i=r(n,t);return i<0?(++this.size,n.push([t,e])):n[i][1]=e,this}var r=n(26);t.exports=i},function(t,e,n){function i(){this.size=0,this.__data__={hash:new r,map:new(a||o),string:new r}}var r=n(194),o=n(25),a=n(48);t.exports=i},function(t,e,n){function i(t){var e=r(this,t).delete(t);return this.size-=e?1:0,e}var r=n(27);t.exports=i},function(t,e,n){function i(t){return r(this,t).get(t)}var r=n(27);t.exports=i},function(t,e,n){function i(t){return r(this,t).has(t)}var r=n(27);t.exports=i},function(t,e,n){function i(t,e){var n=r(this,t),i=n.size;return n.set(t,e),this.size+=n.size==i?0:1,this}var r=n(27);t.exports=i},function(t,e){function n(t){var e=-1,n=Array(t.size);return t.forEach(function(t,i){n[++e]=[i,t]}),n}t.exports=n},function(t,e,n){function i(t){var e=r(t,function(t){return n.size===o&&n.clear(),t}),n=e.cache;return e}var r=n(282),o=500;t.exports=i},function(t,e,n){var i=n(266),r=i(Object.keys,Object);t.exports=r},function(t,e,n){(function(t){var i=n(74),r="object"==typeof e&&e&&!e.nodeType&&e,o=r&&"object"==typeof t&&t&&!t.nodeType&&t,a=o&&o.exports===r,s=a&&i.process,c=function(){try{return s&&s.binding&&s.binding("util")}catch(t){}}();t.exports=c}).call(e,n(81)(t))},function(t,e){function n(t){return r.call(t)}var i=Object.prototype,r=i.toString;t.exports=n},function(t,e){function n(t,e){return function(n){return t(e(n))}}t.exports=n},function(t,e,n){function i(t,e,n){return e=o(void 0===e?t.length-1:e,0),function(){for(var i=arguments,a=-1,s=o(i.length-e,0),c=Array(s);++a<s;)c[a]=i[e+a];a=-1;for(var l=Array(e+1);++a<e;)l[a]=i[a];return l[e]=n(c),r(t,this,l)}}var r=n(200),o=Math.max;t.exports=i},function(t,e){function n(t){return this.__data__.set(t,i),this}var i="__lodash_hash_undefined__";t.exports=n},function(t,e){function n(t){return this.__data__.has(t)}t.exports=n},function(t,e){function n(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}t.exports=n},function(t,e,n){var i=n(223),r=n(272),o=r(i);t.exports=o},function(t,e){function n(t){var e=0,n=0;return function(){var a=o(),s=r-(a-n);if(n=a,s>0){if(++e>=i)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var i=800,r=16,o=Date.now;t.exports=n},function(t,e,n){function i(){this.__data__=new r,this.size=0}var r=n(25);t.exports=i},function(t,e){function n(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n}t.exports=n},function(t,e){function n(t){return this.__data__.get(t)}t.exports=n},function(t,e){function n(t){return this.__data__.has(t)}t.exports=n},function(t,e,n){function i(t,e){var n=this.__data__;if(n instanceof r){var i=n.__data__;if(!o||i.length<s-1)return i.push([t,e]),this.size=++n.size,this;n=this.__data__=new a(i)}return n.set(t,e),this.size=n.size,this}var r=n(25),o=n(48),a=n(49),s=200;t.exports=i},function(t,e,n){var i=n(262),r=/^\./,o=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,a=/\\(\\)?/g,s=i(function(t){var e=[];return r.test(t)&&e.push(""),t.replace(o,function(t,n,i,r){e.push(i?r.replace(a,"$1"):n||t)}),e});t.exports=s},function(t,e){function n(t){return function(){return t}}t.exports=n},function(t,e,n){function i(t,e,n){var i=null==t?void 0:r(t,e);return void 0===i?n:i}var r=n(69);t.exports=i},function(t,e,n){function i(t,e){return null!=t&&o(t,e,r)}var r=n(208),o=n(240);t.exports=i},function(t,e,n){function i(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(o);var n=function(){var i=arguments,r=e?e.apply(this,i):i[0],o=n.cache;if(o.has(r))return o.get(r);var a=t.apply(this,i);return n.cache=o.set(r,a)||o,a};return n.cache=new(i.Cache||r),n}var r=n(49),o="Expected a function";i.Cache=r,t.exports=i},function(t,e,n){function i(t){return a(t)?r(s(t)):o(t)}var r=n(220),o=n(221),a=n(51),s=n(29);t.exports=i},function(t,e,n){var i=n(205),r=n(219),o=n(222),a=n(247),s=o(function(t,e){if(null==t)return[];var n=e.length;return n>1&&a(t,e[0],e[1])?e=[]:n>2&&a(e[0],e[1],e[2])&&(e=[e[0]]),r(t,i(e,1),[])});t.exports=s},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){function i(t){return null==t?"":r(t)}var r=n(226);t.exports=i},function(t,e,n){var i,r;!function(o,a){i=a,r="function"==typeof i?i.call(e,n,e,t):i,!(void 0!==r&&(t.exports=r))}(this,function(){"use strict";function t(t,e,n){this._reference=t.jquery?t[0]:t,this.state={onCreateCalled:!1};var i="undefined"==typeof e||null===e,r=e&&"[object Object]"===Object.prototype.toString.call(e);return i||r?this._popper=this.parse(r?e:{}):this._popper=e.jquery?e[0]:e,this._options=Object.assign({},g,n),this._options.modifiers=this._options.modifiers.map(function(t){if(this._options.modifiersIgnored.indexOf(t)===-1)return"applyStyle"===t&&this._popper.setAttribute("x-placement",this._options.placement),this.modifiers[t]||t}.bind(this)),this.state.position=this._getPosition(this._popper,this._reference),u(this._popper,{position:this.state.position}),this.state.isParentTransformed=this._getIsParentTransformed(this._popper),this.update(),this._setupEventListeners(),this}function e(t){var e=t.style.display,n=t.style.visibility;t.style.display="block",t.style.visibility="hidden";var i=(t.offsetWidth,m.getComputedStyle(t)),r=parseFloat(i.marginTop)+parseFloat(i.marginBottom),o=parseFloat(i.marginLeft)+parseFloat(i.marginRight),a={width:t.offsetWidth+o,height:t.offsetHeight+r};return t.style.display=e,t.style.visibility=n,a}function n(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function i(t){var e=Object.assign({},t);return e.right=e.left+e.width,e.bottom=e.top+e.height,e}function r(t,e){var n,i=0;for(n in t){if(t[n]===e)return i;i++}return null}function o(t,e){var n=m.getComputedStyle(t,null);return n[e]}function a(t){var e=t.offsetParent;return e!==m.document.body&&e?e:m.document.documentElement}function s(t){return t===m.document?m.document.body.scrollTop?m.document.body:m.document.documentElement:["scroll","auto"].indexOf(o(t,"overflow"))!==-1||["scroll","auto"].indexOf(o(t,"overflow-x"))!==-1||["scroll","auto"].indexOf(o(t,"overflow-y"))!==-1?t===m.document.body?s(t.parentNode):t:t.parentNode?s(t.parentNode):t}function c(t){return t!==m.document.body&&"HTML"!==t.nodeName&&("fixed"===o(t,"position")||(t.parentNode?c(t.parentNode):t))}function l(t){return t!==m.document.body&&("none"!==o(t,"transform")||(t.parentNode?l(t.parentNode):t))}function u(t,e){function n(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}Object.keys(e).forEach(function(i){var r="";["width","height","top","right","bottom","left"].indexOf(i)!==-1&&n(e[i])&&(r="px"),t.style[i]=e[i]+r})}function f(t){var e={};return t&&"[object Function]"===e.toString.call(t)}function d(t){var e={width:t.offsetWidth,height:t.offsetHeight,left:t.offsetLeft,top:t.offsetTop};return e.right=e.left+e.width,e.bottom=e.top+e.height,e}function p(t){var e=t.getBoundingClientRect();return{left:e.left,top:e.top,right:e.right,bottom:e.bottom,width:e.right-e.left,height:e.bottom-e.top}}function h(t,e,n,i){var r=p(t),o=p(e);if(n&&!i){var a=s(e);o.top+=a.scrollTop,o.bottom+=a.scrollTop,o.left+=a.scrollLeft,o.right+=a.scrollLeft}var c={top:r.top-o.top,left:r.left-o.left,bottom:r.top-o.top+r.height,right:r.left-o.left+r.width,width:r.width,height:r.height};return c}function v(t){for(var e=["","ms","webkit","moz","o"],n=0;n<e.length;n++){var i=e[n]?e[n]+t.charAt(0).toUpperCase()+t.slice(1):t;if("undefined"!=typeof m.document.body.style[i])return i}return null}var m=window,g={placement:"bottom",gpuAcceleration:!0,offset:0,boundariesElement:"viewport",boundariesPadding:5,preventOverflowOrder:["left","right","top","bottom"],flipBehavior:"flip",arrowElement:"[x-arrow]",modifiers:["shift","offset","preventOverflow","keepTogether","arrow","flip","applyStyle"],modifiersIgnored:[]};if(t.prototype.destroy=function(){return this._popper.removeAttribute("x-placement"),this._popper.style.left="",this._popper.style.position="",this._popper.style.top="",this._popper.style[v("transform")]="",this._removeEventListeners(),this._options.removeOnDestroy&&this._popper.parentNode.removeChild(this._popper),this},t.prototype.update=function(){var t={instance:this,styles:{}};this.state.position=this._getPosition(this._popper,this._reference),u(this._popper,{position:this.state.position}),m.requestAnimationFrame(function(){var e=m.performance.now();e-this.state.lastFrame<=16||(this.state.lastFrame=e,t.placement=this._options.placement,t._originalPlacement=this._options.placement,t.offsets=this._getOffsets(this._popper,this._reference,t.placement),t.boundaries=this._getBoundaries(t,this._options.boundariesPadding,this._options.boundariesElement),t=this.runModifiers(t,this._options.modifiers),f(this.state.createCalback)||(this.state.onCreateCalled=!0),this.state.onCreateCalled?f(this.state.updateCallback)&&this.state.updateCallback(t):(this.state.onCreateCalled=!0,f(this.state.createCalback)&&this.state.createCalback(this)))}.bind(this))},t.prototype.onCreate=function(t){return this.state.createCalback=t,this},t.prototype.onUpdate=function(t){return this.state.updateCallback=t,this},t.prototype.parse=function(t){function e(t,e){e.forEach(function(e){t.classList.add(e)})}function n(t,e){e.forEach(function(e){t.setAttribute(e.split(":")[0],e.split(":")[1]||"")})}var i={tagName:"div",classNames:["popper"],attributes:[],parent:m.document.body,content:"",contentType:"text",arrowTagName:"div",arrowClassNames:["popper__arrow"],arrowAttributes:["x-arrow"]};t=Object.assign({},i,t);var r=m.document,o=r.createElement(t.tagName);if(e(o,t.classNames),n(o,t.attributes),"node"===t.contentType?o.appendChild(t.content.jquery?t.content[0]:t.content):"html"===t.contentType?o.innerHTML=t.content:o.textContent=t.content,t.arrowTagName){var a=r.createElement(t.arrowTagName);e(a,t.arrowClassNames),n(a,t.arrowAttributes),o.appendChild(a)}var s=t.parent.jquery?t.parent[0]:t.parent;if("string"==typeof s){if(s=r.querySelectorAll(t.parent),s.length>1&&console.warn("WARNING: the given `parent` query("+t.parent+") matched more than one element, the first one will be used"),0===s.length)throw"ERROR: the given `parent` doesn't exists!";s=s[0]}return s.length>1&&s instanceof Element==!1&&(console.warn("WARNING: you have passed as parent a list of elements, the first one will be used"),s=s[0]),s.appendChild(o),o},t.prototype._getPosition=function(t,e){var n=a(e),i=c(n);return i?"fixed":"absolute"},t.prototype._getIsParentTransformed=function(t){return l(t.parentNode)},t.prototype._getOffsets=function(t,n,i){i=i.split("-")[0];var r={};r.position=this.state.position;var o="fixed"===r.position,s=this.state.isParentTransformed,c=a(o&&s?n:t),l=h(n,c,o,s),u=e(t);return["right","left"].indexOf(i)!==-1?(r.top=l.top+l.height/2-u.height/2,"left"===i?r.left=l.left-u.width:r.left=l.right):(r.left=l.left+l.width/2-u.width/2,"top"===i?r.top=l.top-u.height:r.top=l.bottom),r.width=u.width,r.height=u.height,{popper:r,reference:l}},t.prototype._setupEventListeners=function(){if(this.state.updateBound=this.update.bind(this),m.addEventListener("resize",this.state.updateBound),"window"!==this._options.boundariesElement){var t=s(this._reference);t!==m.document.body&&t!==m.document.documentElement||(t=m),t.addEventListener("scroll",this.state.updateBound)}},t.prototype._removeEventListeners=function(){if(m.removeEventListener("resize",this.state.updateBound),"window"!==this._options.boundariesElement){var t=s(this._reference);t!==m.document.body&&t!==m.document.documentElement||(t=m),t.removeEventListener("scroll",this.state.updateBound)}this.state.updateBound=null},t.prototype._getBoundaries=function(t,e,n){var i,r,o={};if("window"===n){var c=m.document.body,l=m.document.documentElement;r=Math.max(c.scrollHeight,c.offsetHeight,l.clientHeight,l.scrollHeight,l.offsetHeight),i=Math.max(c.scrollWidth,c.offsetWidth,l.clientWidth,l.scrollWidth,l.offsetWidth),o={top:0,right:i,bottom:r,left:0}}else if("viewport"===n){var u=a(this._popper),f=s(this._popper),p=d(u),h="fixed"===t.offsets.popper.position?0:f.scrollTop,v="fixed"===t.offsets.popper.position?0:f.scrollLeft;o={top:0-(p.top-h),right:m.document.documentElement.clientWidth-(p.left-v),bottom:m.document.documentElement.clientHeight-(p.top-h),left:0-(p.left-v)}}else o=a(this._popper)===n?{top:0,left:0,right:n.clientWidth,bottom:n.clientHeight}:d(n);return o.left+=e,o.right-=e,o.top=o.top+e,o.bottom=o.bottom-e,o},t.prototype.runModifiers=function(t,e,n){var i=e.slice();return void 0!==n&&(i=this._options.modifiers.slice(0,r(this._options.modifiers,n))),i.forEach(function(e){f(e)&&(t=e.call(this,t))}.bind(this)),t},t.prototype.isModifierRequired=function(t,e){var n=r(this._options.modifiers,t);return!!this._options.modifiers.slice(0,n).filter(function(t){return t===e}).length},t.prototype.modifiers={},t.prototype.modifiers.applyStyle=function(t){var e,n={position:t.offsets.popper.position},i=Math.round(t.offsets.popper.left),r=Math.round(t.offsets.popper.top);return this._options.gpuAcceleration&&(e=v("transform"))?(n[e]="translate3d("+i+"px, "+r+"px, 0)",n.top=0,n.left=0):(n.left=i,n.top=r),Object.assign(n,t.styles),u(this._popper,n),this._popper.setAttribute("x-placement",t.placement),t.offsets.arrow&&u(t.arrowElement,t.offsets.arrow),t},t.prototype.modifiers.shift=function(t){var e=t.placement,n=e.split("-")[0],r=e.split("-")[1];if(r){var o=t.offsets.reference,a=i(t.offsets.popper),s={y:{start:{top:o.top},end:{top:o.top+o.height-a.height}},x:{start:{left:o.left},end:{left:o.left+o.width-a.width}}},c=["bottom","top"].indexOf(n)!==-1?"x":"y";t.offsets.popper=Object.assign(a,s[c][r])}return t},t.prototype.modifiers.preventOverflow=function(t){var e=this._options.preventOverflowOrder,n=i(t.offsets.popper),r={left:function(){var e=n.left;return n.left<t.boundaries.left&&(e=Math.max(n.left,t.boundaries.left)),{left:e}},right:function(){var e=n.left;return n.right>t.boundaries.right&&(e=Math.min(n.left,t.boundaries.right-n.width)),{left:e}},top:function(){var e=n.top;return n.top<t.boundaries.top&&(e=Math.max(n.top,t.boundaries.top)),{top:e}},bottom:function(){var e=n.top;return n.bottom>t.boundaries.bottom&&(e=Math.min(n.top,t.boundaries.bottom-n.height)),{top:e}}};return e.forEach(function(e){t.offsets.popper=Object.assign(n,r[e]())}),t},t.prototype.modifiers.keepTogether=function(t){var e=i(t.offsets.popper),n=t.offsets.reference,r=Math.floor;return e.right<r(n.left)&&(t.offsets.popper.left=r(n.left)-e.width),e.left>r(n.right)&&(t.offsets.popper.left=r(n.right)),e.bottom<r(n.top)&&(t.offsets.popper.top=r(n.top)-e.height),e.top>r(n.bottom)&&(t.offsets.popper.top=r(n.bottom)),t},t.prototype.modifiers.flip=function(t){if(!this.isModifierRequired(this.modifiers.flip,this.modifiers.preventOverflow))return console.warn("WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!"),t;if(t.flipped&&t.placement===t._originalPlacement)return t;var e=t.placement.split("-")[0],r=n(e),o=t.placement.split("-")[1]||"",a=[];return a="flip"===this._options.flipBehavior?[e,r]:this._options.flipBehavior,a.forEach(function(s,c){if(e===s&&a.length!==c+1){e=t.placement.split("-")[0],r=n(e);var l=i(t.offsets.popper),u=["right","bottom"].indexOf(e)!==-1;(u&&Math.floor(t.offsets.reference[e])>Math.floor(l[r])||!u&&Math.floor(t.offsets.reference[e])<Math.floor(l[r]))&&(t.flipped=!0,t.placement=a[c+1],o&&(t.placement+="-"+o),t.offsets.popper=this._getOffsets(this._popper,this._reference,t.placement).popper,t=this.runModifiers(t,this._options.modifiers,this._flip))}}.bind(this)),t},t.prototype.modifiers.offset=function(t){var e=this._options.offset,n=t.offsets.popper;return t.placement.indexOf("left")!==-1?n.top-=e:t.placement.indexOf("right")!==-1?n.top+=e:t.placement.indexOf("top")!==-1?n.left-=e:t.placement.indexOf("bottom")!==-1&&(n.left+=e),t},t.prototype.modifiers.arrow=function(t){var n=this._options.arrowElement;if("string"==typeof n&&(n=this._popper.querySelector(n)),!n)return t;if(!this._popper.contains(n))return console.warn("WARNING: `arrowElement` must be child of its popper element!"),t;if(!this.isModifierRequired(this.modifiers.arrow,this.modifiers.keepTogether))return console.warn("WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!"),t;var r={},o=t.placement.split("-")[0],a=i(t.offsets.popper),s=t.offsets.reference,c=["left","right"].indexOf(o)!==-1,l=c?"height":"width",u=c?"top":"left",f=c?"left":"top",d=c?"bottom":"right",p=e(n)[l];s[d]-p<a[u]&&(t.offsets.popper[u]-=a[u]-(s[d]-p)),s[u]+p>a[d]&&(t.offsets.popper[u]+=s[u]+p-a[d]);var h=s[u]+s[l]/2-p/2,v=h-i(t.offsets.popper)[u];return v=Math.max(Math.min(a[l]-p,v),0),r[u]=v,r[f]="",t.offsets.arrow=r,t.arrowElement=n,t},Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(t){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(void 0!==i&&null!==i){i=Object(i);for(var r=Object.keys(i),o=0,a=r.length;o<a;o++){var s=r[o],c=Object.getOwnPropertyDescriptor(i,s);void 0!==c&&c.enumerable&&(e[s]=i[s])}}}return e}}),!m.requestAnimationFrame){for(var y=0,b=["ms","moz","webkit","o"],_=0;_<b.length&&!m.requestAnimationFrame;++_)m.requestAnimationFrame=m[b[_]+"RequestAnimationFrame"],m.cancelAnimationFrame=m[b[_]+"CancelAnimationFrame"]||m[b[_]+"CancelRequestAnimationFrame"];m.requestAnimationFrame||(m.requestAnimationFrame=function(t,e){var n=(new Date).getTime(),i=Math.max(0,16-(n-y)),r=m.setTimeout(function(){t(n+i)},i);return y=n+i,r}),m.cancelAnimationFrame||(m.cancelAnimationFrame=function(t){clearTimeout(t)})}return t})},function(t,e,n){var i,r;i=n(115);var o=n(355);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(116);var o=n(331);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(117);var o=n(347);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,
r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(118);var o=n(345);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(119);var o=n(333);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(120);var o=n(325);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(121);var o=n(357);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(122);var o=n(361);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(123);var o=n(336);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(124);var o=n(340);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(125);var o=n(326);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(126);var o=n(349);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;n(189),i=n(127);var o=n(335);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(128);var o=n(332);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(129);var o=n(356);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(130);var o=n(350);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(131);var o=n(338);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(132);var o=n(358);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(133);var o=n(359);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(134);var o=n(334);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(135);var o=n(330);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(136);var o=n(348);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(137);var o=n(344);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;n(188),i=n(138);var o=n(327);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(139);var o=n(342);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(140);var o=n(353);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r,o=n(352);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(141);var o=n(329);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(142);var o=n(337);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(143);var o=n(354);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(144);var o=n(328);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(145);var o=n(339);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(146);var o=n(341);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(147);var o=n(351);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(148);var o=n(346);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(149);var o=n(360);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e,n){var i,r;i=n(150);var o=n(343);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("label",{staticClass:"checkbox blu-checkbox",class:[{on:t.isChecked},t.typeClass,{"is-disabled":t.disabled}],on:{click:function(e){e.preventDefault(),t.toggle(e)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.realVal,expression:"realVal"}],ref:"checkbox",attrs:{type:"checkbox",name:t.name,disabled:t.disabled},domProps:{checked:t.isChecked,value:t.realVal,checked:Array.isArray(t.realVal)?t._i(t.realVal,t.realVal)>-1:t.realVal},on:{change:function(e){t.$emit("change",e)},click:function(e){var n=t.realVal,i=e.target,r=!!i.checked;if(Array.isArray(n)){var o=t.realVal,a=t._i(n,o);r?a<0&&(t.realVal=n.concat(o)):a>-1&&(t.realVal=n.slice(0,a).concat(n.slice(a+1)))}else t.realVal=r}}}),t._v(" "),e("span",[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"table-toolbar level"},[e("div",{staticClass:"level-left"},[t.hasRefresh?e("div",{staticClass:"level-item"},[e("a",{staticClass:"button is-primary",on:{click:t.handleRefresh}},[e("i",{staticClass:"fa fa-refresh"})])]):t._e(),t._v(" "),t.hasColumnsControl?e("div",{staticClass:"level-item"},[e("dropdown",[e("a",{staticClass:"button is-primary",on:{click:t.handleRefresh}},[e("i",{staticClass:"fa fa-eye"})]),t._v(" "),e("div",{slot:"content"},[e("menus",t._l(t.columns,function(n,i){return e("menu-item",{attrs:{icon:"user",icon:n.isShowIcon,click:t.handleColumnControl.bind(this,i)}},[t._v(t._s(n.label))])}))],1)])],1):t._e(),t._v(" "),t._t("left")],2),t._v(" "),e("div",{staticClass:"level-right"},[t._t("right")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("a",{staticClass:"button radio-button",class:[{"is-primary":t.isChecked}],on:{click:function(e){e.preventDefault(),t.toggle(e)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"}],ref:"checkbox",attrs:{type:"radio",name:t.name,disabled:t.disabled},domProps:{checked:t.isChecked,value:t.val,checked:t._q(t.model,t.val)},on:{click:function(e){t.model=t.val}}}),t._v(" "),t.icon?e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fa",class:[t.iconClass]})]):t._e(),t._v(" "),e("span",[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("label",{staticClass:"switch-wrap",class:[{"is-disabled":t.disabled},t.sizeClass],on:{click:function(e){e.preventDefault(),t.toggle(e)}}},[e("input",{staticStyle:{display:"none"},attrs:{type:"checkbox",name:t.name},domProps:{checked:t.on}}),t._v(" "),e("span",{staticClass:"switchery",class:[{on:t.on},t.typeClass,t.sizeClass,{"has-text":t.hasText}]},[e("small",{staticClass:"switcher"}),t._v(" "),e("span",{staticClass:"text"},[t._v(t._s(t.showText))])]),t._v(" "),t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"select-wrap"},[e("div",{staticClass:"select-input",class:{"is-open":t.isOpen},on:{click:t.handleToggleOptions}},[e("div",{staticClass:"select-items"},[t._v("山东省")]),t._v(" "),e("input",{attrs:{type:"text",autocomplete:"off"}})])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("span",[t._t("default"),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],ref:"popper",staticClass:"popover",style:t.popperStyle},[t.title?e("div",{staticClass:"popover-title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),e("div",{staticClass:"popover-content"},[t._t("content",[e("div",{domProps:{textContent:t._s(t.content)}})])],2),t._v(" "),e("div",{staticClass:"popover-arrow",attrs:{"x-arrow":""}})])])],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"notification alert",class:[t.typeClass,t.hasIcon]},[t.closable?e("button",{staticClass:"delete",on:{click:t.handleClose}}):t._e(),t._v(" "),t.title?e("div",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),t.iconClass?e("div",{staticClass:"wrap-icon"},[e("i",{class:["fa","fa-"+t.iconClass,t.faSpin]})]):t._e(),t._v(" "),e("div",{staticClass:"notification-content"},[t._t("default")],2)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("span",{staticClass:"blu-ipt-number control has-addons",class:{"is-disabled":t.disabled}},["s"===t.mode?e("a",{staticClass:"button",class:[t.sizeClass],on:{click:t.decrease}},[t._m(0)]):t._e(),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.interVal,expression:"interVal"}],staticClass:"input",class:[t.sizeClass],attrs:{type:"text"},domProps:{value:t._s(t.interVal)},on:{keydown:t.handleKeyDown,input:function(e){e.target.composing||(t.interVal=e.target.value)}}}),t._v(" "),"s"!==t.mode?e("a",{staticClass:"button",class:[t.sizeClass],on:{click:t.decrease}},[t._m(1)]):t._e(),t._v(" "),e("a",{staticClass:"button",class:[t.sizeClass],on:{click:t.increase}},[t._m(2)])])},staticRenderFns:[function(){var t=this,e=(t.$createElement,t._c);return e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fa fa-minus"})])},function(){var t=this,e=(t.$createElement,t._c);return e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fa fa-minus"})])},function(){var t=this,e=(t.$createElement,t._c);return e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fa fa-plus"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("li",[t.hasSlot?t._e():e("a",{attrs:{href:t.to}},[t._v(t._s(t.label))]),t._v(" "),t._t("default"),t._v(" "),t.separator?e("span",{staticClass:"breadcrumb-separator"},[t._v(t._s(t.separator))]):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("span",[t._t("default"),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],ref:"popper",staticClass:"popover popover-confirm",style:t.popperStyle},[t.title?e("div",{staticClass:"popover-title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),e("div",{staticClass:"popover-content"},[e("article",{staticClass:"media",class:[t.typeClass]},[t.icon?e("div",{staticClass:"media-left"},[e("i",{staticClass:"fa",class:[t.iconClass]})]):t._e(),t._v(" "),e("div",{staticClass:"media-content"},[t._v(t._s(t.content))])])]),t._v(" "),e("div",{staticClass:"popover-footer"},[t.showCancel?e("a",{staticClass:"button is-small",on:{click:t.handleCancel}},[t._v(t._s(t.cancelText))]):t._e(),t._v(" "),t.showOk?e("a",{staticClass:"button is-small is-primary",on:{click:t.handleOk}},[t._v(t._s(t.okText))]):t._e()]),t._v(" "),e("div",{staticClass:"popover-arrow",attrs:{"x-arrow":""}})])])],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("span",{staticClass:"dropdown"},[t._t("default"),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],ref:"popper",staticClass:"popover popper-dropdown",style:t.popperStyle},[e("div",{staticClass:"popover-content dropdown-content"},[t._t("content",[e("div",{domProps:{textContent:t._s(t.content)}})])],2)])])],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"card is-fullwidth collapse-item",class:{"is-active":t.isOpen}},[e("header",{staticClass:"card-header",on:{click:t.toggle}},[e("div",{staticClass:"card-header-title"},[t._v(t._s(t.title))]),t._v(" "),t._m(0)]),t._v(" "),e("transition",{attrs:{name:""}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],staticClass:"card-content"},[e("div",{staticClass:"content"},[t._t("default")],2)])])],1)},staticRenderFns:[function(){var t=this,e=(t.$createElement,t._c);return e("span",{staticClass:"card-header-icon"},[e("i",{staticClass:"fa fa-angle-right"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"active"}],staticClass:"step-panel"},[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"modal modal-confirm align-baseline is-active borderless"},[t.backdrop?e("div",{staticClass:"modal-background",on:{click:t.backdropClose}}):t._e(),t._v(" "),e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"modal-card",style:t.modalWidth},[t.showHeader?e("header",{staticClass:"modal-card-head"},[t._t("header",[e("p",{staticClass:"modal-card-title"},[t._v(t._s(t.title))]),t._v(" "),e("span",{staticClass:"close",on:{click:t.handleCancel}},[t._v("×")])])],2):t._e(),t._v(" "),e("section",{staticClass:"modal-card-body"},[e("article",{staticClass:"media",class:[t.typeClass]},[t.icon?e("div",{staticClass:"media-left"},[e("i",{staticClass:"fa",class:[t.iconClass]})]):t._e(),t._v(" "),e("div",{staticClass:"media-content"},[t._v(t._s(t.content))])])]),t._v(" "),t.showFooter?e("footer",{staticClass:"modal-card-foot"},[t._t("footer",[t.showCancel?e("a",{staticClass:"button",on:{click:t.handleCancel}},[t._v(t._s(t.cancelText))]):t._e(),t._v(" "),t.showOk?e("a",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},on:{click:t.handleOk}},[t._v(t._s(t.okText))]):t._e()])],2):t._e()])])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"tab-pane",class:{"is-active":t.isActive}},[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"data-table-container"},[t._t("default"),t._v(" "),t.height?e("div",{ref:"header",staticClass:"data-table-header"},[e("table",{staticClass:"table data-table",class:{"is-bordered":t.bordered,"is-striped":t.striped,"is-narrow":t.narrow}},[e("colgroup",t._l(t.cols,function(t){return e("col",{attrs:{width:t}})})),t._v(" "),e("table-header",{attrs:{data:t.showData,showIndex:t.showIndex}})],1)]):t._e(),t._v(" "),e("div",{staticClass:"data-table-main",style:t.mainStyle},[e("table",{staticClass:"table data-table",class:{"is-bordered":t.bordered,"is-striped":t.striped,"is-narrow":t.narrow}},[e("colgroup",t._l(t.cols,function(t){return e("col",{attrs:{width:t}})})),t._v(" "),t.height?t._e():[e("table-header",{attrs:{state:t.state,checkable:t.checkable,showIndex:t.showIndex}})],t._v(" "),e("table-body",{attrs:{state:t.state,checkable:t.checkable,data:t.showData,showIndex:t.showIndex}})],2)]),t._v(" "),t.totalCnt?e("pagination",{attrs:{total:t.totalCnt,align:"right",change:t.handlePageChange,pageSizeChange:t.handlePageSizeChange}}):t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"tabs is-layout-top",class:[t.alignClass,t.typeClass,t.sizeClass,t.layoutClass,t.fullWidthClass]},[e("ul",{staticClass:"tab-list"},t._l(t.tabPanes,function(n,i){return e("li",{class:{"is-active":t.isActive(i),"is-disabled":n.disabled},attrs:{role:"tab"},on:{click:function(e){e.preventDefault(),t.handleSelect(i)}}},[e("a",[n.icon?e("span",{staticClass:"icon",class:{"is-small":"large"!==t.size}},[e("i",{staticClass:"fa",class:["fa-"+n.icon]})]):t._e(),t._v(" "),e("span",[t._v(t._s(n.label))])])])})),t._v(" "),e("div",{staticClass:"tab-content is-flex"},[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"control has-addons"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("span",[t._t("default"),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],ref:"popper",staticClass:"tooltip"},[e("span",{domProps:{textContent:t._s(t.content)}}),t._v(" "),e("div",{staticClass:"tooltip-arrow",attrs:{"x-arrow":""}})])])],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("label",{staticClass:"radio blu-radio",class:[{on:t.isChecked},t.typeClass,{"is-disabled":t.disabled}],on:{click:function(e){e.preventDefault(),t.toggle(e)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"}],ref:"checkbox",attrs:{type:"radio",name:t.name,disabled:t.disabled},domProps:{checked:t.isChecked,value:t.val,checked:t._q(t.model,t.val)},on:{click:function(e){t.model=t.val}}}),t._v(" "),e("span",[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("ul",{staticClass:"breadcrumb"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"timeline"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"aside",class:[{"is-active":t.isActive},t.placementClass]},[t.backdrop?e("div",{staticClass:"modal-background",on:{click:t.backdropClose}}):t._e(),t._v(" "),e("transition",{attrs:{name:t.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"modal-card",style:t.modalWidth},[t.showHeader?e("header",{staticClass:"modal-card-head aside-header"},[t._t("header",[e("p",{staticClass:"modal-card-title"},[t._v(t._s(t.title))]),t._v(" "),e("span",{staticClass:"close",on:{click:t.handleCancel}},[t._v("×")])])],2):t._e(),t._v(" "),e("section",{staticClass:"modal-card-body aside-body"},[t._t("default")],2),t._v(" "),t.showFooter?e("footer",{staticClass:"modal-card-foot aside-footer"},[t._t("footer",[t.showCancel?e("a",{staticClass:"button",on:{click:t.handleCancel}},[t._v(t._s(t.cancelText))]):t._e(),t._v(" "),t.showOk?e("a",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},on:{click:t.handleOk}},[t._v(t._s(t.okText))]):t._e()])],2):t._e()])])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"progress-wrap",class:[t.infoOutsideClass]},[e("div",{staticClass:"progress",class:[t.stripedClass,t.animatedClass,t.sizeClass]},[e("div",{staticClass:"progress-bar",class:[t.typeClass,t.sizeClass],style:{width:t.percent+"%"}},[t.showinfo?e("span",{staticClass:"progress-info"},[t._v(t._s(t.info))]):t._e()])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("span",{staticClass:"datepicker"},[t.isWrap?e("span",{ref:"pickrInput",staticClass:"control has-addons flatpickr"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.interVal,expression:"interVal"}],staticClass:"input",attrs:{name:t.name,placeholder:t.placeholder,type:"text","data-input":""},domProps:{value:t._s(t.interVal)},on:{input:function(e){e.target.composing||(t.interVal=e.target.value)}}}),t._v(" "),t._m(0),t._v(" "),t._m(1)]):e("p",{staticClass:"control has-icon has-icon-right"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.interVal,expression:"interVal"}],ref:"pickrInput",staticClass:"input",attrs:{name:t.name,placeholder:t.placeholder,type:"text"},domProps:{value:t.interVal,value:t._s(t.interVal)},on:{input:function(e){e.target.composing||(t.interVal=e.target.value)}}}),t._v(" "),e("i",{staticClass:"fa fa-calendar"}),t._v(" "),e("i",{staticClass:"fa fa-times",on:{click:function(e){e.preventDefault(),t.handleClear(e)}}})])])},staticRenderFns:[function(){var t=this,e=(t.$createElement,t._c);return e("a",{staticClass:"button",attrs:{"data-toggle":""}},[e("i",{staticClass:"fa fa-calendar"})])},function(){var t=this,e=(t.$createElement,t._c);return e("a",{staticClass:"button",attrs:{"data-clear":""}},[e("i",{staticClass:"fa fa-close"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",[t.label?e("p",{staticClass:"menu-label"},[t._v(t._s(t.label))]):t._e(),t._v(" "),e("ul",{staticClass:"menu-list",class:t.type},[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:"fade"}},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"tag",class:[t.typeClass,t.sizeClass,t.roundedClass],style:t.colorStyle},[t._t("default"),t._v(" "),t.closable?e("button",{staticClass:"delete",class:t.btnClass,on:{click:t.handleClose}}):t._e()],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("span",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"scroll-to",class:{"scroll-top":t.isPreset},on:{click:t.scrollTo}},[t._t("default",[e("span",{staticClass:"icon"},[e("i",{staticClass:"fa",class:[t.iconClass]})])])],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"steps-wrap",class:[t.type]},[e("div",{staticClass:"step-header"},t._l(t.steps,function(n,i){return e("div",{staticClass:"step-item",class:{"is-active":t.currentIndex===i,"is-done":i<t.currentIndex},style:{stepStyle:t.stepStyle}},[e("div",{staticClass:"step-left"},[e("div",{staticClass:"step-icon"},[i>=t.currentIndex?e("span",[t._v(t._s(i+1))]):t._e(),t._v(" "),i<t.currentIndex?e("span",[e("i",{staticClass:"fa fa-check"})]):t._e()])]),t._v(" "),e("div",{staticClass:"step-desc"},[e("span",{staticClass:"step-title"},[t._v(t._s(n.title))])]),t._v(" "),e("div",{staticClass:"step-description"},[t._v(t._s(n.description))])])})),t._v(" "),e("div",{staticClass:"step-content is-flex"},[t._t("default")],2),t._v(" "),t.showFooter?e("div",{staticClass:"step-footer has-text-right"},[e("button",{staticClass:"button is-primary",on:{click:t.prev}},[t._v(t._s(t.prevText))]),t._v(" "),e("button",{staticClass:"button is-primary",on:{click:t.next}},[t._v(t._s(t.nextText))])]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"affix-placeholder",style:t.wrapStyle},[e("div",{class:{affix:t.affixed},style:t.styles},[t._t("default")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("li",{class:{"is-active":t.isActive}},[t.hasChildren?t._e():e("span",[t.click?t._e():e("router-link",{attrs:{to:t.to,exact:""}},[t.icon?e("i",{staticClass:"fa",class:["fa-"+t.icon]}):t._e(),t._v(" "),t._t("default")],2),t._v(" "),t.click?e("a",{attrs:{href:"javascript:void(0)"},on:{click:t.click}},[t.icon?e("i",{staticClass:"fa",class:["fa-"+t.icon]}):t._e(),t._v(" "),t._t("default")],2):t._e()],1),t._v(" "),t.hasChildren?e("span",[e("a",{staticClass:"has-children",class:{"is-active":t.isActive,"is-open":t.isOpen},attrs:{href:"javascript:void(0)"},on:{click:t.toggle}},[t.icon?e("i",{staticClass:"fa",class:["fa-"+t.icon]}):t._e(),t._v(" "),t._t("default"),t._v(" "),e("span",{staticClass:"nav-right"},[e("i",{staticClass:"fa",class:[t.arrowClass]})])],2)]):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}]},[t._t("sub")],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"modal align-baseline",class:{"is-active":t.isActive}},[t.backdrop?e("div",{staticClass:"modal-background",on:{click:t.backdropClose}}):t._e(),t._v(" "),e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"modal-card",style:t.modalWidth},[t.showHeader?e("header",{staticClass:"modal-card-head"},[t._t("header",[e("p",{staticClass:"modal-card-title"},[t._v(t._s(t.title))]),t._v(" "),e("span",{staticClass:"close",on:{click:t.handleCancel}},[t._v("×")])])],2):t._e(),t._v(" "),e("section",{staticClass:"modal-card-body"},[t._t("default")],2),t._v(" "),t.showFooter?e("footer",{staticClass:"modal-card-foot"},[t._t("footer",[t.showCancel?e("a",{staticClass:"button",on:{click:t.handleCancel}},[t._v(t._s(t.cancelText))]):t._e(),t._v(" "),t.showOk?e("a",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},on:{click:t.handleOk}},[t._v(t._s(t.okText))]):t._e()])],2):t._e()])])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("transition",{attrs:{name:t.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"notification alert",class:[t.typeClass,t.hasIcon]},[t.closable?e("span",{staticClass:"close",on:{click:t.handleClose}},[t._v("×")]):t._e(),t._v(" "),t.iconClass?e("div",{staticClass:"wrap-icon"},[e("i",{class:["fa","fa-"+t.iconClass,t.faSpin]})]):t._e(),t._v(" "),t.title?e("div",{staticClass:"title is-5"},[t._v(t._s(t.title))]):t._e(),t._v(" "),e("div",{staticClass:"notification-content",domProps:{innerHTML:t._s(t.content)}})])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"timeline-item",class:t.typeClass},[t.icon?e("div",{staticClass:"timeline-icon"},[e("i",{staticClass:"fa",class:t.iconClass})]):t._e(),t._v(" "),e("div",{staticClass:"timeline-item-main"},[e("div",{staticClass:"timeline-item-date"},[t._v(t._s(t.date))]),t._v(" "),e("div",{staticClass:"timeline-item-content"},[t._t("default")],2)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=(t.$createElement,t._c);return e("div",{staticClass:"collapse-wrap"},[t._t("default")],2)},staticRenderFns:[]}}])});

},{"vue":4}],4:[function(require,module,exports){
(function (process,global){
/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

module.exports = Vue$3;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":1}]},{},[2]);
