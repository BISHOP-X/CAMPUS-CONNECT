// Aggressive cache busting for images to ensure new transparent versions load
const CACHE_VERSION = `${Date.now()}-v2`;

export const getImageUrl = (imagePath: string) => {
  return `${imagePath}?v=${CACHE_VERSION}&bust=${Math.random()}`;
};

export const LOGO_URL = getImageUrl('/CAMPUSCONNECT.png');
