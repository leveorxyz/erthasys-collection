import { format } from 'date-fns';

// File to base64 converter
export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getFormattedDate = (dateStr: string | undefined) => {
  try {
    if (dateStr) {
      return format(new Date(+dateStr * 1000), 'dd MMM yy');
    }
    return '';
  } catch (err) {
    return '';
  }
};
