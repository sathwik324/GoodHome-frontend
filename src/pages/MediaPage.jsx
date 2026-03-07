import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/axiosInstance";
import { Upload, X, User, Calendar, Image as ImageIcon } from "lucide-react";

function MediaPage() {
    const { user, groupId } = useOutletContext();
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lightbox, setLightbox] = useState(null);

    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const fetchMedia = () => {
        if (!groupId) return;
        setLoading(true);
        api
            .get(`/groups/${groupId}/media`)
            .then((res) => { setMedia(res.data); setError(""); })
            .catch(() => setError("Failed to load media"))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchMedia(); }, [groupId]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("groupId", groupId);

        // Content-Type is multipart/form-data
        api
            .post(`/media/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(() => {
                fetchMedia();
            })
            .catch((err) => setError(err.response?.data?.message || "Failed to upload photo"))
            .finally(() => {
                setUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = "";
            });
    };

    const getUploaderName = (item) => {
        if (item.uploader?.name) return item.uploader.name;
        if (item.uploaderName) return item.uploaderName;
        if (item.uploader === user?._id) return user.name;
        return String(item.uploader || "Unknown").substring(0, 8);
    };

    return (
        <div className="feature-page">
            <div className="feature-header">
                <h3 style={{ margin: 0 }}>{media.length} Photos Shared</h3>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button
                    className="btn-accent"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                >
                    <Upload size={18} />
                    <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
                </button>
            </div>

            {loading && <p style={{ color: "var(--color-text-secondary)" }}>Loading media...</p>}
            {error && <p style={{ color: "#F87171" }}>{error}</p>}

            <div className="media-grid">
                {media.map((item) => (
                    <div className="media-card" key={item._id} onClick={() => setLightbox(item)}>
                        {/* Using fileUrl from response */}
                        <img src={item.fileUrl || item.url} alt={`Shared by ${getUploaderName(item)}`} loading="lazy" />
                        <div className="media-card-info">
                            <span><User size={13} /> {getUploaderName(item)}</span>
                            <span><Calendar size={13} /> {new Date(item.createdAt || item.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
                {!loading && media.length === 0 && !error && (
                    <div className="empty-state" style={{ padding: "40px", gridColumn: "1 / -1" }}>
                        <ImageIcon size={48} color="var(--color-text-secondary)" style={{ marginBottom: 16 }} />
                        <h3 style={{ margin: "0 0 8px 0", color: "var(--color-text-primary)" }}>No photos yet</h3>
                        <p>Be the first to share a memory with the group!</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <button className="lightbox-close" onClick={() => setLightbox(null)}>
                        <X size={24} />
                    </button>
                    <img src={lightbox.fileUrl || lightbox.url} alt="Full size" />
                    <div className="lightbox-caption">
                        Shared by {getUploaderName(lightbox)} • {new Date(lightbox.createdAt || lightbox.date).toLocaleDateString()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MediaPage;
