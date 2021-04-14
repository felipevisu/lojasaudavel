import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useMemo, useState } from 'react'
import styled from './Media.module.css'


export function Media({media, selected}){
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  useEffect(() => {
    if(slider && selected && selected.media.length > 0){
      const image = selected.media[0]
      const index = media.findIndex(current => current.id === image.id)
      slider.moveToSlideRelative(index);
    }
  }, [selected])

  return(
    <div className="relative">
      <div ref={sliderRef} className="keen-slider rounded-lg bg-gray-100">
        {media.map((media) =>
          <div key={media.id} className="keen-slider__slide number-slide1">
            <img src={media.url} alt={media.alt} />
          </div>
        )}
      </div>
      
      {slider && media.length > 1 && (
        <>
          <ArrowLeft
            onClick={(e) => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <ArrowRight
            onClick={(e) => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}
    </div>
  )
}

function ArrowLeft(props) {
  return (
    <svg
      onClick={props.onClick}
      className={`${styled.arrow} ${styled.arrowLeft} ${props.disabled && styled.arrowDisabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  )
}

function ArrowRight(props) {
  return (
    <svg
      onClick={props.onClick}
      className={`${styled.arrow} ${styled.arrowRight} ${props.disabled && styled.arrowDisabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  )
}

export default Media