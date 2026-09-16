import { PortfolioContent } from '../types';

export const initialPortfolioData: PortfolioContent = {
  profile: {
    name: "Shubham",
    role: "Software Engineer & Open Source Contributor",
    tagline: "Building resilient, performant web applications with React, TypeScript & modern cloud tech.",
    bio: "Passionate software engineer focused on building clean, high-performance web products. Experienced in developing full-stack architectures with React, Node.js, TypeScript, and modern styling libraries. Committed to writing maintainable code, optimizing frontend performance, and crafting intuitive user interfaces.",
    location: "India",
    email: "shubhampw2026@gmail.com",
    githubUsername: "etworkapp",
    githubUrl: "https://github.com/etworkapp",
    linkedinUrl: "https://www.linkedin.com/in/shubham-w-02b8b2436/",
    twitterUrl: "https://twitter.com",
    availableForHire: true,
    yearsOfExperience: "2+",
    completedProjects: "18+",
    clientsServed: "10+",
  },
  skills: [
    // Programming
    { name: "C++", category: "programming", level: 90, iconName: "Code2", featured: true },
    { name: "Java", category: "programming", level: 94, iconName: "Coffee", featured: true },
    { name: "Python", category: "programming", level: 90, iconName: "FileCode", featured: true },
    { name: "JavaScript", category: "programming", level: 92, iconName: "FileCode", featured: true },
    { name: "PHP", category: "programming", level: 80, iconName: "Code", featured: false },
    { name: "SQL", category: "programming", level: 90, iconName: "Database", featured: true },

    // Web Development / Frontend
    { name: "HTML & CSS", category: "frontend", level: 95, iconName: "Layout", featured: true },
    { name: "JavaScript (ES6+)", category: "frontend", level: 92, iconName: "FileCode", featured: true },
    { name: "React.js", category: "frontend", level: 94, iconName: "Atom", featured: true },
    { name: "Angular.js", category: "frontend", level: 82, iconName: "Layers", featured: false },
    { name: "Node.js (Fullstack)", category: "frontend", level: 90, iconName: "Server", featured: true },
    { name: "REST APIs", category: "frontend", level: 92, iconName: "Network", featured: true },

    // Backend / Frameworks
    { name: "Spring Boot", category: "backend", level: 92, iconName: "Coffee", featured: true },
    { name: "Spring Suite", category: "backend", level: 88, iconName: "Cpu", featured: false },
    { name: "Node.js & Express", category: "backend", level: 90, iconName: "Server", featured: true },
    { name: "Apache Kafka", category: "backend", level: 88, iconName: "Radio", featured: true },
    { name: "Camunda", category: "backend", level: 84, iconName: "Workflow", featured: false },

    // Databases
    { name: "SQL & Relational DBs", category: "database", level: 90, iconName: "Database", featured: true },
    { name: "Hadoop (Big Data)", category: "database", level: 80, iconName: "Layers", featured: false },
    { name: "Cassandra (NoSQL)", category: "database", level: 82, iconName: "HardDrive", featured: false },
    { name: "PostgreSQL & MySQL", category: "database", level: 88, iconName: "Database", featured: true },

    // Cloud / DevOps
    { name: "AWS (EC2, S3)", category: "cloud", level: 90, iconName: "Cloud", featured: true },
    { name: "Microsoft Azure", category: "cloud", level: 82, iconName: "Cloud", featured: false },
    { name: "Docker", category: "cloud", level: 86, iconName: "Box", featured: true },
    { name: "Kubernetes", category: "cloud", level: 80, iconName: "Layers", featured: false },

    // Data Science
    { name: "Python Data Stack", category: "datascience", level: 90, iconName: "FileCode", featured: true },
    { name: "TensorFlow", category: "datascience", level: 82, iconName: "Cpu", featured: false },
    { name: "NumPy & Pandas", category: "datascience", level: 90, iconName: "BarChart2", featured: true },
    { name: "Matplotlib", category: "datascience", level: 85, iconName: "PieChart", featured: false },
    { name: "Power BI & Tableau", category: "datascience", level: 86, iconName: "BarChart3", featured: true },
    { name: "Microsoft Excel", category: "datascience", level: 90, iconName: "FileSpreadsheet", featured: false },

    // Core Subjects
    { name: "Data Structures & Algorithms", category: "core", level: 94, iconName: "Code2", featured: true },
    { name: "DBMS", category: "core", level: 92, iconName: "Database", featured: true },
    { name: "Operating Systems", category: "core", level: 88, iconName: "Cpu", featured: false },
    { name: "Computer Networks", category: "core", level: 92, iconName: "Network", featured: true },
    { name: "Cloud Computing", category: "core", level: 88, iconName: "Cloud", featured: false },

    // Tools & Web3
    { name: "Postman & Swagger UI", category: "tools", level: 94, iconName: "CheckCircle2", featured: true },
    { name: "Ganache (Blockchain Localnet)", category: "tools", level: 90, iconName: "Cpu", featured: true },
    { name: "MetaMask (Web3 Wallet)", category: "tools", level: 92, iconName: "ShieldCheck", featured: true },
    { name: "Git & GitHub", category: "tools", level: 92, iconName: "GitBranch", featured: false },
  ],
  projects: [
    {
      id: "project-blockchain-pharma",
      title: "Supply Chain Management System for Pharmaceutical Industry",
      description: "Blockchain-based Supply Chain Management System to improve transparency, traceability, security, inventory management, and regulatory compliance in pharmaceuticals.",
      longDescription: "Developed a decentralized Supply Chain Management System to eliminate counterfeit medicines and ensure verifiable drug provenance across manufacturers, distributors, pharmacies, and patients. Implemented smart contracts in Solidity, integrated Ganache local testnets, and connected MetaMask wallet authentication with an interactive React.js dashboard.",
      tags: ["Java", "React.js", "Solidity", "Blockchain", "Ganache", "MetaMask"],
      category: "blockchain",
      demoUrl: "https://etworkapp.github.io",
      githubUrl: "https://github.com/etworkapp/pharma-supplychain-blockchain",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Developed a blockchain-based Supply Chain Management System to improve transparency, traceability, security, inventory management, and regulatory compliance in the pharmaceutical industry.",
        "Integrated React.js frontend with blockchain functionality using Solidity and Ganache.",
        "Used MetaMask for blockchain wallet integration and transaction management."
      ],
      role: "Blockchain & Full Stack Developer",
      featured: true,
      implementationNote: "Implementation: Google Drive / Academic Blockchain Repository"
    },
    {
      id: "project-aws-cycleshop",
      title: "Web Application Deployment on AWS – Cycle Shop",
      description: "Developed and deployed an interactive cycle-shop web application hosted on AWS EC2 cloud infrastructure with custom server configuration.",
      longDescription: "Engineered and provisioned cloud-hosted web infrastructure for an interactive cycle shop application. Configured Linux EC2 instances, security groups, web servers, and responsive user-friendly interfaces using HTML, CSS, and JavaScript.",
      tags: ["AWS (EC2)", "Cloud Architecture", "HTML", "CSS", "JavaScript", "Linux"],
      category: "cloud",
      demoUrl: "https://etworkapp.github.io",
      githubUrl: "https://github.com/etworkapp/aws-cycle-shop-web-app",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Developed and deployed a cycle-shop web application using AWS EC2.",
        "Created responsive and user-friendly interfaces using HTML, CSS, and JavaScript.",
        "Gained hands-on experience with cloud-based application deployment and server configuration."
      ],
      role: "Cloud & Frontend Engineer",
      featured: true,
      implementationNote: "Deployed on Amazon Web Services (AWS EC2)"
    },
    {
      id: "project-1",
      title: "DevSphere – Developer Community & Showcase",
      description: "A collaborative social platform for developers to showcase side projects, get code reviews, and discover open-source opportunities.",
      longDescription: "DevSphere provides software developers with a modern portfolio showcase, real-time feedback loops, and tech stack tagging. Features include user profiles, project bookmarking, Markdown documentation renderer, and automated OpenGraph meta previews.",
      tags: ["React", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB"],
      category: "fullstack",
      demoUrl: "https://etworkapp.github.io",
      githubUrl: "https://github.com/etworkapp/devsphere-platform",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Interactive profile and repository synchronization",
        "Responsive feed with instant search & filter",
        "Markdown README viewer with syntax highlighting",
        "Secure token authentication and REST API endpoints"
      ],
      role: "Lead Full Stack Developer",
      featured: false
    },
    {
      id: "project-2",
      title: "FinPulse – Real-Time Financial Analytics Dashboard",
      description: "High-performance financial visualization tool with live market trends, asset portfolio metrics, and interactive analytics charts.",
      longDescription: "Engineered a reactive financial tracking application with interactive candle charts, live currency conversions, historical comparisons, and customizable watchlists with zero lag.",
      tags: ["React", "TypeScript", "Recharts", "Tailwind CSS", "REST API"],
      category: "frontend",
      demoUrl: "https://etworkapp.github.io",
      githubUrl: "https://github.com/etworkapp/finpulse-analytics",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Dynamic Recharts data visualization with zoom & tooltips",
        "Configurable watchlist with local storage persistence",
        "Dark mode optimized for readability and data density",
        "Sub-second state transitions and responsive mobile views"
      ],
      role: "Frontend Architect",
      featured: false
    },
    {
      id: "project-3",
      title: "CloudTask – Agile Workflow & Kanban Manager",
      description: "Intuitive task management and team sprint planning platform with drag-and-drop boards and progress tracking.",
      longDescription: "A full-featured Kanban board system designed for remote teams. Includes drag-and-drop task reordering, priority tags, milestone tracking, team activity feeds, and exportable CSV reports.",
      tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind"],
      category: "fullstack",
      demoUrl: "https://etworkapp.github.io",
      githubUrl: "https://github.com/etworkapp/cloudtask-manager",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Smooth drag and drop column card sorting",
        "Role-based activity history and deadline warnings",
        "Filter tasks by sprint, assignee, or priority tag",
        "Clean REST API backed by relational PostgreSQL schema"
      ],
      role: "Full Stack Engineer",
      featured: false
    }
  ],
  experiences: [
    {
      id: "exp-tech-mahindra",
      role: "Software Developer",
      company: "Tech Mahindra",
      period: "Software Developer Trainee",
      location: "Pune, India",
      description: "Worked as a Java, C++, and software development trainee on backend and frontend components, developing scalable REST APIs and workflow orchestrations.",
      achievements: [
        "Worked as a Java, C++, and software development trainee on backend and frontend components.",
        "Developed a RESTful API for managing switch-match requests and improving resource allocation.",
        "Worked with Spring Boot, Node.js, SQL, Apache Kafka, Postman, Swagger UI, and Camunda.",
        "Implemented and tested API workflows and integrated event-driven communication using Apache Kafka.",
        "Documented and tested REST APIs using Swagger UI and Postman."
      ],
      technologies: ["Java", "JavaScript", "Node.js", "SQL", "Spring Boot", "Apache Kafka", "Postman", "Swagger UI", "Camunda", "TOSCA", "C++"],
      current: false
    },
    {
      id: "exp-cisco-forum",
      role: "Web Development / Software Development",
      company: "Cisco Forum Web Development",
      period: "Web Developer",
      location: "Pune, India",
      description: "Analyzed requirements and engineered interactive web workflows and responsive frontend/backend features.",
      achievements: [
        "Analyzed project requirements and understood website workflows, layouts, documentation, and technical requirements.",
        "Worked on interactive web development using Java, JavaScript, React.js, and SQL."
      ],
      technologies: ["Java", "JavaScript", "React.js", "SQL", "HTML5", "CSS3"],
      current: false
    },
    {
      id: "exp-french-classes",
      role: "French Language Instructor",
      company: "French Classes",
      period: "Language Instructor",
      location: "Pune, India",
      description: "Conducted French language instruction, developing pedagogy and international linguistic communication skills.",
      achievements: [
        "Conducted French language classes and developed communication and teaching skills.",
        "Created structured curriculum for grammar, phonetics, and conversational French fluency."
      ],
      technologies: ["French Language", "Pedagogy", "Linguistic Communication", "Cross-Cultural Teaching"],
      current: false
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech. in Computer Engineering with Blockchain Honors",
      institution: "Savitribai Phule Pune University, formerly the University of Pune",
      period: "2021 – 2024",
      location: "Pune, Maharashtra, India",
      score: "CGPA: 8.43/10",
      description: "Advanced engineering coursework in Computer Science, Data Structures, Algorithms, Distributed Systems, Software Architecture, and specialized Blockchain Honors."
    },
    {
      id: "edu-2",
      degree: "Diploma in Engineering",
      institution: "Maharashtra State Board of Technical Education, Mumbai",
      period: "2021",
      location: "Mumbai / Pune, Maharashtra, India",
      score: "Percentage: 89.33%",
      description: "Foundational technical diploma in Engineering covering computer systems, database design, software development paradigms, and applied engineering mathematics."
    },
    {
      id: "edu-3",
      degree: "Secondary School Certificate (SSC)",
      institution: "Maharashtra State Board of Secondary and Higher Secondary Education",
      period: "Completed",
      location: "Maharashtra, India",
      score: "Percentage: 78.40%",
      description: "Secondary school education emphasizing strong foundations in Mathematics, Science, and Analytical Problem Solving."
    }
  ],
  distinctions: [
    {
      id: "dist-1",
      category: "leadership",
      title: "Cisco NetAcad",
      organization: "Cisco Networking Academy",
      role: "Activity Head",
      badge: "Leadership & Club Founder",
      metrics: "500+ Students Impacted",
      highlights: [
        "Helped establish and develop the Cisco Networking club from its early stages.",
        "Conducted Cisco Networking boot camps and managed technical events with participation from 500+ students.",
        "Developed leadership, coordination, event management, and technical communication skills."
      ]
    },
    {
      id: "dist-2",
      category: "hackathon",
      title: "Oracle Hacks! Hackathon",
      organization: "Oracle & Hedera Hashgraph",
      role: "Hackathon Participant & Innovator",
      badge: "Smart Contracts & Hedera",
      metrics: "Selection Round Achiever",
      highlights: [
        "Participated in Oracle Hacks! focused on developing applications and tools using APIs and data sources for smart contract applications on Hedera Hashgraph.",
        "Submitted an innovative decentralized architecture idea and progressed through the competitive hackathon selection process."
      ]
    },
    {
      id: "dist-3",
      category: "hackathon",
      title: "Codeliedoscope 2023",
      organization: "Codeliedoscope / ORCM-NEXT",
      role: "Competitive Hacker",
      badge: "System Innovation",
      highlights: [
        "Participated in Codeliedoscope 2023: Unleashing ORCM-NEXT, solving complex engineering and algorithmic challenges."
      ]
    },
    {
      id: "dist-4",
      category: "hackathon",
      title: "BizQuezt / TechQuezt – AI & ML",
      organization: "Technical Contest Board",
      role: "Contestant",
      badge: "AI & Machine Learning",
      highlights: [
        "Participated in a rigorous technical contest covering Artificial Intelligence, Machine Learning, programming paradigms, deep code analysis, and output-based algorithmic problems."
      ]
    },
    {
      id: "dist-5",
      category: "certification",
      title: "Diploma in French Language",
      organization: "Savitribai Phule Pune University (SPPU)",
      role: "Linguistic Scholar",
      badge: "Multilingual Proficiency",
      metrics: "SPPU Certified",
      highlights: [
        "Successfully completed formal academic Diploma in French Language from Savitribai Phule Pune University, demonstrating international cross-cultural communication capability."
      ]
    },
    {
      id: "dist-6",
      category: "certification",
      title: "Cisco Networking Academy",
      organization: "Cisco Systems",
      role: "Certified Technical Specialist",
      badge: "Networking & Protocols",
      highlights: [
        "Completed comprehensive technical coursework and practical lab certifications in enterprise networking, OSI protocols, and routing topologies."
      ]
    },
    {
      id: "dist-7",
      category: "volunteering",
      title: "Nature Lovers (Lions Club Pune)",
      organization: "Nature Lovers NGO & Lions Club Pune",
      role: "Environmental Volunteer",
      badge: "Social Impact & NEP",
      metrics: "Community Impact",
      highlights: [
        "Participated in the Nature and Environment Program (NEP) focused on creating environmental awareness among school students.",
        "Conducted practical and theoretical activities related to rainwater harvesting, composting, sapling plantation, and environmental conservation.",
        "Developed teamwork, coordination, time management, leadership, and interpersonal skills."
      ]
    }
  ],
  interests: [
    "Learning Foreign Languages",
    "Entrepreneurship & Startups",
    "Quantitative Finance & Markets",
    "Deep Tech & Cloud Architectures",
    "Software Development & Open Source"
  ],
  softSkills: [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Leadership",
    "Time Management"
  ],
  languages: [
    "English",
    "Hindi",
    "Marathi",
    "French"
  ]
};

