'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, Filter, X, ArrowRight, Clock } from 'lucide-react';
import moment from 'moment';

type Appointment = {
  id: number;
  opd_date: string;
  hospital_name: string;
  department: {
    title: string;
  };
  doctor?: {
    user: {
      full_name: string;
      image_url: string;
    };
    specialist: string;
  };
  patient: {
    patient_user: {
      full_name: string;
    };
  };
  hospital_logo?: string;
  is_completed: number;
  tenant_id: string;
};

const CompletedAppointmentsPage = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Loading and UI states
  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [completedBookingData, setCompletedBookingData] = useState<Appointment[]>([]);
  const [finalBookingData, setFinalBookingData] = useState<Appointment[]>([]);

  // Date filter states
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFromDate, setIsFromDate] = useState(true);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

   const fetchCompletedBookingData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getappointments`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            status: 2,
            tab: 'completed',
          },
        }
      );

      if (response.status === 200) {
        const filterDataSet = response.data.data;
        filterDataSet.sort((a, b) => new Date(b.opd_date).getTime() - new Date(a.opd_date).getTime());
        setCompletedBookingData(filterDataSet);
        setFinalBookingData(filterDataSet);
        toast.success('Appointments loaded successfully');
      } else {
        toast.error('Failed to load appointments');
      }
    } catch (error) {
      console.error('Error fetching completed bookings:', error);
      toast.error('Error loading appointments');
    } finally {
      setLoading(false);
    }
  };

  // Ensure we only render UI on the client
  useEffect(() => {
    setMounted(true);
    fetchCompletedBookingData();
  }, []);

  if (!mounted) {
    return null;
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchCompletedBookingData()
      .finally(() => setRefreshing(false));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    return `${day}/${month}/${year}`;
  };

  const AppointmentCard = ({ item }: { item: Appointment }) => {
    const timeString = formatTime(item.opd_date);
    const formattedDate = formatDate(item.opd_date);

    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`rounded-xl p-4 mb-3 shadow-sm border ${
          resolvedTheme === 'dark' 
            ? 'bg-gray-800 border-gray-700 hover:shadow-gray-800' 
            : 'bg-white border-gray-200 hover:shadow-md'
        }`}
        onClick={() => router.push(`/bookings/${item.id}`)}
      >
        <div className="flex gap-4">
          {/* Image */}
          <div className={`rounded-lg p-2 ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <img
              className="w-20 h-24 rounded-lg object-cover"
              src={
                item.hospital_name === 'CordeliakareAdminHospital'
                  ? item.doctor?.user?.image_url?.startsWith('https://')
                    ? item.doctor.user.image_url
                    : '/placeholder-doctor.png'
                  : item.hospital_logo?.startsWith('https://')
                  ? item.hospital_logo
                  : '/placeholder-hospital.png'
              }
              alt={item.hospital_name}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} flex-1 truncate`}>
                Department: {item.department?.title || 'Not Found'}
              </p>
              <span className={`text-xs px-3 py-1 rounded-full ${
                resolvedTheme === 'dark' 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'bg-blue-50 text-blue-600'
              }`}>
                Slot - {timeString || 'Not Found'}
              </span>
            </div>

            <h3 className={`font-medium ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {item.hospital_name === 'CordeliakareAdminHospital'
                ? `Dr. ${item.doctor?.user?.full_name}`
                : item.hospital_name}
            </h3>

            {item.hospital_name === 'CordeliakareAdminHospital' && (
              <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                Specialist: {item.doctor?.specialist}
              </p>
            )}

            <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mt-2`}>
              Patient Name: {item.patient?.patient_user?.full_name}
            </p>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2">
                <Calendar className={`h-5 w-5 ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formattedDate}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className={`text-sm font-medium ${
                  item.is_completed === 1 
                    ? resolvedTheme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  Details
                </span>
                <ArrowRight className={`h-5 w-5 ${
                  item.is_completed === 1 
                    ? resolvedTheme === 'dark' ? 'text-green-400' : 'text-green-600'
                    : resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const showDatePicker = (isFrom: boolean) => {
    setIsFromDate(isFrom);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    const dateString = date.toISOString();
    if (isFromDate) {
      if (toDate && moment(dateString).isAfter(toDate)) {
        toast.error('"From Date" cannot be after "To Date"');
      } else {
        setFromDate(dateString);
      }
    } else {
      if (fromDate && moment(dateString).isBefore(fromDate)) {
        toast.error('"To Date" cannot be before "From Date"');
      } else {
        setToDate(dateString);
      }
    }
    hideDatePicker();
  };

  const handleFilter = async () => {
    if (!fromDate || !toDate) {
      toast.error('Please select both "From Date" and "To Date"');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getappointments`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            status: 2,
            tab: 'completed',
            start_date: moment(fromDate).format('YYYY-MM-DD'),
            end_date: moment(toDate).format('YYYY-MM-DD'),
          },
        }
      );

      if (response.status === 200) {
        const filterDataSet = response.data.data;
        filterDataSet.sort((a, b) => new Date(b.opd_date).getTime() - new Date(a.opd_date).getTime());
        setFinalBookingData(filterDataSet);
        toast.success('Filter applied successfully');
      } else {
        toast.error('Failed to filter appointments');
      }
    } catch (error) {
      console.error('Error filtering appointments:', error);
      toast.error('Error filtering appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    fetchCompletedBookingData();
    setFromDate(null);
    setToDate(null);
    toast.success('Filters cleared');
  };

  return (
    <div className={`min-h-screen ${resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b ${resolvedTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className={`p-2 rounded-full ${resolvedTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke={resolvedTheme === 'dark' ? 'white' : 'currentColor'}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className={`ml-4 text-xl font-semibold ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Completed Appointments
          </h1>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg flex items-center ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${resolvedTheme === 'dark' ? 'border-blue-400' : 'border-blue-600'}`}></div>
            <span className={`ml-3 text-lg ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{loadingText}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        {/* Date Filter Controls */}
        <motion.div 
          className={`p-4 rounded-lg mb-6 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => showDatePicker(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${resolvedTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border ${resolvedTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <Calendar className={`h-5 w-5 ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {fromDate ? moment(fromDate).format('MMM DD, YYYY') : 'From Date'}
                </span>
              </button>

              <button
                onClick={() => showDatePicker(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${resolvedTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border ${resolvedTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <Calendar className={`h-5 w-5 ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {toDate ? moment(toDate).format('MMM DD, YYYY') : 'To Date'}
                </span>
              </button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleFilter}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${resolvedTheme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                <Filter className="h-5 w-5" />
                <span className="text-sm">Apply Filter</span>
              </button>

              <button
                onClick={handleClear}
                className={`flex items-center justify-center p-2 rounded-lg ${resolvedTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border ${resolvedTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <X className={`h-5 w-5 ${resolvedTheme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Date Picker Modal */}
        {isDatePickerVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-lg ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-medium mb-4 ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Select {isFromDate ? 'From' : 'To'} Date
              </h3>
              <input
                type="date"
                className={`w-full p-2 rounded-lg border mb-4 ${resolvedTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                max={!isFromDate && fromDate ? moment(fromDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}
                onChange={(e) => handleDateConfirm(new Date(e.target.value))}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={hideDatePicker}
                  className={`px-4 py-2 rounded-lg ${resolvedTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={hideDatePicker}
                  className={`px-4 py-2 rounded-lg ${resolvedTheme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {finalBookingData.length > 0 ? (
            finalBookingData.map((item, index) => (
              <AppointmentCard key={index} item={item} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-8 rounded-lg text-center ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
            >
              <Clock className={`h-12 w-12 mx-auto mb-4 ${resolvedTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-medium ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                No Appointments Found
              </h3>
              <p className={`mt-2 ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {fromDate || toDate 
                  ? 'Try adjusting your date filters'
                  : 'No completed appointments available'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompletedAppointmentsPage;