import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities?.find((a) => a.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(
        activities?.map((a) => (a.id === activity.id ? activity : a)) || null,
      );
      setSelectedActivity(activity);
    } else {
      activity.id = crypto.randomUUID();
      setActivities([...activities!, activity]);
      setSelectedActivity(activity);
    }
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities?.filter((a) => a.id !== id) || null);
    if (selectedActivity?.id === id) {
      setSelectedActivity(undefined);
    }
  };

  return (
    <Box sx={{ bgColor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>
  );
}

export default App;
