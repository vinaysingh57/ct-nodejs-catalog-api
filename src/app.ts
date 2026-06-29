import express from 'express';
import productRoutes from './routes/productRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import logger from './config/logger';
import { env } from './config/env';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, message: 'Service healthy' });
});

app.use('/api/products', productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
    app.listen(env.PORT, () => {
        logger.info(`Catalog API listening on port ${env.PORT}`);
    });
}

export default app;
