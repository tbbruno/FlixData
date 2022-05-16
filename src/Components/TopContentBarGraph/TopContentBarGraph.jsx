import React, { createElement, useMemo, useCallback } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTooltip } from "@nivo/tooltip";
import "./TopContentBarGraph.css";

const TopContentBarGraph = ({ data, isMiniature }) => {
  let barProps = {
    data,
    keys: ["hoursValue"],
    indexBy: "contentName",
    layout: "horizontal",
    margin: isMiniature
      ? { top: 0, right: 0, bottom: 0, left: 0 }
      : { top: 50, right: 130, bottom: 50, left: 60 },
    padding: 0.2,
    valueScale: { type: "linear" },
    indexScale: { type: "band", round: true },
    colors: { scheme: "nivo" },
    minValue: 0,
    maxValue: 230,
    axisTop: null,
    axisRight: null,
    legends: [],
  };
  return (
    <ResponsiveBar
      className="top-content-bar-graph"
      {...barProps}
      colorBy="indexValue"
      barComponent={BarComponent}
      tooltip={CustomToolTip}
    />
  );
};

TopContentBarGraph.defaultProps = {
  isMiniature: true,
};

export default TopContentBarGraph;

const CustomToolTip = (props) => {
  const {
    data: { contentName, formattedTime },
    color,
  } = props;
  return (
    <div
      style={{
        padding: 12,
        color,
        background: "#222222",
        textAlign: "right",
      }}
    >
      <span>{formattedTime}</span>
      <br />
      <strong>{contentName}</strong>
    </div>
  );
};

const BarComponent = (props) => {
  const {
    bar: { data, ...bar },
    tooltip,
    isInteractive,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const { showTooltipFromEvent, hideTooltip } = useTooltip();

  const renderTooltip = useMemo(
    () => () => createElement(tooltip, { ...bar, ...data }),
    [tooltip, bar, data]
  );

  const handleTooltip = useCallback(
    (event) => showTooltipFromEvent(renderTooltip(), event),
    [showTooltipFromEvent, renderTooltip]
  );
  const handleMouseEnter = useCallback(
    (event) => {
      onMouseEnter?.(data, event);
      showTooltipFromEvent(renderTooltip(), event);
    },
    [data, onMouseEnter, showTooltipFromEvent, renderTooltip]
  );
  const handleMouseLeave = useCallback(
    (event) => {
      onMouseLeave?.(data, event);
      hideTooltip();
    },
    [data, hideTooltip, onMouseLeave]
  );

  return (
    <g
      transform={`translate(${bar.x},${bar.y})`}
      onMouseEnter={isInteractive ? handleMouseEnter : undefined}
      onMouseMove={isInteractive ? handleTooltip : undefined}
      onMouseLeave={isInteractive ? handleMouseLeave : undefined}
    >
      <rect
        x={-3}
        y={7}
        width={bar.width}
        height={bar.height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={bar.width} height={bar.height} fill={bar.color} />
      <rect
        x={bar.width - 5}
        width={5}
        height={bar.height}
        fill={bar.borderColor}
        fillOpacity={0.2}
      />
      <text
        x={bar.width - 16}
        y={bar.height / 2 - 8}
        textAnchor="end"
        dominantBaseline="central"
        fill={bar.borderColor}
        style={{
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        {data.formattedValue} hours
      </text>
      <text
        x={bar.width - 16}
        y={bar.height / 2 + 10}
        textAnchor="end"
        dominantBaseline="central"
        fill="black"
        style={{
          fontWeight: 900,
          fontSize: 16,
        }}
      >
        {data.indexValue}
      </text>
    </g>
  );
};
