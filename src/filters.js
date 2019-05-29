//filter object to store the latest filters
const filters = {
  searchText: "",
  sortBy: "byEdited" //this is the default value
};

//getting the filters=============
const getFilters = () => filters;

//setting the filters===========
const setFilters = updates => {
  if (typeof updates.searchText === "string") {
    filters.searchText = updates.searchText;
  }
  if (typeof updates.sortBy === "string") {
    filters.sortBy = updates.sortBy;
  }
};

export { getFilters, setFilters };
