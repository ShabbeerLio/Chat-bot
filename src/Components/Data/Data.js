const PersonData = [
  {
    id: 1,
    name: "John Doe",
    number: "+1234567890",
    gender: "Male",
    online: false,
    unread: 0,
    profile_picture: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"img",
        img:"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"img",
        img:"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        text: "How are you?",
        timestamp: "11:15",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    number: "+1987654321",
    gender: "Female",
    online: false,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
    ]
  },
  {
    id: 3,
    name: "Michael Johnson",
    number: "+1122334455",
    gender: "Male",
    online: false,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 4,
    name: "Emily Brown",
    number: "+1555555555",
    gender: "Female",
    online: true,
    unread: 0,
    profile_picture: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 5,
    name: "David Lee",
    number: "+1777777777",
    gender: "Male",
    online: true,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 6,
    name: "Sarah Wilson",
    number: "+1888888888",
    gender: "Female",
    online: true,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1587723958656-ee042cc565a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 7,
    name: "Matthew Taylor",
    number: "+1999999999",
    gender: "Male",
    online: false,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1441441247730-d09529166668?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 8,
    name: "Olivia Martinez",
    number: "+1444444444",
    gender: "Female",
    online: true,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 9,
    name: "James White",
    number: "+1333333333",
    gender: "Male",
    online: false,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1555353540-64580b51c258?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnN8ZW58MHx8MHx8fDA%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
  {
    id: 10,
    name: "Emma Garcia",
    number: "+1666666666",
    gender: "Female",
    online: true,
    unread: 2,
    profile_picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    messages: [
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        subtype:"reply",
        text: "Hey there!",
        timestamp: "11:16",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        subtype:"link",
        text: "Hey there!",
        timestamp: "11:17",
        incoming: true,
        outgoing: false,
      },
      {
        type: "divider",
        text: "today",
      },
      {
        type: "msg",
        subtype:"doc",
        text: "what about you",
        timestamp: "11:18",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "Hey there!",
        timestamp: "10:30",
        incoming: true,
        outgoing: false,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
      {
        type: "msg",
        text: "How are you?",
        timestamp: "11:15",
        incoming: false,
        outgoing: true,
      },
    ]
  },
]

export default PersonData;
