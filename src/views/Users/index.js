import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonAppBar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchPaginatedUsers,deleteUser } from "../../actions/userAction";
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
    justifyContent: "space-around",
};
function Items({ currentItems, navigate, deleteUser}) {
    return (
        <>
            {currentItems?.map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item data={_} onClick={(data) => navigate(`/user/${data}`)}  deleteUser={(id)=>deleteUser(id)}/>
                </Grid>
            ))}
        </>
    );
}
const Item = ({ data, onClick, deleteUser }) => {
    return (
        <Paper elevation={3}>
            <div style={profileCardItem}>
                <div style={profileCardImg}>
                    <img src={data.avatarUrl} style={{ borderRadius: "50%" }} />
                    <div style={{ alignSelf: "center" }}>
                        <Typography variant="h5" component="h5">
                            {data.age}
                        </Typography>
                    </div>
                </div>
                <div style={profileCardDesc}>
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
                    <IconButton aria-label="view" size="small" onClick={() => onClick(data.id)}>
                        <GroupsIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="view" size="small" onClick={() => deleteUser(data.id)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
        </Paper>
    );
};

export default function Users() {
    const dispatch = useDispatch();
    const { users, isLoading, errors, paginatedUsers } = useSelector((store) => store?.user);
    const navigate = useNavigate();
    const [currentItems, setCurrentItems] = React.useState(null);
    const [pageCount, setPageCount] = React.useState(0);
    const [itemOffset, setItemOffset] = React.useState(0);
    const [sortBy, setSortBy] = React.useState("id");
    const [orderBy, setOrderBy] = React.useState("asc");
    const [searchBy, setSearchBy] = React.useState("");
    const [tmpSearch, setTempSearch] = React.useState("");
    const [searchfield, setSearchField] = React.useState("");
    const itemsPerPage = 12;
    React.useEffect(() => {
        setPageCount(Math.ceil(users.length / itemsPerPage));
    }, [users]);
    React.useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        dispatch(fetchPaginatedUsers(itemOffset, itemsPerPage, sortBy, orderBy, searchBy));
    }, [itemOffset, itemsPerPage, sortBy, orderBy, searchBy]);
    React.useEffect(() => {
        if (tmpSearch !== "") setSearchBy(`${searchfield}_like=${tmpSearch}`);
    }, [tmpSearch, searchfield]);
    React.useEffect(() => {
        setCurrentItems(paginatedUsers);
    }, [paginatedUsers]);
    // Invoke when user click to request another page.
    const handlePageClick = (event, page) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        console.log(`User requested page number ${page}, which is offset ${newOffset}`);
        setItemOffset(page);
    };
    React.useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    return (
        <>
            <ButtonAppBar title="Users" />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Box sx={{ flexGrow: 1, marginTop: "30px", padding: "30px" }}>
                    <Grid container spacing={1}>
                            {users?.length > 0 && (
                                <>
                                    <Grid item xs={6} sm={3}>
                                        <label> Search by</label>
                                        <Select name="searchfield" id="searchfield" value={searchfield || ""} label="search by" onChange={(e) => setSearchField(e.target.value)}>
                                            {Object.keys(users[0])?.map((i) => {
                                                return (
                                                    <MenuItem key={i} value={i}>
                                                        {i}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                        <TextField required id="search" name="search" label="search by" fullWidth autoFocus onChange={(e) => setTempSearch(e.target.value)} value={tmpSearch || ""} margin="dense" />
                                    </Grid>

                                    <Grid item xs={6} sm={6}>
                                        <label> Sort by</label>
                                        <Select name="sort by" id="sort" value={sortBy || "id"} label="sort by" onChange={(e) => setSortBy(e.target.value)}>
                                            {Object.keys(users[0])?.map((i) => {
                                                return (
                                                    <MenuItem key={i} value={i}>
                                                        {i}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <label> Order by</label>
                                        <Select name="order by" id="order" value={orderBy || "asc"} label="order by" onChange={(e) => setOrderBy(e.target.value)}>
                                            <MenuItem key={"desc"} value={"desc"}>
                                                desc
                                            </MenuItem>
                                            <MenuItem key={"asc"} value={"asc"}>
                                                asc
                                            </MenuItem>
                                        </Select>
                                    </Grid>
                                </>
                            )}
                    </Grid>
                    <div style={{padding: '20px'}} >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Items currentItems={currentItems} navigate={(data) => navigate(data)} deleteUser={(id)=>dispatch(deleteUser(id))}/>
                            <Grid item xs={6} sm={3}>
                {paginatedUsers?.length > 0 && <Pagination count={pageCount} page={itemOffset} onChange={handlePageClick} />}
                            </Grid>
                            <Grid  item xs={6} sm={3}>
                                <Button variant="contained" color="primary" onClick={() => navigate("/users/create")}>
                                    Create user
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    </Box>
                </>
            )}
        </>
    );
}
