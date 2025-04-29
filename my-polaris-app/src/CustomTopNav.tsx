import React from 'react';
import './CustomTopNav.css';

export default function CustomTopNav() {
  return (
    <nav className="custom-top-nav">
      <div className="nav-left">
        {/* Shopify logo SVG */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="white"/>
          <text x="7" y="22" fontSize="18" fontWeight="bold" fill="#000">S</text>
        </svg>
        <span className="shopify-text">shopify</span>
      </div>
      <div className="nav-center">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" />
          <span className="shortcut">⌘ K</span>
        </div>
      </div>
      <div className="nav-right">
        <span className="icon">😎</span>
        <span className="icon">🔔</span>
        <div className="profile">
          <span className="profile-initials">SI</span>
          <span className="profile-name">Stellar Interiors</span>
        </div>
      </div>
    </nav>
  );
} 