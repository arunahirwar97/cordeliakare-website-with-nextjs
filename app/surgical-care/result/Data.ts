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

export type SearchData = {
  surgeryType?: string;
  priorities?: string[];
  dateRange?: { start: Date; end: Date };
  location?: string;
  healthConditions?: string[];
  coordinates?: { lat: number; lng: number };
};

export type PackageWithDistance = {
  surgery: {
    id: string;
    title: string;
    price: string;
  };
  department: {
    department_name: string;
  };
  packages: Array<{
    id: string;
    name: string;
    total_amount: number;
  }>;
  hospital: {
    name: string;
    tenant_id: string;
    address: string;
    working_days: string;
    working_time: string;
  };
  distance?: number;
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


export const testMvtPackages = {
  "success": true,
  "hospitals": [
    {
      "hospital": {
        "name": "Daffodil Hospital",
        "tenant_id": "4a3ce364-0a45-4ec8-ac98-09a96616d1a9",
        "address": "PLOT NO-388/2240, 1st Floor, AIIMS Road, Patrapada.",
        "working_days": "Mon to Sun",
        "working_time": "24x7"
      },
      "packages": [
        {
          "surgery": {
            "id": 101,
            "title": "Tonsillectomy",
            "price": 4500
          },
          "department": {
            "id": 1,
            "department_name": "ENT"
          },
          "packages": [
            {
              "id": 501,
              "name": "Basic Tonsillectomy",
              "total_amount": 4500
            }
          ]
        }
      ]
    },
    {
      "hospital": {
        "name": "Sunrise Medical Centre",
        "tenant_id": "9b2ce244-1b33-4be9-bc98-89b200ae3347",
        "address": "45 Sunrise Ave, Bhubaneswar, Odisha",
        "working_days": "Mon to Fri",
        "working_time": "9am - 6pm"
      },
      "packages": [
        {
          "surgery": {
            "id": 102,
            "title": "Appendectomy",
            "price": 12000
          },
          "department": {
            "id": 2,
            "department_name": "General Surgery"
          },
          "packages": [
            {
              "id": 502,
              "name": "Laparoscopic Appendectomy",
              "total_amount": 12000
            }
          ]
        },
        {
          "surgery": {
            "id": 103,
            "title": "Hernia Repair",
            "price": 15000
          },
          "department": {
            "id": 2,
            "department_name": "General Surgery"
          },
          "packages": [
            {
              "id": 503,
              "name": "Mesh Hernioplasty",
              "total_amount": 15000
            }
          ]
        }
      ]
    },
    {
      "hospital": {
        "name": "Green Valley Hospital",
        "tenant_id": "11aab678-22cd-44f1-af32-bb15e2a65db9",
        "address": "Sector 5, Green Valley Complex, Cuttack",
        "working_days": "Tue to Sun",
        "working_time": "10am - 8pm"
      },
      "packages": [
        {
          "surgery": {
            "id": 104,
            "title": "Cataract Surgery",
            "price": 8000
          },
          "department": {
            "id": 3,
            "department_name": "Ophthalmology"
          },
          "packages": [
            {
              "id": 504,
              "name": "Phacoemulsification with Lens Implant",
              "total_amount": 8000
            }
          ]
        },
        {
          "surgery": {
            "id": 105,
            "title": "LASIK Eye Surgery",
            "price": 20000
          },
          "department": {
            "id": 3,
            "department_name": "Ophthalmology"
          },
          "packages": [
            {
              "id": 505,
              "name": "Custom LASIK Package",
              "total_amount": 20000
            }
          ]
        }
      ]
    }
  ]
}
