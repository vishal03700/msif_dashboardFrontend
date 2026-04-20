import { useMemo, useState } from "react";

const initialMetadata = {
  type: "OSINT",
  lat: "",
  lng: "",
  description: ""
};

const UploadPanel = ({ onUpload, isUploading }) => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(initialMetadata);

  const isImageFile = useMemo(() => file?.type?.startsWith("image/"), [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    await onUpload({
      file,
      metadata: isImageFile ? metadata : {}
    });

    setFile(null);
    setMetadata(initialMetadata);
    event.target.reset();
  };

  return (
    <section className="upload-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-title">Ingestion</p>
          <h2>Upload CSV, JSON, or Image Intelligence</h2>
        </div>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label className="file-dropzone">
          <span>Select a source file</span>
          <input
            type="file"
            accept=".csv,.json,image/png,image/jpeg,image/jpg,image/webp"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            required
          />
          <small>{file ? file.name : "No file selected yet"}</small>
        </label>

        {isImageFile && (
          <div className="metadata-grid">
            <label>
              <span>Type</span>
              <select
                value={metadata.type}
                onChange={(event) =>
                  setMetadata((current) => ({ ...current, type: event.target.value }))
                }
              >
                <option value="OSINT">OSINT</option>
                <option value="HUMINT">HUMINT</option>
                <option value="IMINT">IMINT</option>
              </select>
            </label>
            <label>
              <span>Latitude</span>
              <input
                type="number"
                step="any"
                placeholder="28.6139"
                value={metadata.lat}
                onChange={(event) =>
                  setMetadata((current) => ({ ...current, lat: event.target.value }))
                }
                required={isImageFile}
              />
            </label>
            <label>
              <span>Longitude</span>
              <input
                type="number"
                step="any"
                placeholder="77.2090"
                value={metadata.lng}
                onChange={(event) =>
                  setMetadata((current) => ({ ...current, lng: event.target.value }))
                }
                required={isImageFile}
              />
            </label>
            <label className="metadata-description">
              <span>Description</span>
              <textarea
                rows="4"
                placeholder="Brief the intelligence item for analysts reviewing the map."
                value={metadata.description}
                onChange={(event) =>
                  setMetadata((current) => ({ ...current, description: event.target.value }))
                }
                required={isImageFile}
              />
            </label>
          </div>
        )}

        <button type="submit" className="primary-button" disabled={!file || isUploading}>
          {isUploading ? "Uploading..." : "Upload Data"}
        </button>
      </form>
    </section>
  );
};

export default UploadPanel;
