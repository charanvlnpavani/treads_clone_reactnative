import * as React from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Lottie from "lottie-react-native";
import { ThreadContext } from "../../context/thread-context";
import ThreadItem from "../../components/ThreadItem";
import { Text } from "../../components/Themed";

export default function TabOneScreen() {
  const animationRef = React.useRef<Lottie>(null);
  const threads = React.useContext(ThreadContext);

  React.useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => animationRef.current?.play()}
          />
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Lottie
            ref={animationRef}
            source={require("../../lottie-animations/threads.json")}
            style={{
              width: 90,
              height: 90,
              alignSelf: "center",
            }}
            loop={false}
            onAnimationFinish={() => animationRef.current?.pause()}
          />
          <Text style={{ fontSize: 24 }}>Threads</Text>
        </View>
        {threads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
