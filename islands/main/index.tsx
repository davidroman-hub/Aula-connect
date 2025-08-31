import P from "https://esm.sh/@editorjs/image@2.9.0";
import AllYouNeed from "./aulaConnect/AllYouNeed.tsx";
import HeroAula from "./aulaConnect/HeroAula.tsx";
import HowItWorks from "./aulaConnect/HowItWorks.tsx";
import JoinAsAProfessor from "./aulaConnect/JoinAsAProfessor.tsx";

import Ready from "./aulaConnect/Ready.tsx";
import Contact from "./aulaConnect/Contact.tsx";
import Footer from "./aulaConnect/Footer.tsx";
import { i18n } from "../../i18next.ts";
import PricingNew from "./aulaConnect/PricingNew.tsx";

export type MainComponentsProps = {
  t: (...args: any[]) => any;
};

const Main = () => {
  const { t } = i18n;
  return (
    <>
      <HeroAula t={t} />
      <AllYouNeed t={t} />
      <HowItWorks t={t} />
      <JoinAsAProfessor t={t} />
      <PricingNew t={t} />
      <Ready t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </>
  );
};
export default Main;
