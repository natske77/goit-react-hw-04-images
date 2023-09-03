import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Input } from './Searchbar.styled';

export default function Searchbar({ fetchFirstImages }) {
  const [searchSubject, setSearchSubject] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'searchSubject': {
        setSearchSubject(value);
        break;
      }
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetchFirstImages(searchSubject);
    setSearchSubject('');
  };

  return (
    <Header>
      <form onSubmit={handleSubmit}>
        <Button type="submit">
          <span>Search</span>
        </Button>

        <Input
          type="text"
          name="searchSubject"
          value={searchSubject}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </Header>
  );
}

Searchbar.propTypes = {
  fetchFirstImages: PropTypes.func.isRequired,
};
