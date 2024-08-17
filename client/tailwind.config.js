/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "profile-submit" : '0px 0px 8px 0px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'custom-32px': '32px 32px 0px 0px',
      },
      backgroundImage : {
        "heartOutline" : "url('/public/assets/reactionHeartOutline.svg')",

        "love-grid" : "url('/public/assets/loveGrid.svg')",
        "haha-grid" : "url('/public/assets/hahaGrid.svg')",
        "goodIdea-grid" : "url('/public/assets/goodIdeaGrid.svg')",
        "thanks-grid" : "url('/public/assets/thanksGrid.svg')",
        "wow-grid" : "url('/public/assets/wowGrid.svg')",

        "love-static" : "url('/public/assets/loveStatic.svg')",
        "haha-static" : "url('/public/assets/hahaStatic.svg')",
        "goodIdea-static" : "url('/public/assets/goodIdeaStatic.svg')",
        "thanks-static" : "url('/public/assets/thanksStatic.svg')",
        "wow-static" : "url('/public/assets/wowStatic.svg')",

        "love-animated" : "url('/public/assets/loveAnimated.svg')",
        "haha-animated" : "url('/public/assets/hahaAnimated.svg')",
        "goodIdea-animated" : "url('/public/assets/goodIdeaAnimated.svg')",
        "thanks-animated" : "url('/public/assets/thanksAnimated.svg')",
        "wow-animated" : "url('/public/assets/wowAnimated.svg')",
      },
      colors: {
        primary: {
          DEFAULT: "#e60023",
          text: "#cc0000",
          hover: "#b60000"
        }
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(2.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.4s ease-in-out',
      },
      gridTemplateRows : {
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
