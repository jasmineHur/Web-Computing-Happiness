import React, {useState, useEffect} from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import {Input} from "reactstrap";
import {Line as LineChart} from 'react-chartjs-2';
import Select from "react-select"
import "../assets/css/App.css"
import "../assets/css/AbountRankings.css"
import CountryCode from "../assets/json/countryCode.json"

const API_BASE_URL = "http://131.181.190.87:3000"

export default function Ranking(){
  // Initialise all data
  const [rowData, setRowData] = useState([]);
  const [chartData, setChartData] = useState([])
  const [yearData, setYearData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  // Set selcted data
  const [selectYearData, setSelectYearData] = useState();
  const [selectCountryName, setSelectCountryName] = useState()
  // CSS depends on the condition
  const [showTable, setShowTable] = useState(false)
  // Making one year data
  const specifySetYearData = new Set(yearData.map(years => years.year))
  const specifyYearData =[...specifySetYearData]
  // Re-mapped list for country and year
  const countryArray = countryData.map(countryName => countryName)
  countryArray.unshift("All"); 
  const yearArray = specifyYearData.map(year => year)
  yearArray.unshift("All");

  const columns = [
    {headerName: "Rank", field: "rank", sortable: true, filter: true},
    {headerName: "Country", field: "country", sortable: true, filter: true},
    {headerName: "Score", field: "score", sortable: true, filter: true},
    {headerName: "Year", field: "year", sortable: true, filter: true}
  ]

  const changeYear = (data) => {
    if(data.label == "All") {
      setSelectYearData(null)
    } else {
      setSelectYearData(data.value)
    }
  }

  const changeCountry = (data) => {
    const chartUrl = `${API_BASE_URL}/rankings?country=` + `${data.value}`
    if(data.value == "All") {
      setSelectCountryName(null)
      setShowTable(false)
    } else {
      setSelectCountryName(data.value)
      setShowTable(true)
    }
    fetch(chartUrl)
    .then((res) => res.json())
    .then(res => {
      setChartData(res)
      
    }) 
  }

  // GET countries data
  useEffect(() => {
    const urlCountry = `${API_BASE_URL}/countries`
    
    fetch(urlCountry)
    .then((res) => res.json())
    // .catch(err => alert("Fail to bring country list"))
    .then((res) => setCountryData(res))

  },[])
 
  // GET year data
  useEffect(() => {
    const urlYear = `${API_BASE_URL}/rankings`

    fetch(urlYear)
    .then(res => res.json())
    // .catch(err => alert("Fail to bring year list"))
    .then(res => setYearData(res))
  }, [])

  // GET happiness rankings depends on selecting
  useEffect(() => {
    for(let i = 0; i < Object.keys(CountryCode).length; i ++){
      if(selectCountryName == CountryCode[i].code 
      || selectCountryName == CountryCode[i].code.toLowerCase() ){
        return setSelectCountryName(CountryCode[i].name)
      }
    }
    let url
    if(selectCountryName != null && selectYearData == null) {
      url = `${API_BASE_URL}/rankings?country=` + `${selectCountryName}`
    } else if(selectCountryName == null && selectYearData != null){
      url = `${API_BASE_URL}/rankings?year=` + `${selectYearData}` 
    } else if(selectCountryName != null && selectYearData != null){
      url = `${API_BASE_URL}/rankings?country=` + `${selectCountryName}` + `&year=${selectYearData}`
    } else {
      url = `${API_BASE_URL}/rankings`
    }
    
    fetch(url)
    .then((res) => res.json())
    .then(res => setRowData(res))  
  }, [selectCountryName, selectYearData]);

  // Function of the line chart
  function CharLine() {
    const data={
      labels: specifyYearData.sort((a,b)=>a-b).map(year => year),
      datasets: [
        {
          data: chartData.map(scores => scores.score),
          label: 'Score Data',
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    }
    return (
      <ul className="line-char">
            <il><LineChart data={data}/></il>
      </ul> 
    )
  }
  

  return (
    <div className="app">
      <div className="ranking">
        <h2>Happiness Search data   <span className="badge badge-info">{rowData.length}</span></h2>
        <div className="select-div">
          <ul className="select-ul">
            <il className="select-size">
              <Select options={countryArray.map(country => ({value: country, label: country}))} placeholder="Country" onChange={(changeCountry)}/>
            </il>
            <il className="select-size">
              <Select options={yearArray.map(year => ({value: year, label: year}))} placeholder="Year" onChange={changeYear} />
            </il>
            <il className="select-size">
              <Input className="Ranking-input" placeholder="Country" onChange = {(event) => {setSelectCountryName(event.target.value)}}/>
            </il>
          </ul>
        </div>
        <div 
          className= "ag-theme-balham"
          style={{
            height: "347px",
            width: "800px",
            margin: "auto"
          }}
        >
          <AgGridReact 
            columnDefs={columns} 
            rowData={rowData}
            pagination={true}
            paginationPageSize={10}
          >
            <AgGridColumn field="country" filter="agTextColumnFilter"></AgGridColumn>
          </AgGridReact>
          {showTable ? <CharLine /> : null}
        </div>
      </div>
    </div>
  );
}
