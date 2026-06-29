import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { env } from './env';

if (env.NODE_ENV !== 'production' && env.ALLOW_INSECURE_SSL) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: env.CTP_AUTH_URL,
    projectKey: env.CTP_PROJECT_KEY,
    credentials: {
        clientId: env.CTP_CLIENT_ID,
        clientSecret: env.CTP_CLIENT_SECRET
    },
    scopes: env.CTP_SCOPE.split(' ').filter(Boolean),
    fetch
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: env.CTP_API_URL,
    fetch
};

const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: env.CTP_PROJECT_KEY });
