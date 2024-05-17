/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import HeroSection from "./Hero";
import HowItWorks from "./Work";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();
  if (!isAuthorized) {
    navigate("/login");
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;
