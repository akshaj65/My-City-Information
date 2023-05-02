import React, { Fragment, useState } from 'react'
import AttractionCard from './AttractionCard';

const AttractionList = ({ attraction,activeAttraction,setActiveAttraction }) => {

    return (
        <Fragment>
            {attraction.map((place) => (
                <AttractionCard key={place._id} place={place} index={place.name} activePlace={activeAttraction} setActivePlace={setActiveAttraction} />
            ))}
        </Fragment>

    )
}

export default AttractionList;