export const isValidEircode = (eircode: string) => {
  const pattern = /^[ADCEFHKNPRTVWXY]\d{1,2}[W]?\s?[A-Z0-9]{4}$/i;
  return pattern.test(eircode);
};

export const getRoutingKey = (eircode: string | null) => {
  if (!eircode) return null;
  const match = eircode.trim().match(/^([ADCEFHKNPRTVWXY]\d{1,2}[W]?)/i);
  return match ? match[1].toUpperCase() : null;
};

export const isValidRoutingKey = (key: string) => {
  const pattern = /^[ADCEFHKNPRTVWXY]\d{1,2}[W]?$/i;
  return pattern.test(key);
};
