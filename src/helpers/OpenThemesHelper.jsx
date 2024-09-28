import axios from "axios";

export async function fetchOpenThemes() {
    try {
        const {data} = await axios.get(`http://localhost:8080/themes/open`);
        return data;
    } catch (error) {
        console.error("Error fetching open themes", error);
        throw error;
    }
}