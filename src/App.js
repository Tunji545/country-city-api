import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  appHead: {
    backgroundColor: '#282634',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '25px',
    color: 'white',
  },
  flex: {
    display: 'flex',
  },
  select: {
    padding: '10px',
    margin: '5px',
    backgroundColor: '#4a7afd',
    border: 'none',
    borderRadius: '50px',
    color: 'white',
    cursor: 'pointer',
  },
});

const App = () => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [singleCity, setSingleCity] = useState('');
  const [submit, setSubmit] = useState(false);

  const fetchCountries = async () => {
    const fetchCall = await axios.get(
      'https://countriesnow.space/api/v0.1/countries/'
    );
    setCountries(fetchCall.data.data);
  };

  console.log(singleCountry);
  console.log(singleCity);

  const fetchCities = async (country) => {
    setSubmit(false);
    setSingleCity(null);

    setSingleCountry(country);
    const filtered = countries.find((c) => c.country === country);
    console.log(filtered);
    setCities(filtered.cities);
  };

  const handleSubmit = () => {
    if (singleCountry && singleCity) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <div className={classes.appHead}>
        <h1>Select Your Home Town.</h1>
        <div className={classes.flex}>
          {countries && (
            <select
              className={classes.select}
              onChange={(e) => fetchCities(e.target.value)}
              value={singleCountry}
            >
              <option selected disabled hidden>
                Select Country
              </option>
              {countries.map((country) => (
                <option value={country.country} key={`${country.country}`}>
                  {country.country}
                </option>
              ))}
            </select>
          )}

          {cities && (
            <select
              className={classes.select}
              onChange={(e) => setSingleCity(e.target.value)}
              value={singleCity}
            >
              <option disabled selected hidden>
                Select City
              </option>
              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
          <button className={classes.select} onClick={handleSubmit}>
            Go
          </button>
        </div>
        {submit && (
          <h1>
            Your country is {singleCountry} and your city is {singleCity}
          </h1>
        )}
      </div>
    </div>
  );
};

export default App;
