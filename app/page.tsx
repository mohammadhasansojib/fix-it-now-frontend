import { Hero } from "./_components/Hero";
import { FeaturedServices } from "./_components/FeaturedServices";
import { WhyChooseUs } from "./_components/WhyChooseUs";
import { CTA } from "./_components/CTA";



const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <CTA />
    </>
  );
};

export default HomePage;