'use client';

import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { Event } from '../../../lib/types';
import { updateEvent } from '../../../lib/services';
import { formatDate, formatTime } from '../../../lib/utils';

interface UpdateEventData {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface UpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onEventUpdated?: () => void;
}

export default function UpdateDialog({ isOpen, onClose, event, onEventUpdated }: UpdateDialogProps) {
  const [formData, setFormData] = useState<UpdateEventData>({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<UpdateEventData>>({});

  // Initialize form data when event changes
  useEffect(() => {
    if (event) {
      try {
        const eventDate = new Date(event.date);
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        
        // Ensure we have valid dates
        if (isNaN(eventDate.getTime()) || isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          console.error('Invalid date format in event:', event);
          return;
        }
        
        // Format date for input field (YYYY-MM-DD)
        const formattedDate = eventDate.toISOString().split('T')[0];
        
        // Format times for input fields (HH:MM)
        const formattedStartTime = startTime.toTimeString().slice(0, 5);
        const formattedEndTime = endTime.toTimeString().slice(0, 5);
        
        setFormData({
          name: event.name,
          date: formattedDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          location: event.location
        });
        setErrors({});
      } catch (error) {
        console.error('Error formatting event data:', error);
      }
    }
  }, [event]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UpdateEventData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Validate that end time is after start time
    if (formData.startTime && formData.endTime) {
      const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.date}T${formData.endTime}`);
      
      if (endDateTime <= startDateTime) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UpdateEventData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!event || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date with times for the API
      const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.date}T${formData.endTime}`);
      const eventDate = new Date(formData.date);

      const updatedEvent = await updateEvent(event.id, {
        name: formData.name.trim(),
        date: eventDate.toISOString(),
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        location: formData.location.trim(),
      });

      if (!updatedEvent) {
        throw new Error('Failed to update event');
      }

      // Close dialog and notify parent
      onClose();
      onEventUpdated?.();
      
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitting(false);
    setErrors({});
    onClose();
  };

  if (!event) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Update Event"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Event Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter event name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
              Start Time *
            </label>
            <input
              type="time"
              id="startTime"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.startTime ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
              End Time *
            </label>
            <input
              type="time"
              id="endTime"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.endTime ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter event location"
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Event'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
