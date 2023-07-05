import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import styled from './Slideshow.module.css'

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <button aria-label="Próximo" className={className} onClick={onClick}><FiChevronRight /></button>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button aria-label="Anterior" className={className} onClick={onClick}><FiChevronLeft /></button>
  );
}

export function Slideshow(props){
  const [currentSlide, setCurrentSlide] =useState(0);
  const [pause, setPause] = useState(false);
  const timer = useRef();
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1, 
    spacing: 24, 
    loop: true,
    duration: 500,
    breakpoints: {
      "(min-width: 992px)": {
        slidesPerView: 2,
      },
    },

    dragStart: () => {
      setPause(true);
    },

    dragEnd: () => {
      setPause(false);
    },

    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    }
  })

  useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true);
    });
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false);
    });
  }, [sliderRef]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 5000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  return(
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {props.slides.map((slide, index) =>
          <div key={index} className="keen-slider__slide">
            <Image
              src={slide.image} 
              alt={slide.alt} 
              width={800}
              height={400}
              quality={100}
              className="rounded"
            />
          </div>)
        }
        {props.slides.length === 2 && props.slides.map((slide, index) =>
          <div key={index} className="keen-slider__slide">
            <Image
              src={slide.image} 
              alt={slide.alt} 
              width={800}
              height={400}
              quality={100}
              className="rounded"
            />
          </div>)
        }
      </div>

      {slider && (
        <>
          <PrevArrow className={styled.arrow}
            onClick={e => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />

          <NextArrow className={styled.arrow}
            onClick={e => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}

    </div>
  )
}

export default Slideshow