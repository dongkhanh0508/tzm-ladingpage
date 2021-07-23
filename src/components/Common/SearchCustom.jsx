// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import fetch from 'cross-fetch';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { splitWktToLatLng } from 'utils/common';
import PropTypes from 'prop-types';

SearchCustom.prototype = {
  onSelected: PropTypes.func,
};
SearchCustom.defaultProps = {
  onSelected: null,
};

export function SearchCustom(props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const typingRef = useRef(null);
  const { t } = useTranslation();
  const { onSelected } = props;

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const searchData = (keySearch) => {
    if (keySearch === '') {
      setOptions([]);
      return;
    }
    let active = true;

    setLoading(true);
    setOptions([]);

    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/address/osm-nominatim-elastic?KeySearch=${keySearch}&IsSearchForBrand=false`
      ); // For demo purposes.
      const countries = await response.json();
      if (active) {
        const ops = Object.keys(countries).map((key) => countries[key]);
        const newOps = [...ops];
        setOptions(newOps);
      }
    })();
    setLoading(false);
    return () => {
      active = false;
    };
  };

  const handelInputChange = (event, newInputValue) => {
    const tmp = newInputValue;
    if (typingRef.current) {
      clearTimeout(typingRef?.current);
    }
    typingRef.current = setTimeout(() => {
      searchData(tmp);
    }, 700);
  };
  const handelSelected = (e, value) => {
    const rs = splitWktToLatLng(value.geom);
    onSelected(rs);
  };

  return (
    <Autocomplete
      fullWidth
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={handelSelected}
      getOptionLabel={(option) => option?.addressnonutf}
      options={options}
      loading={loading}
      noOptionsText={t('common.noOption')}
      onInputChange={handelInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('common.searchAddress')}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
