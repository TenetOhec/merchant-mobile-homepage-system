module.exports = {
  apps: [
    {
      name: 'merchant-backend',
      cwd: '/srv/merchant-mobile-homepage-system',
      script: 'npm',
      args: 'run start --workspace backend',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: '4000'
      }
    }
  ]
};
