import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { documentLoaded } from './store/setting/action';


class App extends React.Component {
  componentDidMount() {
    const handler = setInterval(() => {
      if (document.readyState === 'complete') {
        console.log('loagging for interval');
        this.props.dispatch(documentLoaded());
        clearInterval(handler);
      }
    }, 100);
  }

  render() {
    const urlPrefix = '/premio-frontend';
    return (
      <Helmet>
        <title>Premio Mobile App</title>
        <link rel="shortcut icon" href="/static/img/favi.png" />
        <link rel="icon" href="/static/img/favi.png" sizes="32x32" />
        <link rel="icon" href="/static/img/favi.png" sizes="192x192" />
        <link rel="apple-touch-icon-precomposed" href="/static/img/favi.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="author" content="nouthemes" />
        <meta name="keywords" content="Martfury, React, eCommerce, Template" />
        <meta name="description" content="Premio Mobile App" />
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext"
          rel="stylesheet"
        />

        <script src="https://code.jquery.com/jquery-1.12.4.min.js" />
        <script src="https://js.paystack.co/v1/paystack.js" />

        <link
          rel="stylesheet"
          // href="/static/fonts/Linearicons/Font/demo-files/demo.css"
          href={`${urlPrefix}/static/fonts/Linearicons/Font/demo-files/demo.css`}
        />

        <link
          rel="stylesheet"
          href={`${urlPrefix}/static/fonts/font-awesome/css/font-awesome.css`}
          // \static\fonts\font-awesome\css\font-awesome.css
        />

        <link
          rel="stylesheet"
          type="text/css"
          href={`${urlPrefix}/static/css/bootstrap.min.css`}
        />

        <link
          rel="stylesheet"
          type="text/css"
          href={`${urlPrefix}/static/css/slick.min.css`}
        />
      </Helmet>
    );
  }
}

export default connect()(App);
