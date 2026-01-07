/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#8B5CF6',
                'primary-light': '#A78BFA',
                'primary-dark': '#7C3AED',
                secondary: '#06B6D4',
                'secondary-light': '#22D3EE',
                accent: '#F59E0B',
                'accent-light': '#FBBF24',
                success: '#10B981',
                danger: '#EF4444',
                dark: {
                    DEFAULT: '#0F0F1A',
                    50: '#1A1A2E',
                    100: '#16213E',
                    200: '#1F2937',
                    300: '#374151',
                    400: '#4B5563',
                    500: '#6B7280',
                },
                light: {
                    DEFAULT: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                },
            },
            fontFamily: {
                arabic: ['Cairo', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shimmer': 'shimmer 2s linear infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
                    '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'mesh-gradient': 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #16213E 100%)',
            },
            boxShadow: {
                'glow-primary': '0 0 20px rgba(139, 92, 246, 0.4)',
                'glow-secondary': '0 0 20px rgba(6, 182, 212, 0.4)',
                'glow-accent': '0 0 20px rgba(245, 158, 11, 0.4)',
                'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.1)',
            },
        },
    },
    plugins: [],
}
