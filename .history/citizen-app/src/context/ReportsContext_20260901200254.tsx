import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

import { initialReports } from "../data/mockData";

export interface Report {
  id: string;
  category: string;
  description: string;
  severity: string;
  latitude: number;
  longitude: number;
  status: string;
  createdAt: string;
  proofPhotoUri?: string;
}

type NewReport = Omit<Report, "id" | "status" | "createdAt">;

interface ReportsContextType {
  reports: Report[];
  addReport: (report: NewReport) => Report;
  advanceStatus: (id: string, status: string) => void;
}

interface ReportsProviderProps {
  children: ReactNode;
}

const ReportsContext = createContext<ReportsContextType | undefined>(
  undefined
);

let idCounter = 100;

export function ReportsProvider({
  children,
}: ReportsProviderProps) {
  const [reports, setReports] =
    useState<Report[]>(initialReports);

  const addReport = useCallback(
    (report: NewReport): Report => {
      const newReport: Report = {
        id: `r${idCounter++}`,
        status: "Reported",
        createdAt: new Date().toISOString(),
        ...report,
      };

      setReports((prev) => [newReport, ...prev]);

      return newReport;
    },
    []
  );

  const advanceStatus = useCallback(
    (id: string, status: string) => {
      setReports((prev) =>
        prev.map((report) =>
          report.id === id
            ? { ...report, status }
            : report
        )
      );
    },
    []
  );

  return (
    <ReportsContext.Provider
      value={{
        reports,
        addReport,
        advanceStatus,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports(): ReportsContextType {
  const context = useContext(ReportsContext);

  if (!context) {
    throw new Error(
      "useReports must be used within a ReportsProvider"
    );
  }

  return context;
}
`