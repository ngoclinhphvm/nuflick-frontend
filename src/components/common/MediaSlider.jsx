import React from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./Container/Container.jsx";
import MediaItem from "./MediaItem";
import { Box } from "@mui/material";
import "swiper/swiper-bundle.css";

const MediaSlider = ({ mediaList, mediaType }) => {
  return (
    <Container style={{ maxWidth: "100%" }}>
      <Swiper
        spaceBetween={1}
        slidesPerView={5}
        slidesPerGroup={5}
        grabCursor={true}
        direction="horizontal"
        observer={true}
      >
        {mediaList.map((media) => (
          <SwiperSlide key={media.id}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default MediaSlider;
