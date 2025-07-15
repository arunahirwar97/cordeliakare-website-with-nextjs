export interface FacilityImage {
  id: string;
  title: string;
  image: string;
  badge?: string;
}

export interface DoctorData {
  id: string;
  name: string;
  // hospital: string;
  qualification:any;
  consultationFee:any;
  rating: number;
  // reviews: number;
  specialty: string;
  // distance: number;
  // price: number;
  // availability: string;
  experience: string;
  languages: string[];
  // bio: string;
  // successRate: number;
  // surgeryDepartment: string;
  address: string;
  about: string;

}

export type HospitalData = {
  about_us: string;
  facebook_url: string;
  hospital_address: string;
  hospital_email: string;
  hospital_from_day: string;
  hospital_from_time: string;
  hospital_name: string;
  hospital_phone: string;
  instagram_url: string;
  linkedIn_url: string;
  package_id: number;
  package_name: string;
  tenant_id: string;
  twitter_url: string;
  surgeryDepartments: any;
};

export interface BookingData {
  bookingType: "virtual" | "surgery" | null;
  query: string;
  documents: Array<{
    name: string;
    type: string;
    size: number;
    file?: File;
  }>;
}

export type PackageBedDetail = {
  id: number;
  bed_type: string;
  bed_type_id: number;
  duration: string;
  original_amount: number;
  amount: number;
  final_amount: number;
};

export type PackageServiceDetail = {
  id: number;
  service_id: number;
  service_name: string;
  quantity: string;
  amount: number;
  final_amount: number;
  gst: string;
};

export type PackageSurgeryDetail = {
  id: number;
  surgery_id: number;
  surgery_name: string;
  description: string | null;
  original_amount: number;
  amount: number;
  final_amount: number;
};

export type PackageMedicineDetail = {
  id: number;
  package_id: number;
  category_id: number;
  amount: number;
  final_amount: number;
};

export type PackageImplantDetail = {
  package_implant_items_id: number;
  package_implant_id: number;
  implant_name: string;
  quantity: string;
  original_amount: number;
  amount: number;
  final_amount: number;
};

export type PackageDetails = {
  package_id: number;
  package_name: string;
  total_amount: number;
  bed_details: PackageBedDetail[];
  service_details: PackageServiceDetail[];
  surgery_details: PackageSurgeryDetail[];
  medicine_details: PackageMedicineDetail[];
  implant_details: PackageImplantDetail[];
};


 // Dummy data
 export const dummyHospital = {
    id: "1234",
    name: "Advanced Medical Center",
    rating: 4.8,
    address: "123 Medical Drive, Health City, HC 12345",
    surgeryDepartments: [
      {
        name: "Orthopedic Surgery",
        doctors: [
          {
            id: "1",
            name: "Dr. Sarah Wilson",
            hospital: "Advanced Medical Center",
            rating: 4.9,
            reviews: 324,
            specialty: "Orthopedic Surgeon",
            distance: 2.3,
            price: 5000,
            availability: "Available Today",
            experience: 15,
            languages: ["English", "Hindi", "Bengali"],
            bio: "Dr. Wilson specializes in robotic-assisted joint replacements with a 98% success rate. Her minimally invasive techniques reduce recovery time by 40% compared to traditional methods.",
            successRate: 98,
            surgeryDepartment: "Orthopedic Surgery",
            address: "123 Medical Drive, Health City, HC 12345",
          },
          {
            id: "2",
            name: "Dr. Michael Chen",
            hospital: "Advanced Medical Center",
            rating: 4.7,
            reviews: 215,
            specialty: "Sports Medicine Specialist",
            distance: 2.3,
            price: 4500,
            availability: "Available Tomorrow",
            experience: 12,
            languages: ["English", "Mandarin"],
            bio: "Dr. Chen focuses on athletic injuries and arthroscopic procedures. He has worked with several professional sports teams and Olympic athletes.",
            successRate: 95,
            surgeryDepartment: "Orthopedic Surgery",
            address: "123 Medical Drive, Health City, HC 12345",
          },
        ],
      },
      {
        name: "Cardiac Surgery",
        doctors: [
          {
            id: "3",
            name: "Dr. Priya Patel",
            hospital: "Advanced Medical Center",
            rating: 4.9,
            reviews: 278,
            specialty: "Cardiothoracic Surgeon",
            distance: 2.3,
            price: 7500,
            availability: "Available Next Week",
            experience: 18,
            languages: ["English", "Gujarati", "Hindi"],
            bio: "Dr. Patel is renowned for her work in minimally invasive heart valve repairs and coronary artery bypass grafting.",
            successRate: 97,
            surgeryDepartment: "Cardiac Surgery",
            address: "123 Medical Drive, Health City, HC 12345",
          },
        ],
      },
    ],
  };

 export const facilityImages: FacilityImage[] = [
    {
      id: "1",
      title: "Operating Theater",
      image:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop",
      badge: "3D Tour Available",
    },
    {
      id: "2",
      title: "Recovery Suite",
      image:
        "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?w=400&h=250&fit=crop",
      badge: "Private Room",
    },
    {
      id: "3",
      title: "Pharmacy/Lab",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      badge: "On-site Medications",
    },
  ];