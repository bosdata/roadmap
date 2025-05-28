import { RoadmapData } from '../types';

export const roadmapData: RoadmapData = {
  python: [
    {
      id: 1,
      day: 1,
      topic: "Python Basics & Environment Setup",
      description: "Introduction to Python programming and setting up your development environment",
      objectives: [
        "Install Python and required libraries",
        "Learn basic syntax and data types",
        "Understand variables and operations"
      ],
      resources: [
        "Python.org official documentation",
        "Anaconda distribution setup guide",
        "VS Code with Python extension"
      ],
      practice: [
        "Create your first Python script",
        "Practice basic calculations",
        "Experiment with different data types"
      ]
    },
    // ... (90 days of detailed Python curriculum)
  ],
  sql: [
    {
      id: 91,
      day: 1,
      topic: "SQL Fundamentals & Database Concepts",
      description: "Introduction to databases and basic SQL queries",
      objectives: [
        "Understand database basics",
        "Learn SELECT statements",
        "Practice basic queries"
      ],
      resources: [
        "SQL Server Management Studio",
        "W3Schools SQL Tutorial",
        "Microsoft Access Tutorial"
      ],
      practice: [
        "Create your first database",
        "Write basic SELECT queries",
        "Practice filtering data"
      ]
    },
    // ... (30 days of detailed SQL/Access curriculum)
  ],
  tableau: [
    {
      id: 121,
      day: 1,
      topic: "Tableau Basics & Interface",
      description: "Introduction to Tableau and its interface",
      objectives: [
        "Install Tableau Public",
        "Understand the interface",
        "Create first visualization"
      ],
      resources: [
        "Tableau Public software",
        "Tableau training videos",
        "Sample datasets"
      ],
      practice: [
        "Connect to a data source",
        "Create basic charts",
        "Format visualizations"
      ]
    },
    // ... (30 days of detailed Tableau curriculum)
  ]
};