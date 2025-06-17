import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      // Prevent multiple decimal points
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
    if (waitingForSecondValue) {
      setWaitingForSecondValue(false);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
    setError('');
  };

  const calculateResult = async () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/calculate', {
        num1: previousValue,
        num2: currentValue,
        operation: operation
      });

      const result = response.data.result;
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setWaitingForSecondValue(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation error');
      setDisplay('Error');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForSecondValue(false);
    } finally {
      setLoading(false);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Paper elevation={6} sx={{
        width: { xs: '90%', sm: 400 },
        padding: 2,
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff, #e0e0e0)',
      }}>
        <TextField
          variant="outlined"
          value={display}
          disabled
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiInputBase-input': {
              textAlign: 'right',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              padding: '12px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
            },
          }}
        />
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 1 }}>
            {error}
          </Typography>
        )}
        <Grid container spacing={1.5} justifyContent="center">
          {buttons.map((btn) => (
            <Grid item key={btn} xs={3}>
              <Button
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={['+', '-', '*', '/'].includes(btn) ? 'secondary' : 'primary'}
                fullWidth
                disabled={loading && btn === '='}
                sx={{
                  height: { xs: 50, sm: 60 },
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  borderRadius: 2,
                  backgroundColor: btn === '=' ? '#1976d2' : 'transparent',
                  '&:hover': {
                    backgroundColor: btn === '=' ? '#1565c0' : '#f0f0f0',
                  },
                }}
                onClick={() => {
                  if (btn === 'C') handleClear();
                  else if (btn === '=') calculateResult();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                  else handleNumberClick(btn);
                }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" align="center" display="block" sx={{ marginTop: 1, color: '#757575' }}>
          Simple Calculator by Easyappz
        </Typography>
      </Paper>
    </Box>
  );
};

export default Calculator;
