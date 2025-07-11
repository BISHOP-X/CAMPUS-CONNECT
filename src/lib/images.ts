// Cache busting for images to ensure new transparent versions load
const CACHE_VERSION = Date.now();

export const getImageUrl = (imagePath: string) => {
  return `${imagePath}?v=${CACHE_VERSION}`;
};

export const LOGO_URL = getImageUrl('/CAMPUSCONNECT.png');
