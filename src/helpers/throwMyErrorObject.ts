export default (code: number, message: string) => {
  const errorObject = JSON.stringify({ code, message });

  const myError = new Error(errorObject);
  myError.name = 'errorObject';

  throw myError;
};
