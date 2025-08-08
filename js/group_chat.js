// Initialize chat data
const currentUser = {
    id: 'user1',
    name: 'John Doe',
    role: 'Emergency Responder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

const chats = [
    {
        id: 'chat1',
        name: 'Emergency Response Team',
        type: 'group',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=emergency',
        lastMessage: 'Situation update required at sector 7',
        timestamp: '10:30 AM',
        unread: 3
    },
    {
        id: 'chat2',
        name: 'Medical Team Alpha',
        type: 'group',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=medical',
        lastMessage: 'Supply status confirmed',
        timestamp: '09:45 AM',
        unread: 0
    },
    {
        id: 'chat3',
        name: 'Fire Response Unit',
        type: 'group',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=fire',
        lastMessage: 'All units deployed',
        timestamp: '09:30 AM',
        unread: 1
    }
];

const members = [
    {
        id: 'user1',
        name: 'John Doe',
        role: 'Team Lead',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        status: 'online'
    },
    {
        id: 'user2',
        name: 'Jane Smith',
        role: 'Medical Officer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        status: 'online'
    },
    {
        id: 'user3',
        name: 'Mike Johnson',
        role: 'Fire Chief',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        status: 'offline'
    }
];

let messages = [];

// Initialize chat interface
function initializeChat() {
    renderChatList();
    renderMembers();
    setupEventListeners();
    loadMessages('chat1');
    initializeEmojiPicker();
}

// Render chat list
function renderChatList() {
    const chatList = document.getElementById('chatList');
    chatList.innerHTML = '';
    
    chats.forEach(chat => {
        const div = document.createElement('div');
        div.className = 'chat-item';
        div.dataset.chatId = chat.id;
        
        div.innerHTML = `
            <img src="${chat.avatar}" alt="${chat.name}" class="chat-item-avatar">
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-item-name">${chat.name}</span>
                    <span class="chat-item-time">${chat.timestamp}</span>
                </div>
                <div class="chat-item-last-message">${chat.lastMessage}</div>
            </div>
            ${chat.unread ? `<span class="unread-badge">${chat.unread}</span>` : ''}
        `;

        div.addEventListener('click', () => loadMessages(chat.id));
        chatList.appendChild(div);
    });
}

// Render members list
function renderMembers() {
    const membersContainer = document.getElementById('membersContainer');
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const div = document.createElement('div');
        div.className = 'member-item';
        
        div.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
            <div class="member-info">
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.role}</div>
            </div>
        `;

        membersContainer.appendChild(div);
    });
}

// Initialize emoji picker
function initializeEmojiPicker() {
    const emojiPicker = document.createElement('div');
    emojiPicker.id = 'emojiPicker';
    emojiPicker.className = 'emoji-picker-container';
    emojiPicker.style.display = 'none';
    
    const emojis = [
        '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', 
        '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
        '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪',
        '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒',
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤'
    ];

    const emojiGrid = document.createElement('div');
    emojiGrid.className = 'emoji-grid';

    emojis.forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        span.className = 'emoji-item';
        span.onclick = () => {
            const messageInput = document.getElementById('messageInput');
            messageInput.value += emoji;
            emojiPicker.style.display = 'none';
        };
        emojiGrid.appendChild(span);
    });

    emojiPicker.appendChild(emojiGrid);
    document.querySelector('.chat-input').appendChild(emojiPicker);

    // Toggle emoji picker
    const emojiBtn = document.querySelector('.emoji-btn');
    emojiBtn.onclick = (e) => {
        e.stopPropagation();
        emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    };

    // Close emoji picker when clicking outside
    document.addEventListener('click', (e) => {
        if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
            emojiPicker.style.display = 'none';
        }
    });
}

// Load messages for a specific chat
function loadMessages(chatId) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    // Sample messages
    const sampleMessages = [
        {
            id: 1,
            senderId: 'user2',
            senderName: 'Jane Smith',
            senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
            text: 'Team, we need immediate assistance at sector 7.',
            timestamp: '10:30 AM'
        },
        {
            id: 2,
            senderId: 'user1',
            senderName: 'John Doe',
            senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            text: 'I am on my way with medical supplies.',
            timestamp: '10:31 AM'
        },
        {
            id: 3,
            senderId: 'user3',
            senderName: 'Mike Johnson',
            senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
            text: 'Fire unit deployed to location.',
            timestamp: '10:32 AM'
        }
    ];

    sampleMessages.forEach(message => renderMessage(message));
    scrollToBottom();
}

// Render a single message
function renderMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const isOutgoing = message.senderId === currentUser.id;
    
    const div = document.createElement('div');
    div.className = `message ${isOutgoing ? 'outgoing' : 'incoming'}`;
    
    div.innerHTML = `
        <img src="${message.senderAvatar}" alt="" class="message-avatar">
        <div class="message-content">
            ${!isOutgoing ? `<div class="message-sender">${message.senderName}</div>` : ''}
            <div class="message-text">${message.text}</div>
            <div class="message-meta">
                <span class="message-time">${message.timestamp}</span>
            </div>
        </div>
    `;

    chatMessages.appendChild(div);
}

// Send message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();
    
    if (!text) return;

    const message = {
        id: Date.now(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    renderMessage(message);
    messageInput.value = '';
    scrollToBottom();
}

// Share location
async function shareLocation() {
    try {
        const position = await getCurrentPosition();
        const locationMessage = {
            id: Date.now(),
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            text: `📍 Shared Location: https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        renderMessage(locationMessage);
        scrollToBottom();
    } catch (error) {
        console.error('Error sharing location:', error);
        alert('Unable to access location. Please make sure location services are enabled.');
    }
}

// Get current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Setup event listeners
function setupEventListeners() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.querySelector('.send-btn');
    const locationBtn = document.querySelector('.action-btn[title="Share Location"]');

    sendBtn.addEventListener('click', sendMessage);
    locationBtn.addEventListener('click', shareLocation);

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Scroll chat to bottom
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initializeChat);