import React from "react";
import Select from "react-select";
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
      isDateRangeModalVisible: false,
      profileRawItems: null,
      groupedContentInfo: null,
      individualSessionsContentInfo: null,
      contentTypeFilter: null,
      dateRangeFilter: {
        startDate: null,
        endDate: null,
      },
    };

    document.title = "FlixData";
  }

  componentDidMount() {
    this.loadProfileItems();
  }

  loadProfileItems() {
    readViewingRawDataToJSON().then((items) => {
      const profileRawItems = itemsFilteredByProfile(items, "Bruno", true);
      this.setState({ profileRawItems }, () => this.parseProfileItems());
    });
  }

  parseProfileItems() {
    const { profileRawItems } = this.state;

    const shouldFilterItemOutFunction = (rawItem, parsedItem) => {
      const {
        contentTypeFilter,
        dateRangeFilter: { startDate, endDate },
      } = this.state;

      let shouldFilterItemOut = false;

      if (contentTypeFilter) {
        const isSameType = parsedItem.type == contentTypeFilter;
        shouldFilterItemOut = shouldFilterItemOut || !isSameType;
      }

      if (startDate) {
        const itemDate = new Date(`${rawItem["Start Time"]} GMT`);
        const referenceStartDate = new Date(startDate);
        const isAfterStartDate = itemDate >= referenceStartDate;

        shouldFilterItemOut = shouldFilterItemOut || !isAfterStartDate;
      }

      if (endDate) {
        const itemDate = new Date(`${rawItem["Start Time"]} GMT`);
        const referenceEndDate = new Date(endDate);
        const isBeforeStartDate = itemDate <= referenceEndDate;

        shouldFilterItemOut = shouldFilterItemOut || !isBeforeStartDate;
      }

      return shouldFilterItemOut;
    };

    const groupedContentInfo = parseGroupedContentInfo(
      profileRawItems,
      false,
      shouldFilterItemOutFunction
    );
    console.log(groupedContentInfo);
    const individualSessionsContentInfo = parseIndividualSessionsContentInfo(
      profileRawItems,
      shouldFilterItemOutFunction
    );
    console.log(individualSessionsContentInfo);

    this.setState({ groupedContentInfo, individualSessionsContentInfo }, () =>
      this.forceUpdate()
    );
  }

  onSelectChange(option) {
    console.log(option);
    const contentTypeFilter = option?.value ?? null;
    console.log(contentTypeFilter);
    this.setState({ contentTypeFilter }, () => this.parseProfileItems());
  }

  renderContentTypeSelectorControlItem() {
    const options = [
      { value: "tvShow", label: "TV Show" },
      { value: "movie", label: "Movie" },
    ];

    return (
      <div className="control-item control-item-content-type">
        <h4>Content type</h4>
        <Select
          options={options}
          isClearable
          onChange={(option) => this.onSelectChange(option)}
        />
      </div>
    );
  }

  toggleDateRangeModal(isDateRangeModalVisible) {
    this.setState({ isDateRangeModalVisible });
  }

  renderDateRangeStartDatePickerControlItem() {
    const { startDate, endDate } = this.state;
    return (
      <div className="control-item control-item-date-range">
        <h4>Initial date</h4>
        <input
          type="date"
          id="start-date"
          name="range-start-date"
          value={startDate}
          onChange={(e) => {
            let newStartDate = e.target.value;
            if (newStartDate === "") {
              newStartDate = null;
            }
            // console.log(newStartDate);
            this.setState(
              {
                dateRangeFilter: {
                  startDate: newStartDate,
                  endDate,
                },
              },
              () => this.parseProfileItems()
            );
          }}
        />
      </div>
    );
  }

  renderDateRangeEndDatePickerControlItem() {
    const { startDate, endDate } = this.state;
    return (
      <div className="control-item control-item-date-range">
        <h4>Initial date</h4>
        <input
          type="date"
          id="end-date"
          name="range-end-date"
          value={endDate}
          onChange={(e) => {
            let newEndDate = e.target.value;
            if (newEndDate === "") {
              newEndDate = null;
            }
            // console.log(newEndDate);
            this.setState(
              {
                dateRangeFilter: {
                  startDate,
                  endDate: newEndDate,
                },
              },
              () => this.parseProfileItems()
            );
          }}
        />
      </div>
    );
  }

  renderDateRangeModal() {
    if (!this.state.isDateRangeModalVisible) {
      return null;
    }
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };

    return (
      <div className="date-range-picker-modal-container">
        <div className="date-range-picker-modal">
          {/* <DateRangePicker
            ranges={[selectionRange]}
            onChange={this.handleSelect}
          /> */}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard">
        {/* {this.renderDateRangeModal()} */}
        {this.state.groupedContentInfo &&
          this.state.individualSessionsContentInfo && (
            <div className="controls-container">
              <h3>Filter by:</h3>
              <div className="controls-group">
                {this.renderContentTypeSelectorControlItem()}
                {this.renderDateRangeStartDatePickerControlItem()}
                {this.renderDateRangeEndDatePickerControlItem()}
              </div>
            </div>
          )}
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
