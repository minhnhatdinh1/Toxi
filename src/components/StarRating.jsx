import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple star rating display component.
 *
 * Props:
 * - value: number of filled stars (0..max)
 * - max: total number of stars
 * - size: tailwind text size class (eg. 'text-sm', 'text-lg')
 * - className: additional classes applied to wrapper
 * - showCount: whether to render numerical value after stars
 */
export default function StarRating({
  value = 0,
  max = 5,
  size = 'text-sm',
  className = '',
  showCount = false,
  countLabel,
}) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    stars.push(
      <span
        key={i}
        className={
          `material-symbols-outlined ${i <= value ? 'filled' : 'outlined'} ${size}`
        }
      >
        star
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}> 
      {stars}
      {showCount && (
        <span className="ml-1 text-xs text-text-muted">{
          countLabel ?? value
        }</span>)
      }
    </div>
  );
}

StarRating.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.string,
  className: PropTypes.string,
  showCount: PropTypes.bool,
  countLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
