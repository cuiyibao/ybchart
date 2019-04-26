import ybchart from "../src/"

const App = document.getElementById("app")

console.log(ybchart)

ybchart.init(App)

ybchart.pyramid({
  shape: {
    x: 100,
    y: 30,
    height: 40,
  },
  title: {
    text: "营业收入完成率",
    color: "red",
    fontSize: 14
  },
  navBar: {
    textStyle: {
      color: "#6775ad"
    },
    icon: "circle",
    data: ["已控制", "未控制"]
  },
})