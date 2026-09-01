import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            console.log("User logged out");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={styles.settingText}>
              Push Notifications
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: colors.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons
              name="moon-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={styles.settingText}>
              Dark Mode
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ true: colors.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons
              name="location-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={styles.settingText}>
              Location Services
            </Text>
          </View>

          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ true: colors.primary }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={colors.primary}
          />
          <Text style={styles.menuText}>About App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="document-text-outline"
            size={22}
            color={colors.primary}
          />
          <Text style={styles.menuText}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={colors.primary}
          />
          <Text style={styles.menuText}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#fff"
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 20,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    overflow: "hidden",
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingText: {
    fontSize: 15,
    marginLeft: 10,
    color: colors.text,
    fontWeight: "500",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: colors.text,
  },

  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});