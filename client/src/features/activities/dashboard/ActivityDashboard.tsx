import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[] | null;
  selectedActivity?: Activity;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  submitForm: (activity: Activity) => void;
  editMode: boolean;
  deleteActivity: (id: string) => void;
};

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  openForm,
  closeForm,
  submitForm,
  editMode,
  deleteActivity,
}: Props) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            submitForm={submitForm}
          />
        )}
      </Grid2>
    </Grid2>
  );
}
