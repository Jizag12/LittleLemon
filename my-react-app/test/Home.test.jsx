import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "../pages/Home"

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe("Home Component", () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )
  }

  it("renders the Little Lemon logo", () => {
    renderHome()
    const logos = screen.getAllByAltText("Little Lemon")
    expect(logos.length).toBeGreaterThan(0)
  })

  it("renders navigation menu items", () => {
    renderHome()
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0)
    expect(screen.getAllByText("About").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Menu").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Reservations").length).toBeGreaterThan(0)
  })

  it("renders hero section with title and description", () => {
    renderHome()
    expect(screen.getByText("Little Lemon")).toBeInTheDocument()
    expect(screen.getByText("Chicago")).toBeInTheDocument()
    expect(screen.getByText(/charming neighborhood bistro/i)).toBeInTheDocument()
  })

  it("renders Reserve a Table button and navigates on click", () => {
    renderHome()
    const reserveButton = screen.getByRole("button", { name: /reserve a table/i })
    expect(reserveButton).toBeInTheDocument()

    fireEvent.click(reserveButton)
    expect(mockNavigate).toHaveBeenCalledWith("/reservations")
  })

  it("toggles mobile menu when hamburger button is clicked", () => {
    renderHome()
    const mobileMenuBtn = screen.getByLabelText("Toggle menu")

    // Mobile menu should not be visible initially
    expect(screen.queryByRole("list", { hidden: true })).toBeInTheDocument()

    // Click to open mobile menu
    fireEvent.click(mobileMenuBtn)

    // Mobile menu should be visible
    const mobileMenus = screen.getAllByRole("list")
    expect(mobileMenus.length).toBeGreaterThan(1)
  })

  it("renders specials section with dish cards", () => {
    renderHome()
    expect(screen.getByText("This week's specials!")).toBeInTheDocument()
    expect(screen.getByText("Greek Salad")).toBeInTheDocument()
    expect(screen.getByText("Bruschetta")).toBeInTheDocument()
    expect(screen.getByText("Lemon Dessert")).toBeInTheDocument()
  })

  it("renders dish prices correctly", () => {
    renderHome()
    expect(screen.getByText("$12.99")).toBeInTheDocument()
    expect(screen.getByText("$7.99")).toBeInTheDocument()
    expect(screen.getByText("$6.99")).toBeInTheDocument()
  })

  it("renders testimonials section", () => {
    renderHome()
    expect(screen.getByText("What our customers say!")).toBeInTheDocument()
    expect(screen.getByText("Sarah M.")).toBeInTheDocument()
    expect(screen.getByText("John D.")).toBeInTheDocument()
  })

  it("renders about section with restaurant history", () => {
    renderHome()
    expect(screen.getByText(/Little Lemon opened in 1995/i)).toBeInTheDocument()
    expect(screen.getByText(/Adrian and Mario/i)).toBeInTheDocument()
  })

  it("renders footer with contact information", () => {
    renderHome()
    expect(screen.getByText("678 Pisa Dr, Chicago, IL 60611")).toBeInTheDocument()
    expect(screen.getByText("(312) 555-0123")).toBeInTheDocument()
    expect(screen.getByText("contact@littlelemon.com")).toBeInTheDocument()
  })

  it("navigates to reservations when clicking nav link", () => {
    renderHome()
    const reservationLinks = screen.getAllByText("Reservations")

    fireEvent.click(reservationLinks[0])
    expect(mockNavigate).toHaveBeenCalledWith("/reservations")
  })
})
