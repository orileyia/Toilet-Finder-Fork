export function padding(
  a: number,
  b?: number | undefined,
  c?: number | undefined,
  d?: number | undefined
) {
  return {
    paddingTop: a,
    paddingRight: b ?? a,
    paddingBottom: c ?? a,
    paddingLeft: d ?? b ?? a,
  };
}

export function margin(
  a: number,
  b?: number | undefined,
  c?: number | undefined,
  d?: number | undefined
) {
  return {
    marginTop: a,
    marginRight: b ?? a,
    marginBottom: c ?? a,
    marginLeft: d ?? b ?? a,
  };
}

export interface RawToiletData {
  longitude: number;
  latitude: number;
  rating: number;
  price: number;
}

export type ToiletData = {
  coordinates: Coordinate;
  rating: number;
  price: number;
};

export type Coordinate = [number, number];

function toRad(degrees: number) {
  return degrees * Math.PI / 180;
}

// Function to calculate distance between two coordinates in kilometers
function calculateDistance(coor1: Coordinate, coor2: Coordinate) {
  const [lon1, lat1] = coor1;
  const [lon2, lat2] = coor2;

  const R = 6371; // Earth's radius in kilometers
  
  // Convert latitude and longitude from degrees to radians
  const lat1Rad = toRad(lat1);
  const lon1Rad = toRad(lon1);
  const lat2Rad = toRad(lat2);
  const lon2Rad = toRad(lon2);
  
  // Calculate the differences in coordinates
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;
  
  // Apply the Haversine formula
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // Calculate the distance
  const distance = R * c;
  return distance; // in kilometers
}

export function findClosestToilet(userLocation: Coordinate, toilets: ToiletData[]) {
  let closestCoordinate = null;
  let smallestDistance = Infinity; // Start with a very large number
  
  for (let i = 0; i < toilets.length; i++) {
      const toilet = toilets[i];
      
      // Calculate distance to coordinate1
      const distance = calculateDistance(userLocation, toilet.coordinates);
      
      // Check if the current distance is smaller than the smallest distance found so far
      if (distance < smallestDistance) {
          smallestDistance = distance;
          closestCoordinate = toilet;
      }
  }
  
  return closestCoordinate; // Return the closest coordinate
}

