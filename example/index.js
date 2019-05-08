import ybchart from "../src/"

const chart1 = document.getElementById("chart1")

ybchart.init(chart1)

ybchart.pyramid({
  shape: {
    x: 100,
    y: 50,
    height: 60
  },
  title: {
    text: "表头",
    color: "#fff",
    fontSize: 14
  },
  color: ["#de4d96", "#2651cc"],
});

const chart2 = document.getElementById("chart2")

ybchart.init(chart2)

ybchart.pyramid({
  shape: {
    x: 100,
    y: 50,
    height: 20
  },
  title: {
    text: "表头",
    color: "#fff",
    fontSize: 14
  },
  color: ["#de4d96", "#2651cc"],
});

const chart3 = document.getElementById("chart3")

ybchart.init(chart3)

ybchart.pyramid({
  shape: {
    x: 100,
    y: 50,
    height: 90
  },
  title: {
    text: "表头",
    color: "#fff",
    fontSize: 14
  },
  color: ["#de4d96", "#2651cc"],
});

const chart4 = document.getElementById("chart4")

ybchart.init(chart4)

ybchart.diffPie({
  shape: {
    x: 110,
    y: 80,
    r: 73,
    pW: 50
  },
  color: ["#de4e96", "#32ada3", "#2954d2"],
  data: [
    { value: 15, name: "高中及以上" },
    { value: 30, name: "专科" },
    { value: 75, name: "本科及以上" }
  ],
  navBar: {
    textStyle: {
      color: "#6775ad"
    },
    icon: "circle",
    data: ["高中及以上", "专科", "本科及以上"]
  },
  width: 200
});