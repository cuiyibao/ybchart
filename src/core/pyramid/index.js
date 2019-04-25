var zrender = require("zrender")
var util = require("../../utils/util")

function Pyramid(opts) {
  var group = new zrender.Group()
  // 三角形
  var Triangle = zrender.Path.extend({
    type: "triangle",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      direction: "left"
    },
    buildPath: function(path, shape) {
      var x = shape.x
      var y = shape.y
      var h = shape.height

      var radian = 2 * Math.PI / 360 * 50; // 角度
      var a = Math.sin(radian) * h // 三角形 上边
      var q = Math.cos(radian) * h; // 三角形 高
      path.moveTo(x, y)
      if (shape.direction == "right") {
        path.lineTo(x + q, y + a)
      } else {
        path.lineTo(x - q, y + a)
      }
      path.lineTo(x, y + h)
      path.fill()
    }
  })

  // 梯形
  var Trapezoid = zrender.Path.extend({
    type: "trapezoid",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      direction: "left"
    },
    buildPath: function(path, shape) {
      var x = shape.x
      var y = shape.y
      var h = shape.height
      var tH = 100 - shape.height

      var radian = 2 * Math.PI / 360 * 50; // 角度
      var a = Math.sin(radian) * h // 三角形 上边
      var q = Math.cos(radian) * h; // 三角形 高
      var tA = Math.sin(radian) * tH // 三角形 上边
      var tQ = Math.cos(radian) * tH; // 三角形 高
      if (shape.direction == "right") {
        path.moveTo(x + q, y + a)
        path.lineTo(x + q + tQ, y + a + tA)
      } else {
        path.moveTo(x - q, y + a)
        path.lineTo(x - q - tQ, y + a + tA)
      }
      path.lineTo(x, y + h + tH)
      path.lineTo(x, y + h)
      path.fill()
    }
  })

  var triangleL = new Triangle({
    shape: opts.shape,
    style: {
      fill: "#b93378"
    }
  })

  var triangleR = new Triangle({
    shape: Object.assign(util.deepClone(opts.shape), {
      direction: "right"
    }),
    style: {
      fill: "#de4d96"
    }
  })

  var trapezoidL = new Trapezoid({
    shape: opts.shape,
    style: {
      fill: "#1e3f99"
    }
  })

  var trapezoidR = new Trapezoid({
    shape: Object.assign(util.deepClone(opts.shape), {
      direction: "right"
    }),
    style: {
      fill: "#2651cc"
    }
  })

  group.add(triangleL)
  group.add(triangleR)
  group.add(trapezoidL)
  group.add(trapezoidR)
  return group
}

module.exports = Pyramid