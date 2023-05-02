import { useEffect, useState } from 'react';
import { Fragment, React } from 'react'

const AttractionCard = ({ place, activePlace, setActivePlace }) => {

    const [slideIndex, setSlideIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((slideIndex + 1) % place.imageUrls.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slideIndex, place]);

    return (
        <div
            className={`placeCard${place._id === activePlace ? ' active' : ''}`}
            key={place._id}
            onClick={()=>setActivePlace(activePlace === place._id ? null : place._id)}
        >
            {/* {console.log(activePlace)} */}

            {place._id === activePlace ? (
                <div className="placeInfo">
                    <h2 className="placeName">{place.name}</h2>
                    <p className="placeDescription"><span>Desc:</span>&nbsp;&nbsp;{place.description}</p>
                    <p className="placeAddress"><span>Address:</span>&nbsp;&nbsp;<strong>{place.address}</strong></p>
                </div>
            ) : (
                <Fragment>
                    <div className="placeImages" key={place._id}>
                        {place.imageUrls.map((image, index) => (

                            <img
                                key={image}
                                className={`placeImage${index === slideIndex ? ' active' : ''}`}
                                src={image}
                                alt={place.name}
                            />

                        ))}
                    </div>
                    <div className="placeInfo">
                        <div className="placeDetails">
                            <h2 className="placeName">{place.name}</h2>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default AttractionCard