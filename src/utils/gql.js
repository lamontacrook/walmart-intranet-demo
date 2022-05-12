import { useState, useEffect } from "react";
const AEMHeadless = require("@adobe/aem-headless-client-js");

const { REACT_APP_AUTH, REACT_APP_ENDPOINT, REACT_APP_SERVICEURL } = process.env;

export function useGraphQL(path) {
  let [data, setData] = useState(null);
  let [errors, setErrors] = useState(null);

  useEffect(() => {

    const sdk = new AEMHeadless({
      serviceURL: REACT_APP_SERVICEURL,
      endpoint: REACT_APP_ENDPOINT,
      auth:REACT_APP_AUTH.split(":"),
    });

    const request = query(path)
      ? sdk.runQuery.bind(sdk)
      : sdk.runPersistedQuery.bind(sdk);
    request(query(path))
      .then(({ data, errors }) => {
      
        if (errors) setErrors(mapErrors(errors));
        if (data) setData(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, [path]);

  return { data, errors };
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
export function mapErrors(errors) {
  return errors
    .map((error) => (error.message ? error.message : error))
    .join(",");
}

const query = (path) => { return `
{
	collectionByPath(_path: "${path}") {
    item {
      collectionName
      collectionHeros {
        ...on HeroModel {
          heroHeading
          heroBody {
            html
            markdown
            plaintext
            json
          }
          heroImage {
            ...on ImageRef {
              _authorUrl
              _publishUrl
            }
          }
          heroLayout
        }
      }
    }
  }
}
`};
