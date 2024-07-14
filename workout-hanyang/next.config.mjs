import { join } from 'path';

export default {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.alias['@'] = join(__dirname, 'src');
    return config;
  },
};
