import React, {useState, useEffect} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Select from "react-select"
import "../assets/css/AbountRankings.css"
import "../assets/css/App.css"
const API_BASE_URL = "http://131.181.190.87:3000"

export default function Ranking(){
  // Initialise data 
  const [rowData, setRowData] = useState([]);
  const [yearData, setYearData] = useState([]);
  // Set selected data up
  const [selectYearData, setSelectYearData] = useState();
  // Making one year data
  const specifySetYearData = new Set(yearData.map(years => years.year))
  const specifyYearData =[...specifySetYearData]
  // CSS depends on condition
  const [disabledSelect, setDisabledSelect] = useState(true)
  // Re-mapped list for year
  const yearArray = specifyYearData.map(year => year)
  yearArray.unshift("All");  
  
  const columns = [
    {headerName: "Rank", field: "rank", sortable: true, filter: true},
    {headerName: "Country", field: "country", sortable: true, filter: true},
    {headerName: "Score", field: "score", sortable: true, filter: true}
  ]

  const changeYear = (data) => {
    if(data.label == "All") {
      setSelectYearData(null)
    } else {
      setSelectYearData(data.value)
    }
  }

  // Getting year data
  useEffect(() => {
    const urlYear = `${API_BASE_URL}/rankings`

    fetch(urlYear)
    .catch(err => {
      setDisabledSelect(false)
    })
    .then(res => res.json())
    .then(res => {
      setYearData(res)
      setDisabledSelect(false)
    })
  }, [])

  // Switch the list depending on year and country
  useEffect(() => {
    let url

    if(selectYearData != null) {
      url = `${API_BASE_URL}/rankings?year=` + `${selectYearData}` 
    } else {
      url = `${API_BASE_URL}/rankings`
    }
    fetch(url)
    .catch(err => {
      alert("Fail to bring ranking list")
      window.location.href = '/'
    })
    .then(res => res.json())
    .then(res => setRowData(res))
  }, [selectYearData]);


  return (
    <div className="app">
      <div className="ranking">
        <h2>Happiness data ranking   <span className="badge badge-info">{rowData.length}</span></h2>
        <div className="select-div">
          <div className="select-size">
            <Select options={yearArray.map(year => ({value: year, label: year}))} isDisabled={disabledSelect} placeholder="Year" onChange={changeYear} />
          </div>
        </div>
        <div 
          className= "ag-theme-balham"
          style={{
            height: "347px",
            width: "600px",
            fontFamily: "Andale Mono, monospace",
            margin: "auto"
          }}
        >
          <AgGridReact 
            columnDefs={columns} 
            rowData={rowData}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    </div>
  );
}

