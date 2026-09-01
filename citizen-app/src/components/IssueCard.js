import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, severityColor } from "../theme/colors";
import { categories } from "../data/mockData";

export default function IssueCard({ report, onPress }) {
  const category = categories.find((c) => c.id === report.category);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconWrap, { backgroundColor: severityColor(report.severity) + "22" }]}>
        <Ionicons
          name={category?.icon || "help-circle-outline"}
          size={22}
          color={severityColor(report.severity)}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{category?.label || "Issue"}</Text>
        <Text style={styles.desc} numberOfLines={1}>
          {report.description}
        </Text>
      </View>
      <View style={styles.right}>
        <View style={[styles.badge, { backgroundColor: severityColor(report.severity) }]}>
          <Text style={styles.badgeText}>{report.severity}</Text>
        </View>
        <Text style={styles.status}>{report.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  body: { flex: 1 },
  title: { fontWeight: "600", fontSize: 14, color: colors.text },
  desc: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  right: { alignItems: "flex-end" },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  status: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
});
