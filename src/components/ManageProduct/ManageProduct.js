import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import EditProduct from '../EditProduct/EditProduct';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const ManageProduct = () => {
    const [products, setProducts] = useState([]);
   const [editProduct, setEditProduct] = useState({
     edit: false
   })
    useEffect(() => {
      loadProduct();
    },[]);
    const loadProduct = () => {
      fetch('https://rugged-olympic-25949.herokuapp.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
    }
    const classes = useStyles();

    const handleDeleteBtn = (id) => {
      alert('Are you sure product delete?')
      fetch(`https://rugged-olympic-25949.herokuapp.com/delete/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(result => {
      if(result){
        console.log('Delete Successfully')
        loadProduct();
        
      }
    })
        
    }
    const handleEditBtn = (id, name, price, quantity) => {
      const product = {...editProduct}
      
      product.edit = true;
      product.id = id;
      product.name = name;
      product.price = price;
      product.quantity = quantity;
      setEditProduct(product)
        
    }
    return (
      <div>
    {editProduct.edit === false ?
     <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="customized table">
       <TableHead>
         <TableRow>
           <StyledTableCell>Product Name</StyledTableCell>
           <StyledTableCell align="right">Price</StyledTableCell>
           <StyledTableCell align="right">Quantity</StyledTableCell>
           <StyledTableCell align="center">Action</StyledTableCell>
       
         </TableRow>
       </TableHead>
       <TableBody>
         {products.map((product) => (
         
           <StyledTableRow key={product.name}>
             <StyledTableCell component="th" scope="row">
               {product.name}
             </StyledTableCell>
             <StyledTableCell align="right">${product.price}</StyledTableCell>
             <StyledTableCell align="right">{product.quantity}</StyledTableCell>
             <StyledTableCell align="center"> <Button onClick={()=> handleDeleteBtn(product._id)}>
               <DeleteIcon variant="contained" color="secondary" /></Button>
                <Button onClick={() => handleEditBtn(product._id, product.name, product.price, product.quantity)}><EditIcon  variant="contained" color="primary"/>
                </Button>
                </StyledTableCell>
             
           </StyledTableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
    :
       <EditProduct editProduct = {editProduct}/>
       }
      </div>

    );
};

export default ManageProduct;