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
        width: 150,
      },
    },
    MuiCardMedia: {
      root: {
        height: 150,
      },
    }
  },
  typography: { useNextVariants: true },
});

const StatusCard = ({row}) => {
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
            {row.department}
          </Typography>
          <Typography component="p">
            {row.status}
          </Typography>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

StatusCard.propTypes = {
  row: PropTypes.shape.isRequired,
};

const Status = withRouter(({history}) => {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const db = new Datastore({ filename: path.join(remote.app.getPath('userData'), 'status.json'), autoload: true });

  useEffect(() => {
    ipcRenderer.on('openConfig', () => {
      history.push('/main/config/status');
    });

    db.find({}, (err, docs) => {
      setData(docs);
    });

    db.find({}, { _id: 0, status: 0, name: 0, profile: 0 }, (err, docs) => {
      const departments = docs.map(doc => { return doc.department });

      setDepartmentList(departments.filter((item, index) => departments.indexOf(item) === index));
    });
  }, []);

  useEffect(() => {
    if (department !== '') {
      db.find({ department }, (err, docs) => {
        setData(docs);
      });
    }
  }, [department]);

  return (
    <MuiThemeProvider theme={theme}>
      <Card className="pageCard">
        <CardHeader 
          title="취업/진학 현황" 
          action={(
            <div style={{ padding: 10 }}>
              <TextField select value={department} onChange={(event) => setDepartment(event.target.value)}>
                {departmentList.map(option => (
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
                  <StatusCard row={row} />
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
});

export default Status;