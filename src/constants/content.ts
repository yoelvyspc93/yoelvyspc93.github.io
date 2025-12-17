export const COMMON = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
  },
  notFound: {
    title: 'Not Found',
    description: 'Could not find requested resource',
    link: 'Return Home',
  },
  consoleBanner: {
    title: 'Welcome to my portfolio!',
    description:
      "Explore my projects or contact me if you'd like to collaborate.",
    repoLabel: '📦 Repository:',
    repoUrl: 'https://github.com/yoelvyspc93/yoelvyspc93.github.io',
    contactLabel: '📨 Contact me:',
    contactEmail: 'mailto:yoelvyspc93@gmail.com',
  },
  footer: {
    copyright:
      '©2025 Yoelvys. Engineered with Next.js & Passion. All rights reserved.',
  },
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  navigationMenu: 'Navigation menu',
};

export const PERSONAL = {
  givenName: 'Yoelvys',
  familyName: 'Pérez Cabrera',
  fullName: 'Yoelvys Pérez Cabrera',
  rol: 'Senior Frontend Engineer',
  email: 'yoelvyspc93@gmail.com',
  telephone: '+53 54773819',
  birthday: '1993-07-06',
  location: {
    region: 'Villa Clara',
    country: 'CU',
  },
  siteUrl: 'https://yoelvyspc93.github.io',
  knowsLanguage: ['es', 'en'],
};

export const SOCIAL = {
  github: 'https://github.com/yoelvyspc93',
  linkedin: 'https://www.linkedin.com/in/yoelvys-perez-cabrera',
  linkedinShort: 'https://linkedin.com/in/yoelvys',
};

export const HEADER = {
  hello: 'Hi, I’m',
  name: 'Yoelvys',
  role: 'Senior Frontend Engineer',
  description:
    'I bridge the gap between design and engineering, building high-performance, scalable web applications with React, Next.js, and TypeScript. Focused on exceptional user experiences and technical excellence.',
  tag: ['2 Companies', '6+ Years of Experience', '16+ Delivered Projects'],
  download: 'Download CV',
  contact: "Let's Talk",
};

export const ABOUT = {
  description: [
    'I am a Computer Engineer with over 6 years of experience specializing in the modern web ecosystem. My core strength lies in translating complex business requirements into intuitive, pixel-perfect interfaces.',
    'Beyond coding, I focus on the entire product lifecycle—from architectural decisions and SEO strategy to performance optimization and accessibility. I thrive in agile environments where innovation, code quality, and user satisfaction are paramount.',
  ],
};

export const PROJECTS_SECTION = {
  main: 'My Main',
  mainHighlight: 'Projects',
  latest: 'Latest',
  latestHighlight: 'Projects',
  seeMore: 'See More',
};

export const EXPERIENCE = {
  title: 'My',
  titleHighlight: 'Experience',
  list: [
    {
      period: '2022 - Present',
      company: 'Dspot Team',
      rol: 'Senior Frontend Developer',
      achievement: {
        text: 'Spearheading frontend development for diverse tech, SaaS, and Web3 projects, ensuring scalability and maintainability.',
        items: [
          'Architected & Deployed: Built dynamic, high-performance applications using Next.js 15, React, and TypeScript, translating Figma designs into responsive, pixel-perfect code.',
          'UX & Interaction: Implemented advanced animations and 3D elements using GSAP, Lottie, and Spline, significantly enhancing user engagement.',
          'Performance & Quality: Optimized Core Web Vitals for SEO and implemented rigorous testing suites using Storybook, Cypress, and React Testing Library.',
          'Content Management: Integrated Headless CMS solutions (Webflow, Strapi) to empower marketing teams with flexible content updates.',
        ],
      },
    },
    {
      period: '2020 - 2022',
      company: 'Datazucar',
      rol: 'Fullstack Developer',
      achievement: {
        text: 'Served as a key developer for the "Versat ERP" ecosystem, managing complex data flows for enterprise resource planning.',
        items: [
          'Product Ownership: Independently designed and developed "Comercializador", a React-based web application for license management, automating processes for dozens of client companies.',
          'Fullstack Development: Contributed to database modeling and backend logic using Django, ensuring secure and efficient data import/export pipelines.',
          'System Optimization: Enhanced system security and reduced load times through backend refactoring and optimized frontend state management.',
        ],
      },
    },
    {
      period: '2013 – 2018',
      company: 'University',
      rol: 'Computer Engineering',
      achievement: {
        text: 'Graduated with a strong foundation in Software Engineering, Algorithms, and System Architecture. Specialized in Web Development and Object-Oriented Programming, laying the groundwork for a career in building scalable digital solutions.',
        items: [],
      },
    },
  ],
};

export const SKILLS = {
  title: 'My',
  titleHighlight: 'Skills',
  description:
    'My tech stack is focused on the JavaScript ecosystem, prioritizing tools that enable speed, scalability, and type safety.',
  list: [
    'Next.js',
    'CSS3',
    'Redux',
    'Figma',
    'React',
    'Storybook',
    'Jest',
    'React Native',
    'Webflow',
    'TypeScript',
    'Cypress',
    'WordPress',
    'Python',
    'JavaScript',
    'Chromatic',
    'Django',
    'HTML5',
  ],
};

export const CONTACT = {
  title: 'CONTACT ME',
  description: [
    "I'm currently open to new opportunities and collaborations. Whether you have a question regarding a project or want to discuss a potential role, my inbox is open.",
    'I typically respond within 24 hours.',
  ],
  form: {
    email: {
      label: 'Email',
      placeholder: 'Your email',
    },
    message: {
      label: 'Message',
      placeholder: [
        'Write your message here...',
        'Tell me about your project',
        'How can I help you?',
        'Share your idea or request',
      ],
    },
    submit: 'Send Message',
  },
};
