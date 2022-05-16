import React from "react";
import {
  DashboardCard,
  TopContentBarGraph,
  WeekActivityHeatMap,
} from "../../Components";
import "./Dashboard.css";
import {
  readViewingRawDataToJSON,
  itemsFilteredByProfile,
} from "../../Utils/viewingActivityFileReader";
import {
  parseGroupedContentInfo,
  parseIndividualSessionsContentInfo,
} from "../../Utils/viewingActivityContentParser";
import { getTopContentFormattedData } from "../../Utils/topContentDataFormatter";
import { getWeekHeatMapFormattedData } from "../../Utils/weekHeatMapDataFormatter";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupedContentInfo: null,
      individualSessionsContentInfo: null,
    };
  }

  componentDidMount() {
    this.loadContentInfo();
  }

  loadContentInfo() {
    readViewingRawDataToJSON().then((items) => {
      const filteredItems = itemsFilteredByProfile(items, "Bruno", true);
      const groupedContentInfo = parseGroupedContentInfo(filteredItems, true);
      const individualSessionsContentInfo =
        parseIndividualSessionsContentInfo(filteredItems);
      console.log(individualSessionsContentInfo);
      this.setState({ groupedContentInfo, individualSessionsContentInfo });
    });
  }

  render() {
    return (
      <div className="dashboard">
        {this.state.groupedContentInfo &&
          this.state.individualSessionsContentInfo && (
            <div className="content-container">
              <DashboardCard title="Week Activity Heatmap">
                <WeekActivityHeatMap
                  data={getWeekHeatMapFormattedData(
                    this.state.individualSessionsContentInfo
                  )}
                />
              </DashboardCard>
              <DashboardCard title="Top 5 watched">
                <TopContentBarGraph
                  data={getTopContentFormattedData(
                    5,
                    this.state.groupedContentInfo
                  )}
                />
              </DashboardCard>
            </div>
          )}
      </div>
    );
  }
}

export default Dashboard;
