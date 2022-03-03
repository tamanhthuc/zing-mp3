/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['https://static-zmp3.zadn.vn/zmp3_rpt/images/logo-mp3.svg'],
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
}
