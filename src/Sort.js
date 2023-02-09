import React, { useState } from "react";
import { Container } from "react-bootstrap";
import *as xlsx from 'xlsx';
import './App.css';

function Sort() {
    const [excelData, setExcelData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [filterKey, setFilterKey] = useState("");
    const readExcel = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer(file);
        const excelfile = xlsx.read(data);
        const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
        const exceljson = xlsx.utils.sheet_to_json(excelsheet);
        setExcelData(exceljson);
        setSortedData(exceljson);
    }

    const handleSort = (key) => {
        const sortedArray = [...sortedData].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setSortedData(sortedArray);
    };

    const handleFilter = (e) => {
        setFilterKey(e.target.value);
        const filteredArray = excelData.filter((item) => {
            return item.Name.toLowerCase().indexOf(filterKey.toLowerCase()) !== -1;
        });
        setSortedData(filteredArray);
    };

    return (
        <React.Fragment>
            <Container className="content">
                <div className="row fthight">
                    <div className="col-md-4 ">
                        <h3 className='mt-3'>Fetch Excel Data in React js</h3>
                        <label className="form-label">File </label>
                        <input type="file" className="form-control" onChange={(e) => readExcel(e)} />
                    </div>
                    <div className="col-md-4 mt-3">
                        <label className="form-label">Filter by Name: </label>
                        <input type="text" className="form-control" onChange={(e) => handleFilter(e)} />
                    </div>
                    <div className="col-md-12 mt-3">
                        {sortedData.length > 1 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>
                                            Name
                                            <i className="fa fa-sort" aria-hidden="true" onClick={() => handleSort("Name")} />
                                        </th>
                                        <th>
                                            Email
                                            <i className="fa fa-sort" aria-hidden="true" onClick={() => handleSort("Email")} />
                                        </th>
                                        <th>
                                            Gender
                                            <i className="fa fa-sort" aria-hidden="true" onClick={() => handleSort("Gender")} />
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        )}
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Sort;