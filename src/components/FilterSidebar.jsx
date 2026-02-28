import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

/**
 * Generic sidebar used by product/course listing pages.
 * Sections are rendered only when the corresponding prop is provided.
 */
export default function FilterSidebar({
  // for courses
  levels,
  selectedLevels = [],
  onLevelChange,

  // for products & courses
  categories,
  selectedCategories = [],
  onCategoryChange,
  
    priceRange,
  onPriceChange,


  // products only
  topics,
  selectedTopics = [],
  onTopicChange,

  // rating filter (array of numbers)
  ratingOptions = [],
  selectedRatings = [],
  onRatingChange,
}) {
  return (
    <aside className="w-full md:w-60 flex-shrink-0">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-[#e7f3f0]">
        {/* level (course) */}
        {levels && levels.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-sm text-slate-700 uppercase tracking-wider">
              Trình độ
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {levels.map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      onLevelChange && onLevelChange(level, checked);
                    }}
                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50 size-4"
                  />
                  <span className="text-sm text-slate-700 font-medium">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* categories */}
        {categories && categories.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-sm text-slate-700 uppercase tracking-wider">
              Danh mục
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      onCategoryChange && onCategoryChange(cat, checked);
                    }}
                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50 size-4"
                  />
                  <span className="text-sm text-slate-700 font-medium">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* price range filter */}
        {priceRange && onPriceChange && (
          <div className="mb-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
              Giá (₫)
            </h4>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => onPriceChange('min', e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => onPriceChange('max', e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
        )}

        {/* topics (products) */}
        {topics && topics.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
              Chủ đề
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {topics.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      onTopicChange && onTopicChange(topic, checked);
                    }}
                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50 size-5"
                  />
                  <span className="text-text-main group-hover:text-primary transition-colors">
                    {topic}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* rating filter */}
        {ratingOptions && ratingOptions.length > 0 && (
          <div className="mb-6 border-t border-[#e7f3f0] pt-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
              Đánh giá (★)
            </h4>
            <div className="mt-2 flex flex-col gap-3">
              {ratingOptions.map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      onRatingChange && onRatingChange(rating, checked);
                    }}
                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50 size-5"
                  />
                  <StarRating value={rating} size="text-base" />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

FilterSidebar.propTypes = {
  levels: PropTypes.array,
  selectedLevels: PropTypes.array,
  onLevelChange: PropTypes.func,
  categories: PropTypes.array,
  selectedCategories: PropTypes.array,
  onCategoryChange: PropTypes.func,
  priceRange: PropTypes.shape({ min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) }),
  onPriceChange: PropTypes.func,
  topics: PropTypes.array,
  selectedTopics: PropTypes.array,
  onTopicChange: PropTypes.func,
  ratingOptions: PropTypes.array,
  selectedRatings: PropTypes.array,
  onRatingChange: PropTypes.func,
};
