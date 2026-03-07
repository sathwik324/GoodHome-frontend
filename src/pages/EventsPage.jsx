import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { CalendarDays, Plus, Trash2, X, Clock } from "lucide-react";

const API = "https://goodhome-backend.onrender.com/api";

function EventsPage() {
    const { user } = useOutletContext();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState({ title: "", date: "", time: "", description: "" });

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchEvents = () => {
        setLoading(true);
        axios
            .get(`${API}/events`, { headers })
            .then((res) => { setEvents(res.data); setError(""); })
            .catch(() => setError("Failed to load events"))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchEvents(); }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        axios
            .post(`${API}/events`, form, { headers })
            .then(() => {
                setShowCreate(false);
                setForm({ title: "", date: "", time: "", description: "" });
                fetchEvents();
            })
            .catch((err) => setError(err.response?.data?.message || "Failed to create event"));
    };

    const handleDelete = (id) => {
        axios
            .delete(`${API}/events/${id}`, { headers })
            .then(() => setEvents(events.filter((e) => e._id !== id)))
            .catch((err) => setError(err.response?.data?.message || "Failed to delete event"));
    };

    // Check if current user created the event
    const isCreator = (event) => {
        if (!user) return false;
        return event.createdBy === user._id || event.createdBy === user.name || (event.createdBy?._id === user._id);
    };

    return (
        <div className="feature-page">
            <div className="feature-header">
                <h3 style={{ margin: 0 }}>{events.length} Upcoming Events</h3>
                <button className="btn-accent" onClick={() => setShowCreate(true)}>
                    <Plus size={18} />
                    <span>Create Event</span>
                </button>
            </div>

            {loading && <p style={{ color: "var(--color-text-secondary)" }}>Loading events...</p>}
            {error && <p style={{ color: "#F87171" }}>{error}</p>}

            <div className="events-grid">
                {events.map((event) => (
                    <div className="event-card" key={event._id}>
                        <div className="event-card-top">
                            <div className="event-icon">
                                <CalendarDays size={22} />
                            </div>
                            {isCreator(event) && (
                                <button className="event-delete" onClick={() => handleDelete(event._id)}>
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                        <h4>{event.title}</h4>
                        <p className="event-meta">
                            <CalendarDays size={14} /> {event.date}
                            {event.time && <><Clock size={14} style={{ marginLeft: 12 }} /> {event.time}</>}
                        </p>
                        {event.description && <p className="event-desc">{event.description}</p>}
                        <span className="event-creator">Created by {event.createdBy?.name || event.createdBy || "Unknown"}</span>
                    </div>
                ))}
                {!loading && events.length === 0 && (
                    <p className="empty-state">No events yet. Create one!</p>
                )}
            </div>

            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create Event</h3>
                            <button className="modal-close" onClick={() => setShowCreate(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreate}>
                            <input placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                            <button className="btn-primary" type="submit">Create Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventsPage;
