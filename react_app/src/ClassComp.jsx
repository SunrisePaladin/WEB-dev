import React from "react";

class ClassComp extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 0
        }

        this.plus = this.plus.bind(this)
        this.minus = this.minus.bind(this)
        this.zero = this.zero.bind(this)
    }
    plus(){
        this.setState({
            count: ++this.state.count
        })
    }
    minus(){
        if (this.state.count>0){
            this.setState({
                count: --this.state.count
            })
        }
        else this.setState({
            count: 0
        })
    }
    zero(){
        this.setState({
            count:0
        })
    }
    render() {
        return (
            <div>
                <div>{this.state.count}</div>
                <button onClick={this.plus}>+</button>
                <button onClick={this.minus}>–</button>
                <button onClick={this.zero}>0</button>
            </div>
        )
    }
    
}

export default ClassComp