import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type {
  CustomerTabParamList,
  CustomerStoresStackParamList,
} from "../types/navigation";

import StoresScreen from "../screens/customer/StoresScreen";
import ProductsScreen from "../screens/customer/ProductsScreen";
import CartScreen from "../screens/customer/CartScreen";
import OrdersScreen from "../screens/customer/OrdersScreen";

const StoresStack = createNativeStackNavigator<CustomerStoresStackParamList>();
const Tab = createBottomTabNavigator<CustomerTabParamList>();

function StoresStackNavigator() {
  return (
    <StoresStack.Navigator>
      <StoresStack.Screen
        name="StoresList"
        component={StoresScreen}
        options={{ title: "Stores" }}
      />
      <StoresStack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ route }) => ({ title: route.params.storeName })}
      />
      <StoresStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Checkout" }}
      />
    </StoresStack.Navigator>
  );
}

export default function CustomerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Stores"
        component={StoresStackNavigator}
        options={{ tabBarLabel: "Browse" }}
      />
      <Tab.Screen
        name="MyOrders"
        component={OrdersScreen}
        options={{ tabBarLabel: "My Orders", headerShown: true, title: "My Orders" }}
      />
    </Tab.Navigator>
  );
}
