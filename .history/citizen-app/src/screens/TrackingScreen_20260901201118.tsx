import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { colors, severityColor } from "../theme/colors";
import { categories } from "../data/mockData";
import { useReports } from "../context/ReportsContext";
import StatusTimeline from "../components/StatusTimeline";

export default function TrackingScreen() {
  const { reports } = useReports();

  const { reportId } = useLocalSearchParams<{
    reportId?: string;
  }>();

  const allReports = (Array.isArray(reports) ? reports : []) as Array<{
    id?: string;
    category?: string;
    severity?: string | number;
    description?: string;
    status?: string;
    proofPhotoUri?: string;
  }>;

  const report =
    allReports.find((r) => r.id === reportId) ?? allReports[0];

  if (!report) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          No reports yet. Submit one from the Home tab.
        </Text>
      </View>
    );
  }

  const category = categories.find(
    (c) => c.id === report.category
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={styles.headerCard}>
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor:
                severityColor(report.severity) + "22",
            },
          ]}
        >
          <Ionicons
            name={
              (category?.icon as any) ||
              "help-circle-outline"
            }
            size={28}
            color={severityColor(report.severity)}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title}>
            {category?.label ?? "Unknown Category"}
          </Text>

          <Text style={styles.desc}>
            {report.description ||
              "No description provided."}
          </Text>
        </View>
      </View>

      <View style={styles.notifRow}>
        <Ionicons
          name="notifications-outline"
          size={16}
          color={colors.textMuted}
        />
        <Text style={styles.notifText}>
          You'll get a push notification whenever the
          status changes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <StatusTimeline
          currentStatus={report.status}
        />
      </View>

      {report.status === "Fixed" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Proof of Repair
          </Text>

          {report.proofPhotoUri ? (
            <Image
              source={{ uri: report.proofPhotoUri }}
              style={styles.proofImage}
            />
          ) : (
            <View style={styles.proofPlaceholder}>
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={colors.success}
              />
              <Text style={styles.proofPlaceholderText}>
                Municipality marked this fixed. Photo
                pending upload.
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  headerCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  desc: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },

  notifRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  notifText: {
    fontSize: 11,
    color: colors.textMuted,
    marginLeft: 6,
    flex: 1,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },

  proofImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 8,
  },

  proofPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  proofPlaceholderText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 8,
    flex: 1,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: "center",
  },
});