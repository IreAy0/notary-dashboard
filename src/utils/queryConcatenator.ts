export default function queryConcatenator(url: string, queryObj: object) {
  return Object.entries(queryObj).reduce((urlString, [query, value]) => `${urlString}${query}=${value}&`, url);
};
