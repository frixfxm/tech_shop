# Tech Shop — Backend API

REST API на Express + PostgreSQL. Отдаёт только каталог товаров (список и карточка). Корзина и избранное остаются на фронтенде в Redux.

## Эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/health` | Проверка API и подключения к БД |
| GET | `/api/products` | Список товаров (фильтры как у MockAPI) |
| GET | `/api/products/:id` | Один товар |

### Query-параметры списка

- `page` — номер страницы (по умолчанию 1)
- `limit` — размер страницы (по умолчанию 4)
- `category` — id категории (1–5), без параметра — все категории
- `sortBy` — `price`, `rating`, `title`
- `order` — `asc` или `desc`
- `search` — поиск по названию

Пример:

```
GET http://localhost:3001/api/products?page=1&limit=4&category=1&sortBy=price&order=desc&search=iphone
```

---

## Заполнение БД товарами

Товары лежат в `seed/products.json` (те же данные, что в `frontend/mocks-fixed.json`).

### Вариант A — Docker (рекомендуется)

1. Поднять контейнеры:

```bash
docker compose up -d --build
```

2. Загрузить товары в PostgreSQL:

```bash
docker compose exec api npm run seed
```

Скрипт создаёт таблицу (если её нет), очищает `products` и вставляет 17 товаров.

### Вариант B — локально без Docker API

1. Запустить только PostgreSQL:

```bash
docker compose up -d db
```

2. В папке `backend`:

```bash
cp .env.example .env
npm install
npm run seed
npm run dev
```

---

## Переменные окружения

Скопируйте `.env.example` в `.env`:

| Переменная | Описание |
|------------|----------|
| `PORT` | Порт API (3001) |
| `DATABASE_URL` | Строка подключения PostgreSQL |
| `CORS_ORIGIN` | URL фронтенда для CORS |

---

## Локальная разработка

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Проверка: http://localhost:3001/api/health
