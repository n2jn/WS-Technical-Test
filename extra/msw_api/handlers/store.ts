import { rest } from 'msw';

const TOTAL_STORES = 500;

const allStores = Array.from({ length: TOTAL_STORES }, (_, i) => ({
  id: i + 1,
  name: `Magasin ${i + 1}`,
  address: `${i + 1} rue de Paris`,
  latitude: 48.8566 + Math.random() * 0.1,
  longitude: 2.3522 + Math.random() * 0.1,
  hours: '9h - 19h',
  imageUrl: `https://picsum.photos/seed/${i + 1}/500/130`,
  openingHours: [
    { day: 'Monday', start: '09:00', end: '19:00' },
    { day: 'Tuesday', start: '09:00', end: '19:00' },
    { day: 'Wednesday', start: '09:00', end: '19:00' },
    { day: 'Thursday', start: '09:00', end: '19:00' },
    { day: 'Friday', start: '09:00', end: '19:00' },
    { day: 'Saturday', start: '10:00', end: '18:00' },
    { day: 'Sunday', start: '10:00', end: '17:00' },
  ],
}));

export const storeHandlers = [
    rest.get('https://api.example.com/stores', (req, res, ctx) => {
      const limit = parseInt(req.url.searchParams.get('limit') || '10', 10);
      const offset = parseInt(req.url.searchParams.get('offset') || '0', 10);
      const name = req.url.searchParams.get('name') || '';

      const startIndex = offset;
      const endIndex = startIndex + limit;

      const filteredStores = allStores.filter((s) => s.name.toLowerCase().includes(name.toLowerCase()));
      const filteredTotal = filteredStores.length;

      const paginatedStores = filteredStores.slice(startIndex, endIndex);

      return res(ctx.json({
        stores: paginatedStores,
        offset,
        total: filteredTotal
      }));
    }),

    rest.get('https://api.example.com/stores/:id', (req, res, ctx) => {
      const storeId = parseInt(req.params.id as string, 10);
      const store = allStores.find(s => s.id === storeId);

      if (!store) {
        return res(
          ctx.status(404),
          ctx.json({ error: 'Store not found' })
        );
      }

      return res(ctx.json(store));
    }),

    rest.post('https://api.example.com/stores', async (req, res, ctx) => {
      const body = await req.json();

      if (!body.name || !body.address) {
        return res(
          ctx.status(400),
          ctx.json({ error: 'Name and address are required' })
        );
      }

      const newStore = {
        id: allStores.length + 1,
        name: body.name,
        address: body.address,
        latitude: body.latitude || 48.8566,
        longitude: body.longitude || 2.3522,
        hours: body.hours || '9h - 19h',
        imageUrl: body.imageUrl || `https://picsum.photos/seed/${allStores.length + 1}/200/300`,
        openingHours: body.openingHours || [
          { day: 'Monday', start: '09:00', end: '19:00' },
          { day: 'Tuesday', start: '09:00', end: '19:00' },
          { day: 'Wednesday', start: '09:00', end: '19:00' },
          { day: 'Thursday', start: '09:00', end: '19:00' },
          { day: 'Friday', start: '09:00', end: '19:00' },
          { day: 'Saturday', start: '10:00', end: '18:00' },
          { day: 'Sunday', start: '10:00', end: '17:00' },
        ],
      };

      allStores.push(newStore);

      return res(
        ctx.status(201),
        ctx.json(newStore)
      );
    }),

    rest.put('https://api.example.com/stores/:id', async (req, res, ctx) => {
      const storeId = parseInt(req.params.id as string, 10);
      const body = await req.json();

      const storeIndex = allStores.findIndex(s => s.id === storeId);

      if (storeIndex === -1) {
        return res(
          ctx.status(404),
          ctx.json({ error: 'Store not found' })
        );
      }

      allStores[storeIndex] = {
        ...allStores[storeIndex],
        ...body,
        id: storeId,
      };

      return res(
        ctx.status(200),
        ctx.json(allStores[storeIndex])
      );
    }),
  ];