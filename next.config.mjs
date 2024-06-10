/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: '**.pinimg.com',
                port:''
            }
            
        ]
    }
};

export default nextConfig;
