// Message.tsx
import React, { useState, useRef, useEffect } from 'react';
import style from "../../Styles/Message.module.scss"

interface MessageProps {
    onBack: () => void;
}

interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
}

interface Message {
    id: number;
    text: string;
    time: string;
    type: 'sent' | 'received';
    status: 'sending' | 'sent' | 'read';
}

function Message({ onBack }: MessageProps) {
    const [chats, setChats] = useState<Chat[]>([
        {
            id: 1,
            name: "QuickTalk Bot",
            avatar: "QT",
            lastMessage: "Добро пожаловать в QuickTalk! 👋",
            time: "12:00",
            unread: 0,
            online: true
        },
        {
            id: 2,
            name: "Анна Иванова",
            avatar: "АИ",
            lastMessage: "Привет! Как дела?",
            time: "11:30",
            unread: 3,
            online: true
        },
        {
            id: 3,
            name: "Иван Петров",
            avatar: "ИП",
            lastMessage: "Отправлю файлы завтра",
            time: "10:15",
            unread: 0,
            online: false
        },
        {
            id: 4,
            name: "Мария Сидорова",
            avatar: "МС",
            lastMessage: "Спасибо за помощь!",
            time: "09:45",
            unread: 1,
            online: true
        }
    ]);

    const [selectedChat, setSelectedChat] = useState<Chat>(chats[0]);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Привет! Добро пожаловать в QuickTalk! 👋",
            time: "12:00",
            type: "received",
            status: "read"
        },
        {
            id: 2,
            text: "Привет! Как работает этот мессенджер?",
            time: "12:01",
            type: "sent",
            status: "read"
        },
        {
            id: 3,
            text: "Просто выбери чат и начни общение! 🚀",
            time: "12:02",
            type: "received",
            status: "read"
        }
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        inputRef.current?.focus();
    }, [messages, selectedChat]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === "") return;

        const newMessage: Message = {
            id: Date.now(),
            text: inputMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: "sent",
            status: "sending"
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage("");

        // Обновляем последнее сообщение в чате
        setChats(prev => prev.map(chat =>
            chat.id === selectedChat.id
                ? { ...chat, lastMessage: inputMessage, time: newMessage.time, unread: 0 }
                : chat
        ));

        // Имитация отправки
        setTimeout(() => {
            setMessages(prev => prev.map(msg =>
                msg.id === newMessage.id
                    ? { ...msg, status: "read" }
                    : msg
            ));

            // Авто-ответ через 1-2 секунды
            setTimeout(() => {
                const autoReply: Message = {
                    id: Date.now() + 1,
                    text: "Сообщение получено! 👍",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type: "received",
                    status: "read"
                };
                setMessages(prev => [...prev, autoReply]);

                // Обновляем чат с новым сообщением
                setChats(prev => prev.map(chat =>
                    chat.id === selectedChat.id
                        ? { ...chat, lastMessage: autoReply.text, time: autoReply.time, unread: chat.unread + 1 }
                        : chat
                ));
            }, 1000 + Math.random() * 1000);
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleChatSelect = (chat: Chat) => {
        setSelectedChat(chat);
        setSidebarVisible(false);
        // Сбрасываем непрочитанные сообщения
        setChats(prev => prev.map(c =>
            c.id === chat.id ? { ...c, unread: 0 } : c
        ));
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "sending": return "🕒";
            case "sent": return "✓";
            case "read": return "✓✓";
            default: return "✓";
        }
    };

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={style.fon}>
            {/* Боковая панель с чатами */}
            <div className={`${style.sidebar} ${sidebarVisible ? style.sidebarVisible : ''}`}>
                <div className={style.sidebarHeader}>
                    <div className={style.searchContainer}>
                        <input
                            type="text"
                            className={style.searchInput}
                            placeholder="Поиск..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className={style.searchIcon}>🔍</span>
                    </div>
                </div>

                <div className={style.chatsList}>
                    {filteredChats.map(chat => (
                        <div
                            key={chat.id}
                            className={`${style.chatItem} ${selectedChat.id === chat.id ? style.active : ''}`}
                            onClick={() => handleChatSelect(chat)}
                        >
                            <div className={style.chatAvatar}>{chat.avatar}</div>
                            <div className={style.chatInfo}>
                                <h4 className={style.chatName}>{chat.name}</h4>
                                <p className={style.lastMessage}>{chat.lastMessage}</p>
                            </div>
                            <div className={style.chatMeta}>
                                <div className={style.time}>{chat.time}</div>
                                {chat.unread > 0 && (
                                    <div className={style.unread}>{chat.unread}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Основное окно чата */}
            <div className={style.chatContainer}>
                <div className={style.chatHeader}>
                    <button
                        className={style.menuButton}
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                    >
                        ☰
                    </button>
                    <div className={style.userAvatar}>{selectedChat.avatar}</div>
                    <div className={style.userInfo}>
                        <h3 className={style.userName}>{selectedChat.name}</h3>
                        <p className={style.userStatus}>
                            {selectedChat.online ? 'online' : 'offline'}
                        </p>
                    </div>
                    <div className={style.headerActions}>
                        <button className={style.actionButton}>📞</button>
                        <button className={style.actionButton}>🎥</button>
                        <button className={style.actionButton}>ⓘ</button>
                    </div>
                </div>

                <div className={style.messagesArea}>
                    {messages.map((message) => (
                        <div key={message.id} className={`${style.message} ${style[message.type]}`}>
                            <p className={style.text}>{message.text}</p>
                            <span className={style.time}>
                                {message.time}
                                {message.type === "sent" && (
                                    <span className={style.check}>
                                        {getStatusIcon(message.status)}
                                    </span>
                                )}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={style.inputContainer}>
                    <div className={style.inputWrapper}>
                        <input
                            ref={inputRef}
                            type="text"
                            className={style.messageInput}
                            placeholder="Введите сообщение..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className={style.sendButton}
                            onClick={handleSendMessage}
                            disabled={inputMessage.trim() === ""}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;