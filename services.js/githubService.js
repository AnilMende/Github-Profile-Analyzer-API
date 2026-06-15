import axios from "axios";

export const fetchGithubProfile = async (username) => {

    const response = await axios.get(
        `https://api.github.com/users/${username}`
    );

    return response.data;
}

// for language specific repo analysis
export const fetchGithubRepos = async (username) => {

    const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
    );

    return response.data;
}