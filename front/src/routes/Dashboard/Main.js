import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "../../utils/axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { RequestOptionsContext } from "./DashboardWrapper";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import TaskModal from "../../routes/Dashboard/TaskModal";

function Main(props) {
  const FILTER_KEYS = [
    "rejected",
    "accepted",
    "solved",
    "archived",
    "notified",
  ];

  const dropdownOptions = ["resolve", "reject"];

  const { categories, areas, users } = useContext(RequestOptionsContext);

  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const [filterStates, setFilterStates] = useState({
    new: false,
    mine: false,
    solved: false,
    rejected: false,
  });

  const [ticketDetails, setTicketDetails] = useState({
    request: "",
    name: "",
    category: "",
    phone: "",
    address: "",
    area: "",
    assignee: "",
    _id: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  async function getTickets() {
    setIsLoadingTickets(true);
    const { data = {} } = await axios.get("/api/tickets");
    setTickets(data.tickets || []);
    setIsLoadingTickets(false);
  }

  useEffect(() => {
    getTickets();
  }, []);

  //TOGGLE-START

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    openModal(dropdownOptions[selectedIndex])
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  //TOGGLE-END

  function handleInputChange({ target }) {
    setTicketDetails({
      ...ticketDetails,
      [target.name]: target.value,
    });
  }

  function handleDropDownChange({ target }) {
    if (target.value) {
      openModal(target.value);
    }
  }

  async function openModal(type) {
    setIsModalOpen(true);
    setModalType(type);
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalType("");
  }

  function handleFilters({ target }) {
    setFilterStates({
      ...filterStates,
      [target.name]: target.checked,
    });
  }

  function ticketFilters(oneTicket) {
    const activeFilters = Object.keys(filterStates).filter(
      (key) => !!filterStates[key]
    );

    return (
      activeFilters.filter((oneFilter) => {
        return oneTicket.status[oneFilter] === false;
      }).length === 0
    );
  }

  function createTask() {
    // TODO: Create task
  }

  async function handleBtnClick(comment) {
    closeModal();
    if (modalType === "approve") {
      await axios.put(`/api/tickets/${ticketDetails._id}/approve`);
    } else if (modalType === "reject") {
      await axios.put(`/api/tickets/${ticketDetails._id}/reject`, { comment });
    } else if (modalType === "resolve") {
      await axios.put(`/api/tickets/${ticketDetails._id}/resolve`, { comment });
    }
  }

  function selectTicket(ticket) {
    const {
      request,
      name,
      category,
      phone,
      address,
      area,
      assignee,
      _id,
    } = ticket;
    setTicketDetails({
      request,
      name,
      category,
      phone,
      address,
      area,
      assignee,
      _id,
    });
  }

  function getSelectedCategory(ticketCategory) {
    return categories.find((category) => ticketCategory === category._id);
  }

  const Ticket = (ticket) => {
    const date = new moment(ticket.createdAt).format("DD.MM.YY");
    const displayedDate = date !== "invalid date" ? date : "";

    return (
      <div onClick={() => selectTicket(ticket)} className="ticket">
        <div className="ticket-wrapper">
          <h5>{ticket.request}</h5>

          <div className="footer">
            <h5>{displayedDate}</h5>
            <h5>{ticket.category}</h5>
            <h5>{ticket.area}</h5>
          </div>
        </div>
      </div>
    );
  };

  const selectedCategory = getSelectedCategory(ticketDetails.category);

  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <DashboardNavigation />
          {isModalOpen && (
            <TaskModal
              onClose={() => closeModal()}
              modalType={modalType}
              handleBtnClick={(comment) => handleBtnClick(comment)}
              showCommentField={modalType === "resolve" || modalType === "reject"}
            />
          )}
          <div className="filter-list">
            <h5>
              <FormattedMessage id="filters" />
            </h5>
            <div className="filters">
              {FILTER_KEYS.map((filter) => (
                <CustomInput
                  labelId={filter}
                  name={filter}
                  modifier="secondary"
                  layout="checkbox"
                  checked={filterStates[filter]}
                  onChange={handleFilters}
                />
              ))}
            </div>
            <Button
              variant="contained"
              color="default"
              onClick={() => createTask()}
            >
              <FormattedMessage id="modal.approve" />
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="ticket-list-wrapper">
            {isLoadingTickets ? (
              <LoadingSpinner />
            ) : (
              tickets
                .filter(ticketFilters)
                .map((ticket) => <Ticket {...ticket} />)
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="task-manager">
            <div className="task-manager-wrapper">
              <div className="input-container">
                <TextField
                  className="input"
                  id="request"
                  name="request"
                  label="request"
                  variant="outlined"
                  value={ticketDetails.request}
                  onChange={handleInputChange}
                />
                <TextField
                  className="input"
                  id="requesterName"
                  name="name"
                  label="requesterName"
                  variant="outlined"
                  value={ticketDetails.name}
                  onChange={handleInputChange}
                />
                <FormControl
                  className="input"
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    <FormattedMessage id="category" />
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="category"
                    value={ticketDetails.category}
                    onChange={handleInputChange}
                    label="category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.map((option) => (
                      <MenuItem value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  className="input"
                  id="phone"
                  name="phone"
                  label="phone"
                  variant="outlined"
                  value={ticketDetails.phone}
                  onChange={handleInputChange}
                />

                {selectedCategory && selectedCategory.needsAddress && (
                  <TextField
                    className="input"
                    id="address"
                    name="address"
                    label="address"
                    variant="outlined"
                    value={ticketDetails.address}
                    onChange={handleInputChange}
                  />
                )}

                <FormControl
                  className="input"
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    <FormattedMessage id="area" />
                  </InputLabel>
                  <Select
                    labelId="area"
                    id="area"
                    name="area"
                    value={ticketDetails.area}
                    onChange={handleInputChange}
                    label="area"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {areas.map((option) => (
                      <MenuItem value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  className="input"
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    <FormattedMessage id="assignee" />
                  </InputLabel>
                  <Select
                    labelId="assignee"
                    id="assignee"
                    value={ticketDetails.user}
                    onChange={handleInputChange}
                    label="assignee"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users.map((option) => (
                      <MenuItem value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                          <Button onClick={handleClick}>{dropdownOptions[selectedIndex]}</Button>
                          <Button
                            color="primary"
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                          >
                            <ArrowDropDownIcon />
                          </Button>
                        </ButtonGroup>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList id="split-button-menu">
                                    {dropdownOptions.map((option, index) => (
                                      <MenuItem
                                        key={option}
                                        disabled={index === 2}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                      >
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openModal("approve")}
                    >
                      <FormattedMessage id="modal.approve" />
                    </Button>
                  </Grid>
                </Grid>

                <div className="flex-end action-wrapper">
                  <CustomInput
                    labelId="modal"
                    name="modal"
                    modifier="secondary"
                    layout="select"
                    onChange={handleDropDownChange}
                  >
                    <option value="" />
                    {dropdownOptions.map((option) => (
                      <option value={option}>
                        {props.intl.formatMessage({ id: `modal.${option}` })}
                      </option>
                    ))}
                  </CustomInput>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openModal("approve")}
                  >
                    <FormattedMessage id="modal.approve" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default injectIntl(Main);
