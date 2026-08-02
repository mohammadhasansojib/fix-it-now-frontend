export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  technicianId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export const formatPrice = (price: string): string => {
  const value = Number(price);
  return Number.isFinite(value) ? `$${value.toFixed(2)}` : `$${price}`;
};

export const formatDuration = (minutes: number): string => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr`;
  return `${hrs} hr ${mins} min`;
};