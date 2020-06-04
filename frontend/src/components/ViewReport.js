import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Header from "./Header";

export default class ViewReport extends React.Component {
  render() {
    const { data } = this.props;
    const columns = [
      {
        Header: "Click to Sort",
        accessor: "date", // String-based value accessors!
        sortMethod: (a, b) => {
          let pattern = /(\d{1,3})/;
          if (a.match(pattern) && b.match(pattern)) {
            return parseInt(a.match(pattern)[0]) < parseInt(b.match(pattern)[0])
              ? 1
              : -1;
          }
        },
      },
      {
        Header: "Click to Sort",
        accessor: "category",
      },
      {
        Header: "Click to Sort",
        accessor: "status",
      },
    ];

    return (
      <div className="mainView">
        <Header />

        <div className="createView">
          <form className="myformView">
            <ReactTable
              className="-striped -highlight textAreaView"
              data={data}
              columns={columns}
              defaultSorted={[
                {
                  id: "this.state.category",
                  desc: true,
                },
              ]}
            />
          </form>
        </div>
      </div>
    );
  }
}
