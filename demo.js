const data = [
  42,
  "alexanderThomas",
  {
    vehicle: "sedan",
    animal: "elephant",
    ecosystem: {
      sound: "rustling",
      primaryResource: "water",
      biodiversityResearch: [
        {
          researcher: "DrEmilyRamirez",
          observation: "migratorySurvey",
        },
        "conservationData",
      ],
    },
  },
  ["riverValley", "mountainRange", "desertPlain", "coastalRegion"],
];

const customSerializer = (value) => {
  if (Array.isArray(value)) {
    return `arr:${value.map(customSerializer).join("")}`;
  } else if (typeof value === "object" && value !== null) {
    return `obj:${Object.values(value).map(customSerializer).join("")}`;
  } else if (typeof value === "string") {
    if (value.length > 2) {
      const firstChar = value.charAt(0);
      const lastChar = value.charAt(value.length - 1);
      return `str:${firstChar}${value.length - 2}${lastChar}\n`;
    }
    return `str:${value.length}${value}\n`;
  } else if (typeof value === "number") {
    return `num:${value}\n`;
  } else {
    return "err:unknown";
  }
};

const encodedData = customSerializer(data);
console.log(encodedData);
