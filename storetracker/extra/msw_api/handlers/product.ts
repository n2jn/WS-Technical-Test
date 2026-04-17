import { rest } from 'msw';

const TOTAL_PRODUCTS = 10000;

const allProducts = Array.from({ length: TOTAL_PRODUCTS }, (_, i) => ({
  id: i + 1,
  name: `Produit ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/200/300`,
  price: Math.round(Math.random() * 200 * 100) / 100,
}));

export const productHandlers = [
    rest.get('https://api.example.com/products', (req, res, ctx) => {
      const limit = parseInt(req.url.searchParams.get('limit') || '10', 10);
      const offset = parseInt(req.url.searchParams.get('offset') || '0', 10);
      const name = req.url.searchParams.get('name') || '';

      const startIndex = offset;
      const endIndex = startIndex + limit;

      const filteredProduct = allProducts.filter((p) => p.name.includes(name))
      const filteredTotal = filteredProduct.length

      const paginatedProducts = filteredProduct.slice(startIndex, endIndex);

      return res(ctx.json({
        product: paginatedProducts,
        offset,
        total: filteredTotal
      }));
    }),

    rest.post('https://api.example.com/products', async (req, res, ctx) => {
      const body = await req.json();

      if (!body.name || !body.price) {
        return res(
          ctx.status(400),
          ctx.json({ error: 'Name and price are required' })
        );
      }

      const newProduct = {
        id: allProducts.length + 1,
        name: body.name,
        price: body.price,
        imageUrl: `https://picsum.photos/seed/${allProducts.length + 1}/200/300`,
      };

      allProducts.push(newProduct);

      return res(
        ctx.status(201),
        ctx.json(newProduct)
      );
    }),

    rest.put('https://api.example.com/products/:id', async (req, res, ctx) => {
      const productId = parseInt(req.params.id as string, 10);
      const body = await req.json();

      const productIndex = allProducts.findIndex(p => p.id === productId);

      if (productIndex === -1) {
        return res(
          ctx.status(404),
          ctx.json({ error: 'Product not found' })
        );
      }

      allProducts[productIndex] = {
        ...allProducts[productIndex],
        ...body,
        id: productId,
      };

      return res(
        ctx.status(200),
        ctx.json(allProducts[productIndex])
      );
    }),
  ];