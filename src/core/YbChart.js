var zrender = require("zrender")
var Pyramid = require("./pyramid")

function YbChart() {
  this.name = "YbChart"; // 名字
  this.zr = {}; // zr实例
}

YbChart.prototype.init = function(dom) {
  this.zr = zrender.init(dom);
}

YbChart.prototype.pyramid = function(opts) {
  var _opts = opts || {}
  var pyramid = Pyramid(opts)
  this.zr.add(pyramid);
}

module.exports = YbChart;