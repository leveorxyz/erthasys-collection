import Slider from 'react-slick';

type PropTypes = {
  autoplay?: boolean;
  children: React.ReactNode;
  slideToShow: number;
};

const SlickSlider = ({ children, autoplay, slideToShow }: PropTypes) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: autoplay || false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slideToShow >= 3 ? 3 : slideToShow,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slideToShow >= 2 ? 2 : slideToShow,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};

SlickSlider.defaultProps = {
  slideToShow: 5,
};

export default SlickSlider;
