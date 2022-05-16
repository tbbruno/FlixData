/*
  # Lista geral de conteúdo limpa:
  [
    {
      "type": "tvShow",
      "showName": "Friends with Benefits",
      "sessionsCount": 17,
      "sessions": {
        "startDate": "",
        "duration": "",
        
      },
      "duration": {
        "components": {
          "hours": 4,
          "minutes": 38,
          "seconds": 21
        },
        "formattedStr": "04:38:21"
      }
    },
    {
      "type": "movie",
      "title": "All Over the Guy",
      "sessionsCount": 2,
      "sessions": [
        {
          "startDate": "",
          "duration": "",
        },
      ],
      "duration": {
        "components": {
          "hours": 1,
          "minutes": 32,
          "seconds": 59
        },
        "formattedStr": "01:32:59"
      }
    },
  ]
*/

// 2022-03-26 19:47:03 GMT
// 2022-03-26 19:00:21 GMT
// 2022-03-25 00:45:39 GMT

const mockHeatMapData = [
  {
    id: "08h00",
    data: [
      {
        x: "Sunday",
        y: 5.6,
      },
      {
        x: "Monday",
        y: 1.7,
      },
      {
        x: "Tuesday",
        y: 7.8,
      },
      {
        x: "Wednesday",
        y: 5.5,
      },
      {
        x: "Thursday",
        y: 6.6,
      },
      {
        x: "Friday",
        y: 5.2,
      },
      {
        x: "Saturday",
        y: 4.1,
      },
    ],
  },
  {
    id: "09h00",
    data: [
      {
        x: "Sunday",
        y: 7.7,
      },
      {
        x: "Monday",
        y: 4.6,
      },
      {
        x: "Tuesday",
        y: 6.7,
      },
      {
        x: "Wednesday",
        y: 2.2,
      },
      {
        x: "Thursday",
        y: 4.3,
      },
      {
        x: "Friday",
        y: 7.4,
      },
      {
        x: "Saturday",
        y: 5.8,
      },
    ],
  },
  {
    id: "10h00",
    data: [
      {
        x: "Sunday",
        y: 2.5,
      },
      {
        x: "Monday",
        y: 0.1,
      },
      {
        x: "Tuesday",
        y: 7.8,
      },
      {
        x: "Wednesday",
        y: 6,
      },
      {
        x: "Thursday",
        y: 5.8,
      },
      {
        x: "Friday",
        y: 8,
      },
      {
        x: "Saturday",
        y: 4.3,
      },
    ],
  },
  {
    id: "11h00",
    data: [
      {
        x: "Sunday",
        y: 6.6,
      },
      {
        x: "Monday",
        y: 6.1,
      },
      {
        x: "Tuesday",
        y: 5.4,
      },
      {
        x: "Wednesday",
        y: 0.1,
      },
      {
        x: "Thursday",
        y: 1.8,
      },
      {
        x: "Friday",
        y: 0.5,
      },
      {
        x: "Saturday",
        y: 4.6,
      },
    ],
  },
  {
    id: "12h00",
    data: [
      {
        x: "Sunday",
        y: 3.9,
      },
      {
        x: "Monday",
        y: 6.5,
      },
      {
        x: "Tuesday",
        y: 6.6,
      },
      {
        x: "Wednesday",
        y: 7.3,
      },
      {
        x: "Thursday",
        y: 0.7,
      },
      {
        x: "Friday",
        y: 7.8,
      },
      {
        x: "Saturday",
        y: 1.6,
      },
    ],
  },
  {
    id: "13h00",
    data: [
      {
        x: "Sunday",
        y: 1.6,
      },
      {
        x: "Monday",
        y: 3.4,
      },
      {
        x: "Tuesday",
        y: 6.9,
      },
      {
        x: "Wednesday",
        y: 0.5,
      },
      {
        x: "Thursday",
        y: 4,
      },
      {
        x: "Friday",
        y: 3.6,
      },
      {
        x: "Saturday",
        y: 1.5,
      },
    ],
  },
  {
    id: "14h00",
    data: [
      {
        x: "Sunday",
        y: 7.1,
      },
      {
        x: "Monday",
        y: 2.7,
      },
      {
        x: "Tuesday",
        y: 5.8,
      },
      {
        x: "Wednesday",
        y: 4.8,
      },
      {
        x: "Thursday",
        y: 6.9,
      },
      {
        x: "Friday",
        y: 4.1,
      },
      {
        x: "Saturday",
        y: 5,
      },
    ],
  },
  {
    id: "15h00",
    data: [
      {
        x: "Sunday",
        y: 5,
      },
      {
        x: "Monday",
        y: 2.9,
      },
      {
        x: "Tuesday",
        y: 4.6,
      },
      {
        x: "Wednesday",
        y: 1.8,
      },
      {
        x: "Thursday",
        y: 6.8,
      },
      {
        x: "Friday",
        y: 4.2,
      },
      {
        x: "Saturday",
        y: 3,
      },
    ],
  },
  {
    id: "16h00",
    data: [
      {
        x: "Sunday",
        y: 3.8,
      },
      {
        x: "Monday",
        y: 5.1,
      },
      {
        x: "Tuesday",
        y: 5.5,
      },
      {
        x: "Wednesday",
        y: 0.5,
      },
      {
        x: "Thursday",
        y: 4,
      },
      {
        x: "Friday",
        y: 2.3,
      },
      {
        x: "Saturday",
        y: 4.7,
      },
    ],
  },
  {
    id: "17h00",
    data: [
      {
        x: "Sunday",
        y: 5.4,
      },
      {
        x: "Monday",
        y: 5.6,
      },
      {
        x: "Tuesday",
        y: 1.7,
      },
      {
        x: "Wednesday",
        y: 0.8,
      },
      {
        x: "Thursday",
        y: 1.3,
      },
      {
        x: "Friday",
        y: 7.9,
      },
      {
        x: "Saturday",
        y: 4.7,
      },
    ],
  },
  {
    id: "18h00",
    data: [
      {
        x: "Sunday",
        y: 2,
      },
      {
        x: "Monday",
        y: 5.2,
      },
      {
        x: "Tuesday",
        y: 6.9,
      },
      {
        x: "Wednesday",
        y: 6.9,
      },
      {
        x: "Thursday",
        y: 5.7,
      },
      {
        x: "Friday",
        y: 4.9,
      },
      {
        x: "Saturday",
        y: 2.8,
      },
    ],
  },
  {
    id: "19h00",
    data: [
      {
        x: "Sunday",
        y: 1,
      },
      {
        x: "Monday",
        y: 0.4,
      },
      {
        x: "Tuesday",
        y: 2.2,
      },
      {
        x: "Wednesday",
        y: 0.6,
      },
      {
        x: "Thursday",
        y: 1.7,
      },
      {
        x: "Friday",
        y: 4.2,
      },
      {
        x: "Saturday",
        y: 3.4,
      },
    ],
  },
  {
    id: "20h00",
    data: [
      {
        x: "Sunday",
        y: 4.4,
      },
      {
        x: "Monday",
        y: 4,
      },
      {
        x: "Tuesday",
        y: 0.6,
      },
      {
        x: "Wednesday",
        y: 3.8,
      },
      {
        x: "Thursday",
        y: 1.5,
      },
      {
        x: "Friday",
        y: 7.1,
      },
      {
        x: "Saturday",
        y: 3.8,
      },
    ],
  },
  {
    id: "21h00",
    data: [
      {
        x: "Sunday",
        y: 6,
      },
      {
        x: "Monday",
        y: 7.8,
      },
      {
        x: "Tuesday",
        y: 6,
      },
      {
        x: "Wednesday",
        y: 2,
      },
      {
        x: "Thursday",
        y: 7.9,
      },
      {
        x: "Friday",
        y: 6.1,
      },
      {
        x: "Saturday",
        y: 1.7,
      },
    ],
  },
  {
    id: "22h00",
    data: [
      {
        x: "Sunday",
        y: 0.1,
      },
      {
        x: "Monday",
        y: 7.7,
      },
      {
        x: "Tuesday",
        y: 5.1,
      },
      {
        x: "Wednesday",
        y: 1.2,
      },
      {
        x: "Thursday",
        y: 2.5,
      },
      {
        x: "Friday",
        y: 2,
      },
      {
        x: "Saturday",
        y: 5,
      },
    ],
  },
  {
    id: "23h00",
    data: [
      {
        x: "Sunday",
        y: 5.4,
      },
      {
        x: "Monday",
        y: 8,
      },
      {
        x: "Tuesday",
        y: 5,
      },
      {
        x: "Wednesday",
        y: 2.1,
      },
      {
        x: "Thursday",
        y: 7.5,
      },
      {
        x: "Friday",
        y: 2.6,
      },
      {
        x: "Saturday",
        y: 6.1,
      },
    ],
  },
];

const mockTopContentData = [
  {
    contentName: "Hilda",
    hoursValue: 40.2,
    formattedTime: "40 hours, 5 minutes",
  },
  {
    contentName: "The Circle",
    hoursValue: 98.5,
    formattedTime: "98 hours, 5 minutes",
  },
  {
    contentName: "Selling Sunset",
    hoursValue: 105.8,
    formattedTime: "105 hours, 5 minutes",
  },
  {
    contentName: "Queer Eye",
    hoursValue: 140.01,
    formattedTime: "140 hours, 5 minutes",
  },
  {
    contentName: "Star Trek: The Next Generation",
    hoursValue: 230.6,
    formattedTime: "230 hours, 5 minutes",
  },
];

export { mockHeatMapData, mockTopContentData };
