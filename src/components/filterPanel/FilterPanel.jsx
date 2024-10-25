function FilterPanel({themes, filter, handleFilterChange}) {

    return (
        <div className="filter-panel">
            <label>Status:</label>
            <select onChange={(e) => handleFilterChange('status', e.target.value)} value={filter.status}>
                <option value="">All</option>
                <option value="submitted">Submitted</option>
                <option value="accepted">Accepted</option>
                <option value="published">Published</option>
                <option value="declined">Declined</option>
            </select>

            <label>Theme:</label>
            <select onChange={(e) => handleFilterChange('theme', e.target.value)} value={filter.theme}>
                <option value="">All</option>
                {themes.map((theme) => (
                    <option key={theme.id} value={theme.name}>
                        {theme.name}
                    </option>
                ))}
            </select>

            {/*<label>Author:</label>*/}
            {/*<input*/}
            {/*    type="text"*/}
            {/*    placeholder="Search by author"*/}
            {/*    onChange={(e) => onFilterChange('author', e.target.value)}*/}
            {/*    value={filter.author}*/}
            {/*/>*/}
        </div>
    )
}

export default FilterPanel;