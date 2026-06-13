import React from 'react';
import * as Icons from 'lucide-react';
import './CategoryPill.css';

export default function CategoryPill({ category, active, onClick }) {
  const IconComponent = Icons[category.icon] || Icons.HelpCircle;

  return (
    <button
      className={`category-pill${active ? ' category-pill--active' : ''}`}
      onClick={onClick}
      style={{ '--pill-hover-color': category.color }}
    >
      <IconComponent className="category-pill__icon" size={16} />
      <span className="category-pill__label">{category.label}</span>
    </button>
  );
}
