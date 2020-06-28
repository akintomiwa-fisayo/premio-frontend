import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { connect } from 'react-redux';
import { setInfo } from '../../store/profile/action';
import ChangePassword from './ChangePassword';
import BecomeVendor from './BecomeVendor';
import Details from './details/Details';
import Followings from './Followings';
import Subscription from './Subscription';
import DisplayImage from './DisplayImage';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changePassword: false,
      becomeVendor: false,
    };

    this.prevUserId = null;
    this._isMounted = false;
    this.getUser = this.getUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.becomeVendor = this.becomeVendor.bind(this);
    this.followAction = this.followAction.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.onComponentMount();
    // alert('we in my account');
    this.props.changeHeader({
      type: 'goBack',
      label: 'Profile',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });
  }

  componentDidUpdate() {
    const { userId } = this.props.match.params;
    if (userId !== this.prevUserId) {
      this.prevUserId = userId;
      // this.getUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.resetHeader();
  }

  getUser() {
    const { props } = this;
    const { userId } = props.match.params;
    props.setInfo({ loading: true });

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/users/${userId}`,
    }).then((res) => {
      if (this._isMounted) {
        console.log('full user details is', res);
        const {
          followers, following, subscription, ...details
        } = res;
        props.setInfo({
          details,
          following,
          followers,
          subscription,
          loading: false,
        });
      }
    });
  }

  followAction(followee) {
    const { props } = this;
    const { sessionUser, profile } = this.props;
    const { following, followers } = profile;
    let followFollowee = true;
    if (followee.following) {
      followFollowee = false;
    }

    // Reflect changes in followers
    const newFollowers = [];
    followers.forEach((follower) => {
      if (follower.id === followee.id) {
        // eslint-disable-next-line no-param-reassign
        follower.following = followFollowee;
      }

      newFollowers.push(follower);
    });

    // Reflect changes in following
    let isFollowee = false;
    const newFollowing = [];
    following.forEach((followee_) => {
      if (followee_.id === followee.id) {
        isFollowee = true;
        if (followFollowee) {
          newFollowing.push(followee_);
        }
      } else {
        newFollowing.push(followee_);
      }
    });
    // register user if is now being followed but isn't registered yet
    if (!isFollowee && followFollowee) {
      newFollowing.unshift(followee);
    }

    props.setInfo({
      followers: newFollowers,
      following: newFollowing,
    });

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/users/${sessionUser.id}/followers`,
      method: followFollowee ? 'POST' : 'DELETE',
      body: JSON.stringify({
        followee: followee.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (this._isMounted) {
        if (res.following) {
          props.setInfo({
            followers: res.followers,
            following: res.following,
          });
        }
      }
    });
  }

  changePassword(changePassword = true) {
    this.setState(() => ({
      changePassword,
    }));
  }

  becomeVendor(becomeVendor = true) {
    this.setState(() => ({
      becomeVendor,
    }));
  }

  render() {
    const { state } = this;
    const {
      sessionUser, profile,
    } = this.props;
    const tabsContent = [];

    console.log('PROPS IIN THE BITCH : ', this.props);

    const profileDetails = profile.details;
    if (profile.loading) {
      return (
        <section id="myAccount" className="ps-page--account ps-container">
          <p className="page-loader" />
        </section>
      );
    }

    let tabs = [];

    if (profileDetails.isVendor) {
      tabs = [
        { title: 'Details' },
        { title: 'Following' },
        { title: 'Followers' },
        { title: 'Subscription' },
      ];

      tabsContent[0] = (
        <Details
          {...this.props}
          profileDetails={profileDetails}
        />
      );

      tabsContent[1] = (
        <Followings
          type="followings"
          users={profile.following || []}
          onAction={this.followAction}
        />
      );

      tabsContent[2] = (
        <Followings
          type="followers"
          users={profile.followers || []}
          onAction={this.followAction}
        />
      );

      tabsContent[3] = <Subscription {...this.props} />;
    } else {
      tabs = [
        { title: 'Details' },
        { title: 'Following' },
      ];

      tabsContent[0] = (
        <Details
          {...this.props}
          profileDetails={profileDetails}
        />
      );

      tabsContent[1] = (
        <Followings
          type="followings"
          users={profile.following || []}
          onAction={this.followAction}
        />
      );
    }

    return (
      <section id="myAccount" className="ps-page--account ps-container">
        <div className="ps-widget__header">
          <DisplayImage
            {...this.props}
            profileDetails={profileDetails}
          />
          <div className="user-name">
            {
              profileDetails.isVendor
                ? profileDetails.companyName
                : `${profileDetails.firstName} ${profileDetails.lastName}`
            }
          </div>
          {/* <div className="user-handle">(@AkintomiwaF)</div> */}

        </div>

        {profileDetails.isVendor ? (
          <p className="description">{profileDetails.bio}
          </p>
        ) : ''}

        <div className="actions">
          <button
            type="button"
            className="btn btn-glass"
            onClick={this.changePassword}
          >Change password
          </button>

          {!profileDetails.isVendor
            ? (
              <button
                type="button"
                className="btn btn-glass"
                onClick={this.becomeVendor}
              >Become a vendor
              </button>
            )
            : ''}
        </div>

        <Tabs
          tabs={tabs}
          initialPage={0}
          className="ps-widget__content"
          class="ps-widget__content"
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          {tabsContent}
        </Tabs>

        {state.changePassword || false
          ? (
            <ChangePassword
              {...this.props}
              onClose={() => {
                this.changePassword(false);
              }}
            />
          ) : ''}
        {state.becomeVendor
          ? (
            <BecomeVendor
              {...this.props}
              profileDetails={profileDetails}
              onClose={() => {
                this.becomeVendor(false);
              }}
            />
          ) : ''}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  setInfo: (props) => dispatch(setInfo(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
