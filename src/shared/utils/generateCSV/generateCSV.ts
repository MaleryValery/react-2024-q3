import { CardData } from '../../types/card.types';

const mainKeys = ['id', 'title', 'description', 'variantDescription'];

export const generateCSV = (data: Record<string, CardData>) => {
  const headers = mainKeys.join(',');

  const csvData = Object.values(data)
    .map((value) => {
      return [
        value.id,
        value.title,
        value.description,
        value.variantDescription,
      ];
    })
    .join('\n');

  const csv = `${headers}\n${csvData}`;

  return csv;
};
