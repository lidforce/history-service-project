# Сервис остатков товаров в магазине

## Установка
1. `git clone https://github.com/lidforce/history-service-project.git` 
2. Ввести `npm install`
3. Создать базу данных PostgreSQL и заменить значения переменных окружения в файле `.env`
4. Для миграции схемы базы данных: `npm run prisma:migrate`
5. Следовать установке [stock-service](https://github.com/lidforce/stock-service-project)
6. `npm run dev` или `npm start`


## API

### Получение списка действий с товарами
```bash
curl -X GET "http://localhost:4000/actions?shopId=1&plu=12345&action=stock_increase&date_from=2024-01-01&page=1&pageSize=5"
```
Описание параметров:
- `shopId` - id магазина
- `plu` - артикул товара
- `action` - тип действия (stock_increase, stock_decrease, create_product, create_stock)
- `date_from` - дата начала периода
- `date_to` - дата конца периода
- `page` - номер страницы
- `pageSize` - количество элементов на страницу

## Пример ответа:
```json
{
    "actions": [
        {
            "id": 122,
            "shopId": 284,
            "plu": "0112",
            "action": "stock_decrease",
            "details": {
                "amount": 13
            },
            "date": "2024-11-19T00:17:00.593Z"
        },
        {
            "id": 123,
            "shopId": 284,
            "plu": "0112",
            "action": "stock_increase",
            "details": {
                "amount": 28
            },
            "date": "2024-11-19T00:14:49.498Z"
        }
    ],
    "page": 1,
    "pageSize": 2,
    "totalCount": 350
}
```
