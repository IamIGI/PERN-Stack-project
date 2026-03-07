function camelToWords(value: string): string {
  return value.replace(/([A-Z])/g, ' $1').toLowerCase();
}

export default {
  camelToWords,
};
