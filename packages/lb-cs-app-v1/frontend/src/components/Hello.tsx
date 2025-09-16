import { Typography } from "@mui/material";

export function Hello({ name = "world" }: { name?: string }) {
  return <Typography>Hello, {name}!</Typography>;
}
export default Hello;
