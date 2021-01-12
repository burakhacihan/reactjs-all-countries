import {useState} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron,Container} from 'react-bootstrap';
import style from '../src/custom.module.css';

import CountryDetail from './CountryDetail'

document.title = "All Countries";

function App() {

  const [data,setData] = useState([]);

  useState(()=>{

    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setData(res.data);
    })

  },[])


  return (
    <>
    <Jumbotron>
      <Container>
         <h1>All Countries</h1>
         <p>Find out more countries <a href="/">go home</a></p>
      </Container>
    </Jumbotron>

    <Container>
      
      <Router>
         <Switch>
           <Route path="/" exact>
           <div className={"row"}>
              {
                data.map((item) => (
                  <div key={item.alpha3Code} className={`${"col-sm-6"} ${"col-lg-3"}`}>
                    <div className={style.flag_item_wrap}>
                      <Link to={`/country/${item.alpha3Code}`}>
                        <img className={style.img_responsive} src={item.flag} alt={item.name} />
                      </Link>
                    </div>
                    <div className={style.country_name}>
                      <Link to={`/country/${item.alpha3Code}`}>
                        {item.name} <br />
                        &#8594; View Detail
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
            
            <div className={"text-center"}>
              <p className={style.footer}>
                made by <a target="_blank" rel="noreferrer" href="https://github.com/burakhacihan">Burak Hacıhan</a>, 
                special thanks <a target="_blank" rel="noreferrer" href="https://restcountries.eu/">restcountries.eu</a>
              </p>
            </div> 

           </Route>

          <Route path={`/country/:alpha3Code`} component={CountryDetail} />

         </Switch>
      </Router>

      
       
    </Container>
    
    </>
  );
}

export default App;
