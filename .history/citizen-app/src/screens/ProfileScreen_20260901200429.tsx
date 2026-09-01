import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { colors } from "../theme/colors";
import { currentUser } from "../data/mockData";
import { useReports } from "../context/ReportsContext";
import IssueCard from "../components/IssueCard";

export default function ProfileScreen() {
  const router = useRouter();
  const { reports } = useReports();
  const [notifEnabled, setNotifEnabled] = useState(true);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color="#fff" />
        </View>

        <Text style={styles.name}>{currentUser.name}</Text>

        <View style={styles.badge}>
          <Ionicons
            name="shield-checkmark"
            size={14}
            color={colors.success}
          />
          <Text style={styles.badgeText}>
            {currentUser.badge}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {currentUser.reputation}
          </Text>
          <Text style={styles.statLabel}>Reputation pts</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {currentUser.reportsSubmitted}
          </Text>
          <Text style={styles.statLabel}>Reports</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {currentUser.reportsVerified}
          </Text>
          <Text style={styles.statLabel}>Verified</Text>
        </View>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>
          Push notifications
        </Text>
        <Switch
          value={notifEnabled}
          onValueChange={setNotifEnabled}
          trackColor={{ true: colors.primary }}
        />
      </View>

      <Text style={styles.sectionTitle}>Your reports</Text>

      {reports.length === 0 && (
        <Text style={styles.emptyText}>
          You haven't reported anything yet.
        </Text>
      )}

      {reports.map((r) => (
        <IssueCard
          key={r.id}
          report={r}
          onPress={() =>
            router.push({
              pathname: "/TrackingScreen",
              params: { reportId: r.id },
            })
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: colors.success + "1A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    color: colors.success,
    marginLeft: 4,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    paddingVertical: 14,
    marginRight: 8,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },

  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
    textAlign: "center",
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 20,
  },

  settingLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});