"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Reservations() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "none",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Reservation submitted:", formData)
    setSubmitted(true)

    setTimeout(() => {
      navigate("/")
    }, 3000)
  }

  const handleBackHome = () => {
    navigate("/")
  }

  if (submitted) {
    return (
      <div className="reservation-success">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h2>Reservation Confirmed!</h2>
          <p>Thank you for your reservation at Little Lemon.</p>
          <p>We've sent a confirmation email to {formData.email}</p>
          <p className="redirect-message">Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="reservation-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/little-lemon-restaurant-logo.jpg" alt="Little Lemon" />
          </div>
          <button onClick={handleBackHome} className="back-home-btn">
            ← Back to Home
          </button>
        </div>
      </nav>

      <div className="reservation-container">
        <div className="reservation-header">
          <h1>Reserve a Table</h1>
          <p>Book your table at Little Lemon and enjoy an authentic Mediterranean dining experience</p>
        </div>

        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(312) 555-0123"
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests *</label>
              <select id="guests" name="guests" value={formData.guests} onChange={handleChange} required>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
                <option value="7">7 Guests</option>
                <option value="8">8 Guests</option>
                <option value="9+">9+ Guests</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <select id="time" name="time" value={formData.time} onChange={handleChange} required>
                <option value="">Select a time</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="occasion">Special Occasion</label>
            <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
              <option value="none">None</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business Dinner</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="submit-reservation-btn">
            Confirm Reservation
          </button>
        </form>

        <div className="reservation-info">
          <h3>Reservation Policy</h3>
          <ul>
            <li>Reservations are held for 15 minutes past the scheduled time</li>
            <li>For parties of 9 or more, please call us directly at (312) 555-0123</li>
            <li>Cancellations must be made at least 2 hours in advance</li>
            <li>We look forward to serving you!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
