import Button from "../button/Button.jsx";

function FilterPanel({themes, filter, handleFilterChange, handleSearch}) {

    return (
        <div className="filter-panel-container">
            <div className="filter-panel">
                <label>Status:</label>
                <select onChange={(e) => handleFilterChange('status', e.target.value)}
                        value={filter.status}>
                    <option value="">All</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="DECLINED">Declined</option>
                </select>
                <label>Theme:</label>
                <select onChange={(e) => handleFilterChange('themeId', e.target.value)}
                        value={filter.themeId}>
                    <option value="">All</option>
                    {themes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                            {theme.name} ({theme.id})
                        </option>
                    ))}
                </select>
            </div>
            <Button
                buttonType="button"
                onClick={handleSearch}
                className="button"
                buttonText="Search">
            </Button>
        </div>
    )
}

export default FilterPanel;