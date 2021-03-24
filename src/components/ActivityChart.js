import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const ActivityChart = () => {
  const [fetchedData, setFetchedData] = useState([]);

  // fetching data for the api endpoint and store it in the state
  useEffect(() => {
    const fetchData = async () => {
      return await fetch(
        "https://marketune-visualization-test.herokuapp.com/getData"
      )
        .then((res) => res.json())
        .then((data) => setFetchedData(data))
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  // vars to store the user goaltype and points the comes from the api
  const goalTypeArr = [];
  const points = {};

  // map through the state and store the user points in points object based on if it has the key or not
  fetchedData.map((dataObj) => {
    if (dataObj.goal && dataObj.goal !== undefined) {
      return points.hasOwnProperty(dataObj.goal.goal_type)
        ? (points[dataObj.goal.goal_type] += dataObj.goal.points_in)
        : (points[dataObj.goal.goal_type] = dataObj.goal.points_in);
    } else {
      return points;
    }
  });

  // map through the state and store the user goal type in the goaltypearr if it's not included
  fetchedData.map((dataObj) => {
    if (dataObj.goal && dataObj.goal !== undefined) {
      return goalTypeArr.includes(dataObj.goal.goal_type)
        ? goalTypeArr
        : goalTypeArr.push(dataObj.goal.goal_type);
    } else {
      return goalTypeArr;
    }
  });

  return (
    <div>
      <Bar
        data={{
          labels: goalTypeArr,
          datasets: [
            {
              label: "User Activity",
              data: Object.values(points),
              backgroundColor: [
                "yellow",
                "green",
                "orange",
                "red",
                "blue",
                "black",
                "tomato",
                "purple",
              ],
            },
          ],
        }}
        width={600}
        height={400}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default ActivityChart;
