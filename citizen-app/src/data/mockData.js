export const categories = [
  { id: "pothole", label: "Pothole", icon: "warning-outline" },
  { id: "burst_pipe", label: "Burst Pipe", icon: "water-outline" },
  { id: "streetlight", label: "Streetlight", icon: "bulb-outline" },
  { id: "dumping", label: "Illegal Dumping", icon: "trash-outline" },
  { id: "sewer", label: "Sewer", icon: "alert-circle-outline" },
];

// Seed reports so the map / list / tracking screens have something to show.
export const initialReports = [
  {
    id: "r1",
    category: "pothole",
    description: "Large pothole blocking half the lane near the robot.",
    severity: "high",
    status: "In Progress",
    latitude: -26.0076,
    longitude: 28.1345,
    photoUri: null,
    createdAt: "2026-08-28T09:12:00Z",
  },
  {
    id: "r2",
    category: "streetlight",
    description: "Streetlight has been out for two weeks, feels unsafe at night.",
    severity: "medium",
    status: "Assigned",
    latitude: -26.0102,
    longitude: 28.1290,
    photoUri: null,
    createdAt: "2026-08-25T18:40:00Z",
  },
  {
    id: "r3",
    category: "burst_pipe",
    description: "Water gushing onto the road from a burst pipe.",
    severity: "critical",
    status: "Verified",
    latitude: -26.0055,
    longitude: 28.1400,
    photoUri: null,
    createdAt: "2026-08-30T07:05:00Z",
  },
];

export const currentUser = {
  name: "Ashley",
  reputation: 240,
  badge: "Trusted Reporter",
  reportsSubmitted: 12,
  reportsVerified: 9,
};
