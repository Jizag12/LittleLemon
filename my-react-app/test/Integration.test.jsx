import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
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

describe("Integration Tests - Navigation Flow", () => {
  it("navigates from Home to Reservations page", () => {
    const { unmount } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    // Click Reserve a Table button
    const reserveButton = screen.getByRole("button", { name: /reserve a table/i })
    fireEvent.click(reserveButton)

    // Verify navigation was called
    expect(mockNavigate).toHaveBeenCalledWith("/reservations")

    unmount()
  })

  it("navigates from Reservations back to Home", () => {
    render(
      <BrowserRouter>
        <Reservations />
      </BrowserRouter>,
    )

    // Click back to home button
    const backButton = screen.getByRole("button", { name: /back to home/i })
    fireEvent.click(backButton)

    // Verify navigation was called
    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("completes full reservation flow", async () => {
    vi.useFakeTimers()

    render(
      <BrowserRouter>
        <Reservations />
      </BrowserRouter>,
    )

    // Fill out reservation form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Test User" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "1234567890" } })
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2025-12-31" } })
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: "19:00" } })

    // Submit form
    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })
    fireEvent.click(submitButton)

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText("Reservation Confirmed!")).toBeInTheDocument()
    })

    // Fast-forward to trigger redirect
    vi.advanceTimersByTime(3000)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/")
    })

    vi.useRealTimers()
  })
})
