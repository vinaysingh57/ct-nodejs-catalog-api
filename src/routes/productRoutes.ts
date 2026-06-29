import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validateProductCreate, validateProductSearch, validateProductUpdate } from '../middleware/validateRequest';

const router = Router();
const controller = new ProductController();

router.post('/', validateProductCreate, controller.createProduct);
router.get('/:productId', controller.getProductById);
router.put('/:productId', validateProductUpdate, controller.updateProduct);
router.delete('/:productId', controller.deleteProduct);
router.get('/', validateProductSearch, controller.searchProducts);

export default router;
