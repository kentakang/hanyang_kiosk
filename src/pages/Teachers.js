/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

const { remote, ipcRenderer } = window.require('electron');
const Datastore = require('nedb');
const path = require('path');

const theme = createMuiTheme({
  overrides: {
    MuiCardHeader: {
      root: {
        height: 42,
      },
      title: {
        fontFamily: 'Spoqa Han Sans',
        color: '#00355e',
        fontSize: '2em',
        fontWeight: '500'
      }
    },
    MuiCardContent: {
      root: {
        backgroundColor: '#eeeeee',
        height: 1500,
        overflow: 'auto',
      }
    }
  },
  typography: { useNextVariants: true },
});

const teacherCardTheme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        width: 200,
      },
    },
    MuiCardMedia: {
      root: {
        height: 200,
      },
    }
  },
  typography: { useNextVariants: true },
});

const TeacherCard = ({row}) => {
  return (
    <MuiThemeProvider theme={teacherCardTheme}>
      <Card key={row._id}>
        <CardMedia
          image={`data:image/jpg;base64,${row.profile}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {row.name}
          </Typography>
          <Typography component="p">
            부서 : {row.department}
          </Typography>
          <Typography component="p">
            위치 : {row.location}
          </Typography>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

TeacherCard.propTypes = {
  row: PropTypes.shape.isRequired,
};

const Teachers = withRouter(({history}) => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');
  const [locationList, setLocationList] = useState([]);
  const db = new Datastore({ filename: path.join(remote.app.getPath('userData'), 'teachers.json'), autoload: true });

  useEffect(() => {
    ipcRenderer.on('openConfig', () => {
      history.push('/main/config/teachers');
    });

    db.find({}, (err, docs) => {
      setData(docs);
    });

    db.find({}, { _id: 0, department: 0, name: 0, profile: 0 }, (err, docs) => {
      const locations = docs.map(doc => { return doc.location });

      setLocationList(locations.filter((item, index) => locations.indexOf(item) === index));
    });
  }, []);

  useEffect(() => {
    if (location !== '') {
      db.find({ location }, (err, docs) => {
        setData(docs);
      });
    }
  }, [location]);

  return (
    <MuiThemeProvider theme={theme}>
      <Card className="pageCard">
        <CardHeader 
          title="선생님" 
          action={(
            <div style={{ padding: 10 }}>
              <TextField select value={location} onChange={(event) => setLocation(event.target.value)}>
                {locationList.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>))
                }
              </TextField>
            </div>
          )}
        />
        <CardContent>
          <div className="grid">
            {
              data.map(row => (
                <div className="gridCell" key={row._id}>
                  <TeacherCard row={row} />
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
});

export default Teachers;