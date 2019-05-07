var zrender = require("zrender")
var util = require("../../utils/util")

function DiffPie(opts) {
  var group = new zrender.Group()

  var cX = opts.shape.x
  var cY = opts.shape.y
  var cR = opts.shape.r

  var arc1 = new zrender.Sector({
    shape: {
      cx: cX,
      cy: cY,
      r: cR,
      r0: cR - 40,
      startAngle: 0,
      endAngle: 2 * Math.PI / 360 * 90,
      clockwise: true
    },
    style: {
      fill: "#2bc6c7"
    }
  })
  group.add(arc1)
  
  return group
}

module.exports = DiffPie
