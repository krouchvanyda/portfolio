import { MotionConfig } from 'framer-motion';
import MuiProvider from './theme/MuiProvider';
import Cursor from './components/Cursor';
import ScrollTop from './components/ScrollTop';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <MuiProvider>
      <MotionConfig reducedMotion="user">
        <div className="relative overflow-hidden">
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <ScrollTop />
          <ChatBot />
        </div>
      </MotionConfig>
    </MuiProvider>
  );
}

export default App;
