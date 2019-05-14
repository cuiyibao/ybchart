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
      radian: 40,
      direction: "left"
    },
    buildPath: function(path, shape) {
      var x = shape.x
      var y = shape.y
      var h = shape.height

      var radianL = 2 * Math.PI / 360 * 40; // 左角度
      var xL = Math.sin(radianL) * h; // 三角形 高
      var yL = Math.cos(radianL) * h // 三角形 上边

      path.moveTo(x, y)
      if (shape.direction == "right") {
        path.lineTo(x + xL, y + yL)
      } else {
        path.lineTo(x - xL, y + yL)
      }

      if (shape.radian > 40) {
        var radianR = 2 * Math.PI / 360 * (shape.radian - 40); // 角度
        var xR = Math.sin(radianR) * h; // 三角形 高
        var yR = Math.cos(radianR) * h; // 三角形 上边
        path.lineTo(x - xR, y + yR)
      } else if (shape.radian == 40) {
        path.lineTo(x, y + h)
      } else {
        var radianR = 2 * Math.PI / 360 * (40 - shape.radian); // 角度
        var xR = Math.sin(radianR) * h; // 三角形 高
        var yR = Math.cos(radianR) * h; // 三角形 上边
        path.lineTo(x - xR, y + yR)
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
      radian: 40,
      direction: "left"
    },
    buildPath: function(path, shape) {
      var x = shape.x
      var y = shape.y
      var h = shape.height
      var tH = 100 - shape.height

      var radian = 2 * Math.PI / 360 * 40; // 角度
      var xL = Math.sin(radian) * h; // 三角形 高
      var yL = Math.cos(radian) * h // 三角形 上边
      var tA = Math.sin(radian) * tH // 三角形 高
      var tQ = Math.cos(radian) * tH; // 三角形 上边
      if (shape.direction == "right") {
        path.moveTo(x + xL, y + yL)
        path.lineTo(x + xL + tA, y + yL + tQ)
      } else {
        path.moveTo(x - xL, y + yL)
        path.lineTo(x - xL - tA, y + yL + tQ)
      }

      if (shape.radian > 40) {
        var radianR = 2 * Math.PI / 360 * (shape.radian - 40); // 角度
        var xR = Math.sin(radianR) * h; // 三角形 高
        var yR = Math.cos(radianR) * h // 三角形 上边
        var rA = Math.sin(radianR) * tH // 三角形 高
        var rQ = Math.cos(radianR) * tH; // 三角形 上边
        path.lineTo(x - xR - rA, y + yR + rQ)
        path.lineTo(x - xR, y + yR)
      } else if (shape.radian == 40) {
        path.lineTo(x, y + h + tH)
        path.lineTo(x, y + h)
      } else {
        var radianR = 2 * Math.PI / 360 * (40 - shape.radian); // 角度
        var xR = Math.sin(radianR) * h; // 三角形 高
        var yR = Math.cos(radianR) * h // 三角形 上边
        var rA = Math.sin(radianR) * tH // 三角形 高
        var rQ = Math.cos(radianR) * tH; // 三角形 上边
        path.lineTo(x - xR - rA, y + yR + rQ)
        path.lineTo(x - xR, y + yR)
      }
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
      direction: "right"
    }),
    style: {
      fill: opts.color[1]
    }
  })

  group.add(triangleL)
  group.add(triangleR)
  group.add(trapezoidL)
  group.add(trapezoidR)

  // 三角形文字标
  var radianL = 2 * Math.PI / 360 * 40; // 左角度
  var xL = Math.sin(radianL) * opts.shape.height // 三角形 高
  var yL = Math.cos(radianL) * opts.shape.height // 三角形 上边
  var triangleText = new zrender.Text({
    style: {
      text: opts.shape.height + "%", 
      textFill: "#fff",
      textAlign: 'left',
      textVerticalAlign: 'center'
    },
    position: [opts.shape.x + xL/2 + 10, opts.shape.y + yL/2]
  })
  group.add(triangleText)

  var tA = Math.sin(radianL) * (100 - opts.shape.height) // 三角形 高
  var tQ = Math.cos(radianL) * (100 - opts.shape.height); // 三角形 上边
  // 梯形文字标
  var trapezoidText = new zrender.Text({
    style: {
      text: (100 - opts.shape.height) + "%", 
      textFill: "#fff",
      textAlign: 'left',
      textVerticalAlign: 'center'
    },
    position: [opts.shape.x + (xL + tA) / 2, opts.shape.y + (yL + tQ) + 20]
  })
  group.add(trapezoidText)

  // triangleL.animateTo({
  //   shape: {
  //     radian: 0
  //   }
  // }, 3000, 100, 'rotate', function () {
  //     // done
  // });
  // triangleR.animateTo({
  //   shape: {
  //     radian: 80
  //   }
  // }, 3000, 100, 'rotate', function () {
  //     // done
  // });
  // trapezoidL.animateTo({
  //   shape: {
  //     radian: 0
  //   }
  // }, 3000, 100, 'rotate', function () {
  //     // done
  // });
  // trapezoidR.animateTo({
  //   shape: {
  //     radian: 80
  //   }
  // }, 3000, 100, 'rotate', function () {
  //     // done
  // });

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
  if (opts.navBar && opts.navBar.data) {
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
  }

  return group
}

module.exports = Pyramid
