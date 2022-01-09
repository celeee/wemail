import React, { useEffect, useState } from "react";

type MyProps = {
  file: any;
};
type MyState = {
  loading: boolean;
  thumb: any;
};

export default class Thumb extends React.Component<MyProps, MyState> {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps: any) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { loading, thumb } = this.state;

    if (!this.props.file) {
      return null;
    }

    return (
      <img
        src={thumb}
        alt={this.props.file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    );
  }
}
