# Marakas — Expo + NativeWind Setup Guide

A step-by-step guide to recreate this project from scratch.

---

## Prerequisites

- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **Expo Go** app on your phone (for mobile testing), or an Android/iOS emulator

---

## Step 1: Create the Expo Project

Run the following command to scaffold a new Expo app with the TypeScript blank template:

```bash
npx create-expo-app@latest marakas --template blank-typescript
cd marakas
```

---

## Step 2: Install NativeWind and Peer Dependencies

Install the runtime dependencies:

```bash
npm install nativewind react-native-reanimated react-native-safe-area-context
```

Install the dev dependencies:

```bash
npm install --save-dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo
```

---

## Step 3: Initialize Tailwind CSS

Generate the Tailwind config file:

```bash
npx tailwindcss init
```

This creates a `tailwind.config.js` file in the project root.

---

## Step 4: Configure `tailwind.config.js`

Replace the contents of `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Key points:**
- `content` tells Tailwind which files to scan for class names.
- `presets` includes the NativeWind preset, which adapts Tailwind for React Native.

---

## Step 5: Create `global.css`

Create a file called `global.css` in the project root with the Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Step 6: Create `babel.config.js`

Create `babel.config.js` in the project root:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

**Key points:**
- `jsxImportSource: "nativewind"` enables the `className` prop on React Native components.
- `"nativewind/babel"` is the NativeWind Babel preset for transforming styles.

---

## Step 7: Create `metro.config.js`

Create `metro.config.js` in the project root:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

**Key points:**
- `withNativeWind` wraps the Metro bundler config to process your CSS through Tailwind.
- `input` points to the CSS file containing your Tailwind directives.

---

## Step 8: Update `app.json`

Add the `"bundler": "metro"` setting under `web` in your `app.json`:

```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    }
  }
}
```

This ensures the web platform uses Metro as its bundler (required for NativeWind on web).

---

## Step 9: TypeScript Setup

Create a file called `nativewind-env.d.ts` in the project root:

```ts
/// <reference types="nativewind/types" />

declare module "*.css";
```

**Key points:**
- The triple-slash directive adds NativeWind's type extensions (e.g., `className` prop on `View`, `Text`, etc.).
- `declare module "*.css"` allows TypeScript to accept CSS file imports without errors.

> **Warning:** Do not name this file `nativewind.d.ts`, or the same name as any existing file/folder in the project (e.g., `app.d.ts` when an `/app` folder exists).

---

## Step 10: Update `App.tsx`

Import `global.css` at the top and use Tailwind classes via the `className` prop:

```tsx
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Marakas with NativeWind!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

---

## Step 11: Run the App

Start the development server:

```bash
npm start
```

Then choose a platform:

| Command             | Platform        |
|---------------------|-----------------|
| `npm run android`   | Android         |
| `npm run ios`       | iOS (macOS only)|
| `npm run web`       | Web browser     |

Or press `a`, `i`, or `w` in the terminal after `npm start`.

---

## Project Structure (Final)

```
marakas/
├── assets/
├── App.tsx                 # Entry point with NativeWind classes
├── app.json                # Expo config (metro bundler for web)
├── babel.config.js         # Babel presets for NativeWind
├── global.css              # Tailwind directives
├── metro.config.js         # Metro config with NativeWind wrapper
├── nativewind-env.d.ts     # TypeScript declarations
├── package.json
├── tailwind.config.js      # Tailwind config with NativeWind preset
└── tsconfig.json
```

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| `className` prop not recognized by TypeScript | Ensure `nativewind-env.d.ts` exists and contains the triple-slash directive |
| CSS import error in TypeScript | Add `declare module "*.css";` to `nativewind-env.d.ts` |
| Styles not applying | Clear Metro cache: `npx expo start --clear` |
| Web not working | Verify `"bundler": "metro"` is set in `app.json` under `expo.web` |
