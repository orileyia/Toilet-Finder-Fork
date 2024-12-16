// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   Pressable,
//   View,
//   Animated,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState, useRef, useEffect } from "react";

// import Feather from "@expo/vector-icons/Feather";
// import AntDesign from "@expo/vector-icons/AntDesign";

// import { margin, padding } from "../scripts/utils";
// import { Link, usePathname } from "expo-router";

// export default function Header() {
//   const [isSearching, setSearch] = useState(false);
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const slideAnim = useRef(new Animated.Value(-250)).current;
//   const pathname = usePathname();

//   const toggleMenu = () => {
//     // sidebar animation
//     if (isMenuOpen) {
//       Animated.timing(slideAnim, {
//         toValue: -250,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setMenuOpen(false));
//     } else {
//       setMenuOpen(true);
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       Animated.timing(slideAnim, {
//         toValue: -250,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setMenuOpen(false));
//     }
//   }, [pathname]);

//   return (
//     <>
//       <View style={styles.header}>
//         <Pressable onPress={isSearching ? () => setSearch(false) : toggleMenu}>
//           {isSearching ? (
//             <AntDesign name="arrowleft" size={35} color="white" />
//           ) : isMenuOpen ? (
//             <AntDesign
//               name="arrowleft"
//               size={35}
//               color="white"
//               onPress={toggleMenu}
//             />
//           ) : (
//             <Feather name="menu" size={35} color="white" onPress={toggleMenu} />
//           )}
//         </Pressable>
//         <View style={styles.middle}>
//           {isSearching ? (
//             <TextInput
//               placeholder="Select location"
//               placeholderTextColor="#cccccc"
//               style={styles.searchBar}
//             />
//           ) : (
//             <Link href="/" style={styles.headerText}>
//               Toilet Finder
//             </Link>
//           )}
//         </View>
//         <Pressable onPress={() => setSearch(true)}>
//           <AntDesign name="search1" size={24} color="white" />
//         </Pressable>
//       </View>

//       {isMenuOpen && (
//         <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
//       )}
//       <Animated.View
//         style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
//       >
//         {/* Първи раздел */}
//         <Link href="/" style={styles.sidebarText}>
//           Home
//         </Link>
//         <Link href="/LoginScreen" style={styles.sidebarText}>
//           Log in
//         </Link>
//         <Link href="/RegisterScreen" style={styles.sidebarText}>
//           Register
//         </Link>
//         <Text style={styles.sidebarText}>Help</Text>
//         <View
//           style={{ backgroundColor: "#000", height: 1, ...margin(10, 0) }}
//         />
//         {/* Втори раздел */}
//         <Link href="/" style={styles.sidebarText}>
//           Home
//         </Link>
//         <Link href="/MyToiletsScreen" style={styles.sidebarText}>
//           MyToilets
//         </Link>
//         <Link href="/EditToilet" style={styles.sidebarText}>
//           Create new toilet
//         </Link>
//         <Text style={styles.sidebarText}>Log out</Text>
//         <Text style={styles.sidebarText}>Help</Text>
//       </Animated.View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#00A2FF",
//     width: "100%",
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     ...padding(0, 20),
//   },
//   headerText: {
//     fontSize: 20,
//     color: "white",
//     fontWeight: "600",
//   },
//   middle: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   searchBar: {
//     height: 40,
//     margin: 12,
//     padding: 10,
//     flex: 1,
//     fontSize: 18,
//   },
//   sidebar: {
//     position: "absolute",
//     top: 60,
//     left: 0,
//     width: 250,
//     height: "100%",
//     backgroundColor: "white",
//     padding: 20,
//     zIndex: 1,
//   },
//   sidebarText: {
//     color: "black",
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   overlay: {
//     position: "absolute",
//     top: 60,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     zIndex: 0,
//   },
// });

import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { margin, padding } from "../scripts/utils";
import { Link, usePathname } from "expo-router";

export default function Header() {
  const [isSearching, setSearch] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null); // Състояние за "hover"
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const pathname = usePathname();

  const toggleMenu = () => {
    // sidebar animation
    if (isMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuOpen(false));
    } else {
      setMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuOpen(false));
    }
  }, [pathname]);

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={isSearching ? () => setSearch(false) : toggleMenu}>
          {isSearching ? (
            <AntDesign name="arrowleft" size={35} color="white" />
          ) : isMenuOpen ? (
            <AntDesign name="arrowleft" size={35} color="white" />
          ) : (
            <Feather name="menu" size={35} color="white" />
          )}
        </Pressable>
        <View style={styles.middle}>
          {isSearching ? (
            <TextInput
              placeholder="Select location"
              placeholderTextColor="#cccccc"
              style={styles.searchBar}
            />
          ) : (
            <Link href="/" style={styles.headerText}>
              Toilet Finder
            </Link>
          )}
        </View>
        <Pressable onPress={() => setSearch(true)}>
          <AntDesign name="search1" size={24} color="white" />
        </Pressable>
      </View>

      {isMenuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
      )}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* Първи раздел */}
        <TouchableOpacity
          onPress={() => {}}
          onPressIn={() => setHoveredItem("Home")}
          onPressOut={() => setHoveredItem(null)}
          style={{
            backgroundColor: pathname === "/" ? "#00A2FF" : hoveredItem === "Home" ? "#e0e0e0" : "transparent",
          }}
        >
          <Link href="/" style={styles.sidebarText}>
            Home
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          onPressIn={() => setHoveredItem("Log in")}
          onPressOut={() => setHoveredItem(null)}
          style={{
            backgroundColor: pathname === "/LoginScreen" ? "#00A2FF" : hoveredItem === "Log in" ? "#e0e0e0" : "transparent",
 }}
        >
          <Link href="/LoginScreen" style={styles.sidebarText}>
            Log in
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          onPressIn={() => setHoveredItem("Register")}
          onPressOut={() => setHoveredItem(null)}
          style={{
            backgroundColor: pathname === "/RegisterScreen" ? "#00A2FF" : hoveredItem === "Register" ? "#e0e0e0" : "transparent",
          }}
        >
          <Link href="/RegisterScreen" style={styles.sidebarText}>
            Register
          </Link>
        </TouchableOpacity>
        <Text style={styles.sidebarText}>Help</Text>
        <View
          style={{ backgroundColor: "#000", height: 1, ...margin(10, 0) }}
        />
        {/* Втори раздел */}
        <TouchableOpacity
          onPress={() => {}}
          onPressIn={() => setHoveredItem("Home")}
          onPressOut={() => setHoveredItem(null)}
          style={{
            backgroundColor: pathname === "/" ? "#00A2FF" : hoveredItem === "Home" ? "#e0e0e0" : "transparent",
          }}
        >
          <Link href="/" style={styles.sidebarText}>
            Home
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          onPressIn={() => setHoveredItem("MyToilets")}
          onPressOut={() => setHoveredItem(null)}
          style={{
            backgroundColor: pathname === "/MyToiletsScreen" ? "#00A2FF" : hoveredItem === "MyToilets" ? "#e0e0e0" : "transparent",
          }}
        >
          <Link href="/MyToiletsScreen" style={styles.sidebarText}>
            MyToilets
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          onPressIn={() => setHoveredItem("Create new toilet")}
          onPressOut={() => setHoveredItem(null)}
          style={{
            backgroundColor: pathname === "/EditToilet" ? "#00A2FF" : hoveredItem === "Create new toilet" ? "#e0e0e0" : "transparent",
          }}
        >
          <Link href="/EditToilet" style={styles.sidebarText}>
            Create new toilet
          </Link>
        </TouchableOpacity>
        <Text style={styles.sidebarText}>Log out</Text>
        <Text style={styles.sidebarText}>Help</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00A2FF",
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...padding(0, 20),
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  middle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    height: 40,
    margin: 12,
    padding: 10,
    flex: 1,
    fontSize: 18,
  },
  sidebar: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    zIndex: 1,
  },
  sidebarText: {
    color: "black",
    fontSize: 18,
    marginVertical: 10,
    padding: 10, // Добавен padding за по-добър вид
  },
  overlay: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
});