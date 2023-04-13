import React from "react";
import Akshaj from '../Images/akshaj.jpg';
import Teja from '../Images/teja.jpeg';
import Aishwarya from '../Images/aishwarya.jpg';
import Jyoti from '../Images/jyoti.jpg';
import Akshay from '../Images/akshay.jpg';
import '../styles/about.css'
const TeamMember = ({ name, post, imageSrc, instagramLink, linkedinLink }) => {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="our-team">
        <div className="about-pic">
          <img src={imageSrc} alt={name} />
        </div>
        <h3 className="about-title">{name}</h3>
        <span className="about-post" style={{ whiteSpace: "pre-line" }}>{post}</span>
        <ul className="about-social">
          <li><a href={instagramLink} className="fa fa-instagram"></a></li>
          <li><a href={linkedinLink} className="fa fa-linkedin"></a></li>
        </ul>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div>
      <div className="about-container">
        <div className="about-row">
          <TeamMember
            name="A JYOTHI"
            post={"20191ECE0002\nPRESIDENCY UNIVERSITY"}
            imageSrc={Jyoti}
            instagramLink="https://instagram.com/jyothi___28?igshid=YmMyMTA2M2Y="
            linkedinLink="https://www.linkedin.com/in/jyothi-adaveni-46a16b247"
          />
          <TeamMember
            name="AKSHAY J SHARMA"
            post={"20191CSE0730\nPRESIDENCY UNIVERSITY"}
            imageSrc={Akshay}
            instagramLink="https://instagram.com/akshay_rockstar777?igshid=ZDdkNTZiNTM="
            linkedinLink="https://www.linkedin.com/in/akshay-sharma-580087233"
          />
          <TeamMember
            name="AISHWARYA RAIKAR"
            post={"20191CSE0013\nPRESIDENCY UNIVERSITY"}
            imageSrc={Aishwarya}
            instagramLink="https://instagram.com/ash_raikar?igshid=YmMyMTA2M2Y="
            linkedinLink="https://www.linkedin.com/in/aishwarya-raikar-277965230"
          />
          <TeamMember
            name="A TEJA KIRAN"
            post={"20191CSE0002\nPRESIDENCY UNIVERSITY"}
            imageSrc={Teja}
            instagramLink="https://instagram.com/itsmetejakiran?igshid=YmMyMTA2M2Y="
            linkedinLink="https://www.linkedin.com/in/tejakiran-a-0538151b7"
          />
          <TeamMember
            name="Akshaj G"
            post={"20191CSE0019\nPRESIDENCY UNIVERSITY"}
            imageSrc={Akshaj}
            instagramLink="https://instagram.com/akshaj_0.o?igshid=YmMyMTA2M2Y="
            linkedinLink="https://www.linkedin.com/in/akshaj-g"
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
