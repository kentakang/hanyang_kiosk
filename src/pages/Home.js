import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';

const { ipcRenderer } = window.require('electron');

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

const newsTheme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        marginBottom: 20,
      }
    },
    MuiCardHeader: {
      title: {
        fontFamily: 'Spoqa Han Sans',
        color: '#00355e',
        fontSize: '2em',
        fontWeight: '500',
        textAlign: 'center',
      }
    },
    MuiCardContent: {
      root: {
        fontFamily: 'Spoqa Han Sans',
        textAlign: 'center',
        fontWeight: '400',
        color: '#333333',
      }
    }
  },
  typography: { useNextVariants: true },
});

const NewsList = ({news}) => {
  return news.map(
    (data) => (
      <MuiThemeProvider theme={newsTheme}>
        <Link to={`/main/news/${data.idx}`} style={{ textDecoration: 'none' }}>
          <Card key={data.idx}>
            <CardHeader title={data.title} />
            <CardContent>
              {data.date}
            </CardContent>
          </Card>
        </Link>
      </MuiThemeProvider>
    )
  );
}

class Home extends Component {
  state = {
    newsList: ['뉴스를 불러오고 있습니다']
  }

  componentDidMount() {
    ipcRenderer.send('requestNewsList');

    ipcRenderer.on('responseNewsList', (event, data) => {
      const regExp = /<a.+><span class="black10"><b>.+<\/b><\/span><\/a>/g;
      const dateExp = /<td height="20"><span class="grey1"><font color=669900>.+<\/span><\/td>/g;
      const titleList = data.match(regExp).map(title => {
        return title.replace(/(<([^>]+)>)/ig,"");
      });
      const dateList = data.match(dateExp).map(date => {
        return date.replace(/(<([^>]+)>)/ig,"");
      });
      const idxList = data.match(regExp).map(title => {
        return title.match(/idx=\d+/g);
      });

      this.setState({ 
        newsList: titleList.map((title, index) => {
          return {
            title,
            date: dateList[index].match(/[0-9][0-9].[0-9][0-9].[0-9][0-9]/g),
            idx: idxList[index].toString().replace("idx=", ""),
          }
        })
      });
    });
  };

  render() {
    const { newsList } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Card className="pageCard">
          <CardHeader title="한양 소식" />
          <CardContent>
            <NewsList news={newsList} />
          </CardContent>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Home;