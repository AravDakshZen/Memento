import React, { useId } from 'react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showScore?: boolean;
  reviewCount?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 14,
  showScore = false,
  reviewCount,
  className = ''
}) => {
  const baseId = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <div className={`rating-stars-row ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
        {[0, 1, 2, 3, 4].map((index) => {
          // Calculate fill fraction for this specific star
          const fillRatio = Math.max(0, Math.min(1, rating - index));
          const fillPercent = Math.round(fillRatio * 100);
          const gradId = `star-grad-${baseId}-${index}`;

          return (
            <svg
              key={index}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              style={{ display: 'block', flexShrink: 0 }}
              aria-hidden="true"
            >
              {fillRatio > 0 && fillRatio < 1 && (
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset={`${fillPercent}%`} stopColor="#ffd166" />
                    <stop offset={`${fillPercent}%`} stopColor="#eae3ec" />
                  </linearGradient>
                </defs>
              )}
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={
                  fillRatio === 1
                    ? '#ffd166'
                    : fillRatio === 0
                    ? '#eae3ec'
                    : `url(#${gradId})`
                }
              />
            </svg>
          );
        })}
      </div>
      {showScore && (
        <span className="rating-score-val" style={{ fontSize: '0.84rem', fontWeight: 700, color: '#333333' }}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="rating-reviews-tag" style={{ fontSize: '0.74rem', color: '#888888' }}>
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
};
