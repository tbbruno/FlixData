import React from "react";
import { mockHeatMapData, mockTopContentData } from "../../Assets/mockData";
import {
  DashboardCard,
  TopContentBarGraph,
  WeekActivityHeatMap,
} from "../../Components";
import "./Dashboard.css";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <DashboardCard title="Week Activity Heatmap">
          <WeekActivityHeatMap data={mockHeatMapData} />
        </DashboardCard>
        <DashboardCard title="Top 5 watched">
          <TopContentBarGraph data={mockTopContentData} />
        </DashboardCard>
      </div>
    );
  }
}

export default Dashboard;
