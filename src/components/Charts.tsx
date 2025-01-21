import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type CropData = {
  name: string;
  yield: number;
};

type BarChartProps = {
  data: CropData[];
};
const alternatingColors = [
  "#62cff4", 
  "#91cc75", 
  "##5470c6", 
];
const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const cropNames = data.map((item) => item.name);
    const yields = data.map((item) => item.yield);

    const option: echarts.EChartsOption = {
      title: {
        text: "Average Yield of the Crop",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: cropNames,
        axisLabel: {
          rotate: 30, 
        },
      },
      yAxis: {
        type: "value",
        name: "Average Yield",
      },
      series: [
        {
          type: "bar",
          data: yields,
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
          itemStyle: {
            color: (params: any) => {
              return alternatingColors[
                params.dataIndex % alternatingColors.length
              ];
            },
          },
        },
      ],
    };

    chartInstance.setOption(option as any);

    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default BarChart;
