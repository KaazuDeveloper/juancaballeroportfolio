import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Showcase } from "@/components/Showcase";

export default function Home() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Highlights />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
    </MotionProvider>
  );
}
