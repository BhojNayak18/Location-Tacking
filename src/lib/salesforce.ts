import type { LocationData } from "./types";

interface SalesforceApiResult {
    success: boolean;
    message: string;
}

interface SalesforceLocationRecord {
    Id?: string;
    Latitude__c: number;
    Longitude__c: number;
    Timestamp__c: string;
    Employee_Id__c?: string;
    Employee_Name__c?: string;
}

// Real Salesforce API integration using custom REST endpoint
export async function updateExecutiveLocation(
    location: LocationData, 
    accessToken?: string, 
    instanceUrl?: string,
    userInfo?: { name?: string; email?: string; id?: string }
): Promise<SalesforceApiResult> {
    if (!accessToken || !instanceUrl) {
        throw new Error("Missing Salesforce authentication credentials");
    }

    try {
        // Prepare payload for your custom REST endpoint
        const locationPayload = [{
            executiveId: userInfo?.id || '',
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: location.timestamp
        }];

        console.log('Sending location payload to Salesforce:', locationPayload);

        // Use your custom REST endpoint
        const response = await fetch(
            `${instanceUrl}/services/apexrest/execLocations/`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationPayload),
            }
        );

        if (!response.ok) {
            let errorMessage = `Salesforce API Error: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (e) {
                // If response is not JSON, use status text
            }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        
        return {
            success: true,
            message: "Location sent successfully to Salesforce.",
        };

    } catch (error) {
        console.error('Salesforce API Error:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to update location in Salesforce');
    }
}
