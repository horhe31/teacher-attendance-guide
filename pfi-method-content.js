/* Live portal reference, read November 6, 2026. Original table cells retained.
   This source is distinct from the orientation and the spreadsheet calculator. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PfiMethod=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const data={
  "source": "https://apps.52cebu.com/teacher-attendance-records-next/modules/pfi/index.html#/employee/calculation-method",
  "readDate": "November 6, 2026",
  "scope": [
    [
      "Who is covered?",
      "Active Cebu teachers",
      "BFC and ITP only. Outsource is excluded."
    ],
    [
      "When does it start?",
      "September 2026",
      "Earlier review months are not calculated."
    ],
    [
      "What is the cutoff?",
      "Day 26 to day 25",
      "Previous month through review month."
    ],
    [
      "No current Gross PFI?",
      "Applied deduction is ₱0",
      "Findings calculate first. The portal adds “No PFI Gross.”"
    ]
  ],
  "tables": [
    [
      [
        "STEP",
        "PROCESS",
        "RULE"
      ],
      [
        "1",
        "Set the cutoff",
        "Use the 26th of the previous month through the 25th of the review month, in Philippine time."
      ],
      [
        "2",
        "Build the active shift",
        "Validate each slot against its exact dated schedule history first, then the base-schedule version effective on that date in Japan Time. Use seven matching schedule dates only when both sources are unavailable. Group graveyard blocks that continue after midnight as one shift."
      ],
      [
        "3",
        "Detect the daily issue",
        "Compare the required clock-in and completed work against the active shift. Closed slots are used for undertime and absence checks."
      ],
      [
        "4",
        "Validate information",
        "Use the latest Cebu Attendance Notification entry for the QQE name and date. The system finding remains the primary attendance evidence."
      ],
      [
        "5",
        "Apply immunities",
        "Remove approved full-day leave dates, apply ATI immunity to the earliest remaining LVL incident in the cutoff, then apply late immunity only when its single-code condition is met."
      ],
      [
        "6",
        "Calculate and cap",
        "Apply the fixed or PFI-class rate. If current Gross PFI is unavailable, use the previous month's class or default to Class 1. The applied payroll deduction remains zero until current Gross PFI is loaded."
      ]
    ],
    [
      [
        "CHECK",
        "CALCULATION RULE"
      ],
      [
        "Required clock-in",
        "First active scheduled start minus 10 minutes. A late starts at 60 seconds after this required time."
      ],
      [
        "Original slot statuses",
        "Open, Group, Fixed, FTL, Training, Offline, Room, Lesson, Assigned, Team Master, TikTok Live-selling, Coding Classes, Coding Tasks, Eiken Rater, Others, Offline Tasks, TikTok Video Tasks, QM Tasks, Trainee, Daily Opening, General Duties, and Unpaid Duties."
      ],
      [
        "Dated schedule history",
        "For an Absent, Late, or Undertime result, first look for the exact teacher, date, and start time in schedule history before the slot changed status."
      ],
      [
        "Effective base schedule",
        "If exact history is unavailable, use the latest valid base-schedule version active on that attendance date. Match its weekday and start time in Japan Time, including a previous schedule version that was active on a historical date."
      ],
      [
        "Seven-date fallback",
        "If neither dated history nor an effective base schedule is available, accept the same teacher, block, and Japan-time start only when it appears as an original slot on at least seven distinct schedule dates."
      ],
      [
        "Special slots",
        "Trainee, Daily Opening, General Duties, and Unpaid Duties use the same dated-history, effective-base-schedule, and seven-date validation."
      ],
      [
        "Overtime",
        "Do not treat ordinary overtime as regular-shift time. Only an active overtime slot can create an overtime absence finding."
      ],
      [
        "Breaks",
        "Break and Stationless Break are excluded from required work time."
      ],
      [
        "Undertime",
        "A deficit of 30 minutes or less is ignored. More than 30 minutes is treated as at least 1 hour; up to 4 hours is undertime and more than 4 hours is absence."
      ],
      [
        "Daily result",
        "Keep one highest applicable LVL result per teacher per workday. Multiple slots do not create duplicate daily deductions."
      ]
    ],
    [
      [
        "CATEGORY",
        "CODE",
        "SYSTEM FINDING",
        "INFORMATION TREATMENT",
        "RATE"
      ],
      [
        "Late",
        "L1",
        "1 to 5 minutes after the required clock-in time",
        "Valid Late information",
        "₱200"
      ],
      [
        "Late",
        "L2",
        "More than 5, up to 10 minutes late",
        "Valid Late information",
        "₱200"
      ],
      [
        "Late",
        "L3",
        "More than 10 minutes late; valid Late information prevents an over-30-minute raw result from becoming NIL2",
        "Valid Late information",
        "₱250"
      ],
      [
        "Late",
        "NIL1",
        "Late within 30 minutes",
        "No valid Late information",
        "₱350"
      ],
      [
        "Late",
        "NIL2",
        "More than 30 minutes late",
        "No valid Late information",
        "By PFI class"
      ],
      [
        "Absence",
        "A1",
        "Approved absence with certificate (AWC)",
        "Certificate or AWC confirmation",
        "By PFI class"
      ],
      [
        "Absence",
        "A2",
        "System-confirmed full-shift absence",
        "Attendance information, without certificate",
        "By PFI class"
      ],
      [
        "Absence",
        "A3",
        "System-confirmed full-shift absence",
        "No valid absence information",
        "By PFI class"
      ],
      [
        "Undertime",
        "U1",
        "Post-undertime: ended the shift early; more than 30 minutes, up to 4 hours",
        "Valid Post-undertime information",
        "By PFI class"
      ],
      [
        "Undertime",
        "U2",
        "Pre-undertime: missed the start of the shift; more than 30 minutes, up to 4 hours",
        "Valid Pre-undertime information",
        "By PFI class"
      ],
      [
        "Undertime",
        "U3",
        "Late plus undertime on the same workday",
        "Valid attendance information",
        "By PFI class"
      ],
      [
        "Undertime",
        "U4",
        "Undertime finding without valid information",
        "No valid undertime information",
        "By PFI class"
      ]
    ],
    [
      [
        "IMMUNITY",
        "APPLIES WHEN",
        "PFI TREATMENT"
      ],
      [
        "Approved leave",
        "Covered full-day absence",
        "Remove the covered attendance finding before deductions and ATI sequencing."
      ],
      [
        "ATI",
        "Earliest remaining LVL incident",
        "The first attendance incident in the cutoff has no PFI deduction, including late, absence, or undertime."
      ],
      [
        "Late immunity",
        "Only L1 in the cutoff",
        "First 4 L1 occurrences have no deduction."
      ],
      [
        "Late immunity",
        "Only L2 in the cutoff",
        "First 3 L2 occurrences have no deduction."
      ],
      [
        "Late immunity",
        "Only L3 in the cutoff",
        "First 2 L3 occurrences have no deduction."
      ],
      [
        "Mixed LVL codes",
        "Two or more different codes",
        "No late immunity. ATI and approved-leave immunity still apply."
      ]
    ],
    [
      [
        "PFI CLASS",
        "MONTHLY GROSS PFI",
        "NIL2 / A3 / U4",
        "A1 / U1 / U2",
        "A2 / U3"
      ],
      [
        "Class 1",
        "More than ₱0 and below ₱4,000",
        "₱750",
        "₱300",
        "₱400"
      ],
      [
        "Class 2",
        "₱4,000 to ₱7,999.99",
        "₱1,500",
        "₱600",
        "₱800"
      ],
      [
        "Class 3",
        "₱8,000 to ₱12,999.99",
        "₱3,000",
        "₱1,200",
        "₱1,600"
      ],
      [
        "Class 4",
        "₱13,000 and above",
        "₱4,875",
        "₱1,950",
        "₱2,600"
      ]
    ],
    [
      [
        "PFI MONTH",
        "PERIOD STARTS",
        "PERIOD ENDS"
      ],
      [
        "September 2026",
        "August 26, 2026",
        "September 25, 2026"
      ],
      [
        "October 2026",
        "September 26, 2026",
        "October 25, 2026"
      ],
      [
        "January 2027",
        "December 26, 2026",
        "January 25, 2027"
      ]
    ],
    [
      [
        "ATTENDANCE ISSUE DATE",
        "DEADLINE AT 11:59 PM PHILIPPINE TIME",
        "APPLICATION"
      ],
      [
        "September 26 to October 25 issues",
        "November 8, 2026",
        "October cutoff transition deadline"
      ],
      [
        "October 26 to November 5 issues",
        "November 10, 2026",
        "Transition deadline"
      ],
      [
        "November 6 onward",
        "Five calendar days after the event",
        "Event date is day zero"
      ],
      [
        "Absolute monthly deadline",
        "November 30, 2026",
        "The earlier deadline always applies"
      ]
    ]
  ],
  "sections": [
    {
      "id": "process",
      "label": "Process",
      "title": "How your PFI result is built",
      "intro": "The portal checks attendance evidence first. It then applies exemptions and rates.",
      "tables": [
        0
      ],
      "cards": [
        [
          "01 · Set the cutoff",
          "Previous month’s 26th through the review month’s 25th."
        ],
        [
          "02 · Build your shift",
          "Check dated history, then the effective base schedule."
        ],
        [
          "03 · Find the daily issue",
          "Compare required clock-in and completed work."
        ],
        [
          "04 · Check INFO",
          "Use the latest notification for your name and date."
        ],
        [
          "05 · Apply exemptions",
          "Approved full-day leave, ATI, then eligible late immunity."
        ],
        [
          "06 · Apply the rate",
          "Use the fixed amount or the PFI-class rate."
        ]
      ],
      "key": "INFO can change the code. It does not erase the system’s clock-in finding.",
      "notes": [
        "QQE schedule and clock-in records establish whether an attendance issue occurred.",
        "Cebu Attendance Notification identifies whether the teacher supplied information. The latest entry for the QQE name and date is used.",
        "Approved full-day records from Leave Data remove covered dates from PFI deduction."
      ]
    },
    {
      "id": "codes",
      "label": "Codes",
      "title": "Use the code in your record",
      "intro": "LVL is the code for a late, absence, or undertime finding. INFO is your attendance information.",
      "tables": [
        2
      ],
      "cards": [
        [
          "Late with valid INFO",
          "L1: 1–5 minutes. L2: over 5–10. L3: over 10."
        ],
        [
          "Late without valid INFO",
          "NIL1: within 30 minutes. NIL2: over 30 minutes."
        ],
        [
          "U1 · Post-undertime",
          "You ended the shift early, with valid information."
        ],
        [
          "U2 · Pre-undertime",
          "You missed the shift’s start, with valid information."
        ]
      ],
      "key": "Valid Late INFO keeps an over-30-minute late finding as L3, instead of NIL2.",
      "notes": []
    },
    {
      "id": "immunity",
      "label": "Exemptions",
      "title": "Check exemptions in this order",
      "intro": "Immunity means no PFI deduction for a covered finding. These checks happen within the cutoff.",
      "tables": [
        3
      ],
      "cards": [
        [
          "01 · Approved full-day leave",
          "Remove covered dates before deductions and ATI sequencing."
        ],
        [
          "02 · ATI immunity",
          "The earliest remaining attendance incident has no PFI deduction."
        ],
        [
          "03 · Single-code late immunity",
          "Only L1: first 4. Only L2: first 3. Only L3: first 2."
        ]
      ],
      "key": "Two or more different LVL codes: no late immunity. Approved leave and ATI immunity still apply.",
      "notes": [
        "Leave matching is case-insensitive and uses the approved start and end dates. Full-day leave approved more than 24 days in advance is also exempt. AWC is not a leave exemption; it is classified as A1."
      ]
    },
    {
      "id": "rates",
      "label": "Rates",
      "title": "Gross PFI sets your class",
      "intro": "Use monthly Gross PFI. Fixed late rates follow their own code amounts.",
      "tables": [
        4
      ],
      "cards": [],
      "key": "Without current Gross PFI, findings still calculate using the previous month’s class, or Class 1 by default. Applied payroll deduction stays ₱0 until current Gross PFI is loaded.",
      "notes": []
    },
    {
      "id": "dates",
      "label": "Dates",
      "title": "Check the cutoff and filing date",
      "intro": "Cutoff examples and correction deadlines are different. The earlier filing deadline always applies.",
      "tables": [
        5,
        6
      ],
      "cards": [
        [
          "Sept 26–Oct 25 issues",
          "File by November 8, 2026."
        ],
        [
          "Oct 26–Nov 5 issues",
          "File by November 10, 2026."
        ],
        [
          "November 6 onward",
          "Add five calendar days. The event is day zero."
        ],
        [
          "November filing cap",
          "November 30, 2026. Use the earlier deadline."
        ]
      ],
      "key": "All listed filing deadlines end at 11:59 PM Philippine time. Do not carry November’s filing cap into another month.",
      "notes": []
    },
    {
      "id": "evidence",
      "label": "Evidence",
      "title": "What the portal checks",
      "intro": "The system uses your active shift and records. One workday gets one highest applicable LVL finding.",
      "tables": [
        1
      ],
      "cards": [
        [
          "Required clock-in",
          "First active scheduled start minus 10 minutes."
        ],
        [
          "When late starts",
          "60 seconds after the required clock-in time."
        ],
        [
          "Undertime deficit",
          "30 minutes or less: ignored. Over 30 minutes: at least 1 hour."
        ],
        [
          "Undertime or absence?",
          "Up to 4 hours: undertime. More than 4 hours: absence."
        ]
      ],
      "key": "Multiple slots do not create duplicate daily deductions. Break and Stationless Break do not count as required work time.",
      "notes": []
    }
  ],
  "leaveNote": "Leave matching is case-insensitive and uses the approved start and end dates. Full-day leave approved more than 24 days in advance is also exempt. AWC is not a leave exemption; it is classified as A1.",
  "leaveTypes": [
    "Service Incentive Leave",
    "Attendance Incentive Leave",
    "Home Leave",
    "Planned Absence (PA)",
    "Sick Leave",
    "Bereavement Leave (BL)",
    "Emergency Leave",
    "Indefinite Leave",
    "Solo Parent Leave (SOL)",
    "Magna Carta for Women",
    "Maternity Leave",
    "Paternity Leave",
    "VAWC (Violence Against Women and Their Children)"
  ],
  "corrections": [
    [
      "After the deadline",
      "The File correction function is hidden and the portal shows Correction deadline passed."
    ],
    [
      "After filing",
      "The File correction function is hidden. The request remains visible in Corrections Summary, including pending, approved, or rejected status."
    ],
    [
      "Review and recalculation",
      "All requests go to the unified Correction Admin Portal. Approval recalculates the affected PFI result."
    ]
  ]
};
 function search(query){
  const words=String(query||'').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if(!words.length)return [];
  return data.sections.filter(s=>{const text=[s.title,s.intro,s.key,...s.cards.flat(),...s.notes,...s.tables.flatMap(i=>data.tables[i].flat()),...(s.id==='immunity'?data.leaveTypes:[]),...(s.id==='process'?data.scope.flat():[]),...(s.id==='dates'?data.corrections.flat():[])].join(' ').toLocaleLowerCase();return words.every(w=>text.includes(w));});
 }
 function immunityFor(pattern){
  if(pattern==='mixed')return data.tables[3].find(r=>r[0]==='Mixed LVL codes');
  if(!['L1','L2','L3'].includes(pattern))return null;
  return data.tables[3].find(r=>r[1]==='Only '+pattern+' in the cutoff')||null;
 }
 return Object.freeze({...data,search,immunityFor});
});
