import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AgricultureData from "./pages/AgricultureData";
import "./App.css"

export default function App() {
  return <MantineProvider theme={theme}>
    <AgricultureData/></MantineProvider>;
}
