import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  globPublicPatterns: ['**/*.{html,js,css,svg,png,jpg,jpeg,webp,woff,woff2,ttf,otf}'],
});

export default withSerwist({
  reactStrictMode: true,
});
