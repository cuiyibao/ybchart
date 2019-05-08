import ybchart from "../src/"

const App = document.getElementById("app")

console.log(ybchart)

ybchart.init(App)

ybchart.diffPie({
  shape: {
    x: 110,
    y: 100,
    r: 73,
    pW: 50,
  },
  color: ["#35aea2", "#2652cc", "#de4e96", "#e8a937"],
  data: [
    {
      value: 10,
      name: "25以下"
    },
    {
      value: 50,
      name: "25-35"
    },
    {
      value: 20,
      name: "35-50"
    },
    {
      value: 20,
      name: "50以上"
    }
  ],
  navBar: {
    textStyle: {
      color: "#6775ad"
    },
    icon: "circle",
    data: ["25以下", "25-35", "35-50", "50以上"]
  },
  width: 230
})
