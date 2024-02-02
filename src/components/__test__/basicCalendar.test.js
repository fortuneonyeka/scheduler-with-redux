import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store"; // Assuming this is your Redux store configuration
import Events from "../../pages/events/Events";
import Modal from "../../components/modal/Modal";
import BasicCalendar from "../../components/basicCalendar/BasicCalendar";
import SideNav from "../navigation/NavBar";

describe("Components Rendering", () => {
  it("renders Events component", () => {
    render(
      <Provider store={store}>
        <Events />
      </Provider>
    );
    expect(screen.getByTestId("event")).toBeInTheDocument();
  });

  it("renders Modal component", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>
    );
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});

describe("SideNav component", () => {
  test("renders SideNav component", () => {
    render(<SideNav />);

    // Check if the side nav is initially closed
    const sideNav = screen.getByTestId("side-nav");
    expect(sideNav).toHaveClass("navbar");
    expect(sideNav).not.toHaveClass("open");

    // Click on the hamburger icon to open the side nav
    const hamburgerIcon = screen.getByTestId("hamburger-icon");
    fireEvent.click(hamburgerIcon);

    // Check if the side nav is open after clicking the hamburger icon
    expect(sideNav).toHaveClass("open");

    // Check if the nav items are rendered
    const navItems = screen.getAllByRole("listitem");
    expect(navItems).toHaveLength(3);
  });
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

// Mock Date object
global.Date.now = jest.fn(() => new Date("2024-02-01T12:00:00Z"));

beforeEach(() => {
  global.localStorage = localStorageMock;
});

describe("Events component", () => {
  test("renders Events component", async () => {
    // Mock stored events
    const mockEvents = [
      {
        id: 1,
        title: "Event 1",
        start: "2024-02-01T13:00:00Z",
        end: "2024-02-01T14:00:00Z",
      },
      {
        id: 2,
        title: "Event 2",
        start: "2024-02-02T10:00:00Z",
        end: "2024-02-02T12:00:00Z",
      },
    ];

    // Mock localStorage getItem method
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockEvents));

    render(<Events />);
  });

  test("renders Events component with no events", async () => {
    // Mock localStorage getItem method to return null
    localStorageMock.getItem.mockReturnValue(null);

    render(<Events />);

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.queryByText("Event 1")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("Event 2")).not.toBeInTheDocument();
    });
  });
});
