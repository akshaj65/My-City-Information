import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/multiCarousel.css";
// import Card from "./Card";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1080, min: 600 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


const MultiCarousel = (props) => {
    return <div className="carouselFlexContainer">
      <div className="carouselHeader"> {props.text} </div>
      <Carousel responsive={responsive}  className=  "carousel-style">
          {props.cards}
      </Carousel>
    </div>
}

export default MultiCarousel;
