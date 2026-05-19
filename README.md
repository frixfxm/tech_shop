# Tech Shop

Интернет-магазин техники: React (frontend) + Express + PostgreSQL (backend).

## Быстрый старт (Docker)

### 1. Запуск БД и API

Из корня репозитория:

```bash
docker compose up -d --build
```

### 2. Заполнение БД товарами

```bash
docker compose exec api npm run seed
```

Должно появиться: `Загружено товаров: 17`.

### 3. Проверка API

- Health: http://localhost:3001/api/health  
- Список: http://localhost:3001/api/products?page=1&limit=4  
- Товар: http://localhost:3001/api/products/6  

### 4. Запуск фронтенда

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Откройте http://localhost:3000 — товары подгружаются с `http://localhost:3001/api/products`.

---

## Структура проекта

```
tech_shop/
├── backend/          # Express API + seed
├── frontend/         # React приложение
└── docker-compose.yml
```

---

## Переменные окружения фронтенда

Файл `frontend/.env`:

```
REACT_APP_API_URL=http://localhost:3001/api
```

---

## Остановка Docker

```bash
docker compose down
```

Удалить данные БД (volume):

```bash
docker compose down -v
```

---

## Полный цикл без Docker (только API локально)

1. `docker compose up -d db` — только PostgreSQL  
2. `cd backend && npm install && cp .env.example .env && npm run seed && npm run dev`  
3. `cd frontend && npm install && cp .env.example .env && npm start`

Подробнее по API: [backend/README.md](backend/README.md)
