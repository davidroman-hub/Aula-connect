import P from "https://esm.sh/@editorjs/image@2.9.0";
import AllYouNeed from "./aulaConnect/AllYouNeed.tsx";
import HeroAula from "./aulaConnect/HeroAula.tsx";
import HowItWorks from "./aulaConnect/HowItWorks.tsx";
import JoinAsAProfessor from "./aulaConnect/JoinAsAProfessor.tsx";
import Courses from "./courses.tsx";
import Footer from "./footer.tsx";
import Head from "./head.tsx";
import LearnWithMe from "./learnWithMe.tsx";
import Testimonials from "./testimonials.tsx";
import Pricing from "./aulaConnect/Pricing.tsx";

const Main = () => {
  return (
    <>
      <HeroAula />
      <AllYouNeed />
      <HowItWorks />
      <JoinAsAProfessor />
      <Pricing />
      <Footer />
    </>
  );
};
export default Main;
