export type Doctor = {
  id: string;
  name: string;
  hospital: string;
  rating: number;
  reviews: number;
  specialty: string;
  distance: number;
  price: number;
  availability: string;
  experience: number;
  languages: string[];
};

export const demoDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    hospital: "Central Medical Center",
    rating: 4.8,
    reviews: 342,
    specialty: "Cardiac Surgeon",
    distance: 2.3,
    price: 200,
    availability: "Tomorrow",
    experience: 12,
    languages: ["English", "Spanish"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    hospital: "Metropolitan Hospital",
    rating: 4.7,
    reviews: 289,
    specialty: "Neurologist",
    distance: 3.1,
    price: 180,
    availability: "Today",
    experience: 9,
    languages: ["English", "Mandarin"],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    hospital: "City General Hospital",
    rating: 4.9,
    reviews: 421,
    specialty: "Dermatologist",
    distance: 1.8,
    price: 150,
    availability: "Tomorrow",
    experience: 7,
    languages: ["English", "Spanish"],
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    hospital: "University Medical Center",
    rating: 4.6,
    reviews: 198,
    specialty: "Orthopedic Surgeon",
    distance: 4.2,
    price: 220,
    availability: "Next Week",
    experience: 15,
    languages: ["English", "French"],
  },
  {
    id: "5",
    name: "Dr. Aisha Rahman",
    hospital: "Global Health Institute",
    rating: 4.7,
    reviews: 310,
    specialty: "Pediatrician",
    distance: 2.7,
    price: 160,
    availability: "Today",
    experience: 10,
    languages: ["English", "Hindi"],
  },
  {
    id: "6",
    name: "Dr. Tomislav Novak",
    hospital: "Eastern Europe Medical Center",
    rating: 4.5,
    reviews: 175,
    specialty: "Gastroenterologist",
    distance: 3.9,
    price: 190,
    availability: "Tomorrow",
    experience: 11,
    languages: ["English", "Croatian"],
  },
  {
    id: "7",
    name: "Dr. Isabella Moretti",
    hospital: "Mediterranean Wellness Hospital",
    rating: 4.8,
    reviews: 267,
    specialty: "Ophthalmologist",
    distance: 1.5,
    price: 170,
    availability: "Today",
    experience: 8,
    languages: ["English", "Italian"],
  },
  {
    id: "8",
    name: "Dr. David Kim",
    hospital: "Northside Care Clinic",
    rating: 4.9,
    reviews: 389,
    specialty: "ENT Specialist",
    distance: 2.0,
    price: 210,
    availability: "Next Week",
    experience: 14,
    languages: ["English", "Korean"],
  },
];
