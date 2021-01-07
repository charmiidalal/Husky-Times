import React from "react";
import Plot from "react-plotly.js";

export default class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      stockSymbol: "AMZN",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // calls fetch stock function
  componentDidMount() {
    this.fetchStock();
  }

  handleClick() {
    this.fetchStock();
  }
// fetch stocks from API call
  fetchStock() {
    const pointerToThis = this;
    const API_KEY = "SLIIE11N2DCT0QUM";
    //let StockSymbol = "AMZN";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        //console.log(stockChartYValuesFunction);
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }
/* rendering the stocks of company by their name code 
 search the company name code here to get the stocks chart
 stock market chart as per the given company code is ploted */
  render() {
    return (
      <div class="container">
        <div class="row no-gutters">
          <div class="col stockHeader">
            <div class="d-flex flex-column mt-3">
              
                <div class="card-body text-white text-center">
                  <h1 className="display-4"><strong> Stock Market for {this.state.stockSymbol}</strong></h1>
                </div>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-center">
                  <form className="form-inline py-2">
                    <div className="form-group">
                      <h3>
                        <div className="text-center whiteLabel">
                          <div className="row">
                            <label>Company Name: </label>

                            <div className="col-md-6">
                              <div className="input-group">
                            
                                <input type="text" className="form-control" placeholder="Search..." onChange={(e) => this.setState({ stockSymbol: e.target.value })} ></input>
                                <div className="input-group-append">
                                  <button type="button" class="btn btn-secondary" onClick={this.handleClick}>Search
                               <i className="fa fa-search"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </h3>
                    </div>
                  </form>
                </div>
              </div>
              <div className="text-center">
                <h4>< a href={"http://eoddata.com/symbols.aspx"} target='blank' className="text-white">Click here to view more stock symbols</a></h4></div>
              <div className="card-body  text-dark">
                <div className="d-flex justify-content-center">
                  <Plot
                    data={[
                      {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "red" },
                      },
                    ]}
                    layout={{ width: 720, height: 440, title: "Stock market Plot" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div >
    );
  }
}
