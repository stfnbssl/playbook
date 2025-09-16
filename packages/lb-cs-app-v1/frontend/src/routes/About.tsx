import { Card, CardContent, Typography } from "@mui/material";

export default function About() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>About</Typography>
        <Typography>Starter app using Vite + React + TS, Router, Redux, MUI.</Typography>
      </CardContent>
    </Card>
  );
}
