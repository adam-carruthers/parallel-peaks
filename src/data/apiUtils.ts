export const baseUrl = "http://192.168.0.97:8000"; //"http://127.0.0.1:8000";

export class APIError extends Error {
  // Class to mark that an error has a message printable to the end user
}

export class APIFormError extends Error {
  errorObj: Record<string, string[]>;

  constructor(errorObj: Record<string, string[]>) {
    super();
    this.errorObj = errorObj;
  }

  getErrorObjNoListsJustStrings() {
    return convertListsOfStringsToStringsInErrorObjects(this.errorObj);
  }
}

export const convertListsOfStringsToStringsInErrorObjects = (
  errorObj: Record<string, string[]>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(errorObj).map(([errKey, errListOfStrings]) => [
      errKey,
      errListOfStrings.join(" "),
    ])
  );
