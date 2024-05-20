import { ApiResponse } from '../../interface/response/api-response';

export const setApiResponse = (data: any): ApiResponse => {
  console.log(`Response [200]: ${JSON.stringify(data)}`);
  return new ApiResponse(true, data);
};

// filter out keys with undefined values
export function filterObjKeys(obj: any): any {
  const updatedObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] != null) {
      updatedObj[key] = obj[key];
    }
  });

  return updatedObj;
}
