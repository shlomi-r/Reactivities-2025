import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
  activity?: Activity;
  closeForm: () => void;
  submitForm: (activity: Activity) => void;
};

export default function ActivityForm({
  activity,
  closeForm,
  submitForm,
}: Props) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log(event);
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    // console.log(data);
    if (activity) data.id = activity.id;
    submitForm(data as unknown as Activity);
  };

  return (
    <Paper sx={{ padding: 2, borderRadius: 3 }} elevation={6}>
      <Typography variant="h4" gutterBottom>
        {activity ? "Edit Activity" : "Create Activity"}
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          defaultValue={activity?.title}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          defaultValue={activity?.description}
        />
        <TextField
          name="category"
          label="Category"
          variant="outlined"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          variant="outlined"
          type="date"
          defaultValue={activity?.date}
        />
        <TextField
          name="city"
          label="City"
          variant="outlined"
          defaultValue={activity?.city}
        />
        <TextField
          name="venue"
          label="Venue"
          variant="outlined"
          defaultValue={activity?.venue}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button type="submit" color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
