/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb'
        },
        secondary: {
          DEFAULT: '#6b7280'
        },
        success: {
          DEFAULT: '#16a34a'
        },
        danger: {
          DEFAULT: '#dc2626'
        }
      }
    }
  },
  plugins: []
}


