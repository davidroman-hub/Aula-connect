import P from "https://esm.sh/@editorjs/image@2.9.0";
import AllYouNeed from "./aulaConnect/AllYouNeed.tsx";
import HeroAula from "./aulaConnect/HeroAula.tsx";
import HowItWorks from "./aulaConnect/HowItWorks.tsx";
import JoinAsAProfessor from "./aulaConnect/JoinAsAProfessor.tsx";

import Pricing from "./aulaConnect/Pricing.tsx";
import Ready from "./aulaConnect/Ready.tsx";
import Contact from "./aulaConnect/Contact.tsx";
import Footer from "./aulaConnect/Footer.tsx";

const Main = () => {
  return (
    <>
      <HeroAula />
      <AllYouNeed />
      <HowItWorks />
      <JoinAsAProfessor />
      <Pricing />
      <Ready />
      <Contact />
      <Footer />
    </>
  );
};
export default Main;
