const FILTERS = ["ALL", "OSINT", "HUMINT", "IMINT"];

const Sidebar = ({ selectedFilter, onFilterChange, counts }) => {
  return (
    <aside className="side-panel">
      <div className="side-panel-block">
        <p className="panel-title">Source Filters</p>
        <div className="filter-grid">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={selectedFilter === filter ? "filter-pill active" : "filter-pill"}
              onClick={() => onFilterChange(filter)}
            >
              <span>{filter}</span>
              <strong>{counts[filter] ?? 0}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="side-panel-block">
        <p className="panel-title">Upload Tips</p>
        <ul className="tip-list">
          <li>CSV and JSON should include `type`, `lat`, `lng`, and `description`.</li>
          <li>Images can be uploaded directly with manual metadata from the form.</li>
          <li>Use the live filter to isolate OSINT, HUMINT, or IMINT feeds.</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
