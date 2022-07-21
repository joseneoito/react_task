import * as React from 'react';
import Button from '@mui/material/Button';
import  ButtonAppBar from '../../components/Navbar'
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
      return (
        <>
          <ButtonAppBar title="Home"/>
            <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Button variant="text" onClick={()=>navigate('/users')}>Users</Button>
            </div>
        </>
      );
    }
