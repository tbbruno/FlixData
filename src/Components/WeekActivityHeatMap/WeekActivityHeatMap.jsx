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
      ? // ? { top: 0, right: 0, bottom: 0, left: 0 }
        { top: 30, right: 10, bottom: 0, left: 40 }
      : { top: 60, right: 90, bottom: 60, left: 90 },
    // forceSquare: true,
    xOuterPadding: 0.05,
    xInnerPadding: 0.05,
    yOuterPadding: 0.05,
    yInnerPadding: 0.05,
    axisTop: {
      tickSize: 0,
      tickPadding: 10,
      tickRotation: 0,
    },
    axisLeft: {
      tickSize: 0,
      tickPadding: 5,
      tickRotation: 0,
    },
    colors: {
      type: "sequential",
      scheme: "reds",
    },
    emptyColor: "#555555",
    borderRadius: "0.3%",
    enableLabels: false,
  };

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
      <strong>
        {x}, {serieId}
      </strong>
      <br />
      <span>{formattedValue} hours</span>
    </div>
  );
};
