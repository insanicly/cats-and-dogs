import { Stack } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";

export interface ImagesListProps {
  images: string[];
  imageWidth: number;
  imageHeight: number;
  gapInPixels: number;
  windowWidth: number;
  intervalTime: number;
  speedInPixel: number;
}

export const ImagesList: FC<ImagesListProps> = ({
  images,
  imageWidth,
  imageHeight,
  gapInPixels: gap,
  windowWidth,
  intervalTime,
  speedInPixel,
}) => {
  const [tick, setTick] = useState(0);
  const [localImages, setLocalImages] = useState<
    {
      imageSrc: string;
      imageLeftPosition: number;
    }[]
  >(() => {
    return images.map((image, index) => ({
      imageSrc: image,
      imageLeftPosition:
        index * (imageWidth + gap) - tick * 2 + windowWidth * -1.5,
    }));
  });
  const intervalRef = useRef<NodeJS.Timer>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTick((prev) => prev + 1);
        setLocalImages((prev) => {
          return prev.map(({ imageSrc, imageLeftPosition }) => ({
            imageSrc,
            imageLeftPosition: imageLeftPosition - speedInPixel,
          }));
        });
      }, intervalTime);
    }
  }, [intervalTime, speedInPixel]);

  useEffect(() => {
    setLocalImages((prev) => {
      const [first, second, ...rest] = prev;
      if (first.imageLeftPosition < imageWidth * -1 - gap) {
        return [
          second,
          ...rest,
          {
            ...first,
            imageLeftPosition:
              second.imageLeftPosition +
              gap +
              (prev.length - 1) * (imageWidth + gap),
          },
        ];
      } else {
        return prev;
      }
    });
  }, [gap, imageWidth, tick, windowWidth]);

  return (
    <Stack
      width={windowWidth}
      height={imageHeight}
      overflow={"hidden"}
      borderRadius={"16px"}
      ref={containerRef}
    >
      <Stack direction={"row"} gap={`${gap}px`} position="relative">
        {localImages.map(({ imageSrc, imageLeftPosition }, index) => (
          <img
            src={imageSrc}
            alt=""
            width={imageWidth}
            height={imageHeight}
            style={{
              position: "absolute",
              left: `${imageLeftPosition}px`,
              transition: "left 1s linear",
              borderRadius: "8px",
            }}
            key={imageSrc}
          />
        ))}
      </Stack>
    </Stack>
  );
};
