import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';



// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];



export default function Datagrid(params) {
    //getting user data
    useEffect(() => {
    }, [])
    const rows = params.row;
    const columns = [
        {
            field: 'id', headerName: 'Number', width: 90
        },
        {
            field: 'PackageName',
            headerName: 'Package Name',
            width: 150,
            editable: false,
        },
        {
            field: 'TravelDate',
            headerName: 'Travel Data',
            width: 150,
            editable: false,
        },
        {
            field: 'NumberofPeople',
            headerName: 'No Of People',
            width: 150,
            editable: false,
        },
        {
            field: 'pricePerPerson',
            headerName: 'Price Per Person',
            type: 'number',
            width: 110,
            editable: false,
        },
         {
            field: `amount`,
            headerName: '$Amount',
            type: 'number',
            width: 110,
            editable: false,
        },
        {
            field: 'Payment',
            headerName: 'Payment Status',

            width: 110,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'number',
            width: 110,
            editable: false,
        },

    ];

    return (
        <div sx={{
        }}>
            <Box sx={{
                height: 500,
                width: '80%',
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                margin:'4%'
            }}>
                <DataGrid
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    rows={rows.map((ele, i) => ({
                        ...ele, id: i + 1,
                        amount: ele.pricePerPerson*ele.NumberofPeople,Payment:ele.PaymentStatus ? "Paid" : "Pending"
                    }))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}
