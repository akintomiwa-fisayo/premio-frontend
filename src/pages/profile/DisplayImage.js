import React, { Component } from 'react';
import { alert } from '../../lib/js';

class DisplayImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updating: false,
    };

    this._isMounted = false;
    this.filePicker = null;
    this.onUpdateImage = this.onUpdateImage.bind(this);
  }

  componentDidMount() {
    if (!this._isMounted) {
      this._isMounted = true;
      /*  this.props.setInfo({
        details: {
          firstName: 'jaguns',
        },
      }); */
    }
  }

  onUpdateImage(event) {
    const file = event.target.files[0];
    const { props } = this;
    const { sessionUser } = props;

    const validate = () => {
      let message = false;
      console.log({ file });
      if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) > -1) {
        if (file.size <= 5242880) { // <== 5mb
        } else message = 'The image you picked is too large (maximium : 5mb)';
      } else message = 'You picked an unacceptable file, please try another one (image/jpeg, image/jpg, image/png)';
      if (message) {
        alert('Cover Image Upload Error', message, 'error');
        return false;
      }
      return true;
    };

    // validate file
    if (validate()) {
      this.setState(() => ({
        updating: true,
      }));
      this.filePicker.value = null;

      console.log('the file', file);

      const body = new FormData();
      body.append('displayImage', file);

      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/users/${sessionUser.id}`,
        method: 'patch',
        body,
      }).then((data) => {
        console.log('THE DATA OF US :', data);
        if (this._isMounted) {
          const { user } = data;
          this.setState(() => ({ updating: false }));
          props.setSessionUser(user);
          props.setInfo({ details: user });
        }
      }).catch(() => {
        alert('Sorry, your request couldn\'t complete');
        this.setState(() => ({ updating: false }));
      });
    }
  }

  render() {
    const {
      profileDetails,
    } = this.props;
    const { updating } = this.state;

    return (
      <div
        className={`avi${profileDetails.isVendor ? ' vendor' : ''}${updating ? ' disabled' : ''}`}
        onClick={() => {
          if (!updating && this.filePicker) {
            this.filePicker.click();
          }
        }}
      >
        <img src={profileDetails.displayImage} alt="" />
        <span className="icon icon-camera2" />
        <input
          type="file"
          className="picker"
          accept="image/jpeg,image/jpg,image/png"
          ref={(el) => {
            this.filePicker = el;
          }}
          onChange={this.onUpdateImage}
        />
      </div>
    );
  }
}

export default DisplayImage;
