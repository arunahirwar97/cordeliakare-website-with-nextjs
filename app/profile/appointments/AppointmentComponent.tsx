'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Calendar, ArrowRight, Filter, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const passFilter = ['All', 'Doctor', 'Hospital', 'Cancelled'];
const upComingFilter = ['All', 'Doctor', 'Hospital', 'Cancelled'];

const AppointmentsComponent = () => {
  const { token } = useAuth();
  const { theme } = useTheme();
  
  // Loading and UI states
  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Data states
  const [upcomingBookingData, setUpcomingBookingData] = useState([]);
  const [finalBookingData, setFinalBookingData] = useState([]);
  const [pastBookingData, setPastBookingData] = useState([]);
  const [finalPastBookingData, setFinalPastBookingData] = useState([]);
  const [cancelledPastBookings, setCancelledPastBookings] = useState([]);
  const [cancelledUpcomingBookings, setCancelledUpcomingBookings] = useState([]);
  
  // Filter states
  const [selectedUpcomingFilterIndex, setSelectedUpcomingFilterIndex] = useState(0);
  const [selectedPastFilterIndex, setSelectedPastFilterIndex] = useState(0);
  const [showUpcomingDropdown, setShowUpcomingDropdown] = useState(false);
  const [showPastDropdown, setShowPastDropdown] = useState(false);
  
  // Date filter states
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Utility function to get auth headers
  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    return `${day}/${month}/${year}`;
  };

  // Format time helper
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // API Functions (keep the same as before)
  const fetchUpcomingBookingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/getappointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status: 2,
          tab: 'upcomming'
        })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log('Fetch upcoming booking working', data.data);
        setUpcomingBookingData(data.data);
        
        let filterDataSet = data.data.filter(item => item?.is_completed !== 3);
        filterDataSet.sort((a, b) => new Date(a.opd_date) - new Date(b.opd_date));
        setFinalBookingData(filterDataSet);
      } else {
        console.log('Fetch upcoming booking error:', data);
      }
    } catch (error) {
      setLoading(false);
      console.log('Fetch upcoming booking error:', error);
    }
  };

  const fetchPastBookingData = async (startDate = null, endDate = null) => {
    try {
      setLoading(true);
      const params = {
        status: 2,
        tab: 'past'
      };
      
      if (startDate && endDate) {
        params.start_date = startDate;
        params.end_date = endDate;
      }

      const response = await fetch(`${API_BASE_URL}/api/getappointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(params)
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log('Fetch past booking working', data.data);
        setPastBookingData(data.data);
        
        let filterDataSet = data.data;
        filterDataSet.sort((a, b) => new Date(b.opd_date) - new Date(a.opd_date));
        setFinalPastBookingData(filterDataSet);
      } else {
        console.log('Fetch past booking error:', data);
      }
    } catch (error) {
      setLoading(false);
      console.log('Fetch past booking error:', error);
    }
  };

  const fetchCancelledPastBookingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/getappointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status: 3,
          tab: 'past'
        })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log('Fetch cancelled past booking working', data.data);
        setCancelledPastBookings(data.data);
      } else {
        console.log('Fetch cancelled past booking error:', data);
      }
    } catch (error) {
      setLoading(false);
      console.log('Fetch cancelled past booking error:', error);
    }
  };

  const fetchCancelledUpcomingBookingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/getappointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status: 3,
          tab: 'upcomming'
        })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log('Fetch cancelled upcoming booking working', data.data);
        setCancelledUpcomingBookings(data.data);
      } else {
        console.log('Fetch cancelled upcoming booking error:', data);
      }
    } catch (error) {
      setLoading(false);
      console.log('Fetch cancelled upcoming booking error:', error);
    }
  };

  const fetchFilteredPastBookings = async (passFromDate, passToDate) => {
    await fetchPastBookingData(passFromDate, passToDate);
  };

  // Filter handlers (keep the same as before)
  const handleUpcomingBooking = (selectedItem:any) => {
    if (!upcomingBookingData.length) return;

    let filterData = [];
    if (selectedItem === 'All') {
      filterData = upcomingBookingData.filter(item => item?.is_completed !== 3);
    } else if (selectedItem === 'Doctor') {
      filterData = upcomingBookingData.filter(
        item => item?.tenant_username === 'CordeliaKareAdmin'
      );
    } else if (selectedItem === 'Hospital') {
      filterData = upcomingBookingData.filter(
        item => item?.tenant_username !== 'CordeliaKareAdmin'
      );
    } else if (selectedItem === 'Cancelled') {
      filterData = [...cancelledUpcomingBookings];
    }

    filterData.sort((a, b) => new Date(a.opd_date) - new Date(b.opd_date));
    setFinalBookingData(filterData);
  };

  const handlePastBooking = (selectedItem) => {
    if (!pastBookingData.length) return;

    let filterData = [];
    if (selectedItem === 'All') {
      filterData = [...pastBookingData];
    } else if (selectedItem === 'Doctor') {
      filterData = pastBookingData.filter(
        item => item?.tenant_username === 'CordeliaKareAdmin'
      );
    } else if (selectedItem === 'Hospital') {
      filterData = pastBookingData.filter(
        item => item?.tenant_username !== 'CordeliaKareAdmin'
      );
    } else if (selectedItem === 'Cancelled') {
      filterData = [...cancelledPastBookings];
    }

    filterData.sort((a, b) => new Date(b.opd_date) - new Date(a.opd_date));
    setFinalPastBookingData(filterData);
  };

  // Date filter handlers (keep the same as before)
  const handleFilter = () => {
    if (!fromDate || !toDate) {
      alert('Please select "From Date" and "To Date".');
      return;
    }
    
    if (new Date(fromDate) > new Date(toDate)) {
      alert('"From Date" cannot be after "To Date".');
      return;
    }

    fetchFilteredPastBookings(fromDate, toDate);
  };

  const handleClear = () => {
    fetchPastBookingData();
    setFromDate('');
    setToDate('');
  };

  // Refresh handler (keep the same as before)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      fetchCancelledPastBookingData(),
      fetchCancelledUpcomingBookingData(),
      fetchPastBookingData(),
      fetchUpcomingBookingData()
    ]).finally(() => {
      setRefreshing(false);
      setFromDate('');
      setToDate('');
    });
  }, []);

  // Effects (keep the same as before)
  useEffect(() => {
    setSelectedUpcomingFilterIndex(0);
    fetchCancelledPastBookingData();
    fetchCancelledUpcomingBookingData();
    fetchPastBookingData();
    setActiveTab('upcoming');
    fetchUpcomingBookingData();
  }, []);

  // Appointment Card Component with dark mode
  const AppointmentCard = ({ item }:{item:any}) => {
    const timeString = formatTime(item?.opd_date);
    const formattedDate = formatDate(item?.opd_date);

    return (
      <div className={`rounded-2xl p-4 shadow-lg border transition-shadow duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 hover:shadow-gray-800' 
          : 'bg-white border-gray-100 hover:shadow-xl'
      }`}>
        <div className="flex gap-4">
          {/* Image */}
          <div className={`rounded-lg p-2 flex-shrink-0 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <img
              className="w-20 h-24 rounded-lg object-cover"
              src={
                item?.hospital_name === 'CordeliakareAdminHospital'
                  ? item?.doctor?.user?.image_url?.startsWith('https://')
                    ? item?.doctor?.user?.image_url
                    : '/placeholder-doctor.png'
                  : item?.hospital_logo?.startsWith('https://')
                  ? item?.hospital_logo
                  : '/placeholder-hospital.png'
              }
              alt="Appointment"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <p className={`text-sm flex-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Department: {item?.department?.title || 'Not Found'}
              </p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'bg-blue-50 text-blue-600'
              }`}>
                Slot - {timeString || 'Not Found'}
              </span>
            </div>

            <h3 className={`font-semibold text-lg mb-1 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {item?.hospital_name === 'CordeliakareAdminHospital'
                ? `Dr. ${item?.doctor?.user?.full_name}`
                : item?.hospital_name}
            </h3>

            {item?.hospital_name === 'CordeliakareAdminHospital' && (
              <p className={`text-sm mb-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Specialist: {item?.doctor?.specialist}
              </p>
            )}

            <p className={`text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Patient Name: {item?.patient?.patient_user?.full_name}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {formattedDate}
                </span>
              </div>
              
              <button className={`flex items-center gap-1 font-medium ${
                item?.is_completed === 1 
                  ? theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                  : theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
              }`}>
                <span className="text-sm">
                  Details
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 flex items-center gap-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
              theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
            }`}></div>
            <span className={`text-lg font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{loadingText}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`border-b px-6 py-4 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h1 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>My Appointments</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tab Navigation */}
        <div className={`p-1 rounded-lg mb-6 flex ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <button
            onClick={() => {
              setActiveTab('past');
              fetchPastBookingData();
              setSelectedUpcomingFilterIndex(0);
              setFromDate('');
              setToDate('');
            }}
            className={`flex-1 py-2 px-4 rounded-md text-center font-medium transition-colors ${
              activeTab === 'past'
                ? theme === 'dark'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : theme === 'dark'
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past
          </button>
          <button
            onClick={() => {
              setActiveTab('upcoming');
              fetchUpcomingBookingData();
              setSelectedUpcomingFilterIndex(0);
              setFromDate('');
              setToDate('');
            }}
            className={`flex-1 py-2 px-4 rounded-md text-center font-medium transition-colors ${
              activeTab === 'upcoming'
                ? theme === 'dark'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : theme === 'dark'
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Upcoming Tab Content */}
        {activeTab === 'upcoming' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Upcoming Appointments
              </h2>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Sort By:
                </span>
                <div className="relative">
                  <button
                    onClick={() => setShowUpcomingDropdown(!showUpcomingDropdown)}
                    className={`flex items-center gap-2 rounded-md px-3 py-1 text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {upComingFilter[selectedUpcomingFilterIndex]}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showUpcomingDropdown && (
                    <div className={`absolute right-0 mt-1 w-32 rounded-md shadow-lg z-10 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border border-gray-600'
                        : 'bg-white border border-gray-200'
                    }`}>
                      {upComingFilter.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleUpcomingBooking(item);
                            setSelectedUpcomingFilterIndex(index);
                            setShowUpcomingDropdown(false);
                          }}
                          className={`block w-full text-left px-3 py-2 text-sm ${
                            theme === 'dark'
                              ? 'text-gray-200 hover:bg-gray-600'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {finalBookingData.length > 0 ? (
                finalBookingData.map((item, index) => (
                  <AppointmentCard key={index} item={item} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className={`text-lg font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Appointments Not Found
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Past Tab Content */}
        {activeTab === 'past' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Past Appointments
              </h2>
            </div>

            {/* Date Filter Row */}
            <div className={`flex justify-between items-center mb-6 p-4 rounded-lg shadow-sm ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className={`border rounded-md px-3 py-2 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                  placeholder="From Date"
                />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className={`border rounded-md px-3 py-2 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                  placeholder="To Date"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFilter}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-blue-400 border-gray-600 hover:bg-gray-600'
                      : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Submit
                </button>
                <button
                  onClick={handleClear}
                  className={`flex items-center justify-center p-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-red-400 border-gray-600 hover:bg-gray-600'
                      : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {finalPastBookingData.length > 0 ? (
                finalPastBookingData.map((item, index) => (
                  <AppointmentCard key={index} item={item} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className={`text-lg font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Appointments Not Found
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsComponent;