import type { TypographyProps } from '@mui/material/Typography'
import { colors } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export const CodeTypography = styled(Typography)<TypographyProps>(() => ({
  fontSize: 'calc(10px + 2vmin)',
  color: colors.grey[200],
  textAlign: 'center',
  fontFamily: 'Courier New',
}))
