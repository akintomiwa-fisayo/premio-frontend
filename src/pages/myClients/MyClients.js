import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/shared/SearchBar';
import { ucFirst, stringSimilarity } from '../../lib/js';


class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: false,
    };
  }

  componentDidMount() {
    this.props.onComponentMount();
    this.props.changeHeader({
      type: 'goBack',
      label: 'my Clients',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });
  }

  componentWillUnmount() {
    this.props.resetHeader();
  }

  getClients(query) {
    const { props, state } = this;
    const { loading } = state;
    const { sessionUser, myClients } = props;
    const { users } = myClients;
    let searchResult = [];
    // const query = this.parseQueryString(this.props.location.search);

    if (query) {
      for (let i = 0; i < users.length; i += 1) {
        users[i].score = stringSimilarity(query, users[i].isVendor ? users[i].companyName : `${users[i].firstName} ${users[i].lastName}`);
      }

      users.sort((a, b) => {
        const scoreA = a.score;
        const scoreB = b.score;

        if (scoreA < scoreB) {
          return 1;
        }
        if (scoreA > scoreB) {
          return -1;
        }
        return 0;
      });

      searchResult = [];
      users.forEach((user) => {
        if (user.score > 0) {
          searchResult.push(user);
        }
      });
      console.log('USERS AFTER SORT IS', users);
    } else {
      searchResult = users;
    }

    this.setState({ searchResult });
  }

  render() {
    const { setting, myClients } = this.props;
    const { header, nav } = setting;
    const { searchResult } = this.state;
    const users = searchResult !== false ? searchResult : myClients.users;
    return (
      <section id="myClients">
        <div
          id="top"
          style={{
            top: `${header.height}px`,
          }}
        >
          <SearchBar
            placeholder="Search"
            onChange={(query) => {
              this.getClients(query);
            }}
          />
        </div>
        <div className="client-list">
          {myClients.loading ? (
            <p className="page-loader" />
          )
            : users.map((client) => (
              <Link to={`/account/${client.id}`} className="client">
                <div className={`avi${client.isVendor ? ' vendor' : ''}`}>
                  <div className="holder">
                    <img src={client.displayImage} alt="" />
                  </div>
                </div>
                <p className="name">{ucFirst(client.firstName)} {client.lastName}</p>
              </Link>
            ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  myClients: state.myClients,
});

export default connect(mapStateToProps)(Clients);
