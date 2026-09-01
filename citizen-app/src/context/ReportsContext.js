import React, { createContext, useContext, useState, useCallback } from "react";
import { initialReports } from "../data/mockData";

const ReportsContext = createContext(null);

let idCounter = 100;

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState(initialReports);

  const addReport = useCallback((report) => {
    const newReport = {
      id: `r${idCounter++}`,
      status: "Reported",
      createdAt: new Date().toISOString(),
      ...report,
    };
    setReports((prev) => [newReport, ...prev]);
    return newReport;
  }, []);

  const advanceStatus = useCallback((id, status) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }, []);

  return (
    <ReportsContext.Provider value={{ reports, addReport, advanceStatus }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within a ReportsProvider");
  return ctx;
}
