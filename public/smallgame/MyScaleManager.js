"use strict";
var extend = require('./inherits.js');
/**
 * Created by liangdas on 16/12/15.
 * Email 1587790525@qq.com
 */
module.exports = extend(function () {}, {
    ctor: function ctor(gameDiv,Phaser) {
        if (typeof Phaser.DOM.hadhook === 'function' && Phaser.DOM.hadhook()){
            return
        }
        this.Phaser=Phaser;
        this.gameDiv = gameDiv;
        this.proDOM = Phaser.DOM;
        this.isMyLandscapeMode = false;
        if (this.proDOM.getScreenOrientation() != "landscape-primary") {
            //如果当前是竖屏 启动自定义横屏
            this.setMyLandscapeMode(true, true);
        } else {
            this.refresh();
        }
        var BaseDOM = extend(function () {}, Phaser.DOM);

        var MyDOM = extend(BaseDOM, {
            getScreenOrientation: function getScreenOrientation() {
                var orientation = this._super.apply(this, arguments);

                if (document.documentElement.clientWidth !== this.proDocumentWidth || document.documentElement.clientHeight !== this.proDocumentHeight) {
                    Phaser.myScaleManager.refresh(); //刷新界面宽高 非常有用

                    this.proDocumentWidth = document.documentElement.clientWidth;
                    this.proDocumentHeight = document.documentElement.clientHeight;
                }

                if (orientation != "landscape-primary") {
                    //当前是竖屏
                    if (!Phaser.myScaleManager.isMyLandscape()) {
                        //未启动 自定义横屏
                        Phaser.myScaleManager.setMyLandscapeMode(true, true);
                    }
                    return "landscape-primary";
                } else {
                    //切换到横屏模式
                    if (Phaser.myScaleManager.isMyLandscape()) {
                        //关闭自定义横屏模式
                        Phaser.myScaleManager.setMyLandscapeMode(false, true);
                    }
                    return orientation;
                }
            },
            getOffset: function getOffset() {
                var rel = this._super.apply(this, arguments);
                //console.log(rel);
                return rel;
            },
            getBounds: function getBounds() {
                var rel = this._super.apply(this, arguments);
                //console.log(rel);
                return rel;
            },
            calibrate: function calibrate() {
                var rel = this._super.apply(this, arguments);
                //console.log(rel);
                return rel;
            },
            getAspectRatio: function getAspectRatio() {
                var rel = this._super.apply(this, arguments);
                //console.log(rel);
                return rel;
            },
            inLayoutViewport: function inLayoutViewport() {
                var rel = this._super.apply(this, arguments);
                //console.log(rel);
                return rel;
            },
            hadhook:function(){
                return true
            }
        });
        Phaser.DOM = new MyDOM();

        var _startPointer = Phaser.Input.prototype.startPointer;
        Phaser.Input.prototype.startPointer = function (event) {
            return _startPointer.call(this, this.copyEvent(event));
        };
        var _updatePointer = Phaser.Input.prototype.updatePointer;
        Phaser.Input.prototype.updatePointer = function (event) {
            return _updatePointer.call(this, this.copyEvent(event));
        };
        var _stopPointer = Phaser.Input.prototype.stopPointer;
        Phaser.Input.prototype.stopPointer = function (event) {
            return _stopPointer.call(this, this.copyEvent(event));
        };
        Phaser.Input.prototype.copyEvent = function (event) {
            if (!Phaser.myScaleManager.isMyLandscape()) {
                //未启动 自定义横屏
                return event;
            }
            var target = event.target;
            var myevent = this.extendCopy(event);

            var _cx = myevent.clientX;
            var _cy = myevent.clientY;
            var _px = myevent.pageX;
            var _py = myevent.pageY;
            var _sx = myevent.screenX;
            var _sy = myevent.screenY;
            myevent.clientX = _cy;
            myevent.clientY = target.clientHeight - _cx;
            myevent.pageX = _py;
            myevent.pageY = target.clientHeight - _px;
            //myevent.rotationAngle=Math.PI/2;
            return myevent;
        };
        Phaser.Input.prototype.extendCopy = function (p) {
            var c = {};
            for (var i in p) {
                c[i] = p[i];
            }
            c.uber = p;
            return c;
        };
        var _getParentBounds = Phaser.ScaleManager.prototype.getParentBounds;
        Phaser.ScaleManager.prototype.getParentBounds = function () {
            var rel = _getParentBounds.apply(this, arguments);
            var _width = rel.width;
            var _height = rel.height;
            if (Phaser.myScaleManager.isMyLandscape()) {
                rel.width = _height;
                rel.height = _width;
            }
            return rel;
        };
    },
    boot: function boot(game) {
        this.game = game;
    },
    refresh: function () {
        document.body.style.width = document.documentElement.clientWidth + "px";
        document.body.style.height = document.documentElement.clientHeight + "px";

        if (document.documentElement.clientHeight >= document.documentElement.clientWidth) {
            //竖屏
            this.gameDiv.style.height = document.body.clientWidth + "px";
            this.gameDiv.style.width = document.body.clientHeight + "px";
            this.gameDiv.style.transform = "rotate(90deg)";
            this.gameDiv.style.left = -(document.documentElement.clientHeight - document.documentElement.clientWidth) / 2 + "px";
        } else {
            //横屏
            this.gameDiv.style.width = document.body.clientWidth + "px";
            this.gameDiv.style.height = document.body.clientHeight + "px";
            this.gameDiv.style.transform = "";
            this.gameDiv.style.left = "";
        }
    },
    setMyLandscapeMode: function setMyLandscapeMode(setTo, refresh) {
        refresh = refresh || false;
        this.isMyLandscapeMode = setTo;
        if (refresh) {
            this.refresh();
        }
    },
    isMyLandscape: function isMyLandscape() {
        return this.isMyLandscapeMode;
    }

});