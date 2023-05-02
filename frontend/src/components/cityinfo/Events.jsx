import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';
const Card = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const Text = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
`;

const Link = styled.a`
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;  
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.div`
  margin-bottom: 16px;
`;

const EventBritePlaceId ={
    "bengaluru":'102030819',
    "chennai":'102029537',
    "hyderabad":'102030059',
    "kochi":"102030497",
    "mumbai":"102030609"
}

function Events({place}) {
    const [destination, setDestination] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                'https://www.eventbriteapi.com/v3/destination/search/?token=WPJZVYWKTCD4THITHPHO', {

                "expand.destination_event": [
                    "primary_venue",
                    "image",
                    "ticket_availability",
                    "saves",
                    "event_sales_status",
                    "primary_organizer",
                    "public_collections"
                ],
                "event_search": {
                    "dates": [
                        "current_future",
                        "this_weekend"
                    ],
                    "page_size": 30,
                    "image": true,
                    "places": [
                        EventBritePlaceId[place.toLowerCase()]
                    ]
                }
            },
                //{
                // headers: {
                //     'OAuth token': 'WPJZVYWKTCD4THITHPHO',
                // },
                // },


            );
            setResults(response.data.events.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const formatDateAndTime = (dateString, timeString) => {
        const date = new Date(dateString);
        const time = new Date(`1970-01-01T${timeString}`);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        return `${formattedDate} ${formattedTime}`;
    };

    // const handleCardClick = (eventId) => {
    //     console.log(eventId);
    //     setContentVisible((prevContentVisible) => {
    //       const updatedContentVisible = Object.keys(prevContentVisible).reduce(
    //         (acc, id) => {
    //           acc[id] = id === eventId ? !prevContentVisible[id] : false;
    //           return acc;
    //         },
    //         {}
    //       );
    //       return updatedContentVisible;
    //     });
    //   };

    return (
        <Card>
            <Input
                type="text"
                placeholder="Enter a destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            <List>
                {results &&
                    results.map((event) => (
                        <ListItem className={event.id === activeCard ? ' active' : ''} key={event.id} onClick={()=>setActiveCard(event.id === activeCard ? null : event.id)}>   
                            {event.id !== activeCard ?(
                                <>
                                    <Image src={event.image.url} alt="" />
                                    <Title>{event.name}</Title>
                                </>
                            ): (
                                <>
                                    <Text>Summary: {event.summary}</Text>
                                    <Text>
                                        Start: {formatDateAndTime(event.start_date, event.start_time)}
                                    </Text>
                                    <Text>
                                        End: {formatDateAndTime(event.end_date, event.end_time)}
                                    </Text>
                                    <Link href={event.url} target="_blank">Buy Tickets</Link>
                                </>
                            )}

                        </ListItem>
                    ))}
            </List>
        </Card>
    );
}

export default Events;
