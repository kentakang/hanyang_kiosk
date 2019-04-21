import React, { useEffect, useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const { ipcRenderer } = window.require('electron');

const theme = createMuiTheme({
  overrides: {
    MuiCardHeader: {
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

const News = ({match}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    ipcRenderer.send('requestNews', match.params.idx);

    ipcRenderer.on('responseNews', (event, data) => {
      const tempTitle = data.match(/<td height="40" colspan="2"><span class="black15"><b>.+<\/b><\/span><\/td>/g);
      const tempContent = data.match(/<div ID="neyongID" width="570">.+<\/div>/g);

      setTitle(tempTitle.toString().replace(/(<([^>]+)>)/ig,""));
      setContent(tempContent.toString().replace(/http:\/\/hanyangnews.com/g, "").replace(/\/pds_update\//g, "http://hanyangnews.com/pds_update/"));
    });
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Card className="pageCard">
        <CardHeader title={title} />
        <CardContent>
          {
            ReactHtmlParser(content)
          }
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

News.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default News;