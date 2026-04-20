import { useEffect, useMemo, useState } from "react";
import { fetchIntelligenceData, uploadIntelligenceFile } from "./api/dataApi";
import Header from "./components/Header";
import IntelligenceMap from "./components/IntelligenceMap";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import UploadPanel from "./components/UploadPanel";

const App = () => {
  const [allPoints, setAllPoints] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadPoints = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const data = await fetchIntelligenceData();
      setAllPoints(data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Unable to fetch intelligence data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPoints();
  }, []);

  const visiblePoints = useMemo(() => {
    if (selectedFilter === "ALL") {
      return allPoints;
    }

    return allPoints.filter((point) => point.type === selectedFilter);
  }, [allPoints, selectedFilter]);

  const counts = useMemo(() => {
    const nextCounts = {
      ALL: allPoints.length,
      OSINT: 0,
      HUMINT: 0,
      IMINT: 0
    };

    allPoints.forEach((point) => {
      nextCounts[point.type] = (nextCounts[point.type] || 0) + 1;
    });

    return nextCounts;
  }, [allPoints]);

  const stats = useMemo(
    () => [
      { label: "Total Visible", value: visiblePoints.length, accent: "#89d5ff" },
      {
        label: "OSINT Signals",
        value: visiblePoints.filter((point) => point.type === "OSINT").length,
        accent: "#f3d36b"
      },
      {
        label: "HUMINT Reports",
        value: visiblePoints.filter((point) => point.type === "HUMINT").length,
        accent: "#f08a5d"
      },
      {
        label: "IMINT Frames",
        value: visiblePoints.filter((point) => point.type === "IMINT").length,
        accent: "#ff6b7d"
      }
    ],
    [visiblePoints]
  );

  const handleUpload = async ({ file, metadata }) => {
    try {
      setIsUploading(true);
      setErrorMessage("");
      setSuccessMessage("");
      const response = await uploadIntelligenceFile({ file, metadata });
      setSuccessMessage(`${response.insertedCount} record(s) ingested successfully.`);

      try {
        await loadPoints();
      } catch (_error) {
        setSuccessMessage(
          `${response.insertedCount} record(s) uploaded. Refresh data manually if the map does not update yet.`
        );
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || "Upload failed."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      <div className="content-grid">
        <Header />

        <section className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} accent={stat.accent} />
          ))}
        </section>

        <div className="main-grid">
          <div className="main-column">
            {errorMessage && <div className="status-banner error">{errorMessage}</div>}
            {successMessage && <div className="status-banner success">{successMessage}</div>}

            {isLoading ? (
              <section className="loading-panel">Loading intelligence picture...</section>
            ) : (
              <IntelligenceMap points={visiblePoints} />
            )}
          </div>

          <div className="side-column">
            <Sidebar
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              counts={counts}
            />
            <UploadPanel onUpload={handleUpload} isUploading={isUploading} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
