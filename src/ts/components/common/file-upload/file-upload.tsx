import { Input, Paper, Button } from '@mui/material';

import classes from './styles.module.scss';

const FileUpload = (props: any) => {
  const { onChange, type, showUploadButton } = props;

  return (
    <Paper className={classes.container}>
      <Input onChange={(e) => onChange(e)} type={type} color="primary" />
      {showUploadButton && (
        <Button variant="outlined" color="primary">
          Upload
        </Button>
      )}
    </Paper>
  );
};

export default FileUpload;
