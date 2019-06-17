const styles = theme => ({
  paper: {
    paddingBottom: theme.spacing(2)
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.grey[200]
  },
  editor: {
    margin: theme.spacing(2),
    marginBottom: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    cursor: "text"
  }
})

export default styles
