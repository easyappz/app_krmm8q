const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');

// Для работы с express
const app = express();

// Middleware для обработки JSON-запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение маршрутов API
app.use('/api', apiRoutes);

// Обработка корневого пути для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Server is running. Use /api endpoints for calculator operations.');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
