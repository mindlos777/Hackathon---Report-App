import React from "react";
2
import {
3
View,
4
Text,
5
StyleSheet,
6
ScrollView,
7
TouchableOpacity,
8
Dimensions,
9
} from "react-native";
10
import MapView, { Marker } from "react-native-maps";
11
import { Ionicons } from "@expo/vector-icons";
12
import { useRouter } from "expo-router";
13
 
14
import { colors, severityColor } from "../theme/colors";
15
import { categories } from "../data/mockData";
16
import CategoryButton from "../components/CategoryButton";
17
import { useReports } from "../context/ReportsContext";
18
 
19
const { width } = Dimensions.get("window");
20
 
21
export default function HomeScreen() {
22
const router = useRouter();
23
const { reports } = useReports();
24
 
25
const region = {
26
latitude: -26.0076,
27
longitude: 28.1345,
28
latitudeDelta: 0.03,
29
longitudeDelta: 0.03,
30
};
31
 
32
return (
33
<ScrollView
34
style={styles.container}
35
contentContainerStyle={{ paddingBottom: 32 }}
36
>
37
<View style={styles.header}>
38
<View>
39
<Text style={styles.greeting}>Hi Ashley 👋</Text>
40
<Text style={styles.subGreeting}>
41
What's happening in your area?
42
</Text>
43
</View>
44
 
45
<TouchableOpacity onPress={() => router.push("/profile")}>
46
<Ionicons
47
name="person-circle-outline"
48
size={36}
49
color={colors.primary}
50
/>
51
</TouchableOpacity>
52
</View>
53
 
54
<TouchableOpacity
55
style={styles.reportButton}
56
onPress={() => router.push("/report-issue")}
57
activeOpacity={0.85}
58
>
59
<Ionicons name="add-circle" size={26} color="#fff" />
60
<Text style={styles.reportButtonText}>Report Issue</Text>
61
</TouchableOpacity>
62
 
63
<Text style={styles.sectionTitle}>Quick categories</Text>
64
 
65
<ScrollView
66
horizontal
67
showsHorizontalScrollIndicator={false}
68
style={{ marginBottom: 20 }}
69
>
70
{categories.map((cat) => (
71
<CategoryButton
72
key={cat.id}
73
icon={cat.icon}
74
label={cat.label}
75
onPress={() =>
76
router.push({
77
pathname: "/report-issue",
78
params: {
79
presetCategory: cat.id,
80
},
81
})
82
}
83
/>
84
))}
85
</ScrollView>
86
 
87
<Text style={styles.sectionTitle}>Nearby reported issues</Text>
88
 
89
<View style={styles.mapWrap}>
90
<MapView style={styles.map} initialRegion={region}>
91
{reports.map((r) => (
92
<Marker
93
key={r.id}
94
coordinate={{
95
latitude: r.latitude,
96
longitude: r.longitude,
97
}}
98
pinColor={severityColor(r.severity)}
99
title={
100
categories.find((c) => c.id === r.category)?.label
101
}
102
description={r.description}
103
/>
104
))}
105
</MapView>
106
</View>
107
</ScrollView>
108
);
109
}
110
 
111
const styles = StyleSheet.create({
112
container: {
113
flex: 1,
114
backgroundColor: colors.background,
115
padding: 20,
116
},
117
header: {
118
flexDirection: "row",
119
justifyContent: "space-between",
120
alignItems: "center",
121
marginBottom: 20,
122
marginTop: 8,
123
},
124
greeting: {
125
fontSize: 22,
126
fontWeight: "700",
127
color: colors.text,
128
},
129
subGreeting: {
130
fontSize: 13,
131
color: colors.textMuted,
132
marginTop: 2,
133
},
134
reportButton: {
135
backgroundColor: colors.primary,
136
borderRadius: 18,
137
paddingVertical: 20,
138
flexDirection: "row",
139
alignItems: "center",
140
justifyContent: "center",
141
marginBottom: 24,
142
shadowColor: colors.primary,
143
shadowOpacity: 0.3,
144
shadowRadius: 10,
145
shadowOffset: { width: 0, height: 6 },
146
elevation: 4,
147
},
148
reportButtonText: {
149
color: "#fff",
150
fontSize: 18,
151
fontWeight: "700",
152
marginLeft: 10,
153
},
154
sectionTitle: {
155
fontSize: 15,
156
fontWeight: "700",
157
color: colors.text,
158
marginBottom: 12,
159
},
160
mapWrap: {
161
height: 220,
162
borderRadius: 16,
163
overflow: "hidden",
164
borderWidth: 1,
165
borderColor: colors.border,
166
},
167
map: {
168
width: width - 40,
169
height: 220,
170
},
171
});