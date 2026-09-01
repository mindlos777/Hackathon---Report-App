import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { colors, severityColor } from "../theme/colors";
import { categories } from "../data/mockData";
import CategoryButton from "../components/CategoryButton";
import { useReports } from "../context/ReportsContext";
import { Severity, Status } from "../theme/colors";
import IssueCard from "@/components/IssueCard";

export interface Report {
  id: string;
  category: string;
  description: string;

  severity: Severity;

  latitude: number;
  longitude: number;

  status: Status;

  createdAt: string;
  proofPhotoUri?: string;
}

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { reports = [] } = useReports() ?? {};

  const region = {
    latitude: -26.0076,
    longitude: 28.1345,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi Ashley 👋</Text>
          <Text style={styles.subGreeting}>
            What's happening in your area?
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push("../app/profile")}>
          <Ionicons
            name="person-circle-outline"
            size={36}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Reports</Text>
      
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
          pathname: "../screens/TrackingScreen",
          params: { reportId: r.id },
          })
        }
        />
      ))}

      <Text style={styles.sectionTitle}>Quick categories</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            onPress={() =>
              router.push({
                pathname: "../tracking/report-issue",
                params: {
                  presetCategory: cat.id,
                },
              })
            }
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => router.push("../tracking/report-issue")}
        activeOpacity={0.85}
      >
        <Ionicons name="add-circle" size={26} color="#fff" />
        <Text style={styles.reportButtonText}>Report Issue</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Nearby reported issues</Text>

      <View style={styles.mapWrap}>
        <MapView style={styles.map} initialRegion={region}>
          {reports.map((r) => (
            <Marker
              key={r.id}
              coordinate={{
                latitude: r.latitude,
                longitude: r.longitude,
              }}
              pinColor={severityColor(r.severity as Severity)}
              title={
                categories.find((c) => c.id === r.category)?.label
              }
              description={r.description}
            />
          ))}
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  subGreeting: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  emptyText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  reportButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
    marginTop: 20,
  },
  mapWrap: {
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    width: width - 40,
    height: 220,
  },
});