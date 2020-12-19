import Cards from "../cards/Cards.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import DataService from "../../services/dataService";
import Locations from "../locations/Locations";
import Episodes from "../episodes/Episodes";
import Navigation from "../navigation/Navigation"
import Header from "../header/Header.js";
import Footer from "../footer/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import LocationInfo from "../locations/LocationInfo";
import Pagination from "../pagination/Pagination";
import EpisodeInfo from "../episodes/EpisodeInfo";

const NUMBER_ONE = 1;
const TEXT_NEXT = "Next";
const TEXT_PREVIOUS = "Previous";
const PAGES = [1, 2, 3];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isHiddenWelcomeBanner: false,
      page: NUMBER_ONE,
      quantityOfPages: NUMBER_ONE,
      pages: PAGES,
      isPrevButtonDisabled: true,
      isNextButtonDisabled: false,
    };
    this.dataService = new DataService()
    this.componentDidMount = () => {
      this.dataService
        .getCharacters()
        .then(data => {
          this.setState({ items: data.results, quantityOfPages: data.info.pages })
        })
        .catch(error => console.log(error.message))
    }
    this.hideWelcomeBanner = () => {
      this.setState({ isHiddenWelcomeBanner: true })
    }
    this.choosePage = (e) => {
      let targetValue = e.target.innerHTML;
      let numericTargetValue = Number(targetValue);
      if (targetValue > NUMBER_ONE) {
        this.setState({ isPrevButtonDisabled: false })
      }
      else if (numericTargetValue === NUMBER_ONE) {
        this.setState({ isPrevButtonDisabled: true })
      }
      else if (targetValue === TEXT_PREVIOUS) {
        this.setState(state => {
          let prevPage = state.page - NUMBER_ONE;
          this.dataService
            .getCharacters(prevPage)
            .then(data => {
              let newPages = [prevPage - NUMBER_ONE, prevPage, prevPage + NUMBER_ONE];
              this.setState({
                items: data.results,
                page: prevPage,
                pages: newPages,
                isNextButtonDisabled: false,
              });
              if (prevPage === NUMBER_ONE) {
                this.setState({ pages: PAGES, isPrevButtonDisabled: true });
              }
            })
            .catch(error => console.log(error.message))
        });
      }
      else if (targetValue === TEXT_NEXT) {
        this.setState(state => {
          let nextPage = state.page + NUMBER_ONE;
          this.dataService
            .getCharacters(nextPage)
            .then(data => {
              let newPages = [nextPage - NUMBER_ONE, nextPage, nextPage + NUMBER_ONE];
              this.setState({
                items: data.results,
                page: nextPage,
                pages: newPages,
                isPrevButtonDisabled: false
              });
              if (nextPage === this.state.quantityOfPages) {
                let currentPage = nextPage;
                let prevPage = currentPage - NUMBER_ONE;
                let oneMorePrevPage = prevPage - NUMBER_ONE
                this.setState({ pages: [oneMorePrevPage, prevPage, currentPage], isNextButtonDisabled: true });
              }
            })
            .catch(error => console.log(error.message))
        })
        return;
      }
      this.dataService
        .getCharacters(targetValue)
        .then(data => {
          if (numericTargetValue) {
            const status = numericTargetValue === this.state.quantityOfPages;
            this.setState({
              items: data.results,
              page: numericTargetValue,
              isNextButtonDisabled: status
            })
          }
        })
        .catch(error => console.log(error.message))
    }
  }
  render() {
    return (
      <BrowserRouter basename="/rickAndMorty">
        <div className="main">
          <Navigation isHiddenWelcomeBanner={this.state.isHiddenWelcomeBanner} />
          <div className="container">
            <Header
              isHiddenWelcomeBanner={this.state.isHiddenWelcomeBanner}
              hideWelcomeBanner={this.hideWelcomeBanner}
            />
            <Route exact path="/episodes" component={Episodes} />
            <Route exact path="/locations" component={Locations} />
            <Route exact path="/" render={() =>
              <Pagination
                choosePage={this.choosePage}
                pages={this.state.pages}
                page={this.state.page}
                quantityOfPages={this.state.quantityOfPages}
                isPrevButtonDisabled={this.state.isPrevButtonDisabled}
                isNextButtonDisabled={this.state.isNextButtonDisabled}
              />} />
            <Route exact path="/" component={() =>
              <Cards
                items={this.state.items}
              />} />
            <Route path="/locations/:id"
              render={(props) => <LocationInfo id={props.match.params.id} />

              }
            />
            <Route
              path="/episodes/:id"
              render={(props) => <EpisodeInfo id={props.match.params.id} />
              }
            />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
