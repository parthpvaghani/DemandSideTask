import React,{ useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NoteForm({open,handleClose,handleSaveClose}) {


const [values,setValues] = useState({
    title:'',
    maincontent:'',
    date:'',
    tags:[],
})

const handleChange = (e) =>{
    setValues({
        ...values,
        [e.target.name]:e.target.value
    })
}
const handleChangeTags = (e) =>{
    setValues({
        ...values,
        tags:e.target.value.split(',')
    })
}
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create New Note With Given Form Details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            onChange={handleChange}
            name="title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="maincontent"
            label="Main Content"
            name="maincontent"
            onChange={handleChange}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            label="Creation Date"
            placeholder="05/07/2020"
            onChange={handleChange}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="tags"
            name="tags"
            onChange={handleChangeTags}
            label="Tags"
            placeholder="Add Tags Separated By Commas"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>handleSaveClose(values)} color="primary">
            Save Note
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
