import { SwiperProps } from "swiper/react";

declare module "swiper/react" {
    export interface SwiperProps {
        navigation?: boolean,
        className: string,
        modules?: {},
        slidesPerView?: {},
        spaceBetween:? {},
        breakpoints?: {},
    }
}
