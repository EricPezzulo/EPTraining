export const users = [
  {
    firstName: "Eric",
    lastName: "Pezzulo",
    middleInitial: "C",
    age: 27,
    weight: 189,
    height: "6'0",
    phoneNumber: "(914)826-1938",
    activeClientStatus: false,
    nextSession: "05/21/2024",
  },
  {
    firstName: "Ben",
    lastName: "Diagamo",
    middleInitial: "P",
    age: 44,
    weight: 209,
    height: "5'10",
    phoneNumber: "(914)351-2238",
    activeClientStatus: true,
    nextSession: null,
  },
  {
    firstName: "Kim",
    lastName: "Hrotko",
    middleInitial: "",
    age: 63,
    weight: null,
    height: "5'3",
    phoneNumber: "(914)225-7906",
    activeClientStatus: true,
    nextSession: null,
    schedule: [
      {
        sessions: [
          {
            sessionType: "30 min",
            sessionDate: "05/31/2024",
          },
          { sessionType: "30 min", sessionDate: "05/24/2025" },
        ],
      },
    ],
  },
];
