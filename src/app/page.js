import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Rooms from "../components/Rooms";
import Facilities from "../components/Facilities";
import WhyChooseUs from "../components/WhyChooseUs";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import FloatingActions from "../components/FloatingActions";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Rooms />
        <Facilities />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
