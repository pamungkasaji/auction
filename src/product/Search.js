import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Divider, MenuItem, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search';
import {list} from './api-product.js'
import Products from './Products'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#80808024'
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 130,
    verticalAlign: 'bottom',
    marginBottom: '20px'
  },
  searchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    marginBottom: '20px'
  },
  searchButton: {
    minWidth: '20px',
    height: '30px',
    padding: '0 8px',
    marginBottom: '20px'
  }
}))

export default function Search(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
      category: '',
      search: '',
      results: [],
      searched: false
  })
  const handleChange = name => event => {
    setValues({
      ...values, [name]: event.target.value,
    })
  }
  const search = () => {
    if(values.search){
      list({
        search: values.search || undefined, category: values.category
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setValues({...values, results: data, searched:true})
        }
      })
    }
  }
  const enterKey = (event) => {
    if(event.keyCode == 13){
      event.preventDefault()
      search()
    }
  }
    return (
      <div>
        <Card className={classes.card}>
          <TextField
            id="select-category"
            select
            label="Select category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal">
            <MenuItem value="All">
              All
            </MenuItem>
            { props.categories.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="search"
            label="Search products"
            type="search"
            onKeyDown={enterKey}
            onChange={handleChange('search')}
            className={classes.searchField}
            margin="normal"
          />
          <Button variant="contained" color={'primary'} className={classes.searchButton} onClick={search}>
            <SearchIcon/>
          </Button>
          <Divider/>
          <Products products={values.results} searched={values.searched}/>
        </Card>
      </div>
    )
}

Search.propTypes = {
  categories: PropTypes.array.isRequired
}