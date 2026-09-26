const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '';
export const store = {
  name: 'MG FESTAS',
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  instagram: /^https:\/\/(www\.)?instagram\.com\//.test(instagram) ? instagram : '',
};
