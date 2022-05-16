import { ResponsiveHeatMap } from "@nivo/heatmap";
import "./WeekActivityHeatMap.css";

const theme = {
  axis: {
    ticks: {
      text: {
        fontSize: 11,
        fill: "#fff",
      },
    },
  },
};

const WeekActivityHeatMap = ({ data, isMiniature }) => {
  let heatMapProps = {
    theme,
    data,
    enableLabels: !isMiniature,
    margin: isMiniature
      ? { top: 0, right: 0, bottom: 0, left: 0 }
      : { top: 60, right: 90, bottom: 60, left: 90 },
    // forceSquare: true,
    xOuterPadding: 0.05,
    xInnerPadding: 0.05,
    yOuterPadding: 0.05,
    yInnerPadding: 0.05,
    axisTop: isMiniature
      ? null
      : {
          tickSize: 0,
          tickPadding: 5,
          tickRotation: -90,
        },
    axisLeft: isMiniature
      ? null
      : {
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
        },
    colors: {
      type: "sequential",
      scheme: "reds",
      minValue: 0,
      maxValue: 8,
    },
    emptyColor: "#555555",
    borderRadius: "0.3%",
    enableLabels: false,
  };

  if (!isMiniature) {
    heatMapProps.legends = [
      {
        anchor: "bottom",
        translateX: 0,
        translateY: 40,
        length: 400,
        thickness: 8,
        direction: "row",
        tickPosition: "after",
        tickSize: 3,
        tickSpacing: 4,
        tickOverlap: false,
        tickFormat: ">-.2s",
        title: "Média de Horas assistidas →",
        titleAlign: "start",
        titleOffset: 8,
      },
    ];
  }

  return (
    <ResponsiveHeatMap
      className="week-activity-heatmap"
      {...heatMapProps}
      tooltip={CustomToolTip}
    />
  );
};

WeekActivityHeatMap.defaultProps = {
  isMiniature: true,
};

export default WeekActivityHeatMap;

const CustomToolTip = (props) => {
  const {
    cell: {
      color,
      serieId,
      formattedValue,
      data: { x },
    },
  } = props;

  return (
    <div
      style={{
        padding: 12,
        color: "#EB3D2F",
        background: "#222222",
      }}
    >
      <span>
        Weekday: <strong>{x}</strong>
      </span>
      <br />
      <span>
        Time: <strong>{serieId}</strong>
      </span>
      <br />
      <span>
        Average hours watched: <strong>{formattedValue}</strong>
      </span>
    </div>
  );
};
