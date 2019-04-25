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
  var pyramid = Pyramid({
    shape: _opts.shape || {
      x: 100,
      y: 100,
      height: 50,
    }
  })
  this.zr.add(pyramid);
}

module.exports = YbChart;