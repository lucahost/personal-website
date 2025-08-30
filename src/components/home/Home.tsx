import { Computer, GitHub, LinkedIn } from '@mui/icons-material'
import {
  Box,
  colors,
  Container,
  Grid,
  Input,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React, { useCallback, useEffect, useReducer } from 'react'
import { CodeTypography } from '../../common/CodeTypography'
import luca from './../../common/img/luca.png'
import twitterX from './../../common/img/twitterX.png'

interface State {
  inputValue: string
  isFocused: boolean
  showHint: boolean
}

type Action
  = | { type: 'SET_INPUT_VALUE', payload: string }
    | { type: 'SET_FOCUSED', payload: boolean }
    | { type: 'HIDE_HINT' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.payload }
    case 'SET_FOCUSED':
      return { ...state, isFocused: action.payload }
    case 'HIDE_HINT':
      return { ...state, showHint: false }
    default:
      return state
  }
}

export const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [state, dispatch] = useReducer(reducer, {
    inputValue: '',
    isFocused: false,
    showHint: true,
  })

  const hideHint = useCallback(() => {
    dispatch({ type: 'HIDE_HINT' })
  }, [])

  useEffect(() => {
    const shouldHideHint = state.isFocused || state.inputValue
    if (shouldHideHint) {
      hideHint()
    }
  }, [state.isFocused, state.inputValue, hideHint])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch({ type: 'SET_INPUT_VALUE', payload: value })
  }

  const inputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
      dispatch({ type: 'SET_INPUT_VALUE', payload: '' })
    }
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        fontSize: { xs: '1rem', sm: 'calc(10px + 2vmin)' },
        color: colors.grey[200],
        textAlign: 'center',
        fontFamily: 'Courier New',
        px: { xs: 2, sm: 0 },
      }}
    >
      <Grid size={12}>
        <img
          src={luca}
          style={{
            height: 'clamp(60px, 10vmin, 120px)',
            pointerEvents: 'none',
            maxWidth: '100%',
          }}
          alt="logo"
        />
      </Grid>
      <Grid size={12}>
        <CodeTypography>
          Hi
          {' '}
          <span role="img" aria-label="wave">
            👋
          </span>
          {' '}
          I&apos;m
          {' '}
          <b>Luca Hostettler</b>
        </CodeTypography>
      </Grid>
      <Grid size={12}>
        <CodeTypography>
          Coding is my passion
          {' '}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </CodeTypography>
      </Grid>
      <Grid
        size={12}
        sx={{
          textAlign: 'left',
        }}
      >
        <Container maxWidth="xs" sx={{ px: { xs: 1, sm: 3 } }}>
          <List dense={true} sx={{ py: { xs: 1, sm: 2 } }}>
            <ListItem>
              <ListItemIcon>
                <Computer sx={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText>
                <Link href="/projects">
                  <CodeTypography>Projects</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GitHub sx={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText>
                <Link
                  href="https://github.com/lucahost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeTypography>GitHub</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LinkedIn sx={{ color: '#0077B5', minWidth: '0px' }} />
              </ListItemIcon>
              <ListItemText>
                <Link
                  href="https://www.linkedin.com/in/lucahostettler/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeTypography>LinkedIn</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img
                  src={twitterX}
                  alt="X"
                  style={{
                    width: '20px',
                    height: '20px',
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <Link
                  href="https://x.com/luca_host"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeTypography>X</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Container>
      </Grid>
      <Grid size={12} sx={{ position: 'relative', minHeight: { xs: '60px', sm: '80px' } }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            'position': 'absolute',
            'bottom': 0,
            'left': '50%',
            'transform': 'translateX(-50%)',
            'cursor': 'text',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
            },
            'borderRadius': 1,
            'p': 0.5,
            'minHeight': { xs: '32px', sm: '40px' },
            'width': 'fit-content',
            'minWidth': { xs: '200px', sm: '250px' },
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const input = e.currentTarget.querySelector('input')
            if (input)
              input.focus()
          }}
        >
          <CodeTypography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: { xs: '0.8rem', sm: 'calc(8px + 1.5vmin)' },
            }}
          >
            <span style={{ opacity: 0.7 }}>~# </span>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: { xs: '250px', sm: '350px', md: '400px' }, position: 'relative' }}>
              <Input
                type="text"
                value={state.inputValue}
                onChange={handleInputChange}
                onKeyDown={event => inputKeyDown(event)}
                onFocus={() => dispatch({ type: 'SET_FOCUSED', payload: true })}
                onBlur={() => dispatch({ type: 'SET_FOCUSED', payload: false })}
                disableUnderline
                placeholder={!state.isFocused && !state.inputValue ? 'type something and press enter' : ''}
                sx={{
                  'fontSize': 'inherit',
                  'fontFamily': 'Courier New',
                  'color': 'inherit',
                  'width': '100%',
                  '& input': {
                    'padding': 0,
                    'fontSize': 'inherit',
                    'fontFamily': 'inherit',
                    'color': 'inherit',
                    'backgroundColor': 'transparent',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.3)',
                      opacity: 1,
                      fontStyle: 'italic',
                    },
                  },
                }}
              />
              {state.showHint && (
                <Box
                  sx={{
                    'position': 'absolute',
                    'right': { xs: -30, sm: -40 },
                    'top': '50%',
                    'transform': 'translateY(-50%)',
                    'opacity': 0.3,
                    'animation': 'fadeInOut 3s infinite',
                    'fontSize': { xs: '0.7em', sm: '0.8em' },
                    '@keyframes fadeInOut': {
                      '0%': { opacity: 0 },
                      '50%': { opacity: 0.4 },
                      '100%': { opacity: 0 },
                    },
                  }}
                >
                  <span style={{ fontSize: '12px' }}>←</span>
                </Box>
              )}
            </Box>
          </CodeTypography>
        </Grid>
      </Grid>
    </Grid>
  )
}
