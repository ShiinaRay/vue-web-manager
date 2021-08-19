<template>
  <div id="main" style="width: 95%; height: 600px; top: 50px"></div>
</template>

<script>
// 1. 导入 echarts  plus 5
//import echarts from "echarts";
import * as echarts from 'echarts';
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      option: {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          text: "分数统计渐变堆叠面积图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Web", "DataBase", "CLanguage", "Line 4", "Line 5"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Student 1", "Student 2", "Student 3", "Student 4", "Student 5", "Student 6", "Student 7"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Web",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [90, 70, 100, 85, 58, 70, 99],
          },
          {
            name: "DataBase",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [99, 74, 89, 81, 74, 56, 97],
          },
          {
            name: "CLanguage",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [97, 80, 92, 83, 60, 65, 95],
          },
          {
            name: "Line 4",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgba(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [1, 1, 1, 1, 1, 1, 1],
          },
          {
            name: "Line 5",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgba(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [1, 1, 1, 1, 1, 1, 1],
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.myway();
  },
  methods: {
    myway() {
      var myChart = echarts.init(document.getElementById("main"));
      //this.$http.get("/echarts").then((res) => {
        //console.log(res.data);
        // this.option.xAxis.data=res.data[0];
        // this.option.series[0].data=res.data[1];
        //this.$set(this.option.xAxis[0], "data", res.data[0]);
        //this.$set(this.option.series[0], "data", res.data[1]);
        // this.option.xAxis[0].data.splice(0,7,res.data[0]);
        // this.option.series[0].data.splice(0,7,res.data[1]);
        //myChart.setOption(this.option, true);
        // console.log(this.option.xAxis[0].data);
        // console.log(this.option.series[0].data);
      //});
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    },
  },
};
</script>

<style scoped lang="less"></style>