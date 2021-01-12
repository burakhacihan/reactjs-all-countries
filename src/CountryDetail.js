import {React, useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillAlt, faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import style from '../src/custom.module.css';

function CountryDetail() {

    let { alpha3Code } = useParams();

    const [country,setCountry] = useState([]);
    const [Pagetitle,setTitle] = useState("");

    useEffect(() => {

        axios(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`).then((res)=>{
            setCountry([res.data]);
            setTitle([res.data][0].name);
            document.title = Pagetitle;
        })

    },[alpha3Code,Pagetitle]);


    return (
        <>
            {
                country.map((item) => (
                    <div key={item.alpha3Code} className={"row"}>
                        <div className={"col-md-3"}>
                            <img src={item.flag} className={style.img_responsive} alt={item.name} />
                        </div>
                        <div className={"col-md-3"}>
                            <h1>{item.name}</h1>
                            <p>
                                <strong>Capital City: </strong> {item.capital}
                            </p>
                            <p>
                                <strong>Calling Code: </strong> {item.callingCodes}
                            </p>
                            <p>
                                <strong>Country Shortening Name: </strong> {item.altSpellings[0]}
                            </p>
                            <p>
                                <strong>Government: </strong> {item.altSpellings[2]}
                            </p>
                            <p>
                                <strong>Government with local language: </strong> {item.altSpellings[3]}
                            </p>
                            <p>
                                <strong>Region: </strong> {item.region}
                            </p>
                            <p>
                                <strong>Sub Region: </strong> {item.subregion}
                            </p>
                            <p>
                                <strong>Population: </strong> {item.population}
                            </p>
                        </div>
                        <div className={"col-md-3"}>
                            <h2>Currency Detail</h2>
                            <p>
                                <FontAwesomeIcon icon={faMoneyBillAlt} /> <strong>Code: </strong> {item.currencies[0].code}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faMoneyBillAlt} /> <strong>Name: </strong> {item.currencies[0].name}
                            </p>
                        </div>
                        <div className={"col-md-3"}>
                            <h2>Language Detail</h2>
                            <p>
                                <FontAwesomeIcon icon={faGlobeEurope} /> <strong>Name: </strong> {item.languages[0].name}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faGlobeEurope} /> <strong>Native Name: </strong> {item.languages[0].nativeName}
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default CountryDetail
