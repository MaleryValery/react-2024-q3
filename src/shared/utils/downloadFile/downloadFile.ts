import { CardData } from '../../types/card.types';
import { generateCSV } from '../generateCSV/generateCSV';

export const downloadFile = (
  data: Record<string, CardData>,
  fileName: string
) => {
  const csvData = new Blob([generateCSV(data)], { type: 'text/csv' });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.href = csvURL;
  link.download = `${fileName}.csv`;
  link.click();
};
