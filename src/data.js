// import { v4 as uuidv4 }
export default {
  users: [
    {
      _id: 2525,
      // _id: uuidv4(),
      email: "nikhilyadav@gmail.com",
      name: "Nikhil Yadav",
      password: "12345",
    },
    {
      _id: 236,
      email: "subraisubaru@gmail.com",
      name: "Subrai Subaru",
      password: "12345",
    },
    {
      _id: 3266,
      email: "rohaningram@gmail.com",
      name: "Rohan Ingram",
      password: "12345",
    },
    {
      _id: 2826892,
      email: "akanksha@nykaa.com",
      name: "Akanksha",
      password: "hello",
    },
  ],
  posts: [
    {
      id: 8712786,
      user_id: 2525,
      post: "Today I won a car in a competition!",
      created_at: "5h",
      name: "Nikhil Yadav",
    },
    {
      id: 87127236,
      user_id: 236,
      post:
        "Today I won a car in a competition! This is a sample of a longer post which has been written by a new person to demonstrate that the size of the feed box should be as long as the text",
      created_at: "5h",
      name: "Subrai Subaru",
    },
    {
      id: 837383897,
      user_id: 3266,
      post: "Must not overflow from the app!",
      name: "Rohan Ingram",
      created_at: "5h",
    },
    {
      id: 8712377,
      user_id: 3266,
      post: "Must not overflow from the app!",
      name: "Rohan Ingram",
      created_at: "5h",
    },
    {
      id: 8712238828,
      user_id: 3266,
      post: "Must not overflow from the app!",
      name: "Rohan Ingram",
      created_at: "5h",
    },
  ],
};
