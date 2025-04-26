// SearchComponent.jsx
import React from 'react';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  handleSearchChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearchClick = () => {
    console.log("Recherche lancée pour:", this.state.query);
  };

  render() {
    return (
      <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0 w-full">
        <input
          type="text"
          placeholder="Rechercher..."
          value={this.state.query}
          onChange={this.handleSearchChange}
          className="w-full p-2 rounded border border-gray-400 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
        />
        <button
          onClick={this.handleSearchClick}
          className="w-full sm:w-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Recherche
        </button>
      </div>
    );
  }
}

export default SearchComponent;
