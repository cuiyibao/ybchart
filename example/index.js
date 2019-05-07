import ybchart from "../src/"

const App = document.getElementById("app")

console.log(ybchart)

ybchart.init(App)

ybchart.hourHand({
  shape: {
    x: 100,
    y: 100,
    r: 73
  },
  fraction: 40
})