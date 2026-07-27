import { useEffect } from "react";
// 1. Import your newly created CSS file here
import "./style.css"; 

import Header from "./components/Header";
import Hero from "./components/Hero";
import StatStrip from "./components/StatStrip";
import Corridors from "./components/Corridors";
import Projects from "./components/Projects";
import PriceSnapshot from "./components/PriceSnapshot";
import Builders from "./components/Builders";
import Guides from "./components/Guides";
import Footer from "./components/Footer";

export default function CompassPune() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      

      {/* The style tag is gone, keeping your HTML structure clean */}
      <Header />
      <Hero />
      <StatStrip />
      <Corridors />
      <Projects />
      <PriceSnapshot />
      <Builders />
      <Guides />
      <Footer />
    </>
  );
}