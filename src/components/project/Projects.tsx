import {
  List,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Typography,
  Container,
  ListItemSecondaryAction,
  IconButton,
  ListItemButton,
  useTheme,
} from "@mui/material";

import biergit from "./../../common/img/biergit.png";
import uno from "./../../common/img/uno.png";
import go from "./../../common/img/go.png";
import muuvy from "./../../common/img/muuvy.png";
import portal from "./../../common/img/portal.png";
import drugstore from "./../../common/img/drugstore.png";
import network from "./../../common/img/network.png";
import smartContracts from "./../../common/img/smartContracts.png";
import thesis from "./../../common/img/thesis.png";
import { Computer, PictureAsPdf } from "@mui/icons-material";

function ListItemLink({ ...props }) {
  return <ListItemButton component="a" {...props} />;
}
export const Projects = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="sm"
      sx={{
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Courier New",
          textAlign: "center",
        }}
        variant="h4"
      >
        My Projects
      </Typography>
      <Card
        sx={{
          mt: theme.spacing(2),
          color: "black",
        }}
      >
        <CardContent>
          <List component="nav" style={{ maxHeight: "600px", overflow: "scroll" }}>
            <ListItemLink href="/">
              <ListItemIcon>
                <Computer />
              </ListItemIcon>
              <ListItemText primary="Website" secondary="React" />
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/bachelor-thesis"
              target="_blank"
            >
              <ListItemIcon>
                <img src={thesis} alt="Bachelor Thesis" />
              </ListItemIcon>
              <ListItemText
                primary="Quantitative Analysis of Graph Metrics (2023)"
                secondary="Network-Analysis / Data-Science / Paper"
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="s-c-file-open"
                  href="https://hostettler.io/static/media/thesis-hostettler.pdf"
                  target="_blank"
                >
                  <PictureAsPdf />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/eth-smart-contracts"
              target="_blank"
            >
              <ListItemIcon>
                <img src={smartContracts} alt="Smart-Contracts" />
              </ListItemIcon>
              <ListItemText
                primary="Smart-Contracts (2022)"
                secondary="Solidity / React / Paper"
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="s-c-file-open"
                  href="https://hostettler.io/static/media/smart-contracts.pdf"
                  target="_blank"
                >
                  <PictureAsPdf />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/portal-vr"
              target="_blank"
            >
              <ListItemIcon>
                <img src={portal} alt="Portal-VR" />
              </ListItemIcon>
              <ListItemText
                primary="Portal-VR (2021 - 2022)"
                secondary="C# / Unity"
              />
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/ffhs-na"
              target="_blank"
            >
              <ListItemIcon>
                <img src={network} alt="Network-Analysis" />
              </ListItemIcon>
              <ListItemText
                primary="Network-Analysis (2021 - 2022)"
                secondary="Python / Paper"
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="na-file-open"
                  href="https://hostettler.io/static/media/network-analysis.pdf"
                  target="_blank"
                >
                  <PictureAsPdf />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/drugstore"
              target="_blank"
            >
              <ListItemIcon>
                <img src={drugstore} alt="drugstore" />
              </ListItemIcon>
              <ListItemText
                primary="Drugstore (2021 - 2022)"
                secondary="Java Android App"
              />
            </ListItemLink>
            <ListItemLink href="https://go.hostettler.io" target="_blank">
              <ListItemIcon>
                <img src={go} alt="GO" />
              </ListItemIcon>
              <ListItemText
                primary="GO (2021)"
                secondary="NextJs / WebWorkers"
              />
            </ListItemLink>
            <ListItemLink href="https://github.com/biergit-ch" target="_blank">
              <ListItemIcon>
                <img src={biergit} alt="biergit" />
              </ListItemIcon>
              <ListItemText
                primary="BierGit (2019 - 2020)"
                secondary="Sprint Boot / React"
              />
            </ListItemLink>
            <ListItemLink
              href="https://github.com/booooza/swe2-uno"
              target="_blank"
            >
              <ListItemIcon>
                <img src={uno} alt="UNO" />
              </ListItemIcon>
              <ListItemText primary="UNO (2019)" secondary="JavaFx" />
            </ListItemLink>
            <ListItemLink href="https://github.com/muuvy" target="_blank">
              <ListItemIcon>
                <img src={muuvy} alt="muuvy" />
              </ListItemIcon>
              <ListItemText primary="Muuvy (2019)" secondary="Vaadin" />
            </ListItemLink>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};
