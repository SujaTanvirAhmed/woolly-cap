import Typography from '@mui/material/Typography';

export default function DbError(props) {
    return (
        <Typography
            variant="h6"
            sx={{ backgroundColor: "#cdef33", color: "#ee3322", display: "inline-block", padding: "15px", borderRadius: "3px" }}
        >{props.message}</Typography>
    );
}