import React, { useEffect, useRef, useState, useContext } from "react";
import "./ChatDetails.css";
import {
    Check,
    CheckCheck,
    ChevronLeft,
    EllipsisVertical,
    Mic,
    MicOff,
    Paperclip,
    Pen,
    Phone,
    Send,
    Trash,
    Video,
    VideoOff,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import Host from "../../Host/Host";
import noprofile from "../../Assets/noprofile.png";

const ChatDetails = ({ person, setHideItems, formatTime }) => {
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

    const remoteAudioRef = useRef(null);

    // ====== CALL STATE ======
    const [callDuration, setCallDuration] = useState(0);
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

    const [callHistory, setCallHistory] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [cameraOff, setCameraOff] = useState(false);

    // ====== FETCH CALL HISTORY ======
    useEffect(() => {
        const getCalls = async () => {
            try {
                const res = await fetch(`${Host}/api/call/history/${partnerId}`, {
                    headers: { "auth-token": localStorage.getItem("token") },
                });
                const data = await res.json();
                setCallHistory(data);
            } catch (err) {
                console.error("Call history error:", err);
            }
        };
        if (partnerId) getCalls();
    }, [partnerId]);

    // ====== BASIC INIT ======
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/welcome");
        } else {
            getAccountDetails();
        }
    }, [navigate]);

    // ====== INIT CHAT & MESSAGES ======
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

    // ====== SEND MESSAGE ======
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

            socket.emit("sendMessage", sentMsg);
        } catch (err) {
            console.error("Send message error:", err);
        }
    };

    // ====== FETCH PARTNER DATA ======
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

    // ====== AUTO-SCROLL ======
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

    // ====== CALL TIMER EFFECT ======
    useEffect(() => {
        if (callState.inCall) {
            const interval = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [callState.inCall]);

    // ====== SOCKET: CALL EVENTS ======
    useEffect(() => {
        if (!socket || !currentUserId) return;

        // Incoming call (callee)
        const handleIncomingCall = ({ callId, fromUserId, callType, offer }) => {
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
            setCallDuration(0);
        };

        // Caller gets callId
        const handleCallStarted = ({ callId }) => {
            console.log("📞 callStarted:", callId);
            setCallState((prev) => ({
                ...prev,
                callId: callId,
            }));
        };

        // Caller receives answer (call connects)
        const handleCallAnswered = ({ callId, fromUserId, answer }) => {
            if (!pcRef.current) return;
            console.log("✅ Call answered", callId);
            pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            setCallState((prev) => ({ ...prev, inCall: true }));
            setCallDuration(0);
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
        socket.on("callStarted", handleCallStarted);

        return () => {
            socket.off("incomingCall", handleIncomingCall);
            socket.off("callAnswered", handleCallAnswered);
            socket.off("callRejected", handleCallRejected);
            socket.off("callEnded", handleCallEnded);
            socket.off("iceCandidate", handleIceCandidate);
            socket.off("callStarted", handleCallStarted);
        };
    }, [socket, partnerId, currentUserId]);

    // 🔁 Whenever call overlay is visible & we have a local stream, attach it to the preview
    useEffect(() => {
        if (
            callState.callType === "video" &&
            showCallOverlay &&
            localStreamRef.current &&
            localVideoRef.current
        ) {
            const video = localVideoRef.current;
            video.srcObject = localStreamRef.current;
            video.muted = true; // required for autoplay on many browsers

            const playPromise = video.play();
            if (playPromise && typeof playPromise.then === "function") {
                playPromise.catch(() => {
                    // ignore autoplay errors
                });
            }
        }
    }, [callState.callType, showCallOverlay]);

    // Attach local camera preview whenever stream or overlay becomes ready
    useEffect(() => {
        if (
            callState.callType === "video" &&
            showCallOverlay &&
            localStreamRef.current &&
            localVideoRef.current
        ) {
            const video = localVideoRef.current;
            video.srcObject = localStreamRef.current;
            video.muted = true;

            video.play().catch(() => { });
        }
    }, [localStreamRef.current, showCallOverlay, callState.callType]);

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
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
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
            const stream = event.streams[0];

            // Remote video
            if (event.track.kind === "video" && remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
                remoteVideoRef.current.play().catch(() => { });
            }

            // Remote audio
            if (event.track.kind === "audio" && remoteAudioRef.current) {
                remoteAudioRef.current.srcObject = stream;
                remoteAudioRef.current.muted = false;
                remoteAudioRef.current.play().catch(() => { });
            }
        };

        return pc;
    };

    const getMediaStream = async (callType) => {
        const constraints =
            callType === "video" ? { video: true, audio: true } : { audio: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStreamRef.current = stream;

        // preview will be attached by useEffect when overlay is visible
        return stream;
    };

    const cleanupCall = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((t) => t.stop());
        }
        if (pcRef.current) {
            pcRef.current.close();
        }

        localStreamRef.current = null;
        pcRef.current = null;

        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        if (localVideoRef.current) localVideoRef.current.srcObject = null;

        setCallDuration(0);

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
            // 1) Create PC
            pcRef.current = createPeerConnection();

            // 2) Get user media
            const stream = await getMediaStream(type);

            // 3) Add tracks BEFORE offer
            stream.getTracks().forEach((track) => {
                pcRef.current.addTrack(track, stream);
            });

            // 4) Create offer
            const offer = await pcRef.current.createOffer();
            await pcRef.current.setLocalDescription(offer);

            // 5) State
            setCallState({
                inCall: false,
                isCaller: true,
                callType: type,
                callId: null,
                incoming: false,
                fromUserId: null,
            });

            // 6) Emit to backend
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

    // ====== ACCEPT CALL (CALLEE) ======
    const handleAcceptCall = async () => {
        if (!socket || !callOffer || !callState.callId) return;

        try {
            // 1) Create PC
            pcRef.current = createPeerConnection();

            // 2) Get media
            const stream = await getMediaStream(callState.callType);
            localStreamRef.current = stream;

            // 3) Add tracks
            stream.getTracks().forEach((track) => {
                pcRef.current.addTrack(track, stream);
            });

            // 4) Remote description (offer)
            await pcRef.current.setRemoteDescription(
                new RTCSessionDescription(callOffer)
            );

            // 5) Answer
            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);

            // 6) Connected
            setCallState((prev) => ({
                ...prev,
                inCall: true,
                incoming: false,
            }));
            setCallDuration(0);

            // 7) Emit answer
            socket.emit("answerCall", {
                callId: callState.callId,
                fromUserId: currentUserId,
                toUserId: callState.fromUserId,
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

    // ====== MERGE MESSAGES + CALL HISTORY ======
    const mergedData = [
        ...messages.map((m) => ({
            type: "message",
            time: new Date(m.createdAt),
            data: m,
        })),
        ...callHistory.map((c) => ({
            type: "call",
            time: new Date(c.startedAt),
            data: c,
        })),
    ];

    mergedData.sort((a, b) => a.time - b.time);

    const formatChatDate = (date) => {
        const d = new Date(date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const sameDay = (d1, d2) =>
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        if (sameDay(d, today)) return "Today";
        if (sameDay(d, yesterday)) return "Yesterday";

        return d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const formatDuration = (sec) =>
        `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

    let lastDateLabel = "";
    // 🎤 Toggle Mic Mute / Unmute
    const toggleMute = () => {
        if (!localStreamRef.current) return;

        const audioTrack = localStreamRef.current
            .getTracks()
            .find((t) => t.kind === "audio");

        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!audioTrack.enabled);
        }
    };

    // 📷 Toggle Camera Video Pause / Resume
    const toggleCamera = () => {
        if (!localStreamRef.current) return;

        const videoTrack = localStreamRef.current
            .getTracks()
            .find((t) => t.kind === "video");

        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            setCameraOff(!videoTrack.enabled);
        }
    };

    console.log(localVideoRef, "localVideoRef")
    console.log(remoteVideoRef, "remoteVideoRef")

    // ====== RENDER ======
    return (
        <div className="chatDetails">
            {/* Header */}
            <div className="chatDetails-header">
                <div className="chatDetails-user">
                    <button onClick={() => setHideItems(false)} className="back-btn">
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

            {/* Messages + Call history */}
            <div className="chatDetails-messages">
                {mergedData.map((item, index) => {
                    const itemDate = formatChatDate(item.time);
                    const showDateSeparator = itemDate !== lastDateLabel;
                    lastDateLabel = itemDate;

                    return (
                        <React.Fragment key={index}>
                            {showDateSeparator && (
                                <div className="date-separator">
                                    <span>{itemDate}</span>
                                </div>
                            )}

                            {/* MESSAGE RENDER */}
                            {item.type === "message" &&
                                (() => {
                                    const msg = item.data;
                                    const isMe =
                                        msg.sender._id === userDetail._id ||
                                        msg.sender === userDetail._id;

                                    return (
                                        <div className={`chat-bubble ${isMe ? "me" : "other"}`}>
                                            <p>{msg.content}</p>
                                            <span className="chat-time2">
                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    );
                                })()}

                            {/* CALL HISTORY RENDER */}
                            {item.type === "call" &&
                                (() => {
                                    const c = item.data;

                                    return (
                                        <div className="call-log-item">
                                            <div className="call-log-icon">
                                                {c.type === "audio" ? <Phone /> : <Video />}
                                            </div>
                                            <div className="call-log-info">
                                                <strong>
                                                    {c.type === "audio" ? "Audio call" : "Video call"}
                                                </strong>
                                                <small>
                                                    {new Date(c.startedAt).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}{" "}
                                                    {c.status === "missed"
                                                        ? "Missed"
                                                        : c.status === "rejected"
                                                            ? "Rejected"
                                                            : `${Math.floor(c.durationSec / 60)}m ${c.durationSec % 60
                                                            }s`}
                                                </small>
                                            </div>
                                        </div>
                                    );
                                })()}
                        </React.Fragment>
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

            {/* CALL OVERLAY */}
            {showCallOverlay && (
                <div
                    className={`call-overlay ${callState.callType === "video" ? "video-mode" : ""
                        }`}
                >
                    <audio ref={remoteAudioRef} autoPlay playsInline />

                    <div className="call-card">
                        {/* Header */}
                        <div className="call-header">
                            <div
                                className="call-avatar"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            />
                            <div className="call-name">{user?.name}</div>
                            <div className="call-status">
                                {callState.inCall
                                    ? formatDuration(callDuration)
                                    : callState.incoming
                                        ? "Incoming call..."
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
                            {/* Mute / Unmute */}
                            <div className="call-action-item">
                                <button className="call-btn more" onClick={toggleMute}>
                                    {isMuted ? (
                                        <MicOff /> // looks like mic muted symbol
                                    ) : (
                                        <Mic /> // replace with mic icon if you want
                                    )}
                                </button>
                                <span className="call-btn-label">{isMuted ? "Unmute" : "Mute"}</span>
                            </div>

                            {/* Camera On / Off (for video call only) */}
                            {callState.callType === "video" && (
                                <div className="call-action-item">
                                    <button className="call-btn more" onClick={toggleCamera}>
                                        {cameraOff ? (
                                            <VideoOff />
                                        ) : (
                                            <Video />
                                        )}
                                    </button>
                                    <span className="call-btn-label">
                                        {cameraOff ? "Camera Off" : "Camera On"}
                                    </span>
                                </div>
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