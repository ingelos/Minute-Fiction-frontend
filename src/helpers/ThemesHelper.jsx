import axios from "axios";

export async function fetchThemes() {
    try {
        const {data} = await axios.get(`http://localhost:8080/themes`);
        return data;
    } catch (error) {
        console.error("Error fetching themes", error);
        throw error;
    }
}