import { productHandlers } from './product';
import { storeHandlers } from './store';

export const handlers = [
  ...storeHandlers,
  ...productHandlers
];