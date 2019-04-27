/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ImageUploader from 'react-images-upload';
import { withRouter } from 'react-router-dom';

const { remote, ipcRenderer } = window.require('electron');
const Datastore = require('nedb');
const path = require('path');

const db = {};
db.teachers = new Datastore({ filename: path.join(remote.app.getPath('userData'), 'teachers.json'), autoload: true });
db.status = new Datastore({ filename: path.join(remote.app.getPath('userData'), 'status.json'), autoload: true });

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

const configTeachers = withRouter(({history}) => {
  const [addActive, setAddActive] = useState(false);
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);

  const addTeacher = () => {
    db.teachers.insert({ profile, name, department, location });
    setAddActive(false);
    
    db.teachers.find({}, (err, docs) => {
      setData(docs);
    });
  };

  const removeTeacher = (id) => {
    db.teachers.remove({_id: id});

    db.teachers.find({}, (err, docs) => {
      setData(docs);
    });
  }

  useEffect(() => {
    ipcRenderer.on('openConfig', () => {
      history.push('/main/teachers');
    });

    db.teachers.find({}, (err, docs) => {
      setData(docs);
    });
  }, []);

  const addProfile = (picture) => {
    ipcRenderer.send('addImage', picture.path);

    ipcRenderer.on('addImageComplete', (event, image) => {
      setProfile(image);
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card className="pageCard">
        <CardHeader title="선생님 목록 관리" />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>사진</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>부서</TableCell>
                <TableCell>위치</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row._id}>
                  <TableCell><img width="100" height="100" src={`data:image/jpg;base64,${row.profile}`} alt={row.name} /></TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => { removeTeacher(row._id) }}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ marginTop: 10, float: 'right' }}>
            <Button variant="contained" color="primary" onClick={() => { setAddActive(true)}}>
              추가
            </Button>
          </div>
          <Dialog
            open={addActive}
            onClose={() => { setAddActive(false) }}
            aria-labelledby="add-teacher-title"
          >
            <DialogTitle id="add-teacher-title">선생님 추가</DialogTitle>
            <DialogContent>
              선생님 사진
              <ImageUploader
                buttonText='이미지를 선택하세요'
                onChange={pictures => {
                  addProfile(pictures[0]);
                }}
                withPreview
              />
              <div>
                <div>
                  <TextField
                    label="이름"
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="부서"
                    onChange={(event) => setDepartment(event.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="위치"
                    onChange={(event) => setLocation(event.target.value)}
                    fullWidth
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setAddActive(false) }} color="primary">
                취소
              </Button>
              <Button onClick={() => { addTeacher() }} color="primary">
                추가
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
});

const configStatus = withRouter(({history}) => {
  const [addActive, setAddActive] = useState(false);
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);

  const addStudent = () => {
    db.status.insert({ profile, name, department, status });
    setAddActive(false);
    
    db.status.find({}, (err, docs) => {
      setData(docs);
    });
  };

  const removeStudent = (id) => {
    db.status.remove({_id: id});

    db.status.find({}, (err, docs) => {
      setData(docs);
    });
  }

  useEffect(() => {
    ipcRenderer.on('openConfig', () => {
      history.push('/main/status');
    });

    db.status.find({}, (err, docs) => {
      setData(docs);
    });
  }, []);

  const addProfile = (picture) => {
    ipcRenderer.send('addImage', picture.path);

    ipcRenderer.on('addImageComplete', (event, image) => {
      setProfile(image);
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card className="pageCard">
        <CardHeader title="취업/진학 현황 관리" />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>사진</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>학과</TableCell>
                <TableCell>취업/진학 현황</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row._id}>
                  <TableCell><img width="100" height="100" src={`data:image/jpg;base64,${row.profile}`} alt={row.name} /></TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => { removeStudent(row._id) }}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ marginTop: 10, float: 'right' }}>
            <Button variant="contained" color="primary" onClick={() => { setAddActive(true)}}>
              추가
            </Button>
          </div>
          <Dialog
            open={addActive}
            onClose={() => { setAddActive(false) }}
            aria-labelledby="add-teacher-title"
          >
            <DialogTitle id="add-teacher-title">취업/진학 현황 추가</DialogTitle>
            <DialogContent>
              학생 사진
              <ImageUploader
                buttonText='이미지를 선택하세요'
                onChange={pictures => {
                  addProfile(pictures[0]);
                }}
                withPreview
              />
              <div>
                <div>
                  <TextField
                    label="이름"
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="학과"
                    onChange={(event) => setDepartment(event.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="취업/진학 현황"
                    onChange={(event) => setStatus(event.target.value)}
                    fullWidth
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setAddActive(false) }} color="primary">
                취소
              </Button>
              <Button onClick={() => { addStudent() }} color="primary">
                추가
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
});

export { configTeachers, configStatus };