import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Reservations from "../pages/Reservations"

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe("Reservations Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  const renderReservations = () => {
    return render(
      <BrowserRouter>
        <Reservations />
      </BrowserRouter>,
    )
  }

  it("renders reservation form with all fields", () => {
    renderReservations()

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/special occasion/i)).toBeInTheDocument()
  })

  it("renders page title and description", () => {
    renderReservations()

    expect(screen.getByText("Reserve a Table")).toBeInTheDocument()
    expect(screen.getByText(/Book your table at Little Lemon/i)).toBeInTheDocument()
  })

  it("navigates back to home when clicking back button", () => {
    renderReservations()

    const backButton = screen.getByRole("button", { name: /back to home/i })
    fireEvent.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("updates form fields when user types", () => {
    renderReservations()

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)

    fireEvent.change(nameInput, { target: { value: "John Doe" } })
    fireEvent.change(emailInput, { target: { value: "john@example.com" } })

    expect(nameInput.value).toBe("John Doe")
    expect(emailInput.value).toBe("john@example.com")
  })

  it("updates select fields correctly", () => {
    renderReservations()

    const guestsSelect = screen.getByLabelText(/number of guests/i)
    const occasionSelect = screen.getByLabelText(/special occasion/i)

    fireEvent.change(guestsSelect, { target: { value: "4" } })
    fireEvent.change(occasionSelect, { target: { value: "birthday" } })

    expect(guestsSelect.value).toBe("4")
    expect(occasionSelect.value).toBe("birthday")
  })

  it("submits form with valid data and shows success message", async () => {
    vi.useFakeTimers()
    renderReservations()

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "John Doe" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "(312) 555-0123" } })
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2025-12-31" } })
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: "19:00" } })

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })
    fireEvent.click(submitButton)

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText("Reservation Confirmed!")).toBeInTheDocument()
      expect(screen.getByText(/Thank you for your reservation/i)).toBeInTheDocument()
    })

    // Fast-forward time to trigger redirect
    vi.advanceTimersByTime(3000)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/")
    })

    vi.useRealTimers()
  })

  it("renders reservation policy information", () => {
    renderReservations()

    expect(screen.getByText("Reservation Policy")).toBeInTheDocument()
    expect(screen.getByText(/Reservations are held for 15 minutes/i)).toBeInTheDocument()
    expect(screen.getByText(/parties of 9 or more/i)).toBeInTheDocument()
  })

  it("has required fields marked correctly", () => {
    renderReservations()

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const phoneInput = screen.getByLabelText(/phone number/i)

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(phoneInput).toBeRequired()
  })

  it("sets minimum date to today", () => {
    renderReservations()

    const dateInput = screen.getByLabelText(/date/i)
    const today = new Date().toISOString().split("T")[0]

    expect(dateInput).toHaveAttribute("min", today)
  })

  it("displays all time slot options", () => {
    renderReservations()

    const timeSelect = screen.getByLabelText(/time/i)
    const options = timeSelect.querySelectorAll("option")

    // Should have placeholder + time slots
    expect(options.length).toBeGreaterThan(10)
    expect(options[0].textContent).toBe("Select a time")
  })

  it("displays all guest count options", () => {
    renderReservations()

    const guestsSelect = screen.getByLabelText(/number of guests/i)
    const options = guestsSelect.querySelectorAll("option")

    expect(options.length).toBe(9) // 1-8 guests + 9+
    expect(options[0].textContent).toBe("1 Guest")
    expect(options[8].textContent).toBe("9+ Guests")
  })
})
