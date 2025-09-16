import { Button, Card, CardContent, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store";
import { increment } from "@/store/counterSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.counter.value);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Home</Typography>
        <Typography>Counter value: {value}</Typography>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
      </CardContent>
    </Card>
  );
}
