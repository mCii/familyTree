import React from 'react';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class  App extends React.Component{
  constructor(){
    super();
    this.state={
      children: [],
      number: 0,
      names: [],
      error: []
    }
  }

  handleAdd = () => {
    var names = this.state.names;
    var number = this.state.number;
    var children = this.state.children;
    var error = this.state.error;
    names.push(["",""]);
    children.push("");
    number = number + 1;
    error.push({"father": "Empty Field", "child": "Empty Field",});
    this.setState({
      children: children,
      number: number,
      names: names,
      error: error
    })
  }
  
  handleDelete = id => () => {
    var names = this.state.names;
    var number = this.state.number;
    var children = this.state.children;
    var error = this.state.error;
    children.splice(id,1);
    error.splice(id,1);
    number -= 1;
    names.splice(id,1);
    this.setState({
      children: children,
      error: error,
      number: number,
      names: names
    })
  }

  handleChange = index => (event) => {
    var value = event.target.value;
    var id = event.target.id;
    var names = this.state.names;
    var children = this.state.children;
    var error = this.state.error;
    names[index][id] = value;
    //child field
    if (id == 0){
      //if child input not empty
      if (value.length>0){
          //child name doesn't exist
          if (children.indexOf(value) === -1){
            error[index]["child"] = "";
          } else {
            error[index]["child"] = "This name exists for another child";
          } 
        }
       else {
        error[index]["child"] = "Empty Field";
      }
      children[index] = value;
    }
    //father field
    else{
      if (value.length > 0) {
          error[index]["father"] = "";
        }else{
        error[index]["father"] = "Empty Field";
      }
    }
    this.setState({
      error: error,
      names: names,
      children: children
    });
  }

  handleSubmit = () => {
    var error = this.state.error;
    for (var i=0; i<error.length; i++){
      if (error[i]["father"] !== "" || error[i]["child"] !== ""){
        alert('Resolve error first');
        return false;
      }
    }
    alert("submitted");
  }

  render(){
    var number = this.state.number;
    var names = this.state.names;
    var error = this.state.error;
    return(
  <div style={styles}>
        <button onClick={this.handleAdd}>Add child/father</button>
        <button onClick={this.handleSubmit}>Submit</button>
    {[...Array(number).keys()].map(i=>(
    <div key={i} handleChange>
          <button onClick={this.handleDelete(i)}>delete</button>
          <input id={0} onChange={this.handleChange(i)} type="text" placeholder="child" value={names[i][0]}/>
          {(error[i]["child"].length>0) && <h6>{error[i]["child"]}</h6>}
          <input id={1} onChange={this.handleChange(i)} type="text" placeholder="father" value={names[i][1]}/>
          {(error[i]["father"].length > 0) && <h6>{error[i]["father"]}</h6>}
    </div>
  ))
  }
  </div>
);
  }}

export default App;
