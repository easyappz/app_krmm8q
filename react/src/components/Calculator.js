import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

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
  };

  const calculateResult = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '*') {
      result = previousValue * currentValue;
    } else if (operation === '/') {
      if (currentValue === 0) {
        setDisplay('Error');
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
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
        <Grid container spacing={1.5} justifyContent="center">
          {buttons.map((btn) => (
            <Grid item key={btn} xs={3}>
              <Button
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={['+', '-', '*', '/'].includes(btn) ? 'secondary' : 'primary'}
                fullWidth
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
