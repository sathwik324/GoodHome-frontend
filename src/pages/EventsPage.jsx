import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CalendarDays, Plus, Trash2, X, Clock } from "lucide-react";

// TODO: Replace with GET /api/events when backend endpoint exists
const placeholderEvents = [
    { _id: "1", title: "Sunday Family Dinner", date: "2026-03-08", time: "18:00", description: "Monthly family dinner at Mom's house.", createdBy: "Mom" },
    { _id: "2", title: "Game Night", date: "2026-03-10", time: "20:00", description: "Board games and snacks!", createdBy: "Dad" },
    { _id: "3", title: "Sarah's Birthday", date: "2026-03-15", time: "14:00", description: "Birthday party at the park. Bring presents!", createdBy: "Alex" },
    { _id: "4", title: "Family Movie Marathon", date: "2026-03-22", time: "19:00", description: "Watching the entire Lord of the Rings trilogy.", createdBy: "Dad" },
];

function EventsPage() {
    const { user } = useOutletContext();
    const [events, setEvents] = useState(placeholderEvents);
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState({ title: "", date: "", time: "", description: "" });

    const handleCreate = (e) => {
        e.preventDefault();
        // TODO: POST /api/events { ...form }
        const newEvent = {
            _id: Date.now().toString(),
            ...form,
            createdBy: user?.name || "You",
        };
        setEvents([newEvent, ...events]);
        setShowCreate(false);
        setForm({ title: "", date: "", time: "", description: "" });
    };

    const handleDelete = (id) => {
        // TODO: DELETE /api/events/:id
        setEvents(events.filter((e) => e._id !== id));
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

            <div className="events-grid">
                {events.map((event) => (
                    <div className="event-card" key={event._id}>
                        <div className="event-card-top">
                            <div className="event-icon">
                                <CalendarDays size={22} />
                            </div>
                            {event.createdBy === (user?.name || "You") && (
                                <button className="event-delete" onClick={() => handleDelete(event._id)}>
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                        <h4>{event.title}</h4>
                        <p className="event-meta">
                            <CalendarDays size={14} /> {event.date}
                            <Clock size={14} style={{ marginLeft: 12 }} /> {event.time}
                        </p>
                        <p className="event-desc">{event.description}</p>
                        <span className="event-creator">Created by {event.createdBy}</span>
                    </div>
                ))}
            </div>

            {/* Create Event Modal */}
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
