export const environment = {
  production: false,
    chatbotApiUrl: 'http://localhost:3500',
  authOConfiguration: {
    domain: 'dev-d3kvtws4.us.auth0.com',
    clientId: 'tfqZAMepc4Cev1BkIrK4plFVOxjZALII',
    authorizationParams: {
      redirect_uri: window.location.origin,
      // Request this audience at user authentication time
      audience: 'http://localhost:3000',
      // Request this scope at user authentication time
      // scope: 'read:current_user',
    },
    // Specify configuration for the interceptor
    httpInterceptor: {
      allowedList: [
        {
          // Match any request that starts 'https://dev-d3kvtws4.us.auth0.com/api/v2/' (note the asterisk)
          uri: 'http://localhost:3000/*',
          tokenOptions: {
            authorizationParams: {
              // The attached token should target this audience
              audience: 'http://localhost:3000',
              // The attached token should have these scopes
              // scope: 'read:current_user'
            },
          },
        },
      ],
    },
  },
};
