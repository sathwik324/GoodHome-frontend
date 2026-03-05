import { useState } from "react";
import { Upload, X, User, Calendar } from "lucide-react";

// TODO: Replace with GET /api/media when backend endpoint exists
const placeholderMedia = [
    { _id: "1", url: "https://picsum.photos/seed/family1/400/300", uploader: "Mom", date: "Mar 1, 2026" },
    { _id: "2", url: "https://picsum.photos/seed/family2/400/300", uploader: "Dad", date: "Feb 28, 2026" },
    { _id: "3", url: "https://picsum.photos/seed/family3/400/300", uploader: "Sarah", date: "Feb 25, 2026" },
    { _id: "4", url: "https://picsum.photos/seed/family4/400/300", uploader: "Alex", date: "Feb 20, 2026" },
    { _id: "5", url: "https://picsum.photos/seed/family5/400/300", uploader: "Mom", date: "Feb 18, 2026" },
    { _id: "6", url: "https://picsum.photos/seed/family6/400/300", uploader: "Dad", date: "Feb 14, 2026" },
    { _id: "7", url: "https://picsum.photos/seed/family7/400/300", uploader: "Sarah", date: "Feb 10, 2026" },
    { _id: "8", url: "https://picsum.photos/seed/family8/400/300", uploader: "Alex", date: "Feb 5, 2026" },
];

function MediaPage() {
    const [media] = useState(placeholderMedia);
    const [lightbox, setLightbox] = useState(null);

    const handleUpload = () => {
        // TODO: Open file picker → POST /api/media (multipart/form-data)
        alert("Upload functionality requires backend /api/media endpoint (not yet implemented)");
    };

    return (
        <div className="feature-page">
            <div className="feature-header">
                <h3 style={{ margin: 0 }}>{media.length} Photos Shared</h3>
                <button className="btn-accent" onClick={handleUpload}>
                    <Upload size={18} />
                    <span>Upload Photo</span>
                </button>
            </div>

            <div className="media-grid">
                {media.map((item) => (
                    <div className="media-card" key={item._id} onClick={() => setLightbox(item)}>
                        <img src={item.url} alt={`Shared by ${item.uploader}`} loading="lazy" />
                        <div className="media-card-info">
                            <span><User size={13} /> {item.uploader}</span>
                            <span><Calendar size={13} /> {item.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <button className="lightbox-close" onClick={() => setLightbox(null)}>
                        <X size={24} />
                    </button>
                    <img src={lightbox.url} alt="Full size" />
                    <div className="lightbox-caption">
                        Shared by {lightbox.uploader} • {lightbox.date}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MediaPage;
