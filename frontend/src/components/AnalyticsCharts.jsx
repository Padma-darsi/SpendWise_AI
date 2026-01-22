export default function AnalyticsCard({ title, value, subValue }) {
  return (
    <div className="analytics-card">
      <h4>{title}</h4>
      <p>{value}</p>
      {subValue && <small>{subValue}</small>}
    </div>
  );
}
