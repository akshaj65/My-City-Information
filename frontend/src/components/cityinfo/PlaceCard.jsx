import React, { Fragment } from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { CiHospital1 } from "react-icons/ci";
import { FaHotel, FaSchool, FaUniversity } from "react-icons/fa";
import { TbHomeHeart } from "react-icons/tb";
import { GrUserPolice } from "react-icons/gr";


const Tag = styled.span`
 color:white !important;
background-color: rgb(11, 36, 71);
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  white-space: nowrap;
`;



function PlaceCard({ place, activePlace, setActivePlace, placeType }) {
  const { _id, name, phone, website, address_lines, tags } = place

  const categoryImageMap = {
    Hospitals: <CiHospital1 />,
    Hotels: <FaHotel />,
    Colleges: <FaUniversity />,
    Schools: <FaSchool />,
    OldAgeHomes: <TbHomeHeart />,
    PoliceStations: <GrUserPolice />
  };

  // Get the image URL based on the category
  const ImageIcon = categoryImageMap[placeType];
  return (
    <div
      className={`placeCard${_id === activePlace ? ' active' : ''}`}
      key={_id}
      onClick={() => setActivePlace(activePlace === _id ? null : _id)}
    >

      {_id === activePlace ? (
        <div className="placeInfo">
          {/* <h2 className="placeName">{name}</h2> */}
          <div className='placeTags'>
            {tags[0] && <><span>Tags:</span>&nbsp;&nbsp;</>}
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {address_lines.length !== 0 && <p className="placeAddress"><span>Address:</span>&nbsp;&nbsp;{address_lines.join(", ")}</p>}
          {phone && <p className="placePhone"><span>Phone:</span>&nbsp;&nbsp;<strong>{phone}</strong></p>}
          {website && <p className="placeWebsite"><span>Website:</span>&nbsp;&nbsp;<strong>{website}</strong></p>}
          {!address_lines.length !== 0 && !phone && !website && <p className="placeNoContent">Data not available</p>}
        </div>
      ) : (
        <Fragment>
          <div className="placeImages " style={{ 'height': '109px' }} key={_id}>
            <IconContext.Provider value={{
              style: {
                width: '100%',
                height: '70%'
              }
            }}>
              {ImageIcon}
            </IconContext.Provider>
          </div>
          <div className="placeInfo">
            <div className="placeDetails">
              <h2 className="placeName">{name}</h2>

              {tags &&
                <div>
                  {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              }
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default PlaceCard;
