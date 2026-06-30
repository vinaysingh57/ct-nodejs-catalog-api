# CT Node.js Catalog API

A production-ready REST API scaffold for commercetools product management built with Node.js 22, Express, TypeScript, the commercetools TypeScript SDK, dotenv, Winston, and Jest.

## Endpoints

- POST /api/products
- PUT /api/products/:productId
- DELETE /api/products/:productId
- GET /api/products
- GET /health

## Run locally

1. Copy .env.example to .env and fill in your commercetools credentials.
2. Install dependencies: npm install
3. Build: npm run build
4. Start: npm run dev

## Deploy to AWS Lambda

1. Install dependencies locally:
   - `npm install`
2. Build the TypeScript output:
   - `npm run build`
3. Add `src/lambda.ts` if not already present:
   ```ts
   import serverless from 'serverless-http';
   import app from './app';

   export const handler = serverless(app);
   ```
4. Package required files:
   - `dist/`
   - `package.json`
   - `package-lock.json`
   - `node_modules/`
5. Create a zip for AWS Lambda:
   - `zip -r function.zip dist package.json package-lock.json node_modules`
6. In the AWS Lambda console:
   - Create function → Node.js 20.x or 18.x
   - Set handler to `dist/lambda.handler`
   - Upload `function.zip`
   - Configure environment variables for `CTP_PROJECT_KEY`, `CTP_CLIENT_ID`, `CTP_CLIENT_SECRET`, `CTP_SCOPE`, `CTP_AUTH_URL`, `CTP_API_URL`, and optionally `NODE_ENV`.
7. Expose the function over HTTP:
   - Enable Lambda Function URL, or
   - Create an API Gateway HTTP API and connect the route to this Lambda.

### Test your deployed function

- Call `https://<function-url>/health`
- Call `https://<function-url>/api/products`

## Tests

- npm test
