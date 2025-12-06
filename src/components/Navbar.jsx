import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const MotionLink = motion(Link);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true);
      }
    };

    // Initial check
    if (location.pathname !== '/') {
      setScrolled(true);
    } else {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/gdg-logo.png" alt="GDG Logo" className="logo-img" />
        </motion.div>

        <motion.div
          className={`nav-links ${menuOpen ? 'active' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a variants={itemVariants} href="/#home" onClick={() => setMenuOpen(false)}>Home</motion.a>
          <motion.a variants={itemVariants} href="/#about" onClick={() => setMenuOpen(false)}>About</motion.a>
          <motion.a variants={itemVariants} href="/#events" onClick={() => setMenuOpen(false)}>Events</motion.a>
          <MotionLink variants={itemVariants} to="/projects" onClick={() => setMenuOpen(false)}>Projects</MotionLink>
          <MotionLink variants={itemVariants} to="/leaderboard" onClick={() => setMenuOpen(false)}>Ranking</MotionLink>
          <MotionLink variants={itemVariants} to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</MotionLink>
          <MotionLink variants={itemVariants} to="/blog" onClick={() => setMenuOpen(false)}>Blog</MotionLink>
          <MotionLink variants={itemVariants} to="/team" onClick={() => setMenuOpen(false)}>Team</MotionLink>
          <motion.a variants={itemVariants} href="/#organizers" onClick={() => setMenuOpen(false)}>Organizers</motion.a>
          <motion.a variants={itemVariants} href="/#contact" onClick={() => setMenuOpen(false)}>Contact</motion.a>
          <motion.a
            variants={itemVariants}
            href="https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary join-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Chapter
          </motion.a>
        </motion.div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
