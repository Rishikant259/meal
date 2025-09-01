import React, { useEffect, useState } from "react";
import "./meal.css";

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [area, setArea] = useState("indian");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json();
      setMealData(data.meals);
    };
    fetchDataFromAPI();
  }, [area]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!inputData.trim()) return; // prevent empty search
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
    );
    const data = await api.json();
    setMealData(data.meals || []);
    setInputData("");
  };

  return (
    <>
      {/* Area buttons */}
      <div className="mx-auto text-center">
        {["indian", "canadian", "american", "thai", "british", "russian"].map(
          (cuisine) => (
            <button
              key={cuisine}
              onClick={() => setArea(cuisine)}
              type="button"
              className="btn btn-outline-primary mx-2"
            >
              {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Search */}
      <form onSubmit={submitHandler} className="mx-auto text-center my-3">
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          type="text"
          placeholder="Search for a meal..."
        />
      </form>

      {/* Meal list */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {mealData && mealData.length > 0 ? (
          mealData.map((data) => (
            <div key={data.idMeal} style={{ textAlign: "center", margin: "10px" }}>
              <img
                src={data.strMealThumb}
                alt={data.strMeal}
                style={{
                  width: "220px",
                  borderRadius: "10px",
                  border: "2px solid blue",
                }}
              />
              <h5>{data.strMeal}</h5>
            </div>
          ))
        ) : (
          <p style={{ color: "red" }}>No meals found</p>
        )}
      </div>
    </>
  );
};

export default Meal;
