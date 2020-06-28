import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../store/setting/action';
import SearchBar from '../components/shared/SearchBar';
import user3 from '../public/static/img/users/1.jpg';
import { ucFirst, stringSimilarity } from '../lib/js';


class TeamMates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: false,
    };

    this.getTeamMates = this.getTeamMates.bind(this);
  }

  componentDidMount() {
    this.props.onComponentMount();
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'team Mates',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  getTeamMates(query) {
    const { props, state } = this;
    const { loading } = state;
    const { sessionUser, teamMates } = props;
    let { users } = teamMates;
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

      const tempUsers = users;
      users = [];
      tempUsers.forEach((user) => {
        if (user.score > 0) {
          users.push(user);
        }
      });
    } else {
      searchResult = users;
    }

    this.setState({ searchResult });
  }


  render() {
    const { setting, teamMates } = this.props;
    const { header, nav } = setting;
    const { searchResult } = this.state;

    const viewTeamMates = searchResult !== false ? searchResult : teamMates.users;
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
              this.getTeamMates(query);
            }}
          />
        </div>
        <Link to="/invite-friend" id="addNewContact">
          <span className="icon-plus" />
          Invite Friend
        </Link>
        <div className="client-list">
          {teamMates.loading ? (
            <p className="page-loader" />
          )
            : viewTeamMates.map((teamMate) => (
              <Link to={`/account/${teamMate.id}`} className="client">
                <div className={`avi${teamMate.isVendor ? ' vendor' : ''}`}>
                  <div className="holder">
                    <img src={teamMate.displayImage} alt="" />
                  </div>
                </div>
                <p className="name">{ucFirst(teamMate.firstName)} {teamMate.lastName}</p>
              </Link>
            ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  teamMates: state.teamMates,
});

export default connect(mapStateToProps)(TeamMates);
