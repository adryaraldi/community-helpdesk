import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { AreaEditModal } from "./AreaEditModal";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  container: {
    padding: '8 0 8 0',
    elevation: 0,
  },
  table: {
    minWidth: "100%",
  },
  wapper: {
    padding: "24px",
    backgroundColor: "#f5f5f5",
  },
  newarea: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: "10px",
  }
});

export const AreaTable = ({ areas, getAreas, deleteArea }) => {
  const classes = useStyles();
  const [area, setArea] = useState(null);

  const areaEdited = () => {
    setArea(null);
    getAreas();
  };

  const createArea = () => {
    setArea({action: 'add', selected: null});
  };

  return (
    <>
      {areas ? (
        <>
          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {areas.map((area) => (
                  <TableRow key={area._id}>
                    <TableCell>{area.name}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup>
                        <Button onClick={() => setArea({action: 'edit', selected: area})}>
                          <EditIcon />
                        </Button>
                        <Button onClick={() => deleteArea(area)}>
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.newarea}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                createArea();
              }}
            >
              <FormattedMessage id="createCategory" />
            </Button>
          </div>
          {area && (
            <AreaEditModal
              data={area}
              deleteArea={deleteArea}
              areaEdited={areaEdited}
            />
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
