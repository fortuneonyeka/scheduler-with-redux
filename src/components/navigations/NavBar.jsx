import React, { useState } from "react";
import "./navBar.css";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { text: "Dashboard", link: "/", id: 1 },
    { text: "Events", link: "/events", id: 2 },
    { text: "Calendar", link: "/calendar", id: 3 },
  ];

  return (
    <nav data-testid="side-nav" className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="nav-header">
        <h3>My App</h3>
        <div data-testid="hamburger-icon"
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleNav}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

      <ul className={`nav-items ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li
            key={item.id}
            className={window.location.pathname === item.link ? "active" : ""}
          >
            <a href={item.link} onClick={toggleNav}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
