const express = require('express');
const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate
router.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;

  // Проверка входных данных
  if (!num1 || !num2 || !operation) {
    return res.status(400).json({ error: 'Missing required parameters: num1, num2, and operation are required.' });
  }

  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);

  if (isNaN(number1) || isNaN(number2)) {
    return res.status(400).json({ error: 'Invalid numbers provided.' });
  }

  let result;
  if (operation === '+') {
    result = number1 + number2;
  } else if (operation === '-') {
    result = number1 - number2;
  } else if (operation === '*') {
    result = number1 * number2;
  } else if (operation === '/') {
    if (number2 === 0) {
      return res.status(400).json({ error: 'Division by zero is not allowed.' });
    }
    result = number1 / number2;
  } else {
    return res.status(400).json({ error: 'Invalid operation. Use +, -, *, or /.' });
  }

  // Форматирование результата для избежания проблем с точностью чисел с плавающей запятой
  const formattedResult = Number(result.toFixed(10));

  res.json({
    result: formattedResult,
    operation,
    numbers: { num1: number1, num2: number2 }
  });
});

module.exports = router;
