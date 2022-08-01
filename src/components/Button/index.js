import { Button } from "@mui/material";

export default function ButtonComponent({ text, onClick = null }) {
    const onClickButton = () => {
        if (onClick) {
            return onClick();
        } else {
            return null;
        }
    };
    return (
        <Button variant="contained" color="primary" type="submit" onClick={() => onClickButton()} data-testid="button">
            {text}
        </Button>
    );
}
