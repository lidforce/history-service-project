import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import { connectRabbitMQ } from './rabbitmq';

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;

connectRabbitMQ('action-queue', async (message) => {
  try {
    await prisma.action.create({
      data: {
        shopId: message.shopId,
        plu: message.plu,
        action: message.action,
        details: message.details,
        date: message.date,
      },
    });
    console.log('Действие сохранено');
  } catch (error) {
    console.error('Ошибка сохранения действия:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Сервер истории действий с товарами запущен по URL: http://localhost:${PORT}`);
});



app.get('/actions', async (req, res) => {
  const { shopId, plu, action, date_from, date_to, page = 1, pageSize = 10 } = req.query;

  const filters: any = {};
  if (shopId) filters.shopId = parseInt(shopId as string);
  if (plu) filters.plu = plu;
  if (action) filters.action = action;
  if (date_from || date_to) {
    filters.date = {};
    if (date_from) filters.date.gte = new Date(date_from as string);
    if (date_to) filters.date.lte = new Date(date_to as string);
  }

  try {
    const actions = await prisma.action.findMany({
      where: filters,
      skip: (parseInt(page as string) - 1) * parseInt(pageSize as string),
      take: parseInt(pageSize as string),
      orderBy: { date: 'desc' },
    });
    const totalCount = await prisma.action.count({ where: filters });

    res.json({
      actions,
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
      totalCount,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});