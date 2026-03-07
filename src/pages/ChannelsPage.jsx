import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Hash, Send } from "lucide-react";

const API = "https://goodhome-backend.onrender.com/api";

function formatTime(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
}

function ChannelsPage() {
    const { user } = useOutletContext();
    const [channels, setChannels] = useState([]);
    const [activeChannel, setActiveChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [msgsLoading, setMsgsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch channels on mount
    useEffect(() => {
        axios
            .get(`${API}/channels`, { headers })
            .then((res) => {
                setChannels(res.data);
                if (res.data.length > 0) setActiveChannel(res.data[0]._id);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    // Fetch messages when active channel changes
    const fetchMessages = (channelId) => {
        if (!channelId) return;
        axios
            .get(`${API}/channels/${channelId}/messages`, { headers })
            .then((res) => setMessages(res.data))
            .catch(() => setMessages([]))
            .finally(() => setMsgsLoading(false));
    };

    useEffect(() => {
        if (!activeChannel) return;
        setMsgsLoading(true);
        fetchMessages(activeChannel);
    }, [activeChannel]);

    // Poll for new messages every 5 seconds
    useEffect(() => {
        if (!activeChannel) return;
        const interval = setInterval(() => fetchMessages(activeChannel), 5000);
        return () => clearInterval(interval);
    }, [activeChannel]);

    // Auto-scroll on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    const activeChannelObj = channels.find((c) => c._id === activeChannel);
    const channelName = activeChannelObj?.name || "";

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMsg.trim() || !activeChannel) return;

        axios
            .post(`${API}/channels/${activeChannel}/messages`, { text: newMsg }, { headers })
            .then((res) => {
                setMessages((prev) => [...prev, res.data]);
                setNewMsg("");
            })
            .catch(() => { });
    };

    // Resolve sender name — sender could be an ID string or a populated object
    const getSenderName = (msg) => {
        if (msg.sender?.name) return msg.sender.name;
        if (msg.senderName) return msg.senderName;
        if (msg.sender === user?._id) return user.name;
        return String(msg.sender || "").substring(0, 6);
    };

    if (loading) {
        return (
            <div className="channels-layout">
                <p style={{ padding: 20, color: "var(--color-text-secondary)" }}>Loading channels...</p>
            </div>
        );
    }

    return (
        <div className="channels-layout">
            <div className="channel-list">
                <h4 className="channel-list-title">Channels</h4>
                {channels.map((ch) => (
                    <button
                        key={ch._id}
                        className={`channel-item${ch._id === activeChannel ? " active" : ""}`}
                        onClick={() => setActiveChannel(ch._id)}
                    >
                        <Hash size={16} />
                        <span>{ch.name}</span>
                    </button>
                ))}
                {channels.length === 0 && (
                    <p style={{ padding: "0 16px", color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>No channels yet</p>
                )}
            </div>

            <div className="channel-thread">
                <div className="channel-thread-header">
                    <Hash size={18} />
                    <h4>{channelName}</h4>
                </div>

                <div className="channel-messages">
                    {msgsLoading && <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Loading messages...</p>}
                    {!msgsLoading && messages.length === 0 && (
                        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>No messages yet. Say hello!</p>
                    )}
                    {messages.map((msg) => (
                        <div className="message-item" key={msg._id}>
                            <div className="message-avatar">
                                {getSenderName(msg).charAt(0).toUpperCase()}
                            </div>
                            <div className="message-body">
                                <div className="message-meta">
                                    <strong>{getSenderName(msg)}</strong>
                                    <span>{formatTime(msg.createdAt || msg.time)}</span>
                                </div>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form className="message-input" onSubmit={handleSend}>
                    <input
                        placeholder={`Message #${channelName}...`}
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                    />
                    <button type="submit" className="send-btn">
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChannelsPage;
