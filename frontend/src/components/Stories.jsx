import React, { useState, useEffect } from "react";

const Stories = () => {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3VOtaRJxLi1C4WJG0F7SY9mVxKneowzL"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from NY Times API");
        }

        const data = await response.json();
        setTopStories(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {topStories.map((story) => (
          <div key={story.title} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={story.multimedia[0]?.url}
                className="card-img-top"
                alt={story.title}
              />
              <div className="card-body">
                <h5 className="card-title">{story.title}</h5>
                <p className="card-text">{story.abstract}</p>
                <a
                  href={story.url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
