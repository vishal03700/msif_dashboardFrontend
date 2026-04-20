const Header = () => {
  return (
    <header className="hero-panel">
      <div>
        <p className="eyebrow">Operational View</p>
        <h1>Multi-Source Intelligence Fusion Dashboard</h1>
        <p className="hero-copy">
          Fuse OSINT, HUMINT, and IMINT into one live geospatial picture with upload workflows,
          marker drill-downs, and rapid filtering for analysts in motion.
        </p>
      </div>
      <div className="hero-chip-row">
        <span className="hero-chip">Live Mapping</span>
        <span className="hero-chip">Rapid Uploads</span>
        <span className="hero-chip">Analyst Filters</span>
      </div>
    </header>
  );
};

export default Header;
