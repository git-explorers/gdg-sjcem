import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Organizers from './components/Organizers';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  return (
    <div className="App">
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Events />
          <Organizers />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
