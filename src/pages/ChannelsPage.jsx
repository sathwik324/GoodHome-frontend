import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Hash, Send } from "lucide-react";

// TODO: Replace with GET /api/channels when backend endpoint exists
const placeholderChannels = [
    { _id: "1", name: "general" },
    { _id: "2", name: "recipes" },
    { _id: "3", name: "vacation-planning" },
    { _id: "4", name: "photos" },
    { _id: "5", name: "announcements" },
];

// TODO: Replace with GET /api/channels/:id/messages when backend endpoint exists
const placeholderMessages = {
    "1": [
        { _id: "m1", sender: "Mom", text: "Hey everyone! Don't forget dinner on Sunday 🍕", time: "10:30 AM" },
        { _id: "m2", sender: "Dad", text: "I'll bring the grill!", time: "10:45 AM" },
        { _id: "m3", sender: "Sarah", text: "Can I invite my friend?", time: "11:02 AM" },
        { _id: "m4", sender: "Mom", text: "Of course! The more the merrier 😊", time: "11:05 AM" },
        { _id: "m5", sender: "Alex", text: "I'll make dessert", time: "11:30 AM" },
    ],
    "2": [
        { _id: "m6", sender: "Mom", text: "Try this pasta recipe I found!", time: "9:00 AM" },
        { _id: "m7", sender: "Dad", text: "Looks delicious. Adding to my list.", time: "9:15 AM" },
    ],
    "3": [
        { _id: "m8", sender: "Alex", text: "How about Goa in April?", time: "Yesterday" },
        { _id: "m9", sender: "Sarah", text: "Yes!! I've been wanting to go!", time: "Yesterday" },
    ],
    "4": [
        { _id: "m10", sender: "Sarah", text: "Check out these sunset photos from last week 🌅", time: "2 days ago" },
    ],
    "5": [
        { _id: "m11", sender: "Mom", text: "Family Zoom call this Saturday at 5 PM.", time: "3 days ago" },
    ],
};

function ChannelsPage() {
    const { user } = useOutletContext();
    const [activeChannel, setActiveChannel] = useState("1");
    const [allMessages, setAllMessages] = useState(placeholderMessages);
    const [newMsg, setNewMsg] = useState("");
    const messagesEndRef = useRef(null);

    const messages = allMessages[activeChannel] || [];
    const channelName = placeholderChannels.find((c) => c._id === activeChannel)?.name || "";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, activeChannel]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMsg.trim()) return;

        // TODO: POST /api/channels/:id/messages { text: newMsg }
        const msg = {
            _id: Date.now().toString(),
            sender: user?.name || "You",
            text: newMsg,
            time: "Just now",
        };
        setAllMessages({
            ...allMessages,
            [activeChannel]: [...(allMessages[activeChannel] || []), msg],
        });
        setNewMsg("");
    };

    return (
        <div className="channels-layout">
            {/* Channel List */}
            <div className="channel-list">
                <h4 className="channel-list-title">Channels</h4>
                {placeholderChannels.map((ch) => (
                    <button
                        key={ch._id}
                        className={`channel-item${ch._id === activeChannel ? " active" : ""}`}
                        onClick={() => setActiveChannel(ch._id)}
                    >
                        <Hash size={16} />
                        <span>{ch.name}</span>
                    </button>
                ))}
            </div>

            {/* Message Thread */}
            <div className="channel-thread">
                <div className="channel-thread-header">
                    <Hash size={18} />
                    <h4>{channelName}</h4>
                </div>

                <div className="channel-messages">
                    {messages.map((msg) => (
                        <div className="message-item" key={msg._id}>
                            <div className="message-avatar">
                                {msg.sender.charAt(0).toUpperCase()}
                            </div>
                            <div className="message-body">
                                <div className="message-meta">
                                    <strong>{msg.sender}</strong>
                                    <span>{msg.time}</span>
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
