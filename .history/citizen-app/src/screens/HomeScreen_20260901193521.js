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

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { reports } = useReports();

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

        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons
            name="person-circle-outline"
            size={36}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => router.push("/report-issue")}
        activeOpacity={0.85}
      >
        <Ionicons name="add-circle" size={26} color="#fff" />
        <Text style={styles.reportButtonText}>Report Issue</Text>
      </TouchableOpacity>

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
                pathname: "/report-