// Importações dos componentes
import { DesktopCarousel } from './carosselDesk';
import { MobileCarousel } from './carosselmob';

// Exportação das interfaces
export interface BaseCarouselProps {
    link: string;
    label: string;
}

export interface DesktopSlide extends BaseCarouselProps {
    src: string;
}

export interface MobileSlide extends BaseCarouselProps {
    srcMobile: string;
}

// Exportação dos componentes
export {
    DesktopCarousel,
    MobileCarousel
};

// Exportação padrão do objeto com ambos os componentes
export default {
    DesktopCarousel,
    MobileCarousel
};