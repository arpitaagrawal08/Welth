/** @type {import('next').NextConfig} */
const nextConfig = {
images:{
    remotePatterns:[
        {
            protocol:"https",
            hostname:'randomuser.me',
        },
    ],
},
experimental:{
    serverActions:{
        bodySizeLimit:"5mb",
    },
},
  webpack: (config, { isServer }) => {
    config.externals.push(({ context, request }, callback) => {
      // Skip system folder that causes EPERM
      if (request && request.includes('Cookies')) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    });
    return config;
  },
};
export default nextConfig;
