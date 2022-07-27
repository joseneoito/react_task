import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
export default function SelectComponent({id, name, value, label, onChange, options, key}){
    return(
        <Select name={name} id={id} value={value} label={label} onChange={(e) => onChange(e)} SelectDisplayProps={{ style: { paddingTop: 16, paddingBottom: 16 } }} sx={{ minWidth: 130 }}>
                    {options.map((item)=>{
                        return(<MenuItem key={item.value} value={item.value}>{item.key}</MenuItem>)
                    })}
            </Select>
    )
}
