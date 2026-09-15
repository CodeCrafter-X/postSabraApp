export const CAMPUS_MAP_URL = "https://maps.app.goo.gl/edyoVgFnbdVFk4Nh9";

export const NOTICE_CATEGORY_GROUPS = [
  {
    label: "Academic & Faculties",
    options: [
      "Faculty of Applied Sciences",
      "Faculty of Agricultural Sciences",
      "Faculty of Geomatics",
      "Faculty of Management Studies",
      "Faculty of Social Sciences & Languages",
      "Faculty of Technology",
      "Faculty of Medicine",
      "Examinations & Results",
      "Admissions & Registration",
      "Academic Strike",
    ],
  },
  {
    label: "Student & Campus Life",
    options: [
      "Student & Campus Life",
      "Student Affairs & Welfare",
      "Library & Learning Resources",
      "Events & Student Activities",
      "Sports & Recreation",
      "Hostel & Transport",
      "Health & Wellbeing",
    ],
  },
  {
    label: "Administration & Opportunities",
    options: [
      "Administration & Opportunities",
      "Research & Innovation",
      "Finance & Procurement",
      "Human Resources",
      "Campus Services & Facilities",
      "Jobs & Internships",
      "Scholarships & Bursaries",
      "General Administration",
    ],
  },
];

export const NOTICE_CATEGORIES = NOTICE_CATEGORY_GROUPS.flatMap((group) => group.options);

// Keep existing documents readable while new notices use the university taxonomy above.
export const LEGACY_NOTICE_CATEGORIES = [
  "Academic",
  "Administrative",
  "Event",
  "Exam",
  "Holiday",
  "Job",
  "Scholarship",
  "Strike",
  "Other",
];

export const ALL_NOTICE_CATEGORIES = [
  ...NOTICE_CATEGORIES,
  ...LEGACY_NOTICE_CATEGORIES,
];
