import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

import RoleSelectScreen from "../screens/RoleSelectScreen";
import CustomerNavigator from "./CustomerNavigator";
import RiderNavigator from "./RiderNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="CustomerTabs" component={CustomerNavigator} />
      <Stack.Screen name="RiderStack" component={RiderNavigator} />
    </Stack.Navigator>
  );
}
