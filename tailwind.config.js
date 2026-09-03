/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — design_handoff_voice_landing/README.md
        cream: '#FAF8F4',
        navy: '#0D1F3C',
        brand: {
          cyan: '#00C2E0',          // primary (on light)
          'cyan-bright': '#00E5FF', // on dark
          'cyan-text': '#00A8C6',   // text accent
          blue: '#248BD3',          // gradient partner
          muted: '#4B5C70',         // body-muted
          'muted-dark': '#8FA6C4',  // muted on dark
          'faint-dark': '#5F7690',  // faint on dark
          success: '#2BE080',
          danger: '#E5484D',
          'caption-agent': '#BDEFFB',
          'caption-user': '#DCE6F2',
        },
      },
      fontFamily: {
        sans: ['Rubik', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hard: '4px 4px 0 #0D1F3C',
        'hard-cyan': '6px 6px 0 #00C2E0',
        'hard-white': '4px 4px 0 #fff',
        fab: '0 12px 36px rgba(13,31,60,.35)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.35' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(0,194,224,.5)' },
          '100%': { boxShadow: '0 0 0 22px rgba(0,194,224,0)' },
        },
      },
      animation: {
        wave: 'wave 1s infinite',
        'pulse-dot': 'pulseDot 1.4s infinite',
        'pulse-ring': 'pulseRing 2s infinite',
        'pulse-ring-slow': 'pulseRing 2.4s infinite',
        'spin-fast': 'spin .9s linear infinite',
      },
    },
  },
  plugins: [],
};
