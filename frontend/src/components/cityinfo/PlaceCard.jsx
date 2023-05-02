import React from 'react';

// const PlaceCard = ({ place}) => {
//     const { name, address, phone, website, tags } = place;

//     return (
//         <div className="card" key={place.name}>
//             <h2>{name}</h2>
//             <p>Address: {address}</p>
//             {phone && <p>Phone: {phone}</p>}
//             {website && <p>Website: {website}</p>}
//             {tags && <p>Tags: {tags.join(', ')}</p>}

//         </div>
//     );
// };


// export default PlaceCard;


import styled from 'styled-components';

const Card = styled.div`
display: flex;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;
flex-direction: column;
overflow: hidden;
margin: 22px auto;
width: 300px;
height:150px
`;

// const CardImage = styled.img`
//   width: 100%;
//   height: 180px;
//   object-fit: cover;
// `;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin: 0;
`;

const CardSubtitle = styled.h4`
  font-size: 18px;
  margin: 0;
  color: #666;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const CardAddress = styled.p`
  margin: 0;
  font-size: 14px;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #eee;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  white-space: nowrap;
`;

function PlaceCard({ place }) {
  const { _id,name, image, addressLines, tags } = place
  return (
    <Card key={_id}>
      {/* <CardImage src={image} alt={name} /> */}
      <CardContent>
        <div>
          <CardTitle>{name}</CardTitle>
        </div>
        <CardDetails>
          {addressLines && <CardAddress>{addressLines}</CardAddress>}
          {tags && <CardTags>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </CardTags>
          }
        </CardDetails>
      </CardContent>
    </Card>
  );
}

export default PlaceCard;
