import React, { useState } from "react";
import styled from "styled-components";
import { CgDanger } from "react-icons/cg";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import { useEffect } from "react";
import Sticky from 'react-sticky-el';
import Tooltip from '@mui/material/Tooltip';


const SOSButton = styled.button`
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 119px;
  right: 2px;
  background-color: transparent;
  svg{
    color: red;
    font-size: 45px;
    box-shadow: 0px 0px 12px #d5d5d5;
    border-radius: 100%;
  }
  @media (max-width: 867px) {
    top: 463px;
    svg{
        font-size: 34px !important;
    }
   }
`;

const ListTitle = styled.h3`
    color:red;
    padding-bottom:7px;
`
const ScrollableList = styled.div`
  height:224px;
  overflow-y: scroll;
  border: 1px solid #ccc;

  a {
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #000;
    background-color: #fff;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: lightgrey;
  }
`;



function SOSPhoneNumbers() {
    const [showPhoneNumbers, setShowPhoneNumbers] = useState(false);


    const [tooltipOpen, setTooltipOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTooltipOpen(false);
        }, 5000); // Change this value to adjust the duration

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleClick = () => {
        setShowPhoneNumbers(true);
    };

    useEffect(() => {
        if (showPhoneNumbers) {
            const emergencyNumbers = [
                { name: "Police", number: "100" },
                { name: "Ambulance", number: "102" },
                { name: "Fire", number: "101" },
                { name: "Railway Enquiry", number: "139" },
                { name: "Tourist Helpline", number: "1363" },
                { name: "Road Accident", number: "1073" },
                { name: "Women Helpline ", number: "1091" },
                { name: "Blood Bank Information ", number: "1910" },
                { name: "Disaster Management", number: "101" },
                { name: "Medical Helpline", number: "101" },

            ];

            const scrollableListComponent = (
                <>
                    <ListTitle>Emergency Numbers</ListTitle>
                    <ScrollableList>
                        {emergencyNumbers.map((contact) => (
                            <a key={contact.number} href={`tel:${contact.number}`}>
                                {contact.name}: {contact.number}
                            </a>
                        ))}
                    </ScrollableList>
                </>
            );

            Swal.fire({
                html: ReactDOMServer.renderToString(scrollableListComponent),
                showCloseButton: true,
                showConfirmButton: false,
                focusConfirm: false,
            });
            setShowPhoneNumbers(false);

        }
    }, [showPhoneNumbers])

    return (
        <div>
            <Sticky top="10" left="10">
                <Tooltip
                    title="SOS"
                    open={tooltipOpen}
                    onClose={() => setTooltipOpen(false)}
                    onMouseMove={() => setTooltipOpen(true)}
                    arrow
                >
                    <SOSButton onClick={handleClick}>

                        <CgDanger style={{
                            color: "red",
                            transform: tooltipOpen ? "scale(1.1) translateZ(10px)" : "scale(1) translateZ(0)",
                            transition: "transform 0.3s ease",  
                        }} />

                    </SOSButton>
                </Tooltip>
            </Sticky>
        </div>
    );
}

export default SOSPhoneNumbers;
