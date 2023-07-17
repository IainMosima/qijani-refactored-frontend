import { SwiperProps } from "swiper/react";

declare module "swiper/react" {
    export interface SwiperProps {
        navigation?: boolean,
        modules: {},
        slidesPerView: {},
        spaceBetween: {},
        
    }
}
