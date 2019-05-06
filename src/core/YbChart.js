var zrender = require("zrender")
var Pyramid = require("./pyramid")
var HourHand = require("./hourHand")

function YbChart() {
  this.name = "YbChart"; // 名字
  this.zr = {}; // zr实例
}

YbChart.prototype.init = function(dom) {
  this.zr = zrender.init(dom);
}

/**
 * 金字塔
 * @param {*} opts 
 */
YbChart.prototype.pyramid = function(opts) {
  var _opts = opts || {}
  var pyramid = Pyramid(_opts)
  this.zr.add(pyramid);
}

/**
 * 类时针
 * @param {*} opts 
 */
YbChart.prototype.hourHand = function(opts) {
  var _opts = opts || {}
  var hourHand = HourHand(_opts)
  this.zr.add(hourHand);
}

module.exports = YbChart;