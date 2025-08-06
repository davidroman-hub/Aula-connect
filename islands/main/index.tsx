import Courses from "./courses.tsx";
import Footer from "./footer.tsx";
import Head from "./head.tsx";
import LearnWithMe from "./learnWithMe.tsx";
import Testimonials from "./testimonials.tsx";

const Main = () => {
  return (
    <>
      <Head />
      <Courses />
      <LearnWithMe />
      <Testimonials />
      <Footer />
    </>
  );
};
export default Main;
