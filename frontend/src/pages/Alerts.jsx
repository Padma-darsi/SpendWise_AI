import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "./Alerts.css";

const iconMap = {
  danger: "🔴",
  warning: "🟠",
  info: "🔵"
};

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    const res = await axiosInstance.get("/alerts");
    setAlerts(res.data);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const markRead = async (id) => {
    await axiosInstance.put(`/alerts/${id}/read`);

    setAlerts((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, isRead: true } : a
      )
    );
  };


  const sortedAlerts = [...alerts].sort(
    (a, b) => a.isRead - b.isRead
  );

  
  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="alerts-page">
      <h2>🔔 Alerts</h2>

      <div className="unread-badge">
        Unread Alerts: <b>{unreadCount}</b>
      </div>

      {sortedAlerts.length === 0 && (
        <p>No alerts available</p>
      )}

      {sortedAlerts.map(alert => (
        <div
          key={alert._id}
          className={`alert-card ${alert.type} ${alert.isRead ? "read" : ""}`}
        >
          <h4>
            {iconMap[alert.type]} {alert.title}
          </h4>
          <p>{alert.message}</p>

          {!alert.isRead && (
            <button onClick={() => markRead(alert._id)}>
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

