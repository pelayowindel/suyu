/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lexend-Black"],
        // Lexend
        "lexend-thin": ["Lexend-Thin"],
        "lexend": ["Lexend-Regular"],
        "lexend-medium": ["Lexend-Medium"],
        "lexend-semibold": ["Lexend-SemiBold"],
        "lexend-bold": ["Lexend-Bold"],
        "lexend-extrabold": ["Lexend-ExtraBold"],
        "lexend-black": ["Lexend-Black"],
        // Archivo Narrow
        "archivo": ["ArchivoNarrow-Regular"],
        "archivo-medium": ["ArchivoNarrow-Medium"],
        "archivo-semibold": ["ArchivoNarrow-SemiBold"],
        "archivo-bold": ["ArchivoNarrow-Bold"],
        "archivo-italic": ["ArchivoNarrow-Italic"],
        "archivo-semibold-italic": ["ArchivoNarrow-SemiBoldItalic"],
        "archivo-bold-italic": ["ArchivoNarrow-BoldItalic"],
      },
      colors: {
        ink: "#1C1B1B",
      },
      fontSize: {
        brand: ["28px", { lineHeight: "32px", letterSpacing: "-1.4px" }],
      },
    },
  },
  plugins: [],
};
