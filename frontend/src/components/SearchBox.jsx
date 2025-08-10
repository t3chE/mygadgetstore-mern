import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBox({ onSearch }) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const handleExpand = () => setExpanded(true);
  const handleBlur = () => {
    if (!query) setExpanded(false);
  };
  const handleChange = e => setQuery(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form className={`search-box${expanded ? ' expanded' : ''}`} onSubmit={handleSubmit}>
      {!expanded && (
        <button
          type="button"
          className="search-icon-btn"
          onClick={handleExpand}
          tabIndex={0}
          aria-label="Expand search"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <FaSearch size={22} color="#333" />
        </button>
      )}
      {expanded && (
        <div className="search-input-wrapper show">
          <FaSearch className="search-input-icon" size={18} color="#888" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={query}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            style={{
              paddingLeft: '2rem',
              width: '180px',
              opacity: 1,
              transition: 'width 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s',
              border: '1px solid #cbd5e0',
              background: '#fff',
              pointerEvents: 'auto',
            }}
          />
        </div>
      )}
    </form>
  );
}

export default SearchBox;
