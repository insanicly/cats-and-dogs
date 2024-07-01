import { Stack } from "@mui/material";
import "./App.css";
import { ImagesList } from "./images-list";
import { kittens, puppies } from "./puppies-and-kitties";

function App() {
  return (
    <Stack
      width="100vw"
      height={"100vh"}
      alignItems={"center"}
      padding={"24px"}
      gap="16px"
    >
      <ImagesList
        images={puppies}
        imageWidth={140}
        imageHeight={100}
        gapInPixels={8}
        windowWidth={300}
        intervalTime={1000}
        speedInPixel={20}
      />
      <ImagesList
        images={kittens}
        imageWidth={80}
        imageHeight={60}
        gapInPixels={8}
        windowWidth={300}
        intervalTime={1000}
        speedInPixel={10}
      />
    </Stack>
  );
}

export default App;
