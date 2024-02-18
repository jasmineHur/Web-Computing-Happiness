import React, {useState, useEffect} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "../assets/css/App.css"
import "../assets/css/AbountRankings.css"
import Select from "react-select"
import { Bar } from 'react-chartjs-2'
const API_BASE_URL = "http://131.181.190.87:3000"

export default function Factor(){
  const [error, setError] = useState()
  // Initialise all data
  const [rowData, setRowData] = useState([])
  const [chartData, setChartData] = useState([])
  const [yearData, setYearData] = useState([])
  const [countryData, setCountryData] = useState([])
  // Set selcted data
  const [selectYearData, setSelectYearData] = useState('2020')
  const [selectCountryData, setSelectCountryName] = useState()
  const [selectLimitData, setSelectLimitData] = useState()
  // CSS
  const [disabledSelect, setDisabledSelect] = useState(true)
  const [showTable, setShowTable] = useState(false)
  // Making one year data
  const specifySetYearData = new Set(yearData.map(years => years.year))
  const specifyYearData =[...specifySetYearData]
  // Re-mapped list for country
  const countryArray = countryData.map(countryName => countryName)
  countryArray.unshift("All"); 

  const token = localStorage.getItem("token");
  
  const columns = [
    {headerName: "Rank", field: "rank", width:75},
    {headerName: "Country", field: "country", width:90},
    {headerName: "Score", field: "score", width:90},
    {headerName: "Economy", field: "economy", width:100},
    {headerName: "Family", field: "family", width:90},
    {headerName: "Health", field: "health", width:90},
    {headerName: "Freedom", field: "freedom", width:100},
    {headerName: "Generosity", field: "generosity", width:110},
    {headerName: "Trust", field: "trust", width:90}
  ]

  const defaultColDef = {
    sortable: true, 
    filter: true
  }

  const optionsLimit = [
    { vlaue: 'All', label: 'All'},
    { value: '10', label: '10' },
    { value: '30', label: '30' },
    { value: '50', label: '50' },
    { value: '70', label: '70' },
    { value: '100', label: '100' }
  ];

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }

  const changeCountry = (data) => {
    if(data.value == "All") {
      setSelectCountryName(null)
    } else {
      setSelectCountryName(data.value)
    }
  }

  const chagneLimit = (data) => {
    if(data.label == "All"){
      setSelectLimitData(null)
    } else {
      setSelectLimitData(data.value)
    }
  }

  const changeYear = (data) => {
    setSelectYearData(data.value)
    setDisabledSelect(false)
    setError()

    let chartUrl
    chartUrl = `${API_BASE_URL}/factors/` + `${data.value}` + `?limit=5`
    fetch(chartUrl, {
      method: "GET",
      headers
    })
    .then((res) => res.json())
    .then(res => {
      setChartData(res)
      setShowTable(true)
    }) 
  }

  // Getting year data
  useEffect(() => {
    const urlYear = `${API_BASE_URL}/rankings`

    fetch(urlYear)
    .then(res => res.json())
    .then(res => setYearData(res))
  }, [])

  // Getting countries list
  useEffect(() => {
    const urlCountry = `${API_BASE_URL}/countries`

    fetch(urlCountry, {
      method: "GET"
    })
    .then((res) => res.json())
    .then((res) => setCountryData(res))
  }, [])

  // Switch the list depending on year, country and limit
  useEffect(() => {
    let url
    
    if (selectYearData == null) {
      setError("Please choose year")
    } else {
        if(selectCountryData == null && selectLimitData == null){
        url = `${API_BASE_URL}/factors/` + `${selectYearData}`
      } else if(selectCountryData != null && selectLimitData == null){
        url = `${API_BASE_URL}/factors/` + `${selectYearData}` + `?country=${selectCountryData}`
      } else if(selectCountryData == null && selectLimitData != null){
        url = `${API_BASE_URL}/factors/` + `${selectYearData}` + `?limit=${selectLimitData}`
      } else if(selectCountryData != null && selectLimitData != null){
        url = `${API_BASE_URL}/factors/` + `${selectYearData}` + `?limit=${selectLimitData}` + `&country=${selectCountryData}`
      }

      fetch(url, {
        method: "GET",
        headers
      })
      .then((res) => res.json())
      .then(res => {
        setRowData(res)
      })
    }
  }, [selectYearData, selectCountryData, selectLimitData]);

  // Bar chart function
  function ChartVerBar() {
    const dataEconomy = {
      labels: chartData.map(countries => countries.country),
      datasets: [
        {
          label: 'Economy',
          data: chartData.map(economies => economies.economy),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
    
    const dataFamily = {
      labels: chartData.map(countries => countries.country),
      datasets: [
        {
          label: 'Family',
          data: chartData.map(families => families.family),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const dataHealth = {
      labels: chartData.map(countries => countries.country),
      datasets: [
        {
          label: 'Health',
          data: chartData.map(health => health.health),
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const dataFreedom = {
      labels: chartData.map(countries => countries.country),
      datasets: [
        {
          label: 'Freedom',
          data: chartData.map(freedom => freedom.freedom),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const dataGenerosity = {
      labels: chartData.map(countries => countries.country),
      datasets: [
        {
          label: 'Generosity',
          data: chartData.map(generosities => generosities.generosity),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const dataTrust = {
      labels: chartData.map(countries => countries.country),
      datasets: [
        {
          label: 'Trust',
          data: chartData.map(trust => trust.trust),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    };
    const options = {
      indexAxis: 'y',
      responsive: true
    };
    return (
      <ul className="bar-char">
        <li><Bar data={dataEconomy} options={options}/></li>
        <li><Bar data={dataFamily} options={options}/></li>
        <li><Bar data={dataHealth} options={options}/></li>
        <li><Bar data={dataFreedom} options={options}/></li>
        <li><Bar data={dataGenerosity} options={options}/></li>
        <li><Bar data={dataTrust} options={options}/></li>
      </ul>
    )
  }
  
  return (
    <div className="app">
      <div className="ranking">
        <h2>Happiness Factor data   <span className="badge badge-info">{rowData.length}</span></h2>
        {error != null ? <p className="notice">{error}</p> : null}
        <div className="select-div">
          <ul className="select-ul">
            <li className="select-size">
              <Select options={specifyYearData.map(year => ({value: year, label: year}))} placeholder="Year" defaultValue={{ label: "2020", value: "2020" }} onChange={changeYear}>
              </Select>           
            </li>
            <li className="select-size">
              <Select options={countryArray.map(country => ({value: country, label: country}))} isDisabled={disabledSelect} placeholder="Country" onChange={changeCountry}/>
            </li>
            <li className="select-size">
              <Select options={optionsLimit} placeholder="Limit" isDisabled={disabledSelect} onChange={chagneLimit}>
                
              </Select>
            </li>
          </ul>
        </div>
        <div 
          className= "ag-theme-balham"
          style={{
            height: "347px",
            width: "820px",
            margin: "auto"
          }}
        >    
            <AgGridReact 
              columnDefs={columns} 
              rowData={rowData}
              pagination={true}
              paginationPageSize={10}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
        {showTable ? <ChartVerBar/> : null}
    </div>
  );
}
