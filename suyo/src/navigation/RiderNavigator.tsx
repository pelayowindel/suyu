import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RiderStackParamList } from "../types/navigation";

import AvailableOrdersScreen from "../screens/rider/AvailableOrdersScreen";
import OrderDetailScreen from "../screens/rider/OrderDetailScreen";
import ActiveDeliveryScreen from "../screens/rider/ActiveDeliveryScreen";

const Stack = createNativeStackNavigator<RiderStackParamList>();

export default function RiderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AvailableOrders"
        component={AvailableOrdersScreen}
        options={{ title: "Available Orders" }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: "Order Details" }}
      />
      <Stack.Screen
        name="ActiveDelivery"
        component={ActiveDeliveryScreen}
        options={{ title: "Active Delivery", headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
