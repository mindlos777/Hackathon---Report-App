import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, statusSteps } from "../theme/colors";

export default function StatusTimeline({ currentStatus }) {
  const currentIndex = statusSteps.indexOf(currentStatus);

  return (
    <View style={styles.wrap}>
      {statusSteps.map((step, index) => {
        const done = index <= currentIndex;
        const isLast = index === statusSteps.length - 1;
        return (
          <View key={step} style={styles.row}>
            <View style={styles.left}>
              <View
                style={[
                  styles.dot,
                  done && { backgroundColor: colors.success, borderColor: colors.success },
                ]}
              >
                {done && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    index < currentIndex && { backgroundColor: colors.success },
                  ]}
                />
              )}
            </View>
            <Text style={[styles.label, done && styles.labelDone]}>{step}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 8 },
  row: { flexDirection: "row", minHeight: 44 },
  left: { alignItems: "center", width: 28 },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
  },
  line: { flex: 1, width: 2, backgroundColor: colors.border },
  label: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.textMuted,
    paddingTop: 2,
  },
  labelDone: { color: colors.text, fontWeight: "600" },
});
