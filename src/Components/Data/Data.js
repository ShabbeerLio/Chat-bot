const PersonData = [
    {
      id: 1,
      name: "John Doe",
      number: "+1234567890",
      gender: "Male",
      profile_picture: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
      messages: [
        { text: "Hey there!", timestamp: "10:30" },
        { text: "How are you?", timestamp: "11:15" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "+1987654321",
      gender: "Female",
      profile_picture: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
      messages: [
        { text: "Hello!", timestamp: "15:45" },
        { text: "Nice to meet you!", timestamp: "16:20" }
      ]
    },
    {
      id: 3,
      name: "Michael Johnson",
      number: "+1122334455",
      gender: "Male",
      profile_picture: "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
      messages: [
        { text: "Good morning!", timestamp: "09:00" },
        { text: "How's your day going?", timestamp: " 10:30" }
      ]
    },
    {
      id: 4,
      name: "Emily Brown",
      number: "+1555555555",
      gender: "Female",
      profile_picture: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      messages: [
        { text: "Hi!", timestamp: "13:00" },
        { text: "What are you up to?", timestamp: "14:30" }
      ]
    },
    {
      id: 5,
      name: "David Lee",
      number: "+1777777777",
      gender: "Male",
      profile_picture: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      messages: [
        { text: "Nice weather today!", timestamp: "08:00" },
        { text: "Let's catch up later.", timestamp: "09:45" }
      ]
    },
    {
      id: 6,
      name: "Sarah Wilson",
      number: "+1888888888",
      gender: "Female",
      profile_picture: "https://images.unsplash.com/photo-1587723958656-ee042cc565a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      messages: [
        { text: "Hey!", timestamp: " 11:30" },
        { text: "Are you free tonight?", timestamp: " 12:45" }
      ]
    },
    {
      id: 7,
      name: "Matthew Taylor",
      number: "+1999999999",
      gender: "Male",
      profile_picture: "https://images.unsplash.com/photo-1441441247730-d09529166668?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      messages: [
        { text: "Hello, world!", timestamp: "17:00" },
        { text: "How's everything going?", timestamp: "18:30" }
      ]
    },
    {
      id: 8,
      name: "Olivia Martinez",
      number: "+1444444444",
      gender: "Female",
      profile_picture: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
      messages: [
        { text: "Good evening!", timestamp: " 20:00" },
        { text: "What's new?", timestamp: " 21:15" }
      ]
    },
    {
      id: 9,
      name: "James White",
      number: "+1333333333",
      gender: "Male",
      profile_picture: "https://images.unsplash.com/photo-1555353540-64580b51c258?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnN8ZW58MHx8MHx8fDA%3D",
      messages: [
        { text: "Hi there!", timestamp: "2024-03-23T16:00" },
        { text: "How was your day?", timestamp: "2024-03-23T17:30" }
      ]
    },
    {
      id: 10,
      name: "Emma Garcia",
      number: "+1666666666",
      gender: "Female",
      profile_picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      messages: [
        { text: "Good afternoon!", timestamp: "2024-03-21T13:00" },
        { text: "Let's plan something!", timestamp: "2024-03-21T14:45" }
      ]
    }
  ];
  
  export default PersonData;
  