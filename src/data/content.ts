export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  popular?: boolean;
  details: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  credentials: string[];
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  treatment: string;
  verified: boolean;
  avatarText: string;
}

export interface TrustPoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const TRUST_POINTS: TrustPoint[] = [
  {
    id: '1',
    title: 'Experienced Dentists',
    description: 'Certified specialists with 10+ years of clinical excellence and gentle care.',
    iconName: 'Award'
  },
  {
    id: '2',
    title: 'Modern Clinic',
    description: 'Equipped with digital X-rays, painless laser tech, and sterile surgical suites.',
    iconName: 'ShieldCheck'
  },
  {
    id: '3',
    title: '4.9/5 Patient Rating',
    description: 'Trusted by over 5,000+ happy families and rated 5-star across local listings.',
    iconName: 'Star'
  },
  {
    id: '4',
    title: 'Flexible Appointments',
    description: 'Same-day emergency visits, early mornings, and Saturday evening slots available.',
    iconName: 'CalendarClock'
  },
  {
    id: '5',
    title: 'Affordable Treatment',
    description: 'Transparent pricing with zero hidden charges, flexible payment plans & insurance support.',
    iconName: 'Wallet'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    description: 'Regular checkups, dental exams, fillings, and preventative care for optimal oral health.',
    iconName: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    popular: true,
    details: 'Comprehensive oral examinations, cavity prevention, digital x-rays, and customized preventative hygiene plans.'
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Professional smile enhancement removing years of stains safely and effectively.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
    popular: true,
    details: 'In-office 1-hour laser whitening and custom take-home kits that brighten teeth up to 8 shades.'
  },
  {
    id: 'dental-cleaning',
    title: 'Dental Cleaning',
    description: 'Professional ultrasonic cleaning and plaque removal for healthier teeth and gums.',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
    details: 'Deep scaling, polishing, and periodontal care to prevent gum disease and maintain fresh breath.'
  },
  {
    id: 'dental-crowns',
    title: 'Dental Crowns',
    description: 'Restore damaged, broken, or weakened teeth with natural-looking ceramic crowns.',
    iconName: 'Shield',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600',
    details: 'Custom color-matched porcelain & zirconia crowns designed for durability, strength, and flawless aesthetics.'
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description: 'Improve tooth alignment and smile aesthetics with modern clear aligners or braces.',
    iconName: 'CheckCircle2',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    details: 'Invisible aligners and precision braces tailored for teens and adults seeking straight, confident smiles.'
  },
  {
    id: 'emergency-care',
    title: 'Emergency Dental Care',
    description: 'Immediate relief and same-day priority appointments for severe toothaches or injuries.',
    iconName: 'AlertCircle',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600',
    popular: true,
    details: 'Rapid response care for severe toothaches, broken teeth, lost restorations, and sports dental trauma.'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Rao',
    role: 'Lead Dentist & Oral Surgeon',
    experience: '10+ Years Experience',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    credentials: ['BDS, MDS - Oral & Maxillofacial Surgery', 'Member, Indian Dental Association', 'Certified Aesthetic Restorative Dentist'],
    bio: 'Specializing in gentle dental surgery, complex restorations, and anxiety-free patient care. Dedicated to family dental wellness.'
  },
  {
    id: 'dr-rahul',
    name: 'Dr. Rahul Mehta',
    role: 'Orthodontist & Smile Specialist',
    experience: '8+ Years Experience',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    credentials: ['BDS, MDS - Orthodontics & Dentofacial Orthopedics', 'Certified Clear Aligner Provider', 'Ex-Resident Dental Specialist'],
    bio: 'Passionate about creating balanced, natural smiles using modern clear aligner therapy and minimally invasive techniques.'
  },
  {
    id: 'dr-sneha',
    name: 'Dr. Sneha Kapoor',
    role: 'Pediatric & Preventive Dentist',
    experience: '6+ Years Experience',
    image: 'https://images.unsplash.com/photo-1594824813515-05d63f350c26?auto=format&fit=crop&q=80&w=600',
    credentials: ['BDS, Fellowship in Pediatric Dentistry', 'Specialist in Child Oral Health & Preventive Care'],
    bio: 'Loved by kids and parents alike for creating a calm, fun, and fear-free dental experience for children of all ages.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya R.',
    rating: 5,
    comment: 'The staff were exceptionally friendly and the entire appointment was very smooth. Dr. Ananya made me feel comfortable throughout my root canal treatment. Highly recommended!',
    treatment: 'Root Canal & Crown',
    verified: true,
    avatarText: 'PR'
  },
  {
    id: '2',
    name: 'Vikram Sharma',
    rating: 5,
    comment: 'Got my teeth whitening and cleaning done before my wedding. The results were unbelievable and completely painless! Modern equipment and spotless clinic.',
    treatment: 'Teeth Whitening',
    verified: true,
    avatarText: 'VS'
  },
  {
    id: '3',
    name: 'Meera Deshmukh',
    rating: 5,
    comment: 'Brought my 7-year-old son here for his first cavity filling. The doctors are so gentle and patient with children. He wasn\'t scared at all and even asked when we can go back!',
    treatment: 'Pediatric Dental Care',
    verified: true,
    avatarText: 'MD'
  }
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose Your Service',
    description: 'Select the treatment or consultation you need from our comprehensive list of dental solutions.'
  },
  {
    step: '02',
    title: 'Choose Your Date',
    description: 'Pick a convenient appointment date and time slot that fits seamlessly into your daily schedule.'
  },
  {
    step: '03',
    title: 'Meet Your Dentist',
    description: 'Visit our comfortable clinic, receive gentle professional care, and leave with a confident smile.'
  }
];
