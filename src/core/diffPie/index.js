var zrender = require("zrender")
var util = require("../../utils/util")

function DiffPie(opts) {
  var group = new zrender.Group()

  var cX = opts.shape.x
  var cY = opts.shape.y
  var cR = opts.shape.r
  var cW = opts.shape.pW

  var data = opts.data
  var total = util.deepClone(data).reduce(function(obj1, obj2) {
    var current = isNaN(obj1) ? obj1.value : obj1
    return current + obj2.value
  })
  var sortData = util.deepClone(data).sort(function(obj1, obj2) {
    return obj1["value"] - obj2["value"]
  })
  var _startAngle = 0;
  var _endAngle = 0;
  for (var i = 0; i < data.length; i ++) {
    var _startAngle = i == 0 ? 0 : _endAngle
    var _endAngle = _startAngle + 2 * Math.PI / 360 * (data[i]["value"] / total * 360)
    var rdR = 0; // 每个图形的间距
    util.deepClone(sortData).forEach(function(ele, ind) {
      if (ele["name"] == data[i]["name"]) {
        rdR = (data.length - ind + 1) * 4
      }
    })
    var arc = new zrender.Sector({
      shape: {
        cx: cX,
        cy: cY,
        r: cR - rdR,
        r0: cR - cW,
        startAngle: _startAngle,
        endAngle: _endAngle,
        clockwise: true
      },
      style: {
        fill: opts.color[i],
        shadowColor: "#131858",
        shadowBlur: 10,
      }
    })
    group.add(arc)
  }

  // 导航
  var index = 0
  opts.navBar.data.forEach(function(ele, ind) {
    var narY = 100
    if ((80 + 70 * (ind - index)) > opts.width) {
      narY = 125
      index = ind
    }
    var circle = new zrender.Circle({
      shape: {
        cx: 30 + 70 * (ind - index),
        cy: opts.shape.y + narY + 5,
        r: 6
      },
      style: {
        fill: opts.color[ind],
      },
    })
  
    group.add(circle)

    var bar = new zrender.Text({
      style: {
        text: ele,
        textFill: opts.navBar.textStyle.color,
        textAlign: 'left',
        textVerticalAlign: 'top'
      },
      position: [40 + 70 * (ind - index), opts.shape.y + narY]
    })
  
    group.add(bar)
  })
  
  return group
}

module.exports = DiffPie
