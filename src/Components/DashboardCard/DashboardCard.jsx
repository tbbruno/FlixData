import "./DashboardCard.css";

const DashboardCard = ({ title, children }) => (
  <div className="dashboard-card">
    <header>
      <h2>{title}</h2>
    </header>
    <div className="content">{children}</div>
  </div>
);

export default DashboardCard;
