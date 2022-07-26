import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonAppBar from "../../components/Navbar";
import Loading from "../../components/Loading";
import AlertDialog from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchPaginatedUsers,deleteUser, setSearchParams } from "../../actions/userAction";
import Typography from "@mui/material/Typography";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const profileCardItem = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: '10px'
};

const profileCardDesc = {
    display: "flex",
    flexDirection: "column",
};
const profileCardButton = {
    display: "flex",
    alignItems: "flex-end",
};
const profileCardImg = {
    display: "flex",
    flexDirection: "column",
    //justifyContent: "space-around",
};
const searchBar={
    display: 'flex',
    flexDirection: 'row',
    width: '20%',
    padding: '20px'
}
const selectFieldStyle={
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
    alignItems: 'space-around'
}
export default function Users() {
    const dispatch = useDispatch();
    const {  isLoading, errors, paginatedUsers, usersCount, searchParams: { tmpSearch, orderBy, sortBy, itemOffset} } = useSelector((store) => store?.user);
    const navigate = useNavigate();
    const [currentItems, setCurrentItems] = React.useState(null);
    const [pageCount, setPageCount] = React.useState(0);
    const itemsPerPage = 12;
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null)
    React.useEffect(() => {
        setPageCount(Math.ceil(usersCount / itemsPerPage));
    }, [usersCount]);
    React.useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        let temp = (itemOffset !== 0 && tmpSearch !=="") ? 0 : itemOffset
        dispatch(fetchPaginatedUsers( temp, itemsPerPage, sortBy, orderBy, `name_like=${tmpSearch}`));
    }, [itemOffset, itemsPerPage, sortBy, orderBy, tmpSearch]);
    React.useEffect(() => {
        setCurrentItems(paginatedUsers);
    }, [paginatedUsers]);
    // Invoke when user click to request another page.
    const handlePageClick = (event, page) => {
        dispatch(setSearchParams({key: "itemOffset", value: page}))
    };

const Items = React.memo(() =>{
    return (
        <>
            {currentItems?.map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={_.id.toString()}>
                    <Item data={_} />
                </Grid>
            ))}
        </>
    );
})
    const RenderGrid = React.memo(()=>{
        return(
                <>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Items   />
                        </Grid>
                    <div style= {profileCardItem}>
                {paginatedUsers?.length > 0 && <Pagination count={pageCount} page={itemOffset} onChange={handlePageClick} />}
                                <Button variant="contained" color="primary" onClick={() => navigate("/users/create")}>
                                    Create user
                                </Button>
                        </div></>
        )
    })
const Item = React.memo(({ data }) => {
    return (
        <Paper elevation={3}>
            <div style={profileCardItem}>
                <div style={profileCardImg} onClick={()=>navigate(`/user/${data.id}`)}>
                    <img src={data.avatarUrl} style={{ borderRadius: "50%" }} />
                    <div style={{ alignSelf: "center" }}>
                        <Typography variant="h5" component="h5">
                            {data.age}
                        </Typography>
                    </div>
                </div>
                <div style={profileCardDesc} onClick={()=>navigate(`/user/${data.id}`)}>
                    <Typography variant="h3" component="h3">
                        {data.name}
                    </Typography>
                    <Typography variant="h5" component="h5">
                        {data.statusMessage}
                    </Typography>
                    <Typography variant="h5" component="h5">
                        {data.createdAt}
                    </Typography>
                </div>
                <div style={profileCardButton}>
                    <IconButton aria-label="view" size="large" onClick={()=>navigate(`/user/${data.id}`)}>
                        <GroupsIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="view" size="large" onClick={() => {setOpen(true); setDeleteId(data.id)}}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
        </Paper>
    );
})

    return (
        <>
            <ButtonAppBar title="Users" />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Box sx={{ flexGrow: 1, marginTop: "30px", padding: "30px" }}>
                                <div style={searchBar}>
                                <TextField required id="search" name="search" label="Search by name" fullWidth autoFocus onChange={(e) => dispatch(setSearchParams({key: "tmpSearch", value: e.target.value}))} value={tmpSearch || ""} margin="dense" />
                                        <div style={selectFieldStyle}><label> Sort by</label>
                                        <Select name="sort by" id="sort" value={sortBy || "id"} label="sort by" onChange={(e) => dispatch(setSearchParams({key: "sortBy", value: e.target.value}))}>
                                                    <MenuItem key={"Age"} value={"age"}>Age</MenuItem>
                                                    <MenuItem key={"CreatedAt"} value={"createdAt"}>Created at</MenuItem>
                                        </Select></div>
                                        <div style={selectFieldStyle}>
                                        <label> Order by</label>
                                        <Select name="order by" id="order" value={orderBy || "asc"} label="order by" onChange={(e) => dispatch(setSearchParams({key: "orderBy", value: e.target.value}))}>
                                            <MenuItem key={"desc"} value={"desc"}>
                                                desc
                                            </MenuItem>
                                            <MenuItem key={"asc"} value={"asc"}>
                                                asc
                                            </MenuItem>
                                        </Select>
                                        </div>
                                </div>
                    <div style={{padding: '20px'}} ><RenderGrid/></div>
                    </Box>
                    <AlertDialog open={open} handleClose={() => setOpen(false)} title="Delete User" description="Are you sure you want to proceed?" handleProceed={()=>{setOpen(false);dispatch(deleteUser(deleteId)) }}/>
                </>
            )}
        </>
    );
}
