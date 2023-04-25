import { Fragment, React } from 'react'

const AttractionCard = ({ place, index, activeCard, slideIndex, setActiveCard }) => {
    return (
        <div
            className={`placeCard${index === activeCard ? ' active' : ''}`}
            key={place.name}
            onClick={() => setActiveCard(index === activeCard ? null : index)}
        >
            {index === activeCard ? (
                <div className="placeInfo">
                    <h2 className="placeName">{place.name}</h2>
                    <p className="placeDescription">{place.description}</p>
                    <p className="placeAddress">{place.address}</p>
                </div>
            ) : (
                <Fragment>
                    <div className="placeImages">
                        {place.imageUrls.map((image, index) => (
                            <>
                                <img
                                    key={image}
                                    className={`placeImage${index === slideIndex ? ' active' : ''}`}
                                    src={image}
                                    alt={place.name}
                                />

                            </>
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