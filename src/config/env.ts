import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, fallback = ''): string => process.env[key] ?? fallback;

export interface EnvConfig {
    PORT: number;
    NODE_ENV: string;
    ALLOW_INSECURE_SSL: boolean;
    CTP_PROJECT_KEY: string;
    CTP_CLIENT_ID: string;
    CTP_CLIENT_SECRET: string;
    CTP_SCOPE: string;
    CTP_AUTH_URL: string;
    CTP_API_URL: string;
}

export const env: EnvConfig = {
    PORT: Number(getEnv('PORT', '3000')),
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    ALLOW_INSECURE_SSL: getEnv('ALLOW_INSECURE_SSL', 'false').toLowerCase() === 'true',
    CTP_PROJECT_KEY: getEnv('CTP_PROJECT_KEY'),
    CTP_CLIENT_ID: getEnv('CTP_CLIENT_ID'),
    CTP_CLIENT_SECRET: getEnv('CTP_CLIENT_SECRET'),
    CTP_SCOPE: getEnv('CTP_SCOPE', ''),
    CTP_AUTH_URL: getEnv('CTP_AUTH_URL', 'https://auth.europe-west1.gcp.commercetools.com'),
    CTP_API_URL: getEnv('CTP_API_URL', 'https://api.europe-west1.gcp.commercetools.com')
};
