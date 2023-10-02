import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectFilter({ filter, labelFilter, filterfunction, arrayItems,size}) {
    return (
        <FormControl sx={{m:1}}>
            <InputLabel id={labelFilter+"label"}>{labelFilter}</InputLabel>
            <Select labelId={labelFilter+"label"} name={labelFilter} value={filter} label={labelFilter} sx={{ minWidth: size }}
                onChange={filterfunction}>
                    {arrayItems.map((item, index) => (
                        <MenuItem key={index} value={item.value} >{item.name}</MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}