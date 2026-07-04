import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// Root stack
export type RootStackParamList = {
  RoleSelect: undefined;
  CustomerTabs: undefined;
  RiderStack: undefined;
};

// Customer bottom tabs
export type CustomerTabParamList = {
  Stores: undefined;
  MyOrders: undefined;
};

// Customer nested stacks (from Stores tab)
export type CustomerStoresStackParamList = {
  StoresList: undefined;
  Products: { storeId: string; storeName: string };
  Cart: { storeId: string; storeName: string };
};

// Rider stack
export type RiderStackParamList = {
  AvailableOrders: undefined;
  OrderDetail: { orderId: string };
  ActiveDelivery: { orderId: string };
};

// Screen props helpers
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type CustomerTabScreenProps<T extends keyof CustomerTabParamList> =
  BottomTabScreenProps<CustomerTabParamList, T>;

export type CustomerStoresStackScreenProps<
  T extends keyof CustomerStoresStackParamList,
> = NativeStackScreenProps<CustomerStoresStackParamList, T>;

export type RiderStackScreenProps<T extends keyof RiderStackParamList> =
  NativeStackScreenProps<RiderStackParamList, T>;
