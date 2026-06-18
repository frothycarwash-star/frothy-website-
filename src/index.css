@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Montagu+Slab:opsz,wght@12..64,400;12..64,500;12..64,600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 45% 18%;
    --card: 0 0% 100%;
    --card-foreground: 222 45% 18%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 45% 18%;
    --primary: 222 45% 18%;
    --primary-foreground: 58 82% 71%;
    --secondary: 58 82% 71%;
    --secondary-foreground: 222 45% 18%;
    --muted: 75 18% 94%;
    --muted-foreground: 222 20% 40%;
    --accent: 195 96% 45%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 75 18% 90%;
    --input: 75 18% 90%;
    --ring: 195 96% 45%;
    --radius: 0.75rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-frothy-foam text-frothy-navy font-body antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-frothy-yellow to-frothy-blue;
  }

  .glass {
    @apply bg-white/80 backdrop-blur-xl border border-white/20;
  }

  .glass-dark {
    @apply bg-frothy-navy/80 backdrop-blur-xl border border-white/10;
  }

  .section-padding {
    @apply py-16 md:py-20 lg:py-24;
  }

  .container-padding {
    @apply px-4 sm:px-6 lg:px-8;
  }

  .noise-bg {
    position: relative;
  }

  .noise-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .noise-bg > * {
    position: relative;
    z-index: 1;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
