"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { LocationData } from "@/lib/types";

interface UseLocationTrackingProps {
  onLocationUpdate: (location: LocationData) => void;
  interval?: number; // in milliseconds
}

export function useLocationTracking({
  onLocationUpdate,
  interval = 300000, // 5 minutes default
}: UseLocationTrackingProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const handleGeolocationError = (err: GeolocationPositionError) => {
    let errorMessage = "An unknown error occurred.";
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = "Location access denied. Please enable it in your browser settings.";
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable.";
        break;
      case err.TIMEOUT:
        errorMessage = "The request to get user location timed out.";
        break;
    }
    setError(errorMessage);
    stopTracking(); // Stop tracking if there's a permission issue.
  };

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };
        setCurrentLocation(newLocation);
        if (isTracking) {
          onLocationUpdate(newLocation);
        }
      },
      handleGeolocationError,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [onLocationUpdate, isTracking]);


  const startTracking = () => {
    if (intervalId.current) return;
    
    // Check permission status first
    if(navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          setError("Location access denied. Please enable it in your browser settings.");
          return;
        }
        
        // Initial fetch
        getLocation();
        
        // Set up interval
        setIsTracking(true);
        intervalId.current = setInterval(getLocation, interval);
        
        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'denied') {
            stopTracking();
            setError("Location access has been revoked.");
          }
        };
      });
    } else {
        // Fallback for browsers that don't support Permissions API
        getLocation();
        setIsTracking(true);
        intervalId.current = setInterval(getLocation, interval);
    }
  };

  const stopTracking = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setIsTracking(false);
  };
  
  // Effect to fetch location once on mount for "Send Now" button readiness
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return { currentLocation, isTracking, error, startTracking, stopTracking };
}
