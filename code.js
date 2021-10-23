const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
];

const spacer = (text) => {
  if (!text) {
    return console.log("");
  }
  const stars = new Array(5).fill("*").join("");
  console.log(`${stars} ${text} ${stars}`);
};

const findEmployeeByName = (name, arr) => {
  const answer = arr.filter((obj) => {
    const values = Object.values(obj);
    if (values.includes(name)) {
      return obj;
    }
  });

  return answer[0];
};

// spacer("findEmployeeByName Moe");
// // given a name and array of employees, return employee
// console.log(findEmployeeByName("moe", employees)); //{ id: 1, name: 'moe' }
// spacer("");

const findManagerFor = (func, arr) => {
  const managerID = func.managerId;

  const answer = arr.filter((obj) => {
    const ID = obj.id;
    if (ID === managerID) {
      return obj;
    }
  });

  return answer[0];
};

spacer("findManagerFor Shep Jr.");
//given an employee and a list of employees, return the employee who is the manager
console.log(
  findManagerFor(findEmployeeByName("shep Jr.", employees), employees)
); //{ id: 4, name: 'shep', managerId: 2 }
spacer("");

const findCoworkersFor = (func, arr) => {
  const managerID = func.managerId;
  const currentEEName = func.name;

  const answer = arr.filter((obj) => {
    const EEmanagerId = obj.managerId;
    const EEName = obj.name;
    if (EEmanagerId === managerID && currentEEName !== EEName) {
      return obj;
    }
  });

  return answer;
};

spacer("findCoworkersFor Larry");
//given an employee and a list of employees, return the employees who report to the same manager
console.log(
  findCoworkersFor(findEmployeeByName("larry", employees), employees)
); /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
spacer("");

const findManagementChainForEmployee = (func, arr) => {
  const EEIDsNeeded = [];
  let EEName2Audit = func.name;

  if (func.managerId === undefined) {
    return EEIDsNeeded;
  } else {
    while (!EEIDsNeeded.includes(1)) {
      for (let i = 0; i < arr.length; i++) {
        EEManagerId = arr[i].managerId;

        if (EEName2Audit === arr[i].name) {
          EEIDsNeeded.push(EEManagerId);

          for (let j = 0; j < arr.length; j++) {
            if (arr[j].id === EEManagerId) {
              EEName2Audit = arr[j].name;
            }
          }
        }
      }
    }
    return EEIDsNeeded.reverse().map((id) => {
      for (let i = 0; i < arr.length; i++) {
        if (id === arr[i].id) {
          return arr[i];
        }
      }
    });
  }
};

// spacer("findManagementChain for moe");
// //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
// console.log(
//   findManagementChainForEmployee(
//     findEmployeeByName("moe", employees),
//     employees
//   )
// ); //[  ]
// spacer("");

// spacer("findManagementChain for shep Jr.");
// console.log(
//   findManagementChainForEmployee(
//     findEmployeeByName("shep Jr.", employees),
//     employees
//   )
// ); /*
//   [ { id: 1, name: 'moe' },
//     { id: 2, name: 'larry', managerId: 1 },
//     { id: 4, name: 'shep', managerId: 2 }]
//   */
// spacer("");

const generateManagementTree = (arr) => {
  //I think recursion could have been used here to make the code simpler but I couldn't figure it out for the life of me.

  const OGtree = { id: 1, name: "moe", reports: [] };

  const newArr = [...arr];

  console.log(`arr v. newArr`);
  console.log(newArr === arr);

  for (let i = 1; i < newArr.length; i++) {
    //Adding a 'reports' key to each object in the array in turn added a 'reports' key to the OG 'employees' array - WHY?
    newArr[i].reports = [];
    if (newArr[i].managerId === 1) {
      OGtree.reports.push(arr[i]);
    } else if (newArr[i].managerId === 2) {
      OGtree.reports[0].reports.push(newArr[i]);
    } else if (newArr[i].managerId === 3) {
      OGtree.reports[1].reports.push(newArr[i]);
    } else if (newArr[i].managerId === 4) {
      OGtree.reports[0].reports[0].reports.push(newArr[i]);
    } else if (newArr[i].managerId === 5) {
      OGtree.reports[1].reports[0].reports.push(newArr[i]);
    }
  }

  return OGtree;
};

spacer("generateManagementTree");
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
spacer("");

// const displayManagementTree = (obj) => {
//   //I think recursion could have been used here to make the code simpler but I couldn't figure it out for the life of me.

//   let answer = `${obj.name}`;

//   obj.reports.map((arr) => {
//     answer += `\n`;
//     answer += `-`;
//     answer += `${arr.name}`;

//     const reports = arr.reports;

//     if (reports.length > 0) {
//       answer += `\n`;
//       answer += `--`;
//       answer += `${reports[0].name}`;

//       const nextReports = reports[0].reports;

//       if (nextReports.length > 0) {
//         answer += `\n`;
//         answer += `---`;
//         answer += `${nextReports[0].name}`;
//       }
//     }
//   });
//   console.log(answer);
// };

// spacer("displayManagementTree");
// //given a tree of employees, generate a display which displays the hierarchy
// displayManagementTree(generateManagementTree(employees)); /*
//   moe
//   -larry
//   --shep
//   ---shep Jr.
//   -curly
//   --groucho
//   ---harpo
//   -lucy
//   */

// const generateManagementTree = (employees) => {
//   const manager = employees.find( employee => !employee.managerId);
//   return { ...manager, reports: generateDirectReports(manager, employees) }
// };

// const generateManagementTree = (employees) => {
//   //   const manager = employees.find( employee => !employee.managerId);
//   //   return { ...manager, reports: generateDirectReports(manager, employees) }
//   // };
