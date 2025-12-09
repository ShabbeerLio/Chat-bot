import React, { useEffect, useRef, useState, useContext } from "react";
import "./ChatDetails.css";
import {
    Check,
    CheckCheck,
    ChevronLeft,
    EllipsisVertical,
    Paperclip,
    Pen,
    Phone,
    Send,
    Trash,
    Video,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import Host from "../../Host/Host";
import noprofile from "../../Assets/noprofile.png";

const ChatDetails = ({ person }) => {
    const { userDetail, getAccountDetails, onlineUsers, socket } =
        useContext(NoteContext);
    const partnerId = person._id;
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [user, setUser] = useState([]);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editContent, setEditContent] = useState("");

    // ====== CALL STATE ======
    const [callState, setCallState] = useState({
        inCall: false,
        isCaller: false,
        callType: null, // "audio" | "video"
        callId: null,
        incoming: false,
        fromUserId: null,
    });
    const showCallOverlay =
        callState.incoming || callState.inCall || callState.isCaller;

    const [callOffer, setCallOffer] = useState(null);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const pcRef = useRef(null);
    const localStreamRef = useRef(null);

    const currentUserId = userDetail?._id;

    // ====== BASIC INIT ======
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/welcome");
        } else {
            getAccountDetails();
        }
    }, [navigate]);

    useEffect(() => {
        const initChat = async () => {
            try {
                const res = await fetch(`${Host}/api/chat/create/${partnerId}`, {
                    method: "POST",
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                const chatData = await res.json();
                setChat(chatData);

                const msgsRes = await fetch(
                    `${Host}/api/chat/messages/${chatData._id}`,
                    {
                        method: "GET",
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );

                const msgs = await msgsRes.json();
                setMessages(msgs);

                await fetch(`${Host}/api/chat/seen/${chatData._id}`, {
                    method: "PUT",
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                setMessages((prev) =>
                    prev.map((m) =>
                        m.sender !== userDetail._id ? { ...m, isSeen: true } : m
                    )
                );
            } catch (err) {
                console.error("Chat init error:", err);
            }
        };
        if (partnerId && userDetail?._id) initChat();
    }, [partnerId, userDetail?._id]);

    // ====== SOCKET: JOIN CHAT + RECEIVE MESSAGES ======
    useEffect(() => {
        if (!socket || !chat?._id) return;

        socket.off("receiveMessage");

        socket.emit("joinChat", chat._id);
        console.log("🟢 Joined chat room:", chat._id);

        const handleReceiveMessage = (data) => {
            console.log("📩 New message received:", data);
            setMessages((prev) => {
                const alreadyExists = prev.some((m) => m._id === data._id);
                if (alreadyExists) return prev;
                return [...prev, data];
            });
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            console.log("🔴 Left chat room listener");
        };
    }, [socket, chat?._id]);

    const handleSend = async () => {
        if (!newMsg.trim() || !chat?._id) return;
        try {
            const res = await fetch(`${Host}/api/chat/message/${chat._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ content: newMsg }),
            });

            const sentMsg = await res.json();
            setMessages((prev) => [...prev, sentMsg]);
            setNewMsg("");

            // Ideally include receiverId also, but backend sendMessage can be adjusted
            socket.emit("sendMessage", sentMsg);
        } catch (err) {
            console.error("Send message error:", err);
        }
    };

    // Fetch partner user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${Host}/api/auth/${partnerId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (partnerId) fetchUser();
    }, [partnerId]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ====== PROFILE PIC PRIVACY ======
    const getProfilePic = (profilePic, currentUserId) => {
        if (!profilePic) return noprofile;
        if (profilePic.isHidden === false && profilePic.url) {
            return profilePic.url;
        }
        if (
            profilePic.isHidden === true &&
            profilePic.allowedUsers?.includes(currentUserId)
        ) {
            return profilePic.url;
        }
        return noprofile;
    };
    // ====== SOCKET: CALL EVENTS ======
    useEffect(() => {
        if (!socket || !currentUserId) return;

        const handleIncomingCall = ({ callId, fromUserId, callType, offer }) => {
            // only show if this chat partner is calling
            if (fromUserId !== partnerId) return;

            console.log("📞 Incoming call", callId);
            setCallState({
                inCall: false,
                isCaller: false,
                callType,
                callId,
                incoming: true,
                fromUserId,
            });
            setCallOffer(offer);
        };

        const handleCallAnswered = ({ callId, fromUserId, answer }) => {
            if (!pcRef.current) return;
            console.log("✅ Call answered", callId);
            pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            setCallState((prev) => ({ ...prev, inCall: true }));
        };

        const handleCallRejected = ({ callId }) => {
            console.log("🚫 Call rejected", callId);
            alert("Call rejected");
            cleanupCall();
        };

        const handleCallEnded = ({ callId }) => {
            console.log("🏁 Call ended", callId);
            cleanupCall();
        };

        const handleIceCandidate = ({ fromUserId, candidate }) => {
            if (fromUserId !== partnerId) return;
            if (pcRef.current && candidate) {
                pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            }
        };

        socket.on("incomingCall", handleIncomingCall);
        socket.on("callAnswered", handleCallAnswered);
        socket.on("callRejected", handleCallRejected);
        socket.on("callEnded", handleCallEnded);
        socket.on("iceCandidate", handleIceCandidate);

        return () => {
            socket.off("incomingCall", handleIncomingCall);
            socket.off("callAnswered", handleCallAnswered);
            socket.off("callRejected", handleCallRejected);
            socket.off("callEnded", handleCallEnded);
            socket.off("iceCandidate", handleIceCandidate);
        };
    }, [socket, partnerId, currentUserId]);

    const imageUrl = getProfilePic(user?.profilePic, currentUserId);

    if (!messages) return <div>Loading chat...</div>;

    // ====== MESSAGE EDIT / DELETE ======
    const handleDelete = async (messageId) => {
        try {
            const res = await fetch(`${Host}/api/chat/message/delete/${messageId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (res.ok) {
                setMessages((prev) => prev.filter((m) => m._id !== messageId));
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleEdit = async (messageId, newContent) => {
        if (!newContent.trim()) return;

        try {
            const res = await fetch(`${Host}/api/chat/message/update/${messageId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ content: newContent }),
            });

            const updatedMsg = await res.json();
            if (res.ok) {
                setMessages((prev) =>
                    prev.map((m) => (m._id === updatedMsg._id ? updatedMsg : m))
                );
            } else {
                alert(updatedMsg.msg);
            }
        } catch (err) {
            console.error("Edit error:", err);
        }
    };


    // ====== WEBRTC HELPERS ======

    const createPeerConnection = () => {
        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                // add TURN server here in production
            ],
        });

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("iceCandidate", {
                    fromUserId: currentUserId,
                    toUserId: partnerId,
                    candidate: event.candidate,
                });
            }
        };

        pc.ontrack = (event) => {
            console.log("🎥 Remote track received");
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        return pc;
    };

    const getMediaStream = async (callType) => {
        const constraints =
            callType === "video"
                ? { video: true, audio: true }
                : { video: false, audio: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (localVideoRef.current && callType === "video") {
            localVideoRef.current.srcObject = stream;
        }
        localStreamRef.current = stream;

        stream.getTracks().forEach((track) => {
            pcRef.current.addTrack(track, stream);
        });
    };

    const cleanupCall = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((t) => t.stop());
            localStreamRef.current = null;
        }
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }
        setCallState({
            inCall: false,
            isCaller: false,
            callType: null,
            callId: null,
            incoming: false,
            fromUserId: null,
        });
        setCallOffer(null);
    };

    // ====== START CALL (AUDIO / VIDEO) ======
    const handleStartCall = async (type) => {
        if (!socket || !partnerId || !currentUserId) return;

        try {
            pcRef.current = createPeerConnection();
            await getMediaStream(type);

            const offer = await pcRef.current.createOffer();
            await pcRef.current.setLocalDescription(offer);

            setCallState((prev) => ({
                ...prev,
                inCall: false,      // not connected yet
                isCaller: true,     // <== important
                callType: type,
                incoming: false,
            }));

            socket.emit("startCall", {
                fromUserId: currentUserId,
                toUserId: partnerId,
                callType: type,
                offer,
            });
        } catch (err) {
            console.error("Start call error:", err);
            cleanupCall();
        }
    };

    // ====== ACCEPT CALL ======
    const handleAcceptCall = async () => {
        if (!socket || !callOffer || !callState.callId) return;

        try {
            pcRef.current = createPeerConnection();
            await getMediaStream(callState.callType);

            await pcRef.current.setRemoteDescription(
                new RTCSessionDescription(callOffer)
            );
            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);

            setCallState((prev) => ({
                ...prev,
                inCall: true,
                incoming: false,
            }));

            socket.emit("answerCall", {
                callId: callState.callId,
                fromUserId: currentUserId,
                toUserId: callState.fromUserId, // original caller
                answer,
            });
        } catch (err) {
            console.error("Accept call error:", err);
            alert("Unable to accept call");
            cleanupCall();
        }
    };

    // ====== REJECT CALL ======
    const handleRejectCall = () => {
        if (!socket || !callState.callId) return;
        socket.emit("rejectCall", {
            callId: callState.callId,
            fromUserId: currentUserId,
            toUserId: callState.fromUserId,
        });
        cleanupCall();
    };

    // ====== END CALL (BOTH SIDES) ======
    const handleEndCall = () => {
        if (socket && callState.callId && partnerId) {
            socket.emit("endCall", {
                callId: callState.callId,
                fromUserId: currentUserId,
                toUserId: partnerId,
            });
        }
        cleanupCall();
    };

    // ====== RENDER ======
    return (
        <div className="chatDetails">
            {/* Header */}
            <div className="chatDetails-header">
                <div className="chatDetails-user">
                    <button onClick={() => navigate(-1)} className="back-btn">
                        <ChevronLeft />
                    </button>
                    <img
                        src={
                            imageUrl ||
                            "https://static.vecteezy.com/system/resources/previews/008/433/598/non_2x/men-icon-for-website-symbol-presentation-free-vector.jpg"
                        }
                        alt={user?.name}
                        className="match-img"
                    />
                    <span
                        className={`status ${onlineUsers.includes(user._id) ? "online" : "offline"
                            }`}
                    ></span>
                    <div>
                        <h4>{user?.name}</h4>
                        <span
                            className={onlineUsers.includes(user._id) ? "online" : "offline"}
                        >
                            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                        </span>
                    </div>
                </div>
                <div className="chatDetails-user">
                    <Phone className="call" onClick={() => handleStartCall("audio")} />
                    <Video onClick={() => handleStartCall("video")} />
                    <EllipsisVertical />
                </div>
            </div>

            {/* Messages */}
            <div className="chatDetails-messages">
                {messages?.map((msg) => {
                    const isMe =
                        msg.sender._id === userDetail._id ||
                        msg.sender === userDetail._id;
                    const createdAt = new Date(msg.createdAt);
                    const diff = (new Date() - createdAt) / 1000 / 60;
                    const canEditOrDelete = isMe && diff <= 5;

                    return (
                        <div
                            key={msg._id}
                            className={`chat-bubble ${isMe ? "me" : "other"}`}
                        >
                            <p>{msg.content}</p>
                            <span className="chat-time2">
                                {createdAt.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                {isMe && (
                                    <span
                                        className={`msg-status ${msg.isSeen ? "seen" : "sent"
                                            }`}
                                    >
                                        {msg.isSeen ? <CheckCheck /> : <Check />}
                                    </span>
                                )}
                            </span>

                            {canEditOrDelete && (
                                <EllipsisVertical
                                    className="message-options-icon"
                                    onClick={() => {
                                        setSelectedMessage(msg);
                                        setShowOptionsModal(true);
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="chatDetails-input">
                <div className="chatDetail-input-box">
                    <Paperclip />
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                    />
                </div>
                <button onClick={handleSend}>
                    <Send />
                </button>
            </div>

            {/* Options Modal */}
            <div
                className={`modal-overlay chat-option ${showOptionsModal}`}
                onClick={() => setShowOptionsModal(false)}
            >
                <div
                    className="modal-content liquid-glass"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="modal-message">{selectedMessage?.content}</p>
                    <div className="modal-buttons">
                        <button
                            onClick={() => {
                                setEditContent(selectedMessage?.content);
                                setShowEditModal(true);
                                setShowOptionsModal(false);
                            }}
                        >
                            <Pen /> Edit
                        </button>
                        <button
                            onClick={() => {
                                handleDelete(selectedMessage?._id);
                                setShowOptionsModal(false);
                            }}
                        >
                            <Trash /> Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div
                className={`modal-overlay chat-edit-modal ${showEditModal}`}
                onClick={() => setShowEditModal(false)}
            >
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h4 className="chat-edit-heading">
                        Edit Message <X onClick={() => setShowEditModal(false)} />
                    </h4>
                    <p className="modal-message">{selectedMessage?.content}</p>
                    <div className="chatDetails-input">
                        <div className="chatDetail-input-box">
                            <input
                                type="text"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => {
                                handleEdit(selectedMessage._id, editContent);
                                setShowEditModal(false);
                            }}
                        >
                            <Send />
                        </button>
                    </div>
                </div>
            </div>
            {showCallOverlay && (
                <div
                    className={`call-overlay ${callState.callType === "video" ? "video-mode" : ""
                        }`}
                >
                    <div className="call-card">
                        {/* Header */}
                        <div className="call-header">
                            <div
                                className="call-avatar"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            />
                            <div className="call-name">{user?.name}</div>
                            <div className="call-status">
                                {callState.incoming
                                    ? "Incoming call..."
                                    : callState.inCall
                                        ? "Ongoing call"
                                        : "Calling..."}
                            </div>
                        </div>

                        {/* Video mode */}
                        {callState.callType === "video" && (
                            <div className="call-videos">
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="remote-video"
                                />
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="local-video"
                                />
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="call-actions">
                            {callState.incoming && (
                                <>
                                    <div className="call-action-item">
                                        <button className="call-btn accept" onClick={handleAcceptCall}>
                                            <Phone />
                                        </button>
                                        <span className="call-btn-label">Accept</span>
                                    </div>
                                    <div className="call-action-item">
                                        <button className="call-btn reject" onClick={handleRejectCall}>
                                            <X />
                                        </button>
                                        <span className="call-btn-label">Reject</span>
                                    </div>
                                </>
                            )}

                            {(callState.inCall || callState.isCaller) && (
                                <div className="call-action-item">
                                    <button className="call-btn end" onClick={handleEndCall}>
                                        <Phone />
                                    </button>
                                    <span className="call-btn-label">End</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatDetails;