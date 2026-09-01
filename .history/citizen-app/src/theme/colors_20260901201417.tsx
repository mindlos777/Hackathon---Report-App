export const colors = {
  primary: "#0B5FFF",
  primaryDark: "#0847C4",
  background: "#F5F7FA",
  card: "#FFFFFF",
  text: "#101828",
  textMuted: "#667085",
  border: "#E4E7EC",

  success: "#12B76A",
  warning: "#F79009",
  critical: "#F04438",

  info: "#0B5FFF",
  yellow: "#F5C542",
} as const;

export type Severity =
  | "critical"
  | "high"
  | "medium"
  | "low";

export type Status =
  | "Reported"
  | "Verified"
  | "Assigned"
  | "In Progress"
  | "Fixed";

export const severityColor = (
  severity: Severity
): string => {
  switch (severity) {
    case "critical":
      return colors.critical;

    case "high":
      return colors.warning;

    case "medium":
      return colors.yellow;

    case "low":
    default:
      return colors.info;
  }
};

export const statusSteps: Status[] = [
  "Reported",
  "Verified",
  "Assigned",
  "In Progress",
  "Fixed",
];