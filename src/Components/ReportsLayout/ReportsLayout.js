import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  // Mock data for the reports table
  const reportsData = [
    { id: 1, reportName: "Blood Test", date: "2026-03-01", status: "Completed" },
    { id: 2, reportName: "X-Ray", date: "2026-02-15", status: "Pending" },
    { id: 3, reportName: "Dental Checkup", date: "2026-01-20", status: "Completed" },
  ];

  return (
    <div className="reports-container">
      <h1>Your Medical Reports</h1>
      <table className="reports-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Report Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.reportName}</td>
              <td>{report.date}</td>
              <td>{report.status}</td>
              <td>
                <div className="report-actions">
                  {/* View Report in new tab */}
                  <a href="/patient_report.pdf" target="_blank" rel="noreferrer">
                    <button className="view-btn">View Report</button>
                  </a>
                  
                  {/* Download Report directly */}
                  <a href="/patient_report.pdf" download="patient_report.pdf">
                    <button className="download-btn">Download PDF</button>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;