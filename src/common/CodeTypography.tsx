import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { colors } from "@mui/material";

export const CodeTypography = styled(Typography)<TypographyProps>(() => ({
  fontSize: "calc(10px + 2vmin)",
  color: colors.grey[200],
  textAlign: "center",
  fontFamily: "Courier New",
}));
