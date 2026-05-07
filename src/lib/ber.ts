export const getBerColor = (ber: string | null): string => {
  if (!ber) return 'bg-gray-400';
  const rating = ber.charAt(0).toUpperCase();
  switch (rating) {
    case 'A': return 'bg-green-600';
    case 'B': return 'bg-lime-500';
    case 'C': return 'bg-yellow-500';
    case 'D': return 'bg-orange-500';
    case 'E':
    case 'F':
    case 'G': return 'bg-red-600';
    default: return 'bg-gray-400';
  }
};

export const BER_LEVELS = ['Any', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

export const isBerBetterOrEqualTo = (ber: string | null, minBer: string | null): boolean => {
  if (!minBer || minBer === 'Any') return true;
  if (!ber) return false;
  
  const levels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const berIdx = levels.indexOf(ber.charAt(0).toUpperCase());
  const minIdx = levels.indexOf(minBer.charAt(0).toUpperCase());
  
  if (berIdx === -1) return false;
  return berIdx <= minIdx;
};
