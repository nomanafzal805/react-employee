import React, { Component } from "react";
import "./App.css";
import swal from "sweetalert";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: null,
      employees: [],
      frname: "",
      names: "",
      email: "",
      salary: "",
      date: "",
      userEmail: "",
      userPass: "",
      isUser: false
    };
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  signIn() {
    const Const_Email = "nomanafzal805@gmail.com";
    const Const_Pass = "98765";
    const { userEmail, userPass, isUser } = this.state;

    if (userEmail === Const_Email && userPass === Const_Pass) {
      this.setState({ isUser: true });
      swal("Hurray!", "You are logged in succesfully", "success");
    } else swal("Error", "Please enter correct credentials", "error");
  }

  logout() {
    this.setState({ isUser: false });
    swal("Info!", "You are logged out succesfully", "info");
  }

  add() {
    const { frname, names, email, salary, date, employees } = this.state;

    let employeObj = {
      frname,
      names,
      email,
      salary,
      date
    };
    employees.push(employeObj);
    this.setState({
      employees,
      frname: "",
      names: "",
      email: "",
      salary: "",
      date: ""
    });
    console.log(this.state.employees);
  }

  updateTodo() {
    const {
      currentIndex,
      employees,
      frname,
      names,
      email,
      salary,
      date
    } = this.state;
    let updatedObj = {
      frname,
      names,
      email,
      salary,
      date
    };
    employees[currentIndex] = updatedObj;
    this.setState({
      currentIndex: null,
      frname: "",
      names: "",
      email: "",
      salary: "",
      date: ""
    });
  }

  edit(index) {
    const { employees } = this.state;

    this.setState({
      currentIndex: index,
      frname: employees[index].frname,
      names: employees[index].names,
      email: employees[index].email,
      salary: employees[index].salary,
      date: employees[index].date
    });
  }

  delete(index) {
    const { employees } = this.state;
    employees.splice(index, 1);
    this.setState({ employees, currentIndex: null });
  }

  cancel() {
    this.setState({
      currentIndex: null,
      frname: "",
      names: "",
      email: "",
      salary: "",
      date: ""
    });
  }

  renderTodos() {
    const { employees } = this.state;
    return (
      <tbody>
        {employees.map((row, index) => {
          return (
            <tr key={`${row.email}_${index}`}>
              <th scope="row">{index + 1}</th>
              <td>{row.frname}</td>
              <td>{row.names}</td>
              <td>{row.email}</td>
              <td>{row.salary}</td>
              <td>{row.date}</td>
              <td>
                <button
                  onClick={this.edit.bind(this, index)}
                  data-toggle="modal"
                  data-target="#registermodal"
                  className="btn btn-success btn-sm"
                >
                  <i className="fa fa-pencil" />
                </button>
                <button
                  onClick={this.delete.bind(this, index)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="fa fa-trash" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  renderAddModal() {
    return (
      <div
        className="modal fade"
        id="registermodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registermodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registermodalLabel">
                {this.state.currentIndex != null && (
                  <p>
                    You are editing item # {this.state.currentIndex + 1}{" "}
                    currently
                  </p>
                )}
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="frname" className="">
                First Name:
              </label>
              <input
                type="text"
                required="required"
                className="form-control"
                placeholder="Noman"
                onChange={e => {
                  this.setState({ frname: e.target.value });
                }}
                value={this.state.frname}
              />
              <label htmlFor="names" className="">
                Last Name:{" "}
              </label>
              <input
                type="text"
                placeholder="Noman"
                className="form-control"
                onChange={e => {
                  this.setState({ names: e.target.value });
                }}
                value={this.state.names}
              />
              <label htmlFor="email" className="">
                Email:
              </label>
              <input
                type="email"
                required="required"
                placeholder="noman@example.com"
                className="form-control"
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                value={this.state.email}
              />
              <label htmlFor="salary" className="">
                Salary:
              </label>
              <input
                type="number"
                required="required"
                placeholder="XXXXX"
                className="form-control"
                onChange={e => {
                  this.setState({ salary: e.target.value });
                }}
                value={this.state.salary}
              />
              <label htmlFor="email" className="">
                Employees Start Date:
              </label>
              <input
                type="date"
                required="required"
                placeholder="select date"
                className="form-control"
                onChange={e => {
                  this.setState({ date: e.target.value });
                }}
                value={this.state.date}
              />
            </div>
            <div className="modal-footer">
              {this.state.currentIndex != null ? (
                <span>
                  <button
                    onClick={this.cancel}
                    data-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={this.updateTodo}
                    data-dismiss="modal"
                    className="btn btn-success"
                  >
                    Update
                  </button>
                </span>
              ) : (
                <span>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={this.add}
                  >
                    Create
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAuthModal() {
    return (
      <div
        className="modal fade"
        id="signinmodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="signinmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signinmodalLabel">
                Sign In
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                required="required"
                placeholder="abc@example.com"
                className="form-control"
                onChange={e => {
                  this.setState({ userEmail: e.target.value });
                }}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                required="required"
                placeholder="**********"
                className="form-control"
                onChange={e => {
                  this.setState({ userPass: e.target.value });
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => {
                  this.signIn();
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderHeader() {
    return (
      <header>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light navBG">
            <a className="navbar-brand" href="JavaScript:Void(0);">
              Employees List
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto" />
              {!this.state.isUser ? (
                <button
                  className="btn btn-info my-2 my-sm-0"
                  type="submit"
                  data-toggle="modal"
                  data-target="#signinmodal"
                >
                  <i className=" fa fa-sign-in" /> Log In
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    this.logout();
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
        {this.renderAuthModal()}
        {}
        {this.renderAddModal()}
        {}
      </header>
    );
  }

  renderBody() {
    const { currentIndex } = this.state;

    return (
      <div style={{ marginBottom: "50px" }}>
        <div className="container">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID Number</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Salary</th>
                <th scope="col">Job Start Date</th>
                <th scope="col">Edit/Update</th>
              </tr>
            </thead>
            {this.renderTodos()}
          </table>
        </div>
        {currentIndex == null ? (
          <button
            className="btn btn-danger btn-lg"
            style={{
              position: "absolute",
              top: "80%",
              left: "90%",
              borderRadius: "80px"
            }}
            data-toggle="modal"
            data-target="#registermodal"
          >
            <i className="fa fa-plus" />
          </button>
        ) : (
          <span />
        )}
      </div>
    );
  }

  renderFooter() {
    const footer_style = {
      position: "fixed",
      bottom: 0,
      width: "100%",
      backgroundColor: "lightgreen",
      color: "black",
      padding: "10px 0",
      margin: 0
    };
    return (
      <footer style={footer_style}>
        All rights reserved | Noman Afzal &copy;
      </footer>
    );
  }

  render() {
    console.log(this.state.isUser);

    return (
      <div className="App">
        {!this.state.isUser ? (
          <span>
            {this.renderHeader()}
            {this.renderFooter()}
          </span>
        ) : (
          <span>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </span>
        )}
      </div>
    );
  }
}

export default App;
