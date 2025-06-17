              <Button
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={['+', '-', '*', '/'].includes(btn) ? 'secondary' : 'primary'}
                fullWidth
                disabled={loading && btn === '='}
                sx={{
                  height: { xs: 50, sm: 60 },
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  borderRadius: 2,
                  backgroundColor: btn === '=' ? '#4caf50' : 'transparent',
                  '&:hover': {
                    backgroundColor: btn === '=' ? '#388e3c' : '#f0f0f0',
                  },
                }}
                onClick={() => {