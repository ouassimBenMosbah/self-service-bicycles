export namespace MyMapUtils {
  export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat: number = degToRadius(lat2 - lat1);
    const dLon: number = degToRadius(lon2 - lon1);
    const a: number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRadius(lat1)) * Math.cos(degToRadius(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm: number = R * c;
    return distanceInKm;
  }

  function degToRadius(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
