import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

import { colors } from "../theme/colors";
import { categories } from "../data/mockData";
import { useReports } from "../context/ReportsContext";

function fakeAiDetectCategory() {
  const guesses = ["pothole", "streetlight", "dumping"];
  return guesses[Math.floor(Math.random() * guesses.length)];
}

export default function ReportIssueScreen() {
  const router = useRouter();
  const { presetCategory } = useLocalSearchParams();

  const { addReport } = (useReports() ?? {}) as {
    addReport?: (report: any) => any;
  };

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [locationLoading, setLocationLoading] = useState(true);

  const [category, setCategory] = useState<string | null>(
    typeof presetCategory === "string"
      ? presetCategory
      : null
  );

  const [description, setDescription] = useState("");
  const [aiSuggested, setAiSuggested] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});

        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLocationLoading(false);
      }
    })();
  }, []);

  const pickPhoto = async (fromCamera: boolean) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "CivicFix needs access to continue."
      );
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          quality: 0.6,
        })
      : await ImagePicker.launchImageLibraryAsync({
          quality: 0.6,
        });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setPhotoUri(uri);

      const guess = fakeAiDetectCategory();

      setAiSuggested(guess);

      if (!category) {
        setCategory(guess);
      }
    }
  };

  const handleSubmit = () => {
    if (!category) {
      Alert.alert(
        "Select a category",
        "Please choose the type of issue."
      );
      return;
    }

    if (!location) {
      Alert.alert(
        "Location needed",
        "We couldn't get your GPS location. Please enable location services and try again."
      );
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const report = addReport({
        category,
        description,
        severity: "medium",
        latitude: location.latitude,
        longitude: location.longitude,
        photoUri,
      });

      setSubmitting(false);

      router.replace({
        pathname: "/tracking",
        params: {
          reportId: report.id,
        },
      });
    }, 800);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.heading}>Report an Issue</Text>

      <Text style={styles.label}>Photo / Video</Text>

      <View style={styles.photoRow}>
        <TouchableOpacity
          style={styles.photoBox}
          onPress={() => pickPhoto(true)}
        >
          <Ionicons
            name="camera-outline"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.photoBoxText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.photoBox}
          onPress={() => pickPhoto(false)}
        >
          <Ionicons
            name="image-outline"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.photoBoxText}>Gallery</Text>
        </TouchableOpacity>

        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={styles.preview}
          />
        )}
      </View>

      <Text style={styles.label}>Location</Text>

      <View style={styles.locationBox}>
        {locationLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : location ? (
          <Text style={styles.locationText}>
            <Ionicons
              name="location"
              size={14}
              color={colors.primary}
            />{" "}
            {location.latitude.toFixed(5)},{" "}
            {location.longitude.toFixed(5)}
          </Text>
        ) : (
          <Text style={styles.locationTextMuted}>
            Location unavailable
          </Text>
        )}
      </View>

      <Text style={styles.label}>Issue Type</Text>

      {aiSuggested && (
        <Text style={styles.aiHint}>
          AI suggested:{" "}
          {categories.find(
            (c) => c.id === aiSuggested
          )?.label ?? aiSuggested}
          . Tap to change.
        </Text>
      )}

      <View style={styles.categoryGrid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              category === cat.id &&
                styles.categoryChipActive,
            ]}
            onPress={() => setCategory(cat.id)}
          >
            <Ionicons
              name={cat.icon as any}
              size={16}
              color={
                category === cat.id
                  ? "#fff"
                  : colors.primary
              }
            />

            <Text
              style={[
                styles.categoryChipText,
                category === cat.id &&
                  styles.categoryChipTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>
        Description (Optional)
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Add any extra detail that could help..."
        placeholderTextColor={colors.textMuted}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>
            Submit Report
          </Text>
        )}
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
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
    marginTop: 4,
  },

  photoRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },

  photoBox: {
    width: 76,
    height: 76,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  photoBoxText: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
  },

  preview: {
    width: 76,
    height: 76,
    borderRadius: 14,
  },

  locationBox: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 16,
  },

  locationText: {
    color: colors.text,
    fontSize: 13,
  },

  locationTextMuted: {
    color: colors.textMuted,
    fontSize: 13,
  },

  aiHint: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 8,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  categoryChipActive: {
    backgroundColor: colors.primary,
  },

  categoryChipText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: "600",
  },

  categoryChipTextActive: {
    color: "#fff",
  },

  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    minHeight: 90,
    textAlignVertical: "top",
    marginBottom: 24,
    color: colors.text,
  },

  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});