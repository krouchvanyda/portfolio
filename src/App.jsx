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
  );
}

export default App;
