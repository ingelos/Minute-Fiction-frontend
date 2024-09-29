import {useEffect, useState} from "react";
import axios from "axios";

function ThemeFilter({onThemeChange}) {
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        async function fetchThemes() {
            const {data} = await axios.get(`http://localhost:8080/themes`);
            setThemes(data);
        }
        fetchThemes();
    }, []);

    return (
        <div>
            <h3>Filter By Theme</h3>
            <select onChange={(e) => onThemeChange(e.target.value)}>
                <option value="">All Themes</option>
                {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                        {theme.themeName}
                    </option>
                ))}
            </select>
        </div>
    )
}


export default ThemeFilter;