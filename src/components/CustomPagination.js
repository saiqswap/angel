import { Grid, TablePagination } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import React from "react";

function CustomPagination({ data, changePage, changePageSize }) {
  const _handleChangePage = (event, newPage) => {
    changePage(newPage + 1);
  };

  const _handleChangeRowsPerPage = (event) => {
    changePageSize(parseInt(event.target.value, 10));
    changePage(1);
  };

  return (
    data &&
    data.pageCount > 1 && (
      <Grid container justifyContent="flex-end">
        <Grid item>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            count={data.itemCount}
            rowsPerPage={data.pageSize}
            page={data.page - 1}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onPageChange={_handleChangePage}
            onRowsPerPageChange={_handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            style={{ border: "none" }}
            component="div"
          />
        </Grid>
      </Grid>
    )
  );
}

export default CustomPagination;
