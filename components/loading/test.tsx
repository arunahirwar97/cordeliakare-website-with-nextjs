'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Download, MapPin, Phone, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';


interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  location: string;
}

interface TimelineSection {
  title: string;
  expanded: boolean;
  events: TimelineEvent[];
}

const StatusComponent = () => {
   const params:any = useParams();
  const bookingId = params.bookingId as string;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [status, setStatus] = useState<'pending' | 'awaiting_confirmation' | 'confirmed'>('pending');
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Booking Under review messages
  const [reviewMessages] = useState([
    'Hospital verification in progress',
    'Doctor availability check',
    'Insurance validation',
    'Expected response: 24 hours',
  ]);

  const [doctorNotes] = useState([
    'Patient is cleared for surgery',
    'Standard pre-operative procedures apply',
    'No allergies reported',
    'Blood work results are normal',
    'Fasting required 8 hours before surgery',
  ]);

  // Timeline sections state
  const [timelineSections, setTimelineSections] = useState<Record<string, TimelineSection>>({
    preOp: {
      title: 'Pre-Surgery Assessment',
      expanded: false,
      events: [
        {
          id: 1,
          title: 'Blood Test',
          date: 'Dec 13, 2023 - 10:00 AM',
          location: 'Lab Room 2',
        },
        {
          id: 2,
          title: 'Anesthesia Consultation',
          date: 'Dec 14, 2023 - 2:00 PM',
          location: 'Room 15',
        },
        {
          id: 3,
          title: 'Pre-Op Assessment',
          date: 'Dec 15, 2023 - 9:00 AM',
          location: 'Room 12',
        },
      ],
    },
    surgery: {
      title: 'Surgery Day',
      expanded: false,
      events: [
        {
          id: 1,
          title: 'Check-in & Preparation',
          date: 'Dec 20, 2023 - 6:30 AM',
          location: 'Reception',
        },
        {
          id: 2,
          title: 'Pre-Surgery Prep',
          date: 'Dec 20, 2023 - 7:30 AM',
          location: 'Pre-Op Room',
        },
        {
          id: 3,
          title: 'Surgery Procedure',
          date: 'Dec 20, 2023 - 8:30 AM',
          location: 'OT 5',
        },
      ],
    },
    postOp: {
      title: 'Post-Surgery Follow-up',
      expanded: false,
      events: [
        {
          id: 1,
          title: 'Recovery Check',
          date: 'Dec 21, 2023 - 10:00 AM',
          location: 'Recovery Room',
        },
        {
          id: 2,
          title: 'First Follow-up',
          date: 'Dec 27, 2023 - 2:00 PM',
          location: 'Room 8',
        },
        {
          id: 3,
          title: 'Final Assessment',
          date: 'Jan 3, 2024 - 11:00 AM',
          location: 'Room 10',
        },
      ],
    },
  });

  // Fallback data if bookingData prop is not provided
  const defaultBookingData = {
    id: bookingId || 'SUR-2023-1193',
    surgeryType: 'Arthroscopic Knee Surgery',
    hospital: 'Memorial General Hospital',
    lastUpdated: '2023-12-10 10:30 AM',
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Orthopedic Surgeon',
      rating: 4.9,
      experience: '15 years',
    },
    doctorNotes: 'Patient is cleared for surgery. Standard pre-operative procedures apply.',
  };

  const data = defaultBookingData;

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          text: 'PENDING',
          color: 'text-amber-600',
          backgroundColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
        };
      case 'awaiting_confirmation':
        return {
          text: 'AWAITING CONFIRMATION',
          color: 'text-blue-600',
          backgroundColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
        };
      case 'confirmed':
        return {
          text: 'CONFIRMED',
          color: 'text-white',
          backgroundColor: 'bg-teal-500',
          borderColor: 'border-teal-500',
        };
      default:
        return {
          text: 'PENDING',
          color: 'text-amber-600',
          backgroundColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
        };
    }
  };

  const toggleSection = (sectionKey: string) => {
    setTimelineSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        expanded: !prev[sectionKey].expanded,
      },
    }));
  };

  // TODO: Implement API integration for document submission
  const handleSubmitDocuments = async () => {
    if (uploadedDocs.length === 0) {
      alert('Please upload documents before submitting');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // uploadedDocs.forEach((file, index) => {
      //   formData.append('documents', file);
      // });
      // const response = await fetch('/api/upload-documents', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        alert('Documents uploaded successfully!');
        setUploadedDocs([]);
        setIsUploading(false);
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload documents. Please try again.');
      setIsUploading(false);
    }
  };

  const getTimelineIcon = (sectionKey: string) => {
    switch (sectionKey) {
      case 'preOp':
        return status === 'confirmed' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Clock className="w-5 h-5 text-amber-500" />;
      case 'surgery':
        return status === 'confirmed' ? <CheckCircle className="w-5 h-5 text-blue-500" /> : <Clock className="w-5 h-5 text-amber-500" />;
      case 'postOp':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const getTimelineColor = (sectionKey: string) => {
    switch (sectionKey) {
      case 'preOp':
        return status === 'confirmed' ? 'border-green-500' : 'border-amber-500';
      case 'surgery':
        return status === 'confirmed' ? 'border-blue-500' : 'border-amber-500';
      case 'postOp':
        return 'border-amber-500';
      default:
        return 'border-amber-500';
    }
  };

  // TODO: Implement API integration for booking confirmation
  const handleConfirmBooking = () => {
    if (window.confirm('Are you sure you want to confirm this surgery booking?')) {
      // TODO: API call to confirm booking
      setStatus('confirmed');
      alert('Surgery booking confirmed successfully!');
    }
  };

  // TODO: Implement API integration for rescheduling
  const handleReschedule = () => {
    if (window.confirm('This will send a request to the hospital for rescheduling.')) {
      // TODO: API call to request reschedule
      console.log('Reschedule requested');
    }
  };

  // TODO: Implement API integration for cancellation
  const handleCancel = () => {
    if (window.confirm('❗ Are you sure? Refunds take 3-5 business days.')) {
      // TODO: API call to cancel surgery
      console.log('Surgery cancelled');
    }
  };

  // TODO: Implement PDF download functionality
  const handleDownloadPDF = () => {
    // TODO: API call to generate and download PDF
    alert('Surgery details PDF will be downloaded');
  };

  const copyBookingId = () => {
    navigator.clipboard.writeText(data.id);
    alert(`Booking ID ${data.id} copied to clipboard`);
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-xl font-semibold text-gray-900 flex-1">{data.surgeryType}</h1>
          <button
            onClick={copyBookingId}
            className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded"
          >
            <span className="text-sm text-gray-600">#{data.id}</span>
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-3">{data.hospital}</p>

        <div className="flex justify-start">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.backgroundColor} ${statusConfig.color} ${statusConfig.borderColor} border`}>
            {statusConfig.text}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Conditional UI based on status */}
        {status === 'pending' && (
          <div className="m-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
              <h3 className="text-base font-semibold text-amber-800">Booking Submitted</h3>
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              Your surgery booking request has been submitted. We will review your details and get back to you within 24 hours.
            </p>
          </div>
        )}

        {status === 'awaiting_confirmation' && (
          <div className="m-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-base font-semibold text-blue-800">Confirmation Required</h3>
            </div>
            <p className="text-sm text-blue-700 leading-relaxed mb-4">
              Your surgery has been scheduled. Please review the details below and confirm your booking.
            </p>
            <button
              onClick={handleConfirmBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        )}

        <div className="p-6 border-b border-gray-50">
          {/* Doctor Details */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {data.doctor.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{data.doctor.name}</h3>
                <p className="text-sm text-gray-600">{data.doctor.specialization}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-amber-600 font-medium">⭐ {data.doctor.rating}</span>
                  <span className="text-xs text-gray-500">{data.doctor.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital Details */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">{data.hospital}</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600 flex-1">123 Medical Center Drive, New York</span>
              </div>
              <button className="flex items-center hover:text-teal-600">
                <span className="text-sm mr-1">🗺️</span>
                <span className="text-sm text-teal-600 font-medium">View on Map</span>
              </button>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">1-800-555-0123</span>
              </div>
            </div>
          </div>
        </div>

        {status === 'pending' && (
          <div className="m-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Loader2 className="w-4 h-4 text-amber-600 mr-2 animate-spin" />
              <h3 className="text-base font-semibold text-gray-900">Your booking is under review</h3>
            </div>
            <div className="max-h-32 overflow-y-auto">
              <div className="space-y-2">
                {reviewMessages.map((message, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">{message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Surgery Timeline */}
        {status === 'confirmed' && (
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Surgery Timeline</h2>

            {Object.entries(timelineSections).map(([key, section]) => (
              <div key={key} className="mb-2">
                <button
                  onClick={() => toggleSection(key)}
                  className={`w-full flex items-center justify-between p-4 bg-white border ${getTimelineColor(key)} border-l-4 rounded-lg hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-center">
                    {getTimelineIcon(key)}
                    <span className="ml-3 font-medium text-gray-900">{section.title}</span>
                  </div>
                  {section.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {section.expanded && (
                  <div className="ml-6 pl-4 border-l-2 border-gray-100 mt-2">
                    {section.events.map(event => (
                      <div key={event.id} className="flex items-start mb-4">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 -ml-5"></div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.date}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Download PDF Section */}
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Surgery Details</h2>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center w-full p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl mr-3">📄</span>
            <span className="flex-1 text-sm font-medium text-gray-900 text-left">Download PDF</span>
            <Download className="w-4 h-4 text-teal-500" />
          </button>
        </div>

        {/* Doctor's Notes */}
        {status !== 'pending' && (
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Doctor's Notes</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="max-h-24 overflow-y-auto">
                <div className="space-y-2">
                  {doctorNotes.map((note, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm text-gray-700 leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents - Hide for pending status */}
        {status !== 'pending' && (
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h2>
            {/* TODO: Replace with actual DocumentUploader component */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Upload your medical documents</p>
              <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG</p>
            </div>

            {uploadedDocs.length > 0 && (
              <button
                onClick={handleSubmitDocuments}
                disabled={isUploading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading... {Math.round(uploadProgress)}%</span>
                  </div>
                ) : (
                  'Submit Documents'
                )}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6">
          {status === 'confirmed' && (
            <div className="space-y-3">
              <button
                onClick={handleReschedule}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Reschedule Surgery
              </button>

              <button
                onClick={handleCancel}
                className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel Surgery
              </button>

              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                🎧 Connect with Support
              </button>
            </div>
          )}

          {(status === 'pending' || status === 'awaiting_confirmation') && (
            <div className="space-y-3">
              <button
                onClick={handleCancel}
                className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel Request
              </button>
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                🎧 Connect with Support
              </button>
            </div>
          )}
        </div>

        {/* Cancellation Notice - Show only for confirmed status */}
        {status === 'confirmed' && (
          <div className="m-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              Please note: Cancellation within 48 hours of surgery may incur additional charges.
            </p>
          </div>
        )}

        {/* Demo Status Toggle Buttons - Remove in production */}
        <div className="m-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Demo Status Toggle:</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setStatus('pending')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
                status === 'pending' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatus('awaiting_confirmation')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
                status === 'awaiting_confirmation' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Awaiting
            </button>
            <button
              onClick={() => setStatus('confirmed')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${
                status === 'confirmed' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Confirmed
            </button>
          </div>
        </div>

        {/* TODO: Add ChatSupport component when implemented */}
        {isChatOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold">Surgery Support Chat</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">Chat support will be implemented here.</p>
                <p className="text-xs text-gray-500 mt-2">Booking ID: {data.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusComponent;