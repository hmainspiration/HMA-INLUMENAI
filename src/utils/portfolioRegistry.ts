export const getPortfolioFiles = () => {
  const files = import.meta.glob('/public/portfolio/**/*.*', { eager: true });
  return Object.keys(files).map(path => path.replace('/public', ''));
};
