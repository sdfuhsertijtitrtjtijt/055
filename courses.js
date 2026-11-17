export const COURSES = [
  {
    id: 'react',
    title: 'React & Modern Frontend',
    category: 'Development',
    level: 'Intermediate',
    duration: '8 weeks',
    baseFee: 4200,
    icon: '⚛',
    color: 'violet',
    description:
      'Build interactive interfaces, reusable components, and production-ready React applications.',
    skills: ['React', 'Hooks', 'Projects'],
  },
  {
    id: 'python',
    title: 'Python Programming Essentials',
    category: 'Programming',
    level: 'Beginner',
    duration: '6 weeks',
    baseFee: 3000,
    icon: '⌘',
    color: 'blue',
    description:
      'Learn Python fundamentals, collections, functions, and practical problem-solving.',
    skills: ['Python', 'Logic', 'Projects'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    level: 'Beginner',
    duration: '5 weeks',
    baseFee: 2800,
    icon: '✳',
    color: 'pink',
    description:
      'Create thoughtful digital experiences with wireframes, visual design, and prototypes.',
    skills: ['Figma', 'Research', 'Design'],
  },
  {
    id: 'data',
    title: 'Data Analytics with SQL',
    category: 'Data',
    level: 'Intermediate',
    duration: '7 weeks',
    baseFee: 3600,
    icon: '▥',
    color: 'green',
    description:
      'Explore datasets, write useful SQL queries, and turn information into clear insights.',
    skills: ['SQL', 'Analysis', 'Charts'],
  },
  {
    id: 'java',
    title: 'Java & OOP Foundations',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    baseFee: 3900,
    icon: '☕',
    color: 'orange',
    description:
      'Understand object-oriented programming and build a strong foundation in Java.',
    skills: ['Java', 'OOP', 'Practice'],
  },
  {
    id: 'cloud',
    title: 'Cloud Computing Basics',
    category: 'Technology',
    level: 'Beginner',
    duration: '4 weeks',
    baseFee: 2500,
    icon: '☁',
    color: 'cyan',
    description:
      'Get familiar with cloud concepts, deployment models, and essential cloud services.',
    skills: ['Cloud', 'Services', 'Basics'],
  },
];

export const VALID_COUPONS = {
  LEARN10: 10,
  STUDENT15: 15,
};

export const INITIAL_FORM = {
  fullName: '',
  studentId: '',
  email: '',
  phone: '',
  courseId: COURSES[0].id,
  academicYear: '',
  batchSlot: '',
  paymentMethod: 'upi',
  upiId: '',
  termsAccepted: false,
};

export function validateField(name, value, form) {
  const text = String(value ?? '').trim();

  switch (name) {
    case 'fullName':
      if (text.length < 3) return 'Enter at least 3 characters.';
      return /^[\p{L}\s.'-]+$/u.test(text)
        ? ''
        : 'Use letters, spaces, apostrophes, or hyphens only.';
    case 'studentId':
      return text.length >= 5 ? '' : 'Enter a student ID with at least 5 characters.';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
        ? ''
        : 'Enter a valid email address.';
    case 'phone':
      return /^\d{10}$/.test(text) ? '' : 'Enter a 10-digit mobile number.';
    case 'courseId':
      return COURSES.some((course) => course.id === text)
        ? ''
        : 'Choose a course.';
    case 'academicYear':
      return text ? '' : 'Choose your academic year.';
    case 'batchSlot':
      return text ? '' : 'Choose a batch slot.';
    case 'upiId':
      return form.paymentMethod !== 'upi' || /^[\w.-]+@[\w.-]+$/.test(text)
        ? ''
        : 'Enter a valid UPI ID, such as learner@bank.';
    case 'termsAccepted':
      return value ? '' : 'Please accept the enrollment declaration.';
    default:
      return '';
  }
}

export function validateForm(form) {
  const fields = [
    'fullName',
    'studentId',
    'email',
    'phone',
    'courseId',
    'academicYear',
    'batchSlot',
    'upiId',
    'termsAccepted',
  ];

  return fields.reduce((errors, field) => {
    const error = validateField(field, form[field], form);
    if (error) errors[field] = error;
    return errors;
  }, {});
}
