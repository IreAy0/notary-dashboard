const queryFormatter = (parameters: any) => Object.keys(parameters)
  .map((key) => parameters[key] && `${key}=${parameters[key]}`)
  .join('&');
  
export default queryFormatter;
