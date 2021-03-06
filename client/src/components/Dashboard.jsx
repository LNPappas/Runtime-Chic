import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import gryffindor from "../images/gryffindor.png";
import slytherin from "../images/slytherin.png";
import ravenclaw from "../images/ravenclaw.png";
import hufflepuff from "../images/hufflepuff.png";
import FileUpload from "./FileUpload";
import Nav from "./Nav";
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [houseImg, sethouseImg] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const [members, setMembers] = useState([]);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3003/dashboard", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.first_name);
      sethouseImg(parseData.house_name);
      setProfileImg(parseData.profile);
      console.log("FRIENDS");
      console.log(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };
  // const getHouseMembers = async () => {
  //   try {
  //     const url = `http://localhost:3003/dashboard`;
  //     const res = await fetch(url);

  //     const parseData = await res.json();
  //     setMembers(parseData);
  //     console.log("friends");
  //     console.log(members);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div id="dashMainDiv">
      <Nav profileImg={profileImg} />
      <div id="welcomeBanner">
        <h1>Welcome {name.toUpperCase()}</h1>
        <img id="userImg" src={profileImg} alt="" />
      </div>
      <div id="">
        <h1>
          <span id="houseSpan1">hmmmmmm.....</span>{" "}
          <span id="houseSpan2">{houseImg}!!!!</span>
        </h1>
      </div>
      <div id="houseImgDiv">
        {(() => {
          switch (houseImg) {
            case "Gryffindor":
              return <img className="houseImage" src={gryffindor} alt="" />;
            case "Slytherin":
              return <img className="houseImage" src={slytherin} alt="" />;
            case "Ravenclaw":
              return <img className="houseImage" src={ravenclaw} alt="" />;
            case "Hufflepuff":
              return <img className="houseImage" src={hufflepuff} alt="" />;
          }
        })()}
      </div>

      <button onClick={(e) => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
