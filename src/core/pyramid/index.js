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
      radian: 50,
      direction: "left"
    },
    buildPath: function(path, shape) {
      var x = shape.x
      var y = shape.y
      var h = shape.height

      var radianL = 2 * Math.PI / 360 * 50; // 左角度
      var yL = Math.sin(radianL) * h // 三角形 上边
      var xL = Math.cos(radianL) * h; // 三角形 高

      path.moveTo(x, y)
      if (shape.direction == "right") {
        path.lineTo(x + yL, y + xL)
      } else {
        path.lineTo(x - yL, y + xL)
      }

      if (shape.radian > 50) {
        var radianR = 2 * Math.PI / 360 * (shape.radian - 50); // 角度
        var yR = Math.sin(radianR) * h // 三角形 上边
        var xR = Math.cos(radianR) * h; // 三角形 高
        path.lineTo(x - yR, y + xR)
      } else if (shape.radian == 50) {
        path.lineTo(x, y + h)
      } else {
        var radianR = 2 * Math.PI / 360 * (50 - shape.radian); // 角度
        var yR = Math.sin(radianR) * h // 三角形 上边
        var xR = Math.cos(radianR) * h; // 三角形 高
        path.lineTo(x - yR, y + xR)
      }
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
      radian: 50,
      direction: "left"
    },
    buildPath: function(path, shape) {
      var x = shape.x
      var y = shape.y
      var h = shape.height
      var tH = 100 - shape.height

      var radian = 2 * Math.PI / 360 * shape.radian; // 角度
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
      direction: "right",
      radian: 100 - opts.shape.radian
    }),
    style: {
      fill: opts.color[0]
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
      direction: "right",
      radian: 100 - opts.shape.radian
    }),
    style: {
      fill: opts.color[1]
    }
  })

  group.add(triangleL)
  group.add(triangleR)
  // group.add(trapezoidL)
  // group.add(trapezoidR)

  triangleL.animateTo({
    shape: {
      radian: 10
    }
  }, 3000, 100, 'rotate', function () {
      // done
  });
  triangleR.animateTo({
    shape: {
      radian: 90
    }
  }, 3000, 100, 'rotate', function () {
      // done
  });
  trapezoidL.animateTo({
    shape: {
      radian: 10
    }
  }, 3000, 100, 'rotate', function () {
      // done
  });
  trapezoidR.animateTo({
    shape: {
      radian: 90
    }
  }, 3000, 100, 'rotate', function () {
      // done
  });

  // 标题
  var title = new zrender.Text({
    style: {
      text: opts.title.text,
      textFill: opts.title.color,
      fontSize: opts.title.fontSize,
      textAlign: 'center'
    },
    position: [100, 10]
  })

  group.add(title)

  // 导航
  opts.navBar.data.forEach(function(ele, ind) {
    var circle = new zrender.Circle({
      shape: {
        cx: 30 + 100 * ind,
        cy: opts.shape.y + 145,
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
        textAlign: 'center',
        textVerticalAlign: 'top'
      },
      position: [60 + 100 * ind, opts.shape.y + 140]
    })
  
    group.add(bar)
  })

  return group
}

module.exports = Pyramid
