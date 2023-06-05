import React from 'react'
import Helmet from "react-helmet";

const MetaData = ({title}) => {
  return (
      <Helmet defaultTitle="CityScape">
          <title>{title}</title>
      </Helmet>
  )
}

export default MetaData