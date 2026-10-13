// Lets the app be served from a sub-path, for example /researchora on another
// site. Leave NEXT_PUBLIC_BASE_PATH unset to serve it from the root as usual.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
