var YbChart = require('./core/YbChart');

/**
 * 创建一个实例
 */
function createInstance() {
  var instance = new YbChart();
  return instance;
}

var ybchart = createInstance();

module.exports = ybchart;