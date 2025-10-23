"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleReserveTable = () => {
    navigate("/reservations")
  }

  return (
    <div className="little-lemon-app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/little-lemon-restaurant-logo.jpg" alt="Little Lemon" />
          </div>
          <ul className="nav-menu">
            <li>
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#menu" className="nav-link">
                Menu
              </a>
            </li>
            <li>
              <a
                href="#reservations"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  handleReserveTable()
                }}
              >
                Reservations
              </a>
            </li>
            <li>
              <a href="#order" className="nav-link">
                Order Online
              </a>
            </li>
            <li>
              <a href="#login" className="nav-link">
                Login
              </a>
            </li>
          </ul>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {mobileMenuOpen && (
          <ul className="mobile-menu">
            <li>
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#menu" className="nav-link">
                Menu
              </a>
            </li>
            <li>
              <a
                href="#reservations"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  handleReserveTable()
                }}
              >
                Reservations
              </a>
            </li>
            <li>
              <a href="#order" className="nav-link">
                Order Online
              </a>
            </li>
            <li>
              <a href="#login" className="nav-link">
                Login
              </a>
            </li>
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Little Lemon</h1>
            <h2 className="hero-subtitle">Chicago</h2>
            <p className="hero-description">
              Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively
              but casual environment. The restaurant features a locally-sourced menu with daily specials.
            </p>
            <button className="cta-button" onClick={handleReserveTable}>
              Reserve a Table
            </button>
          </div>
          <div className="hero-image">
            <img src="/mediterranean-restaurant-food-platter.jpg" alt="Mediterranean food platter" />
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section className="specials" id="menu">
        <div className="container">
          <div className="specials-header">
            <h2 className="section-title">This week's specials!</h2>
            <button className="online-menu-btn">Online Menu</button>
          </div>
          <div className="specials-grid">
            <div className="dish-card">
              <img src="/greek-salad-mediterranean-cuisine.jpg" alt="Greek Salad" className="dish-image" />
              <div className="dish-content">
                <div className="dish-header">
                  <h3 className="dish-title">Greek Salad</h3>
                  <span className="dish-price">$12.99</span>
                </div>
                <p className="dish-description">
                  The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished
                  with crunchy garlic and rosemary croutons.
                </p>
                <button className="order-btn">Order a delivery</button>
              </div>
            </div>

            <div className="dish-card">
              <img src="/bruchetta-italian-appetizer.jpg" alt="Bruschetta" className="dish-image" />
              <div className="dish-content">
                <div className="dish-header">
                  <h3 className="dish-title">Bruschetta</h3>
                  <span className="dish-price">$7.99</span>
                </div>
                <p className="dish-description">
                  Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and
                  olive oil. Topped with fresh tomatoes.
                </p>
                <button className="order-btn">Order a delivery</button>
              </div>
            </div>

            <div className="dish-card">
              <img src="/lemon-dessert-mediterranean.jpg" alt="Lemon Dessert" className="dish-image" />
              <div className="dish-content">
                <div className="dish-header">
                  <h3 className="dish-title">Lemon Dessert</h3>
                  <span className="dish-price">$6.99</span>
                </div>
                <p className="dish-description">
                  This comes straight from grandma's recipe book, every last ingredient has been sourced and is as
                  authentic as can be imagined.
                </p>
                <button className="order-btn">Order a delivery</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What our customers say!</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <img src="/happy-customer-portrait.png" alt="Sarah M." className="customer-photo" />
              <h4 className="customer-name">Sarah M.</h4>
              <p className="testimonial-text">
                "The best Mediterranean food in Chicago! The atmosphere is cozy and the staff is incredibly friendly."
              </p>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <img src="/happy-customer-portrait.png" alt="John D." className="customer-photo" />
              <h4 className="customer-name">John D.</h4>
              <p className="testimonial-text">
                "I come here every week! The Greek salad is absolutely amazing and the lemon dessert is to die for."
              </p>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <img src="/happy-customer-portrait.png" alt="Maria L." className="customer-photo" />
              <h4 className="customer-name">Maria L.</h4>
              <p className="testimonial-text">
                "Perfect spot for a date night. The food is authentic and the service is impeccable. Highly recommend!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <img src="/happy-customer-portrait.png" alt="David K." className="customer-photo" />
              <h4 className="customer-name">David K.</h4>
              <p className="testimonial-text">
                "Little Lemon never disappoints. Fresh ingredients, great prices, and a wonderful dining experience."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="hero-title">Little Lemon</h2>
              <h3 className="about-subtitle">Chicago</h3>
              <p className="about-description">
                Little Lemon opened in 1995 by two Italian brothers, Adrian and Mario. Despite the city's diversity, the
                two brothers recognized the lack of Mediterranean cuisine in Chicago, and were inspired to bring the
                flavors of their hometown in Italy to the people of Chicago. The two brothers continue to oversee the
                Little Lemon restaurant, nearly thirty years later.
              </p>
            </div>
            <div className="about-images">
              <img
                src="/mediterranean-restaurant-food-platter.jpg"
                alt="Restaurant interior"
                className="about-image-1"
              />
              <img src="/greek-salad-mediterranean-cuisine.jpg" alt="Chefs cooking" className="about-image-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <img src="/little-lemon-restaurant-logo.jpg" alt="Little Lemon" className="footer-logo" />
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Navigation</h4>
              <p>
                <a href="#home" className="social-link">
                  Home
                </a>
              </p>
              <p>
                <a href="#about" className="social-link">
                  About
                </a>
              </p>
              <p>
                <a href="#menu" className="social-link">
                  Menu
                </a>
              </p>
              <p>
                <a
                  href="#reservations"
                  className="social-link"
                  onClick={(e) => {
                    e.preventDefault()
                    handleReserveTable()
                  }}
                >
                  Reservations
                </a>
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              <p>678 Pisa Dr, Chicago, IL 60611</p>
              <p>(312) 555-0123</p>
              <p>contact@littlelemon.com</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Follow Us</h4>
              <div className="social-links">
                <a href="#facebook" className="social-link">
                  Facebook
                </a>
                <a href="#instagram" className="social-link">
                  Instagram
                </a>
                <a href="#twitter" className="social-link">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Little Lemon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
