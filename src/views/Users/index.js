import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonAppBar from "../../components/Navbar";
import ButtonComponent from '../../components/Button'
import Loading from "../../components/Loading";
import AlertDialog from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchPaginatedUsers,deleteUser, setSearchParams } from "../../store/actions/userAction";
import Typography from "@mui/material/Typography";
import LockClockIcon from '@mui/icons-material/LockClock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from "@mui/material";
import SelectComponent from '../../components/Select'
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { pink } from '@mui/material/colors';
import AvatarComponent from '../../components/Avatar'
const profileCardItem = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: '8px'
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
    //padding: '20px'
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
                    <div style= {{...profileCardItem, justifyContent: 'flex-end', paddingTop: '20px'}}>
                {paginatedUsers?.length > 0 && <Pagination count={pageCount} page={itemOffset} onChange={handlePageClick} size='large'/>}
                                <ButtonComponent text="Create user" onClick={() => navigate("/users/create")}/>
                        </div></>
        )
    })
const Item = React.memo(({ data }) => {
    return (
        <Paper varient="outlined" square>
            <div style={profileCardItem}>
                <div style={profileCardImg} onClick={()=>navigate(`/user/${data.id}`)}>
                    <AvatarComponent src={data.avatarUrl} />
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
                        {data.isPublic ? <LockOpenIcon /> : <LockClockIcon/>}
                    </IconButton>
                    <IconButton aria-label="view" size="large" onClick={() => {setOpen(true); setDeleteId(data.id)}}>
                        <DeleteIcon fontSize="inherit" sx={{ color: pink[500] }}/>
                    </IconButton>
                </div>
            </div>
        </Paper>
    );
})

    return (
        <div data-testid="users">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Box sx={{ flexGrow: 1, marginTop: "30px", padding: "30px" }}>
                                <div style={searchBar}>
                                <div style={selectFieldStyle}>
                                <label>Name</label>
                                <TextField required id="search" name="search"  fullWidth autoFocus onChange={(e) => dispatch(setSearchParams({key: "tmpSearch", value: e.target.value}))} value={tmpSearch || ""} margin="dense" sx={{ minWidth: 260, marginTop: '-1px' }}/>
                                </div>
                                        <div style={selectFieldStyle}><label> Sort by</label>
                                        <SelectComponent id ="sort" name="sort by" value={sortBy || "createdAt"} options={[{key: "Age", value: "age"}, {key: "Created at", value: "createdAt"}]}
                                        onChange={(e) => dispatch(setSearchParams({key: "sortBy", value: e.target.value}))} />
                                        </div>
                                        <div style={selectFieldStyle}>
                                        <label> Order by</label>
                                        <SelectComponent name="order by" id="order" value={orderBy || "desc"} label="order by" options={[{key:"desc", value: "desc"},{key: "asc", value: "asc"}]}  onChange={(e) => dispatch(setSearchParams({key: "orderBy", value: e.target.value}))} />
                                        </div>
                                </div>
                    <div style={{padding: '20px'}} ><RenderGrid/></div>
                    </Box>
                    <AlertDialog open={open} handleClose={() => setOpen(false)} title="Delete User" description="Are you sure you want to proceed?" handleProceed={()=>{setOpen(false);dispatch(deleteUser(deleteId)) }}/>
                </>
            )}
        </div>
    );
}
