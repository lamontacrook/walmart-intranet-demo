import React, { useState } from "react";
import { useGraphQL } from "../../utils/gql";
import "./home.css";
import { Header } from "../index";

export const Home = () => {
  const { data, errors } = useGraphQL('/content/dam/walmart-intranet/en/layout-example-1/example-collection');

  const [hasFetched, setHasFetched] = useState(false);

  if (errors != null) {
    setHasFetched(true);
    return <div>here be errors</div>;
  } else if (!hasFetched && data === null) {
    return <div>...loading</div>;
  } else if (hasFetched && !data.collectionByPath) {
    return <div>There was an error with the returned data.</div>;
  } else if (data != null) {
    if (!hasFetched) setHasFetched(true);
    return (
      <React.Fragment>
        <Header />
        <div className="flex-container">
          <h2>{data.collectionByPath.item.collectionName}</h2>

          {data.collectionByPath.item.collectionHeros.map((hero) => (
            <div className={hero.heroLayout}>
              <div className="hero-left">
                <h4>{hero.heroHeading}</h4>
                <p dangerouslySetInnerHTML={{ __html: hero.heroBody.html }} />
              </div>
              {hero.heroImage === null || (
                <div className="hero-right">
                  <img alt="{hero.heroHeading}"
                    src={hero.heroImage._publishUrl}
                    className="hero-image"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
};
