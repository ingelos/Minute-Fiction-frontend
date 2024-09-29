import ThemeFilter from "../themeFilter/ThemeFilter.jsx";

function FilterThemeAndStatus({onFilterChange, onThemeChange}) {
    return (
        <div>
            <button onClick={() => onFilterChange('submitted')}>View All Submitted Stories</button>
            <button onClick={() => onFilterChange('accepted')}>View All Accepted Stories</button>
            <button onClick={() => onFilterChange('decline')}>View All Declined Stories</button>
            <button onClick={() => onFilterChange('all')}>View All Stories</button>
            <ThemeFilter onThemeChange={onThemeChange} />
        </div>
    )
}

export default FilterThemeAndStatus;