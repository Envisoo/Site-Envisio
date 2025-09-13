/** @format */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                regular: ["Segoe UI Regular", "sans-serif"],
                semibold: ["Segoe UI Semibold", "sans-serif"],
            },
            colors: {
                primary: {
                    DEFAULT: "#DC2626",
                    dark: "#B91C1C",
                },
            },
        },
    },
    plugins: [],
};