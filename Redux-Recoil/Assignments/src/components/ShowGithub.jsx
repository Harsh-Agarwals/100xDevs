import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import ColorContext from "../context/ColorContext";

const ShowGithub = () => {
    const { color } = useContext(ColorContext);
    const [gitData, setGitData] = useState(null);

    const getColor = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * 4);
        return ["yellow", "magenta", "skyblue", "purple"][randomIndex];
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.github.com/users/youssefHosni");
                setGitData(response.data.bio || "No bio available");
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
                setGitData("Failed to load bio");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <p className="gitdata" style={{ color: color === "white" ? "grey" : getColor() }}>
                {gitData}
            </p>
        </div>
    );
};

export default ShowGithub;
